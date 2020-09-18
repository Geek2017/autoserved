<?php

namespace App\Http\Requests;

class CreateCampaignCustomerRequest extends FormRequest
{
    public function rules()
    {
        return [
            'fname' => 'required|max:20',
            'lname' => 'required|max:20',
            'email' => 'required|email|unique:users,email',
            'contact' => 'required|max:50',
        ];
    }
}
