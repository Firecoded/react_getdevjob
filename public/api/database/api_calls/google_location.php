<?php

    function getGoogleObj($query){
        $curl = curl_init();
        $query = urlencode($query);
        curl_setopt_array($curl, array(
        CURLOPT_URL => "https://maps.googleapis.com/maps/api/place/textsearch/json?query=$query&key={$googleKey}}",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => array(
            "Authorization: Basic Og==",
            "Cache-Control: no-cache",
        ),
        ));
        $response = curl_exec($curl);
        curl_close($curl);
        $response = json_decode($response, true);
        //get individual fields and insert into associate array
        $address = $response["results"][0]["formatted_address"];
        list($street, $city, $statezip) = explode(", ", $address);
        list($state, $zip) = explode(" ", $statezip);
        $lat = $response["results"][0]["geometry"]["location"]["lat"];
        $long = $response["results"][0]["geometry"]["location"]["lng"];
        $output = [
            "street"=>$street,
            "city"=>$city,
            "state"=>$state,
            "zip"=>$zip,
            "lat"=>$lat,
            "long"=>$long,
            "fullAddress"=>$address
        ];
        return $output;

    }

?>