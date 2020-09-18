<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EstimatePmsReplacement extends Model
{
    protected $fillable = [
        'request_pms_replacement_id',
        'estimate_id',
        'price',
        'notes',
        'liters'
    ];

    public function request()
    {
        return $this->hasOne(Request::class, 'id', 'request_pms_replacement_id');
    }

    public function estimate()
    {
        return $this->belongsTo(Estimate::class, 'estimate_id', 'id');
    }
}
