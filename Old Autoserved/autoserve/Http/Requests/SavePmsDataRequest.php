<?php

namespace App\Http\Requests;

class SavePmsDataRequest extends FormRequest
{
    public function rules()
    {
        return [
            'labor_prices' => 'sometimes|array',
            'oil_type_prices' => 'sometimes|array',
        ];
    }
}
