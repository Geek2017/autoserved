<?php

namespace App\Http\Requests;

class ShowCarModelsRequest extends FormRequest
{
    public function rules()
    {
        return [
            'make_id' => 'required',
        ];
    }
}
