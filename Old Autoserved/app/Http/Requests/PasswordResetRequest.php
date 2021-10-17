<?php

namespace App\Http\Requests;

class PasswordResetRequest extends FormRequest
{
    public function rules()
    {
        return [
            'token' => 'required',
            'password' => 'required|min:8',
            'confirm_password' => 'required|min:8|same:password',
            'email' => 'required',
        ];
    }
}
