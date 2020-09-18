<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ShopPmsOil extends Model
{
    protected $fillable = [
        'user_id',
        'mileage',
        'oil_type',
        'price',
        'notes',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id', 'user_id');
    }
}
