<?php
namespace App\Services;

use App\CustomerRating;
use App\Http\Requests\CreateCustomerRatingRequest;
use App\Http\Requests\CreateShopRatingRequest;
use App\ShopRating;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class RatingService
{
    public function rate_shop($appointment_id, CreateShopRatingRequest $request)
    {
        $user = Auth::user();
        return CustomerRating::create([
            'uuid' => Str::uuid(),
            'appointment_id' => $appointment_id,
            'for_shop_id' => $request['for_shop_id'],
            'customer_id' => $user->id,
            'rating' => $request['rating'],
            'description' => $request['description'],
            'additional_work_items' => $request['additional_work_items'],
        ]);
    }

    public function rate_customer($appointment_id, CreateCustomerRatingRequest $request)
    {
        return ShopRating::create([
            'uuid' => Str::uuid(),
            'appointment_id' => $appointment_id,
            'shop_id' => $request['shop_id'],
            'for_customer_id' => $request['for_customer_id'],
            'rating' => $request['rating'],
            'description' => $request['description'],
            'additional_work_items' => $request['additional_work_items'],
        ]);
    }
}
