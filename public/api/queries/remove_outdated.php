<?php
require_once("../mysql_connect.php");


// remove postings forom the jobs table that are outdated by -3 months 
function removeOutdated($conn){
    $output = [
        'success' => false,
        'error' => []
    ];
    // gets current date and subtracts 3 months
    $datePostLimit = date("m/d/Y", strtotime("-3 months"));
    
        $query = "DELETE FROM `jobs` WHERE `post_date` < '$datePostLimit'";
        $result = mysqli_query($conn, $query);

        // checks results to see if any rows were affected
        if(mysqli_affected_rows($conn) > 0){
            $output['success'] = true;
        }
        else {
            $output['error'][]= "Error deleting from jobs table where post is outdated";
        }
        
    
    print_r($output);
}

removeOutdated($conn);

?>