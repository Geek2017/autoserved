<?php

namespace App\Http\Requests;

class ResendVerificationRequest extends FormRequest
{
    public function rules()
    {
        return [
            'email' => 'required|email|exists:users,email',
        ];
    }
}
