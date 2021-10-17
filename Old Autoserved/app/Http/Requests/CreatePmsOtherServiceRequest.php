<?php

namespace App\Http\Requests;

class CreatePmsOtherServiceRequest extends FormRequest
{
    public function rules()
    {
        return [
            'preferred_schedules' => 'required',
            'pms_others_id' => 'required|integer',
            'car_id' => 'required|integer',
            'type' => 'required|string',
            'oil_type' => 'required|string',
        ];
    }
}
