<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest as BaseFormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class FormRequest extends BaseFormRequest
{
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response_fail([
            'errors' => $validator->errors(),
        ], 422));
    }
}
