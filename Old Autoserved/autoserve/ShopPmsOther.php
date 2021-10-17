<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ShopPmsOther extends Model
{
    protected $fillable = [
        'masterlist_pms_others_id',
        'values',
        'user_id',
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
