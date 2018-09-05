<?php

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