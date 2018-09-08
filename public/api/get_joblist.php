<?php
    header("Access-Control-Allow-Origin: *");
    require_once("queries/salary.php");
    require_once("queries/post_date.php");
    require_once("queries/job_type.php");
    require_once("queries/get_single_job.php");
    require_once("database/distance.php");
    require_once("mysql_connect.php");

   
    $output = [
        "success"=>false
    ];
    $title = $_POST["title"];
// start query
    $query = "SELECT * FROM `jobs`";
    $andFlag = false;
    $orFlag = false;
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
    $conds = array();
    
// checks by title
    if($andFlag){
        $query = $query . " AND ";
    }
    else{
        // $query = $query . " WHERE `title` LIKE '%web developer%'";
        $query = $query . " WHERE ";
    }
    foreach($title as $val){
        $conds[] = "`title` LIKE '%".$val."%'";
    }
    $query = $query . implode(" AND ", $conds);

// Single page
    if(isset($_POST['id']) && $_POST['id'] !== '' ){
        $single_page_id = $_POST['id'];
        $query = getSingleJob($single_page_id);
    }

// Sort query results by post date
    $query = $query . " ORDER BY `post_date` DESC";
    
    $result = mysqli_query($conn, $query);

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
            $locationQuery = "SELECT * FROM `locations` WHERE `company_id`=$companyID";
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
        $ouput["message"] = "fail";
    }

    // SOME COMPANIES DONT HAVE VALID LOCATIONS, GETTING A WARNING->ERROR IN NETWORK TAB 

    //check if user shared location and if user put distance in filter
    if($_POST["userLat"] !== "" && $_POST["userLng"] !== "" && $_POST["distance"] !== ""){
        $userLat = $_POST["userLat"];
        $userLng = $_POST["userLng"];
        $length = count($output["jobs"]);
        for($i = 0; $i < $length; $i++){
            $companyLat = $output["jobs"][$i]["company"]["location"]["lat"];
            $companyLng = $output["jobs"][$i]["company"]["location"]["lng"];
            $company = $output['jobs'][$i]['company']['name'];
            // echo "company: $company";   
            $distanceFromUserToCompany = getDistance($userLat, $userLng, $companyLat, $companyLng);
            // echo $output["jobs"][$i]["company"]["name"];

            //if distance between company and user location is less than distance in filter, remove it from output array
            if($distanceFromUserToCompany < intval($_POST["distance"])){
                unset($output["jobs"][$i]);
            }
        }
    }
    
    $output = json_encode($output);


    print_r($output);
?>