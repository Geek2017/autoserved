<?php

if (!function_exists('response_error')) {
    function response_error($message, $code = null, $data = null, $status = 500, $headers = [])
    {
        $response = [
            'status' => false,
            'message' => $message,
        ];

        if (!is_null($code)) {
            $response['code'] = $code;
        }

        if (!is_null($data)) {
            $response['data'] = $data;
        }

        return response()->json($response, $status, $headers);
    }
}

if (!function_exists('response_fail')) {
    function response_fail($data, $status = 400, $headers = [])
    {
        $response = [
            'status' => false,
            'data' => $data,
        ];

        return response()->json($response, $status, $headers);
    }
}

if (!function_exists('response_success')) {
    function response_success($data = [], $status = 200, $headers = [])
    {
        $response = [
            'status' => true,
            'data' => $data,
        ];

        return response()->json($response, $status, $headers);
    }
}
