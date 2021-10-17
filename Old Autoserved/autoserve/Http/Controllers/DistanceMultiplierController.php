<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Utils\Utilities;

class DistanceMultiplierController extends Controller
{
    /**
     * Computes the multiplier
     * Returns formatted multiplier with 2 decimal places
     */
    public function get_multiplier($distance, $distanceDifference)
    {
        // echo "d=" . $distance . "diff=" . $distanceDifference;
        if ($distance <= 0 || $distanceDifference <= 0) {
            return 0;
        }

        $multiplier = 1 - ($distance / $distanceDifference);
        return number_format($multiplier, 2, '.', '');
    }

    /**
     * Returns the difference between the farthest and nearest distances
     * of qualified shops
     */
    public function get_distance_difference($shopsWithinRadius, $user_coordinates)
    {
        $distanceDifference = 0;

        if (is_null($shopsWithinRadius) || is_null($user_coordinates)) {
            return $distanceDifference;
        }

        $minDistance = PHP_INT_MAX;
        $maxDistance = PHP_INT_MIN;

        // get min and max distances from qualified shops
        foreach ($shopsWithinRadius as $shop) {
            $distance = Utilities::get_distance($shop["coordinates"], $user_coordinates);

            $minDistance = min($minDistance, $distance);
            $maxDistance = max($maxDistance, $distance);
        }

        // echo "max=" . $maxDistance . "minDistance=" . $minDistance;
        $distanceDifference = $maxDistance - $minDistance;

        return $distanceDifference;
    }
    // Units M for miles, K for Kilometers, N for Nautical Miles
    public function compute_distance($lat1, $lon1, $lat2, $lon2, $unit)
    {

        $theta = $lon1 - $lon2;
        $dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) + cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
        $dist = acos($dist);
        $dist = rad2deg($dist);
        $miles = $dist * 60 * 1.1515;
        $unit = strtoupper($unit);

        if ($unit == "K") {
            return ($miles * 1.609344);
        } else if ($unit == "N") {
            return ($miles * 0.8684);
        } else {
            return $miles;
        }
    }
}
