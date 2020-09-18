<?php

namespace App\Http\Requests;

class CreateCustomerRequest extends FormRequest
{
    public function rules()
    {
        return [
            'fname' => 'required|max:20',
            'lname' => 'required|max:20',
            'password' => 'required|min:8',
            'email' => 'required|email|unique:users,email',
            'contact' => 'required|max:50',
            'country' => 'required',
        ];
    }
}
