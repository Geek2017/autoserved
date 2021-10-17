<?php

namespace App\Http\Requests;

class CreateCorrectiveServiceRequest extends FormRequest
{
    public function rules()
    {
        return [
            'service_id' => 'required|exists:masterlist_services,id',
            'min' => 'required|lt:max',
            'max' => 'required|gt:min',
            'require_documents' => 'sometimes|required|boolean',
        ];
    }
}
