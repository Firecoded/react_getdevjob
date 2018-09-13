<?php
/**
 * File holds function that scrapes job description, called from jooble.php
 */

    /**
     * Returns html of job description from either ZipRecruiter or Jooble
     * @param: $url, job posting url -> link to scrape from
     * @return: string of html of job description
     */
    function getJoobleDescription($url) {        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);        

        curl_exec($ch);
        $redirectedUrl = curl_getinfo($ch, CURLINFO_EFFECTIVE_URL);
        curl_close($ch); 
        $redirectHtml = file_get_html($redirectedUrl);
        $link = $redirectHtml->find("a[id=aGo]", 0);

        //if link is being redirected
        if($link){
            try{
                //zip recruiter case
                if(preg_match("/ziprecruiter/", $link->href) === 1){
                    $redirectHtml = file_get_html($link->href);
                    if(!$redirectHtml){
                        return "Listing is no longer available";
                    }
                    else{
                        $scrapedData = $redirectHtml->find("div[class=jobDescriptionSection]", 0);
                        return $scrapedData;
                    }
                }
                else{
                    return "No description available";
                }
            }
            catch(Exception $err){
                return "no listing";
            }
        }
        //stays on jooble
        else{
            $scrapedData = $redirectHtml->find('div[class=vacancy-desc_text_wrapper]', 0);
            return $scrapedData;
        }
    }

?>