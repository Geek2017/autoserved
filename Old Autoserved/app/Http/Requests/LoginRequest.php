<?php

namespace App\Http\Requests;

class LoginRequest extends FormRequest
{
    public function rules()
    {
        return [
            'email' => 'required',
            'password' => 'required',
        ];
    }
}
