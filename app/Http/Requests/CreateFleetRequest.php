<?php

namespace App\Http\Requests;

class CreateFleetRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => 'required|max:100',
            'contact' => 'required|max:50',
            'fname' => 'required|max:20',
            'lname' => 'required|max:20',
            'email' => 'required|email|unique:users,email',
            'country' => 'required',
        ];
    }
}
