<?php

namespace App\Http\Requests;

class SavePmsOtherDataRequest extends FormRequest
{
    public function rules()
    {
        return [
            'pms_others_id' => 'required|integer',
        ];
    }
}
