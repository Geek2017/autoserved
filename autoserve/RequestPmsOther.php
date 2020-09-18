<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RequestPmsOther extends Model
{
    protected $fillable = [
        'masterlist_pms_others_id',
        'value',
        'user_id',
        'request_id',
    ];

    protected $casts = [
        'masterlist_pms_others_id' => 'integer',
        'user_id' => 'integer',
        'request_id' => 'integer',
    ];

    public function pms_others()
    {
        return $this->hasOne(MasterlistPmsOthers::class, 'id', 'masterlist_pms_others_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id', 'user_id');
    }

    public function request()
    {
        return $this->belongsTo(UserRequest::class, 'id', 'request_id');
    }
}
