<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EstimatePmsOther extends Model
{
    protected $fillable = [
        'request_pms_others_id',
        'estimate_id',
        'notes',
        'liters',
        'other_items',
        'other_replacement_items',
    ];

    protected $casts = [
        'other_items' => 'array',
        'other_replacement_items' => 'array',
    ];

    public function estimate()
    {
        return $this->belongsTo(Estimate::class, 'estimate_id', 'id');
    }

    public function pms_others()
    {
        return $this->hasOne(RequestPmsOther::class, 'id', 'request_pms_others_id');
    }
}
