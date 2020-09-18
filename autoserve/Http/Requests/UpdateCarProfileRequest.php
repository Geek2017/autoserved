<?php

namespace App\Http\Requests;

class UpdateCarProfileRequest extends FormRequest
{
    public function rules()
    {
        return [
            'engine_type' => 'string',
            'transmission' => 'string',
            'color' => 'present',
            'plate_number' => 'string',
        ];
    }
}
