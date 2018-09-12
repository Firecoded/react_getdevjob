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
    $locationFromSearch = $_POST["location"];
    $locationObject = [
        "losangeles"=>[
            "lat"=>34.0522,
            "lng"=>-118.2437
        ],
        "sandiego"=>[
            "lat"=>32.7157,
            "lng"=>-117.1611
        ],
        "irvine"=>[
            "lat"=>33.6846,
            "lng"=>-117.8265
        ]
    ];
    $offset = $_POST["offset"];

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
        $query = $query . " WHERE ";
    }

    foreach($title as $val){
        $conds[] = "`title` LIKE '%{$val}%'";
    }
    $query = $query . implode(" OR ", $conds);


// Single page
    if(isset($_POST['id']) && $_POST['id'] !== '' ){
        $single_page_id = $_POST['id'];
        $query = getSingleJob($single_page_id);
    }

// Sort query results by post date
    $query = $query . " ORDER BY `post_date` DESC";
    if($offset !== ""){
        $startingPoint = $offset * 40;
        $query = $query . " LIMIT 40 OFFSET $startingPoint";
    }

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
        $ouput["message"] = "fail to query";
    }

    // SOME COMPANIES DONT HAVE VALID LOCATIONS, GETTING A WARNING->ERROR IN NETWORK TAB 

    //check if user input city and if user put distance in filter
    if($locationFromSearch !== ""  && $_POST["distance"] !== ""){
        $cityLat = $locationObject[$locationFromSearch]["lat"];
        $cityLng = $locationObject[$locationFromSearch]["lng"];
        for($i = 0; $i < count($output["jobs"]); $i++){
            $companyLat = $output["jobs"][$i]["company"]["location"]["lat"];
            $companyLng = $output["jobs"][$i]["company"]["location"]["lng"];
            $company = $output["jobs"][$i]["company"]["name"];

            //if company location not available, remove from output array
            if(empty($companyLat)){
                array_splice($output["jobs"], $i, 1);
                //reindex i to hold last position
                $i--;   
                continue;
            }

            $distanceFromUserToCompany = getDistance($cityLat, $cityLng, $companyLat, $companyLng);
            //if distance between company and city is greater than distance in filter, remove it from output array
            if($distanceFromUserToCompany > intval($_POST["distance"])){
                array_splice($output["jobs"], $i, 1);
                $i--;
            }
        }
    }

    $output = json_encode($output);
    print_r($output);
?>