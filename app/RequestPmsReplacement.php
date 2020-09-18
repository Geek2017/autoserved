<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RequestPmsReplacement extends Model
{
    protected $fillable = [
        'request_pms_id',
        'change_index',
        'parts_type',
    ];

    protected $hidden = [
        'request_pms_id',
    ];

    protected $casts = [
        'change_index' => 'integer',
    ];

    public function request_pms()
    {
        return $this->belongsTo(RequestPms::class, 'id', 'request_pms_id');
    }
}
