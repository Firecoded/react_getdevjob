<?php
/**
 * File contains function that makes cURL call to GoogleMaps API and gets location information given a 
 * business name along with the location(city)
 */

    /**
     * Makes cURL call to GoogleMaps API and gets location data
     * @param: $query, search query (string->company name, city name)
     * @param: $googleKey, API key for GoogleMaps
     * @return: object that has location information based on search query
     */
    function getGoogleObj($query, $googleKey){
        $curl = curl_init();
        $query = urlencode($query);
        curl_setopt_array($curl, array(
        CURLOPT_URL => "https://maps.googleapis.com/maps/api/place/textsearch/json?query=$query&key=$googleKey",
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
        $address = $response["results"][0]["formatted_address"];

        //explode address into array and assign street, city, and statezip
        //EX: 9021 Fake Street, Irvine, CA 90683 -> (street=9021 Fake Street, city=Irvine, statezip=CA 90683)
        list($street, $city, $statezip) = explode(", ", $address);

        //explode statezip into array and assign state and zip
        //EX: CA 90683 -> (state=CA, zip=90683)
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