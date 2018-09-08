<?php

function getSingleJob($id){
    return "SELECT * FROM `jobs` WHERE `ID` = $id";
}

?>