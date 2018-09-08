<?php

function postDateQuery($numberOfDays, $flag){
    if($flag){
        return " AND `jobs`.`post_date` > DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL $numberOfDays DAY), '%m/%d%y')";
    }
    return " WHERE `jobs`.`post_date` > DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL $numberOfDays DAY), '%m/%d%y')";

}

?>
