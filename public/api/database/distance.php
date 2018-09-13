<?php
/**
 * File contains function that calculates distance between 2 points on interest
 */
    /**
     * Returns distance between 2 locations given its respectives latitudes and longitudes
     * @param: $latitudeFrom, latitude for 1st location
     * @param: $longitudeFrom, longitude for 1st location
     * @param: $latitudeTo, latitude for 2nd location
     * @param: $longitudeTo, longitude for 2nd location
     * @return: distance (miles) from 1st location to 2nd location
     */
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