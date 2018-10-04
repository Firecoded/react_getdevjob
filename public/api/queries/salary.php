<?php
    /**
     * this file holds the salaryQuery function which joins the salary table 
     * utilizes arguements for min and max salary allowing users to filter by salary
     * 
     */

    /**
     * @param: minimum salary and max salary, based on filter selection
     * @return: a query used to join the salary table with the rest of the query
     */
    function salaryQuery($min, $max){
        return " JOIN `salaries` ON `salaries`.`ID`=`jobs`.`salary_id`
                WHERE `salaries`.`city_salary` > $min 
                AND `salaries`.`city_salary` < $max";
    }
?>