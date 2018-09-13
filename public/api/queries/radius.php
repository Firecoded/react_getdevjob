<?php
/**
 *  this file holds the function responsible for filtering job listings based on specified distances by miles
 */


    /**
     * @param: takes the location and the number of miles 
     * @return: part of a query indicating the boundaries/radius to search within
     */
    // function takes the search location as a required arguement, distance is optional
    function getJobsWithinRadius($locationFromSearch, $distance){
        // if the user does NOT indicates a specific location
        if($locationFromSearch === ""){
            return;
        }
    // assoc array containing lat's and long's from the center of each city 
        $locationObject = [
            "Los Angeles"=>[
                "lat"=>34.0522,
                "lng"=>-118.2437
            ],
            "San Diego"=>[
                "lat"=>32.7157,
                "lng"=>-117.1611
            ],
            "Irvine"=>[
                "lat"=>33.6846,
                "lng"=>-117.8265
            ]
        ];
    // get and store the search location's latitude and longitude
        $lat_Center = $locationObject[$locationFromSearch]["lat"];
        $lng_Center = $locationObject[$locationFromSearch]["lng"];

    // scalar per mile
        $lat_scalar = 0.014;
        $lng_scalar = 0.018;
    // if the user specifies distance
        if($distance !== ""){
            $distance = floatval($distance / 2);
            $lat_Left = $lat_Center - ($lat_scalar * $distance);
            $lat_Right = $lat_Center + ($lat_scalar * $distance);
            $lng_Left = $lng_Center - ($lng_scalar * $distance);
            $lng_Right = $lng_Center + ($lng_scalar * $distance);
        }
        else{
            $lat_Left = $lat_Center - $lat_scalar;
            $lat_Right = $lat_Center + $lat_scalar;
            $lng_Left = $lng_Center - $lng_scalar;
            $lng_Right = $lng_Center + $lng_scalar;
        }
        return " AND `lat` BETWEEN $lat_Left AND $lat_Right AND `lng` BETWEEN $lng_Left AND $lng_Right";
    }

?>