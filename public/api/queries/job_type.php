<?php
/**
 * File contains function that returns appropriate query based on job type
 */

    /**
     * Returns query to concatenate to query in get_joblist.php
     * @param: type, job type id
     * @param: andFlag, boolean value on whether to use AND keyword in query
     * @param: orFlag, boolean value on whether to use OR keyword in query
     * @return: query string to concatenate
     */
    function jobTypeQuery($type, $andFlag, $orFlag){
        if($andFlag && !$orFlag){
            return " AND (`jobs`.`type_id` = $type";
        }
        else if($andFlag && $orFlag){
            return " OR `jobs`.`type_id` = $type";
        }
        else {
            return " WHERE (`jobs`.`type_id` = $type";
        }
    }
?>