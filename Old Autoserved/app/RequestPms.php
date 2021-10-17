<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RequestPms extends Model
{
    protected $fillable = [
        'masterlist_pms_id',
        'request_id',
        'oil_type',
    ];

    protected $hidden = [
        'masterlist_pms_id',
        'request_id',
    ];

    public function pms()
    {
        return $this->hasOne(MasterlistPms::class, 'id', 'masterlist_pms_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function replacements()
    {
        return $this->hasMany(RequestPmsReplacement::class);
    }

    public function request()
    {
        return $this->hasOne(UserRequest::class, 'id', 'request_id');
    }
}
