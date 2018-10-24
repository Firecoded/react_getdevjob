<?php
/**
 * This file makes a cURL call to jooble api and retrieves jobs based on CURLOPT_POSTFIELDS
 * Once jooble data is retrieved, for each job, insert into companies, locations, salaries, and jobs table in MySQL database
 */

    require_once("../mysql_connect.php");
    require_once("../api_keys.php");
    require_once("scrape/jooble_scrape.php");
    require_once("scrape/salary_scrape.php");
    require_once("scrape/scraper.php");
    require_once("api_calls/clear_bit.php");
    require_once("api_calls/google_location.php");

    $url = "https://us.jooble.org/api/";

    //create request object
    $ch = curl_init();
    header('Content-Type: application/json');
    curl_setopt($ch, CURLOPT_URL, $url."".$joobleKey);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, '{ "keywords": "web developer", "location": "los angeles", "radius":"25", "page": 1}');
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));
    // receive server response ...
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $server_output = curl_exec ($ch);   
    curl_close ($ch);
    $server_output = json_decode($server_output);
    $output = [
        "errors"=>[]
    ];
    print_r($server_output);

    //iterate through response we get from jooble
    for($i = 0; $i < count((array)$server_output->jobs); $i++){
        $title = $server_output->jobs[$i]->title;
        $link = $server_output->jobs[$i]->link;
        $postDate = getPostDate($server_output->jobs[$i]->updated);
        $type = (INT)getJobType($server_output->jobs[$i]);
        $companyName = $server_output->jobs[$i]->company;
        $titleCompany = "$title"."-"."$companyName";
        $location = $server_output->jobs[$i]->location;
        $cityFromApi = preg_replace("/, CA/", "", $location);
        $revisedCompanyName = cleanCompanyName($companyName);
        $companySite = getCompanySite($companyName);
        $revisedCompanyName = str_replace(" ", "", $revisedCompanyName);
        $revisedCompanyName = str_replace(",", "", $revisedCompanyName);

        //if company site is not given, then skip over this job listing
        if(is_null($companySite)){
            continue;
        }

        //fill up companies table
        $checkDuplicateCompany = "SELECT `name` FROM `companies` WHERE `name`='$companyName'";
        $companyCheckQueryResult = mysqli_query($conn, $checkDuplicateCompany);
        if(mysqli_num_rows($companyCheckQueryResult) == 0){
            $clearBitObj = getClearBitObj($companySite, $clearBitKey);
            $linkedin_url = $clearBitObj["linkedin"];
            $ocr_url = $clearBitObj["ocr"];
            $crunchbase_url = $clearBitObj["crunch"];
            $logo = $clearBitObj["logo"];
            $query = "INSERT INTO `companies`(`name`, `company_website`, `linkedin_url`, `ocr_url`, `crunchbase_url`, `logo`) 
            VALUES ('$companyName', '$companySite', '$linkedin_url', '$ocr_url', '$crunchbase_url', '$logo')";
            $result = mysqli_query($conn, $query);
            if(!$result){
                $output["errors"][] = "failed to query company";
            }
            //insert into locations table
            $locationObj = getGoogleObj("$companyName "."$cityFromApi", $googleKey);
            //didnt get valid location
            if(is_null($addressObject["fullAddress"])){
                $full_address = "";
                $lat = "";
                $lng = "";
                $street = "1";
                $city = "";
                $state = "";
                $zip = "";
            }
            //got valid location
            else{
                $fullAddress = $addressObject["fullAddress"];
                $lat = $addressObject["lat"];
                $long = $addressObject["long"];
                $street = $addressObject["street"];
                $city = $addressObject["city"];
                $state = $addressObject["state"];
                $zip = $addressObject["zip"]; 
            }
            $street = $locationObj["street"];
            $city = $locationObj["city"];
            $state = $locationObj["state"];
            $zip = $locationObj["zip"];
            $lat = $locationObj["lat"];
            $long = $locationObj["long"];
            $address = $locationObj["fullAddress"];
            $location_id = mysqli_insert_id($conn);
            $query = "INSERT INTO `locations`(`company_id`, `street`, `city`, `state`, `zip`, `lat`, `lng`, `full_address`)
            VALUES ($location_id, '$street','$city','$state', '$zip', '$lat', '$long', '$address')";
            $result = mysqli_query($conn, $query);
            if(!$result){
                $output["errors"][] = "failed to insert to locations table";
            }
        }

        //insert into salaries table
        $titleCity = "$title"."-"."$cityFromApi";
        $checkDuplicateSalary = "SELECT `title_city` FROM `salaries` WHERE `title_city`='$titleCity'";
        $checkSalaryQueryResult = mysqli_query($conn, $checkDuplicateSalary);
        //if salary is not in salaries table, insert salary into table
        if(mysqli_num_rows($checkSalaryQueryResult) == 0){
            $citySalary = (INT)getSalary($title, $cityFromApi, false);
            $stateSalary = (INT)getSalary($title, false, false);
            $nationalSalary = (INT)getSalary($title, false, true);
            $query = "INSERT INTO `salaries`(`city_salary`, `state_salary`, `national_salary`, `title_city`)
            VALUES ($citySalary, $stateSalary, $nationalSalary, '$titleCity')";
            $result = mysqli_query($conn, $query);
            if(!$result){
                $output["errors"][] = "failed to query salaries"; 
            }
            $salary_id = mysqli_insert_id($conn);
        }

        $dateTwoMonthsAgo = date("m/d/Y", strtotime("-2 months"));
        //skip appcast.io -> cant scape description, checks if listing was posted within 2 months of current date
        if($server_output->jobs[$i]->source === "appcast.io" || $postDate < $dateTwoMonthsAgo ){
            continue;
        }

        //insert into jobs table

        //checks for duplicate jobs in db by comparing title-company
        $checkDuplicateJobs = "SELECT `title_comp` FROM `jobs` WHERE `title_comp`='$titleCompany'";
        $checkJobQueryResult = mysqli_query($conn, $checkDuplicateJobs);
        //if job is not in db, then insert it into db
        if(mysqli_num_rows($checkJobQueryResult) == 0){
            $description = addslashes(getJoobleDescription($link));
            //match up jobs.company_id to companies.ID in mysql
            $companyIDQuery = "SELECT c.ID FROM companies AS c WHERE c.name = '$companyName'";
            $result = mysqli_query($conn, $companyIDQuery);
            $row = mysqli_fetch_assoc($result);
            $company_id = $row["ID"];
            //if description is unscrapable, that means that job listing is no longer available, thus skip over this job
            if($description == "No description available"){
                continue;
            }

            //handles case where salary is already in database, get salary ID of that specific salary
            if(!$salary_id){
                $salaryQuery = "SELECT `ID` FROM `salaries` WHERE `title_city`='$titleCity'";
                $result = mysqli_query($conn, $salaryQuery);
                $rowFromSalaryTable = mysqli_fetch_assoc($result);
                $salary_id = $rowFromSalaryTable["ID"];
            }
            $query = "INSERT INTO `jobs`(`title`, `company_name`, `company_id`, `description`, `post_date`, `listing_url`, `type_id`, `title_comp`, `salary_id`) 
            VALUES ('$title', '$companyName', $company_id, '$description', '$postDate', '$link', $type, '$titleCompany', $salary_id)";
            //send the query to the database, store the result of the query into $result
            $result = mysqli_query($conn, $query);
            if(!$result){
            $output["errors"][] = "failed to query jobs"; 
            }
        }
        print_r($output);
    }


    /**
     * Returns company name without extra keywords->easier to find domain of company
     * @param: $companyName, name of the company
     * @return: string of cleaned up version of company, disregards key words
     */ 
    function cleanCompanyName($companyName){
        $companyName = strtolower($companyName);
        $pattern = "/corporation|usa|inc|connection|llc|america|services|corp|solutions|technology|company|research|\./";
        $companyName = preg_replace($pattern , '', $companyName);
        return $companyName;
    }


    /**
     * Returns job type
     * @param: $job, job object
     * @return: 1 if full time, 2 if part time, contract, or 3 if internship
     */
    function getJobType($job){
        $title = $job->title;
        $type = $job->type;
        //if type is given from job object
        if($type){
            $type = strtolower($type);
            switch($type){
                case "full-time":
                    return 1;
                case "temporary":
                    return 2;
                case "intern":
                    return 3; 
                default: 
                    return 1;
            }
        }
        //type not given from job object, then check title for keywords
        else{
            $title = strtolower($title);
            if(preg_match("/full/", $title)){
                return 1;
            }
            else if(preg_match("/part/", $title) || preg_match("/contract/", $title)){
                return 2;
            }
            else if(preg_match("/intern/", $title)){
                return 3;
            }
            else{
                return 1;
            }
        }
    }

    /**
     * Returns post date
     * @param: $date, date to clean up
     * @return: string of date in mm/dd/yyyy format
     */
    function getPostDate($date){
        $microTime = strtotime($date);
        return date("m/d/Y", $microTime);
    }


?>