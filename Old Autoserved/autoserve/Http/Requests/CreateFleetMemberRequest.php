<?php

namespace App\Http\Requests;

class CreateFleetMemberRequest extends FormRequest
{
    public function rules()
    {
        return [
            'fleet_id' => 'required|integer',
            'fname' => 'required|max:20',
            'lname' => 'required|max:20',
            'email' => 'required|email|unique:users,email',
            'country' => 'required',
        ];
    }
}
