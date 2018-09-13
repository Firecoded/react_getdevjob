<?php
/**
 * File that holds function that scrapes salary off of Indeed
 */

    /**
     * Return salary information based on job title, city, country
     * @param: $title, job title
     * @param: $city, city of where job is located
     * @param: $country, country of where job is located
     * @return: int value of salary 
     */
    function getSalary($title, $city, $country){
        $spacePattern = '/[ ]/';
        $title = preg_replace($spacePattern, "-", $title);
        $city = preg_replace($spacePattern, "-", $city);
        //if city and country are not given, give salary for california
        if(!$city && !$country){
            $url = "https://www.indeed.com/salaries/$title"."-Salaries,-California";
        }
        //if country is not given, then give salary for specific city
        else if($city && !$country){
            $url = "https://www.indeed.com/salaries/$title"."-Salaries,-"."$city"."-CA";
        }
        //if city, country are given, then give salary for US
        else{
            $url = "https://www.indeed.com/salaries/$title"."-Salaries";
        }
        $html = file_get_html($url);
        $salary = $html->find('span[class=cmp-salary-amount]', 0);
        $salary = $salary->innertext;
        $pattern = '/[$,]/';
        $salary = preg_replace($pattern, "", $salary); 
        $salary = round((INT)$salary);
        $num_length = strlen((string)$salary);
        if($num_length < 3){
            $salary = $salary*40*52;
        }
        return $salary;
    }

?>