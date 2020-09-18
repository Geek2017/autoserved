<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use App\Order;

class Payment extends Model
{
    use LogsActivity;

    const STATUS_PENDING = 'pending';
    const STATUS_PAID = 'paid';
    const STATUS_DECLINED = 'declined';
    const STATUS_CANCELLED = 'cancelled';

    protected $fillable = [
        'status',
        'order_id',
        'amount',
    ];

    protected static $logAttributes = [
        'status',
        'amount',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
