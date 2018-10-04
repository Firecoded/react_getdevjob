<?php
/**
 * File contains function that returns query to select a single job
 * (when user clicks on "share", this query gets called)
 */

    /**
     * Returns query string that selects a single job listing
     * @param: $id, id the job posting that will match up to info in database
     * @return: query string
     */
    function getSingleJob($id){
        return "SELECT * FROM `jobs` WHERE `ID` = $id";
    }

?>