<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateShopRatingRequest extends FormRequest
{
    public function rules()
    {
        return [
            'for_shop_id' => 'required',
            'rating' => 'required|between:1,5',
            'description' => 'required',
            'additional_work_items' => 'array',
        ];
    }
}
