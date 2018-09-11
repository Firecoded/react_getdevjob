<?php
    //get distance between 2 points of interest, return in miles
    function getDistance($latitudeFrom, $longitudeFrom, $latitudeTo, $longitudeTo){
        $earthRadius = 3958.755866;
        $latFrom = floatval(deg2rad($latitudeFrom));
        $lonFrom = floatval(deg2rad($longitudeFrom));
        $latTo = floatval(deg2rad($latitudeTo));
        $lonTo = floatval(deg2rad($longitudeTo));
        
        $lonDelta = $lonTo - $lonFrom;
        $a = pow(cos($latTo) * sin($lonDelta), 2) +
        pow(cos($latFrom) * sin($latTo) - sin($latFrom) * cos($latTo) * cos($lonDelta), 2);
        $b = sin($latFrom) * sin($latTo) + cos($latFrom) * cos($latTo) * cos($lonDelta);

        $angle = atan2(sqrt($a), $b);

        return $angle * $earthRadius;
    }

?>