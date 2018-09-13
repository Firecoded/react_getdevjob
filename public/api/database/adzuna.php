<?php
/**
 * adzuna.php makes an API call to the Adzuna API retrieving job listings based on the search query and location
 * This file is reponsible for making the call, checking the database for existing data, and inserts new data to the 
 * jobs, companies, locations, and salaries table in the Jooble Database
 */

// require the necessary files to execute properly
    require_once("../mysql_connect.php");
    require_once("scrape/adzuna_scrape.php");
    require_once("scrape/salary_scrape.php");
    require_once("scrape/scraper.php");
    require_once("api_calls/clear_bit.php");
    require_once("api_calls/google_location.php");
    require_once("../api_keys.php");
// the url for the api call
    $url = "https://api.adzuna.com:443/v1/api/jobs/us/search/1?app_id={$adzunaAppID}&app_key={$adzunaAppKey}&results_per_page=2&what=Business%20Development%%20Manager&location0=US&location1=California&location2=Orange%20County";   

//create request object
    header('Content-Type: application/json');
    $ch = curl_init();                      
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));

    // execute the curl call then close
    $server_output = curl_exec ($ch);
    curl_close ($ch);
    // decode the response data
    $server_output = json_decode($server_output);
    // print_r($server_output);

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
        
        // if the company website doesn't exist, don't insert into any tables, and skip the code below
        // otherwise, continue...
        if($company_website === NULL){
            continue;

        }
        
        // create a query selecting companies by specific names 
        $checkCompanyExistance = "SELECT `name` FROM `companies` WHERE `name` = '$company_name'";
        // run the query
        $companyCheckQueryResult = mysqli_query($conn, $checkCompanyExistance);

        // if the selection returns nothing, that means the data doesn't exist in the database 
        // therefore execute the code 
        if(mysqli_num_rows($companyCheckQueryResult) === 0){
            $clearBitObj = getClearBitObj($company_website);
            $linkedin_url = $clearBitObj["linkedin"];
            $ocr_url = $clearBitObj["ocr"];
            $crunchbase_url = $clearBitObj["crunch"];
            $logo = $clearBitObj["logo"];
           
            // create a query to insert into the companies table
            $query2 = "INSERT INTO `companies` (`name`, `company_website`, `linkedin_url`, `ocr_url`, `logo`,`crunchbase_url`) 
            VALUES ('$company_name', '$company_website', '$linkedin_url','$ocr_url', '$logo', '$crunchbase')";
            
            //execute the query
            $companyInsertQueryResult = mysqli_query($conn, $query2);
            
            // check if results from company insert query is empty/encountered an error    
            if(mysqli_affected_rows($conn)=== -1){
                $output['error'][]= "## Company insert query error";
            }
            // call function to get location data
            $addressObject = getGoogleObj($address_query);
            $fullAddress = $addressObject["fullAddress"];
            $lat = $addressObject["lat"];
            $long = $addressObject["long"];
            $street = $addressObject["street"];
            $city = $addressObject["city"];
            $state = $addressObject["state"];
            $zip = $addressObject["zip"]; 

            // this function retrieves the ID of the last insert
            $company_id = mysqli_insert_id($conn);
            
            // create a query to insert into the locations table
            $location_query = "INSERT INTO `locations`(`company_id`, `street`,`city`,`state`,`zip`,`lat`,`lng`,`full_address`) VALUES
            ($company_id, '$street','$city','$state','$zip','$lat','$long','$fullAddress')";
            
            // execute the query
            $locationInsertQueryResult = mysqli_query($conn, $location_query);
            
            // if the query fails, throw an error
            if(mysqli_affected_rows($conn)=== -1){
                $output['error'][]= "## Locations insert query error";
            }
        }
