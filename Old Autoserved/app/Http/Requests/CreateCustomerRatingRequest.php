<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateCustomerRatingRequest extends FormRequest
{
    public function rules()
    {
        return [
            'shop_id' => 'required',
            'for_customer_id' => 'required',
            'rating' => 'required|between:1,5',
            'description' => 'required',
            'additional_work_items' => 'array',
        ];
    }
}
