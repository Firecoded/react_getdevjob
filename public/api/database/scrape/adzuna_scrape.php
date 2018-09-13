<?php
/**
 * this file scrapes the description of the original job add
 * allowing us to store the contents in the database 
 */
    include('scrape/scraper.php');

    /**
     * @param: takes the URL provided by the curl call
     * @return: the job description in the original job add
     */
    function scrapeDescription($url){
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        
        $a = curl_exec($ch);
        
        $redirectedUrl = curl_getinfo($ch, CURLINFO_EFFECTIVE_URL);
        curl_close($ch); 
        
        // takes the redirect URL provided by the API and retreives the HTML content of that page
        $redirectHtml = file_get_html($redirectedUrl);
        // target the link provided in the HTML
        $data =$redirectHtml->find('a', 0);
        // get the final link leading to the original job posting
        $finalUrl = $data->href;  
       
    
        $output= '';
        try {
            //ziprecruiter 
            if(preg_match('/ziprecruiter/', $finalUrl) === 1){
                $html = file_get_html($finalUrl);
                if(!$html){
                    $output= "Listing is no longer available";
                }
                else{
                    $scrapedData = $html->find('div[class=jobDescriptionSection]', 0);
                    $output= $scrapedData;
                }  
            } 
            // dice
            else if(preg_match('/dice/', $finalUrl) === 1 ){
                // print("finalUrl: $finalUrl");
                $html = file_get_html($finalUrl); // will return false if posting is no longer available
                if(!$html){
                    $output = "Listing is no longer available";
                }
                else {
                    $scrapedData = $html->find('div[id=jobdescSec]', 0);
                    $output = $scrapedData;
                }
                // $scrapedData = (($html->find('div[id=jobdescSec]', 0))==null) ? "no job descrp from dice": $html->find('div[id=jobdescSec]', 0); // not currently using, not functional 
            } 
            // if redirect link contains appcast
            else if(preg_match('/appcast/', $finalUrl)=== 1){
                $output = NULL;
            }
            else {
                $output= NULL;
            }
        } 
        // if the conditional statements above aren't met, return an error
        catch (Exception $error){
            return 'ERROR PULLING THE DESCRIPTION';
        }
        
        return $output;
    }
 ?>

