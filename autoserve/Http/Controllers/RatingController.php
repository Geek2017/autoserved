<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCustomerRatingRequest;
use App\Http\Requests\CreateShopRatingRequest;
use App\Services\RatingService;

class RatingController extends Controller
{
    protected $rating_service;

    public function __construct(RatingService $rating_service)
    {
        $this->rating_service = $rating_service;
    }

    public function rate_shop($appointment_id, CreateShopRatingRequest $request)
    {
        $response = ['success' => true];
        $this->rating_service->rate_shop($appointment_id, $request);
        return response()->json($response);
    }

    public function rate_customer($appointment_id, CreateCustomerRatingRequest $request)
    {
        $response = ['success' => true];
        $this->rating_service->rate_customer($appointment_id, $request);
        return response()->json($response);
    }
}
