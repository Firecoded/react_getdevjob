<?php

function removeOutdated($post_date){
    $datePostLimit = date("m/d/Y", strtotime("-3 months"));
    if($post_date < $datePostLimit){
        return "DELETE FROM `jobs` WHERE $post_date < $datePostLimit";
    }
}

?>