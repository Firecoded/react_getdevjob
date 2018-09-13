<?php
/**
 * File contains function that returns query to select a single job
 * (when user clicks on "share", this query gets called)
 */

    /**
     * 
     */
    function getSingleJob($id){
        return "SELECT * FROM `jobs` WHERE `ID` = $id";
    }

?>