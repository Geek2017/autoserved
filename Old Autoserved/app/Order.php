<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use LogsActivity;

    const TYPE_PURCHASE = 'purchase'; //top-up
    const TYPE_TRANSACTION = 'transaction'; //customer payment
    const TYPE_REFUND = 'refund';
    const TYPE_WITHDRAWAL = 'withdrawal';

    protected $fillable = [
        'type',
        'details',
        'user_id',
        'amount',
    ];

    protected static $logAttributes = [
        'type',
        'details',
        'amount',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
