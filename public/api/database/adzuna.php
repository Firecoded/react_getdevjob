<?php
    require_once("../mysql_connect.php");
    require_once("scrape/adzuna_scrape.php");
    require_once("scrape/salary_scrape.php");
    require_once("scrape/scraper.php");
    require_once("api_calls/clear_bit.php");
    require_once("api_calls/google_location.php");
    require_once("../api_keys.php");

    $url = "https://api.adzuna.com:443/v1/api/jobs/us/search/1?app_id={$adzunaAppID}&app_key={$adzunaAppKey}&results_per_page=1&what=front%20end%20developer&location0=US&location1=California&location2=San%20Diego%20County";   

//create request object
    header('Content-Type: application/json');
    $ch = curl_init();                      
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));

    $server_output = curl_exec ($ch);
    curl_close ($ch);
    $server_output = json_decode($server_output);
    print_r($server_output);

    $output = [
        'success' => false,
        'message'=> []
    ];
// loop through the results array and get the title, postDate and listingURL
    for($i = 0;  $i < count((array)$server_output -> results); $i++){
        // variables for JOBS table
        $currentResultIndex = $server_output->results[$i];
        $company_name = $currentResultIndex->company->display_name;
        $listing_title = getJobTitle($currentResultIndex);
        $title = $listing_title.','.$company_name;
        $title_name = $listing_title.'-'.$company_name;
        $post_date    = getPostDate($currentResultIndex->created);
        $listing_url  = getListingURL($currentResultIndex);
        $type_id = getJobType($currentResultIndex);
        $urlEncodedName= encodeName($company_name);
       
        $cityFromApi = $currentResultIndex-> location->area[3];
        $address_query = $urlEncodedName." ".$cityFromApi;
            
        $ocr_url = "https://www.ocregister.com/?s=".$company_name."&orderby=date&order=desc";
        $company_website = getCompanySite($company_name);    
        
        // run query to check companies table if current index exists in the database
        $checkCompanyExistance = "SELECT `name` FROM `companies` WHERE `name` = '$company_name'";
        $companyCheckQueryResult = mysqli_query($conn, $checkCompanyExistance);

        if(mysqli_num_rows($companyCheckQueryResult) === 0){
            $clearBitObj = getClearBitObj($company_website);
            $linkedin_url = $clearBitObj["linkedin"];
            $ocr_url = $clearBitObj["ocr"];
            $crunchbase_url = $clearBitObj["crunch"];
            $logo = $clearBitObj["logo"];
           
            $query2 = "INSERT INTO `companies` (`name`, `company_website`, `linkedin_url`, `ocr_url`, `logo`,`crunchbase_url`) 
            VALUES ('$company_name', '$company_website', '$linkedin_url','$ocr_url', '$logo', '$crunchbase')";
            $companyInsertQueryResult = mysqli_query($conn, $query2);
        // check if results from company insert query is empty/encountered an error    
            if(mysqli_affected_rows($conn)=== -1){
                $output['error'][]= "## Company insert query error";
            }
        // add locations query
            $addressObject = getGoogleObj($address_query);
            $fullAddress = $addressObject["fullAddress"];
            $lat = $addressObject["lat"];
            $long = $addressObject["long"];
            $street = $addressObject["street"];
            $city = $addressObject["city"];
            $state = $addressObject["state"];
            $zip = $addressObject["zip"]; 

            $company_id = mysqli_insert_id($conn);
            $location_query = "INSERT INTO `locations`(`company_id`, `street`,`city`,`state`,`zip`,`lat`,`lng`,`full_address`) VALUES
            ($company_id, '$street','$city','$state','$zip','$lat','$long','$fullAddress')";
            $locationInsertQueryResult = mysqli_query($conn, $location_query);
            if(mysqli_affected_rows($conn)=== -1){
                $output['error'][]= "## Locations insert query error";
            }
        }
// Salary:

        //fill up salaries table
        $titleCity = "$listing_title"."-"."$cityFromApi";
        $checkDuplicateSalary = "SELECT `title_city` FROM `salaries` WHERE `title_city`='$titleCity'";
        $salaryCheckQueryResult = mysqli_query($conn, $checkDuplicateSalary);
        
        if(mysqli_num_rows($salaryCheckQueryResult) === 0){
        //if salary is not in salaries table, insert salary into it
    
            $citySalary = (INT)getSalary($title, $cityFromApi, false);
            $stateSalary = (INT)getSalary($title, false, false);
            $nationalSalary = (INT)getSalary($title, false, true);


            $salaryInsertQuery = "INSERT INTO `salaries`(`city_salary`, `state_salary`, `title_city`, `national_salary`)
            VALUES ($citySalary, $stateSalary, '$titleCity', $nationalSalary)";
            $salaryInsertQueryResult = mysqli_query($conn, $salaryInsertQuery);
            if(mysqli_affected_rows($conn)=== -1){
                $output["error"][] = "failed to query salaries"; 
            }
            $salary_id = mysqli_insert_id($conn);
        }


 // write query to select titles that are repeated
        $checkJobExistance = "SELECT * FROM `jobs` WHERE `title_comp` = '$title_name'";
        $jobCheckQueryResult = mysqli_query($conn, $checkJobExistance);
        $description = scrapeDescription($listing_url);    

        if(mysqli_num_rows($jobCheckQueryResult) === 0 && $description !== NULL){ 

            $companyIDQuery = "SELECT c.ID FROM companies AS c WHERE c.name = '$company_name'";
            $companySelectQueryResult = mysqli_query($conn, $companyIDQuery);
            $row = mysqli_fetch_assoc($companySelectQueryResult);
            $company_id = $row["ID"];
           
            print("Title: $titleCity");
            $salaryQuery = "SELECT `ID` FROM `salaries` WHERE `title_city`='$titleCity'";
            $result = mysqli_query($conn, $salaryQuery);
            $rowFromSalaryTable = mysqli_fetch_assoc($result);
            $salary_id = (INT)$rowFromSalaryTable["ID"];

            $jobsInsertQuery = "INSERT INTO `jobs`
            (`title`, `company_name`, `company_id`, `post_date`, `listing_url`, `type_id`, `description`, `title_comp`, `salary_id`) 
            VALUES ('$listing_title', '$company_name', $company_id, '$post_date', '$listing_url', $type_id, '$description', '$title_name', $salary_id)";
            // print($jobsInsertQuery);

            $jobsInsertQueryResult = mysqli_query($conn, $jobsInsertQuery);  
                if(mysqli_affected_rows($conn)=== -1){
                    if($description === null){
                        $output['error'][]= "## Jobs description is unavailable, did not insert job";
                    }
                    else {
                        print("TITLE: $title_name");
                        $output['error'][]= "## Jobs insert query error";
                    }   
                } 
        }
    }
    print_r($output);

