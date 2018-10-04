<?php
/**
 * this file contains the function that determines the query needed to sort job listings based on post date
 */

    /**
     * @param: takes the number of days to search within, as well as the flag to determine
     * whether the query starts with "AND" or "WHERE"
     * @return: part of a query used to add to the existing query
     */
    function postDateQuery($numberOfDays, $flag){
        if($flag){
            return " AND `jobs`.`post_date` > DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL $numberOfDays DAY), '%m/%d%y')";
        }
        else {
            return " WHERE `jobs`.`post_date` > DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL $numberOfDays DAY), '%m/%d%y')";
        }
    }
?>
