<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CustomerRating extends Model
{
    protected $fillable = [
        'uuid',
        'appointment_id',
        'for_shop_id',
        'customer_id',
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
        return $this->belongsTo(Shop::class, 'id', 'for_shop_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id', 'customer_id');
    }
}
