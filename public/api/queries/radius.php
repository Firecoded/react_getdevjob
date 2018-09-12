<?php

function getJobsWithinRadius($locationFromSearch, $distance){
    $locationObject = [
        "losangeles"=>[
            "lat"=>34.0522,
            "lng"=>-118.2437
        ],
        "sandiego"=>[
            "lat"=>32.7157,
            "lng"=>-117.1611
        ],
        "irvine"=>[
            "lat"=>33.6846,
            "lng"=>-117.8265
        ]
    ];

    $lat_Center = $locationObject[$locationFromSearch]['lat'];
    $lng_Center = $locationObject[$locationFromSearch]['lng'];
    
    $lat_scalar = 0.014;
    $lng_scalar = 0.018;

    if($distance !== ""){
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
  
    return " AND `lat` BETWEEN '$lat_Left' AND '$lat_Right' AND `lng` BETWEEN '$lng_Left' AND '$lng_Right'";
  
}

?>