//------------------------------------------------------------------------------------------------------------------//
    

    function encodeName($company_name){
        $company_name = strtolower($company_name);
        $company_name = preg_replace('/(corporation|usa|inc|connection|llc|america|services|corp|solutions|research|company|orange county|\.|\,)/','', $company_name);
        return urlencode($company_name);
    }


    function getPostDate($date){
        $microtime = strtotime($date);
        return date('m/d/Y',$microtime);  
    }

    function getJobTitle($obj){
        $temp= ($obj->title);
        $temp = strtolower($temp);
        $temp = ucfirst($temp);
        return strip_tags($temp);
    }

    function getListingURL($obj){
        return ($obj->redirect_url);
    }

    function getJobType($obj){
        $title = strtolower($obj-> title);
        
        $type = isset($obj-> contract_time) ? $obj-> contract_time : NULL;
        if($type){
            switch($type){
                case 'full_time':
                    return 1;
                case 'part_time':
                    return 2;
                case 'contract':
                    return 2;
                case 'internship':
                    return 3;
                case 'intern':
                    return 3;
            }
        }
        else {
            if(preg_match('/full/', $title)){
                return 1;
            }
            else if(preg_match('/part/', $title) || preg_match('/contract/', $title)){
                return 2;
            }
            else if(preg_match('/intern/', $title)){
                return 3;
            }
            else{
                return 1;
            }
        }
    }
?>