<?php
/**
 * this file holds the function which maintains the jobs table in our database
 * its purpose is to remove jobs that are out dated
 * 
 */
    require_once("../mysql_connect.php");

    /** 
     * remove postings forom the jobs table that are outdated by -3 months
     * @param: requires the connection link connecting to the database
     * @return: doesn't return anything, but executes a delete query
     */
    function removeOutdated($conn){
        $output = [
            "success" => false,
            "error" => []
        ];
        // gets current date and subtracts 3 months
        $datePostLimit = date("m/d/Y", strtotime("-3 months"));
        
        // create a query to delete fromt he job table where the post date is outdated
        $query = "DELETE FROM `jobs` WHERE `post_date` < '$datePostLimit'";
        // execute the code
        $result = mysqli_query($conn, $query);

        // checks results to see if any rows were affected, if greater than zero it worked
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