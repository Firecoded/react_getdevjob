<?php
    function salaryQuery($min, $max){
        return " JOIN `salaries` ON `salaries`.`ID`=`jobs`.`salary_id`
                WHERE `salaries`.`city_salary` > $min 
                AND `salaries`.`city_salary` < $max";
    }
?>