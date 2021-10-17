<?php

namespace App\Http\Controllers\Utils;

use App\Http\Controllers\Utils\Constants;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class Utilities
{
    public static function hash_data($data)
    {
        return Hash::make($data);
    }

    public static function random_string($size = 0x20)
    {
        return Str::random($size);
    }

    public static function service_return($success, $msg = "", $data = null)
    {
        $service_wrapper = [
            'success' => $success,
            'developerMessage' => $msg,
            'data' => $data,
        ];

        return $service_wrapper;
    }

    public static function error($message = '', $code = 0, $exception = '')
    {
        $error = [
            'code' => $code,
            'message' => Constants::ERROR_MSG_GENERIC,
            'developerMessage' => '',
        ];

        if (!empty($message)) {
            $error['message'] = $message;
        }

        if (!empty($exception)) {
            $error['developerMessage'] = $exception;
        }

        return $error;
    }

    public static function get_distance($from, $to)
    {
        return Utilities::compute_distance($from['latitude'], $from['longitude'],
            $to['latitude'], $to['longitude']);
    }

    public static function compute_distance($latitudeFrom, $longitudeFrom, $latitudeTo, $longitudeTo)
    {
        $rad = M_PI / 180;
        $theta = $longitudeFrom - $longitudeTo;
        $dist = sin($latitudeFrom * $rad)
         * sin($latitudeTo * $rad) + cos($latitudeFrom * $rad)
         * cos($latitudeTo * $rad) * cos($theta * $rad);
        return acos($dist) / $rad * 60 * 1.853;
    }
}