// Salary:

        //check salaries table to see if the job-title in a specific city is already in the DB
        $titleCity = "$listing_title"."-"."$cityFromApi";
        $checkDuplicateSalary = "SELECT `title_city` FROM `salaries` WHERE `title_city`='$titleCity'";
        //excute the query
        $salaryCheckQueryResult = mysqli_query($conn, $checkDuplicateSalary);
        
        // if the query results return zero rows, proceed..
        if(mysqli_num_rows($salaryCheckQueryResult) === 0){
            $citySalary = (INT)getSalary($title, $cityFromApi, false);
            $stateSalary = (INT)getSalary($title, false, false);
            $nationalSalary = (INT)getSalary($title, false, true);

            // insert the into $ into salaries table
            $salaryInsertQuery = "INSERT INTO `salaries`(`city_salary`, `state_salary`, `title_city`, `national_salary`)
            VALUES ($citySalary, $stateSalary, '$titleCity', $nationalSalary)";
            $salaryInsertQueryResult = mysqli_query($conn, $salaryInsertQuery);
            // if the query failed
            if(mysqli_affected_rows($conn)=== -1){
                $output["error"][] = "failed to query salaries"; 
            }
            // retrieves the last primary ID of the last row inserted into the salaries table
            $salary_id = mysqli_insert_id($conn);
        }
    
        print_r($server_output);

        // if the job listing exceeds 2 months, don't insert the job, otherwise continue
        $dateTwoMonthsAgo = date("m/d/Y", strtotime("-2 months"));
        if($post_date < $dateTwoMonthsAgo){
            continue;
        }
        
        // write query to select titles that are repeated and execute the query
        $checkJobExistance = "SELECT * FROM `jobs` WHERE `title_comp` = '$title_name'";
        $jobCheckQueryResult = mysqli_query($conn, $checkJobExistance);  

        if(mysqli_num_rows($jobCheckQueryResult) === 0 && $description !== NULL){ 
            // create a query to select the company ID  based on the company name, then run the query
            $companyIDQuery = "SELECT c.ID FROM companies AS c WHERE c.name = '$company_name'";
            $companySelectQueryResult = mysqli_query($conn, $companyIDQuery);
            // retrieve the associative array and store it 
            $row = mysqli_fetch_assoc($companySelectQueryResult);
            // store the company id where row at ID 
            $company_id = $row["ID"];
            $description = scrapeDescription($listing_url);  
            
            // create a query to select the ID from the salaries table based on the job + city, then run the query
            $salaryQuery = "SELECT `ID` FROM `salaries` WHERE `title_city`='$titleCity'";
            $result = mysqli_query($conn, $salaryQuery);
            // retrieve the associative array
            $rowFromSalaryTable = mysqli_fetch_assoc($result);
            // store the salary ID
            $salary_id = (INT)$rowFromSalaryTable["ID"];

            // create query to insert into the jobs table
            $jobsInsertQuery = "INSERT INTO `jobs`
            (`title`, `company_name`, `company_id`, `post_date`, `listing_url`, `type_id`, `description`, `title_comp`, `salary_id`) 
            VALUES ('$listing_title', '$company_name', $company_id, '$post_date', '$listing_url', $type_id, '$description', '$title_name', $salary_id)";
           //execute the query
            $jobsInsertQueryResult = mysqli_query($conn, $jobsInsertQuery);  

            // if the query failed, throw an error
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
    /** takes the company name and formats it 
     * @param:  company_name, the name of the company
     * @return: the company name url encoded
     */
    function encodeName($company_name){
        $company_name = strtolower($company_name);
        $company_name = preg_replace('/(corporation|usa|inc|connection|llc|america|services|corp|solutions|research|company|orange county|\.|\,)/','', $company_name);
        return urlencode($company_name);
    }

    /**  formats the date
     * @param: date, takes the posting date
     * @return: formated date consistent with 'm/d/Y'
     */
    function getPostDate($date){
        $microtime = strtotime($date);
        return date('m/d/Y',$microtime);  
    }

    /** takes the response object and retreives title, then format it and remove tags
     * @param: response object from the curl call
     * @return: a consistent and formatted job title
     */
    function getJobTitle($obj){
        $temp= ($obj->title);
        $temp = strtolower($temp);
        $temp = ucfirst($temp);
        return strip_tags($temp);
    }

    /** gets the original like that redirects to original job posting
     * @param: takes the reponse object from the curl call
     * @return: redirect url
     */
    function getListingURL($obj){
        return ($obj->redirect_url);
    }

    /** determines a listing's job type 
     * @param: takes the response object from the curl call
     * @return: returns an integer which corresponds to a job type
     */
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