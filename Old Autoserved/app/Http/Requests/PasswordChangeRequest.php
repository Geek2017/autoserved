<?php

namespace App\Http\Requests;

class PasswordChangeRequest extends FormRequest
{
    public function rules()
    {
        return [
            'old_password' => 'required|min:8',
            'new_password' => 'required|min:8|different:old_password',
            'confirm_new_password' => 'required|min:8|same:new_password',
        ];
    }
}
