<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ShopPmsOtherLabor extends Model
{
    protected $fillable = [
        'user_id',
        'masterlist_pms_others_id',
        'car_type',
        'price',
        'notes',
    ];

    protected $casts = [
        'masterlist_pms_others_id' => 'integer',
        'values' => 'array',
        'user_id' => 'integer',
    ];

    public function pms_others()
    {
        return $this->hasOne(MasterlistPmsOthers::class, 'id', 'masterlist_pms_others_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id', 'user_id');
    }
}
