<?php
    require("../api_keys.php");
    //returns somewhat accurate company website (still need to handle inc, corp cases)
    function getCompanySite($name){
        $curl = curl_init();

        curl_setopt_array($curl, array(
        CURLOPT_URL => "https://autocomplete.clearbit.com/v1/companies/suggest?query=$name",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => array(
            "Cache-Control: no-cache",
            "Postman-Token: 2c0791fe-7243-4c11-b42e-30d5b560cfff"
        ),
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);
        

        $response_decoded = json_decode($response, true);
        // print_r($response_decoded);
        if(count($response_decoded) > 0){
            return $response_decoded[0]["domain"];
        }
        else{
            return null;
        }
    }

    //returns clearbitobj (has linkedin, crunchbase, logo info)
    function getClearBitObj($domain){
        $curl = curl_init();
        curl_setopt_array($curl, array(
        CURLOPT_URL => "https://company.clearbit.com/v2/companies/find?domain=$domain",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => array(
            "Authorization: Basic $clearBitKey",
            "Cache-Control: no-cache",
            "Postman-Token: f55e8517-7800-469e-9d2f-529f94fe32bf"
        ),
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);
        curl_close($curl);

        $output = [];
        $response_decoded = json_decode($response, true);
        $companyName = $response_decoded["name"];
        $linkedin_url = (isset($response_decoded["linkedin"]["handle"])) ? 
        "https://www.linkedin.com/".$response_decoded["linkedin"]["handle"] : NULL;
        $output["linkedin"] = $linkedin_url;

        $ocr_url = "https://www.ocregister.com/?s=$companyName&orderby=date&order=desc";
        $output["ocr"] = $ocr_url;

        $crunchbase_url = (isset($response_decoded["crunchbase"]["handle"])) ? 
        "https://www.crunchbase.com/".$response_decoded["crunchbase"]["handle"] : NULL;
        $output["crunch"] = $crunchbase_url;

        $logo = isset($response_decoded["logo"]) ? $response_decoded["logo"] : NULL;
        $output["logo"] = $logo;

        return $output;
    }


?>