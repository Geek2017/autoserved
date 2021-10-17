<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;

class Appointment extends Model
{
    const APPOINTMENT_STATUS_CANCELLED = "cancelled";
    const APPOINTMENT_STATUS_PENDING = "pending";
    const APPOINTMENT_STATUS_APPROVED = "approved";
    const APPOINTMENT_STATUS_STARTED = "started";
    const APPOINTMENT_STATUS_COMPLETED = "completed";

    use LogsActivity;

    protected $fillable = [
        'estimate_id',
        'scheduled_date',
        'scheduled_time',
        'end_date',
        'notes',
        'status',
        'car_id',
    ];

    protected $hidden = [
        'estimate_id',
        'create_at',
        'updated_at',
    ];

    protected $casts = [
        'scheduled_date' => 'date',
        'end_date' => 'datetime',
        'car_id' => 'integer',
    ];

    protected static $logAttributes = [
        'notes',
        'status',
        'estimate_id',
    ];

    public function estimate()
    {
        return $this->hasOne(Estimate::class, 'id', 'estimate_id');
    }

    public function car()
    {
        return $this->belongsTo(CarProfile::class, 'id', 'car_id');
    }

    public function customer_rating()
    {
        return $this->hasOne(CustomerRating::class, 'appointment_id', 'id');
    }

    public function shop_rating()
    {
        return $this->hasOne(ShopRating::class, 'appointment_id', 'id');
    }
}
