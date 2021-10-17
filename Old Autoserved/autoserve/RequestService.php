<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RequestService extends Model
{
    protected $fillable = [
        'masterlist_service_id',
        'request_id',
    ];

    protected $hidden = [
        'masterlist_service_id',
        'request_id',
    ];

    public function service()
    {
        return $this->hasOne(MasterlistService::class, 'id', 'masterlist_service_id');
    }

    public function request()
    {
        return $this->belongsTo(UserRequest::class, 'id', 'request_id');
    }
}
