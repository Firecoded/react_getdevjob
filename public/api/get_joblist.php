<?php
    header("Access-Control-Allow-Origin: *");
    require_once("queries/salary.php");
    require_once("queries/post_date.php");
    require_once("queries/job_type.php");
    require_once("queries/get_single_job.php");
    require_once("database/distance.php");
    require_once("mysql_connect.php");
    require_once("queries/radius.php");
   
    $output = [
        "success"=>false
    ];

    $title = $_POST["title"];
    $locationFromSearch = $_POST["location"];
    $offset = $_POST["offset"];
    $distance = $_POST["distance"];
    
// start query
    $query = "SELECT `jobs`.`ID`, `jobs`.`title`, `jobs`.`company_name`, `jobs`.`post_date`, `jobs`.`listing_url`, `jobs`.`type_id`, `jobs`.`description`, `jobs`.`title_comp`, `jobs`.`salary_id`, 
            `companies`.`name`, `companies`.`logo`, `companies`.`company_website`, `companies`.`linkedin_url`, `companies`.`ocr_url`, `companies`.`crunchbase_url`, 
            `locations`.`company_id`, `locations`.`street`, `locations`.`city`, `locations`.`state`, `locations`.`zip`, `locations`.`lat`, `locations`.`lng`, `locations`.`full_address` 
             FROM `jobs`";
    $andFlag = false;
    $orFlag = false;

    $query = $query." JOIN `companies` ON `jobs`.`company_id` = `companies`.`ID`";
    $query = $query." JOIN `locations` ON `locations`.`company_id` = `companies`.`ID`";

// salary
    if($_POST["minSalary"] != "" && $_POST["maxSalary"] !== ""){
        $max = (INT)$_POST["maxSalary"];
        $min = (INT)$_POST["minSalary"];
        $andFlag = true;
        $query = $query . salaryQuery($min ,$max);
    }
//post date
    if($_POST["postedDate"] !== ""){
        $numberOfDays = $_POST["postedDate"];
        $query = $query.postDateQuery($numberOfDays, $andFlag);
        $andFlag = true;
    }

// job type
    if($_POST["employmentTypeFullTime"] == "true"){
        $query = $query.jobTypeQuery("1", $andFlag, $orFlag);
        $andFlag = true;
        $orFlag = true;
    }
    if($_POST["employmentTypeContract"] == "true" || $_POST["employmentTypePartTime"] == "true"){
        $query = $query.jobTypeQuery("2", $andFlag, $orFlag);
        $andFlag = true;
        $orFlag = true;
    }
    if($_POST["employmentTypeInternship"] == "true"){
        $query = $query.jobTypeQuery("3", $andFlag, $orFlag);
        $andFlag = true;
        $orFlag = true;
    }
//  add ending ')' to query if needed
    if($orFlag){
        $query = $query.")";
    }

    $title = explode(" ", $title);
// create an array to store job title conditions in the job title AND the job description
    $titleConds = array();
    $descriptionConds = array();

// checks by title
    if($andFlag){
        $query = $query . " AND ";
    }
    else{
        $query = $query . " WHERE ";
    }

// add "(" to query because of the 'OR' conditional
    $query = $query . "((";
    foreach($title as $val){
        $titleConds[] = "`title` LIKE '%{$val}%'";
    }

    $query = $query . implode(" AND ", $titleConds) . ")";
 
// adds " OR ( " to the query string allowing for a search in the description    
    $query = $query . " OR (";
    foreach($title as $val){
        $descriptionConds[] = " `description` LIKE '%{$val}%'";
    }
    // join the array together
    $query = $query.implode(" AND ", $descriptionConds)."))";

    

// Single page
    if(isset($_POST['id']) && $_POST['id'] !== '' ){
        $single_page_id = $_POST['id'];
        $query = getSingleJob($single_page_id);
    }
// uses Search Location to select jobs within a radius of the specified latitude and longitude
    else{
        $query = $query.getJobsWithinRadius($locationFromSearch, $distance);
    }

    
// Sort query results by post date
    $query = $query . " ORDER BY `post_date` DESC";
    if($offset !== ""){
        $startingPoint = $offset * 8;
        $query = $query . " LIMIT 8 OFFSET $startingPoint";
    }

    
    $result = mysqli_query($conn, $query);

    //  Constructs output object to send to frontend 
    if(mysqli_num_rows($result) > 0){
        $count = 0;
        while($row = mysqli_fetch_assoc($result)){
            $output["jobs"][] = $row;
          
            //get company/salary id to relate to jobs
            $companyID = $row["company_id"];
            $salaryID = $row["salary_id"];
            $companyQuery = "SELECT * FROM `companies` WHERE `ID`=$companyID";
            $companyResult = mysqli_query($conn, $companyQuery);
            //insert company of job posting into output object
            if(mysqli_num_rows($companyResult) > 0){
                $companyRow = mysqli_fetch_assoc($companyResult);
                $output["jobs"][$count]["company"] = $companyRow;
            }
            $locationQuery = "SELECT `company_id`, `street`, `city`, `state`, `zip`, `lat`, `lng`, `full_address` FROM `locations` WHERE `company_id`= $companyID";
            $locationResult = mysqli_query($conn, $locationQuery);
            //insert location of company into output object
            if(mysqli_num_rows($locationResult) > 0){
                $locationRow = mysqli_fetch_assoc($locationResult);
                $output["jobs"][$count]["company"]["location"] = $locationRow;
            }
            $salaryQuery = "SELECT * FROM `salaries` WHERE `ID`=$salaryID";
            $salaryResult = mysqli_query($conn, $salaryQuery);
            //insert salary of job into output object
            if(mysqli_num_rows($salaryResult) > 0){
                $salaryRow = mysqli_fetch_assoc($salaryResult);
                $output["jobs"][$count]["salary"] = $salaryRow;
            }
            $count++;
        }
        $output["success"] = true;
    }
    else{
        $ouput["message"] = "fail to query";
    }

    $output = json_encode($output);
    print_r($output);
?>