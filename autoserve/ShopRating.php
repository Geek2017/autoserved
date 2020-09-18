<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ShopRating extends Model
{
    protected $fillable = [
        'uuid',
        'appointment_id',
        'shop_id',
        'for_customer_id',
        'rating',
        'description',
        'additional_work_items',
    ];

    protected $hidden = [
        'updated_at',
    ];

    protected $casts = [
        'additional_work_items' => 'array',
    ];

    public function appointment()
    {
        return $this->belongsTo(Appointment::class, 'id', 'appointment_id');
    }

    public function shop()
    {
        return $this->belongsTo(Shop::class, 'id', 'shop_id');
    }

    public function customer()
    {
        return $this->belongsTo(User::class, 'id', 'for_customer_id');
    }
}
