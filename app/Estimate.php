<?php

namespace App;

use Bavix\Wallet\Interfaces\Customer;
use Bavix\Wallet\Interfaces\Product;
use Bavix\Wallet\Traits\HasWallet;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;

class Estimate extends Model implements Product
{
    use LogsActivity;
    use HasWallet;

    // Estimate Statuses
    const ESTIMATE_STATUS_PENDING = "pending"; // pending shop update
    const ESTIMATE_STATUS_REQUESTED = "requested"; // after shop estimate update
    const ESTIMATE_STATUS_CANCELLED = "cancelled"; // cancel estimate request
    const ESTIMATE_STATUS_ACCEPTED = "accepted"; // accept ang user then automatically declined lahat
    const ESTIMATE_STATUS_DECLINED = "declined"; // X ang user
    const ESTIMATE_STATUS_EXPIRED = "expired"; // time run out

    protected $fillable = [
        'request_id',
        'shop_id',
        'customer_id',
        'freebies',
        'notes',
        'status',
        'distance',
        'multiplier',
        'amount',
        'discount',
        'total',
        'preferred_date',
        'preferred_time',
    ];

    protected $hidden = [
        'request_id',
        'shop_id',
        'create_at',
        'updated_at',
    ];

    protected $casts = [
        'freebies' => 'array',
        'preferred_date' => 'date',
        'customer_id' => 'integer',
    ];

    protected static $logAttributes = [
        'status',
        'shop_id',
    ];

    public function canBuy(Customer $customer, int $quantity = 1, bool $force = null): bool
    {
        return true;
    }

    public function getAmountProduct(Customer $customer): int
    {
        return $this->total * 0.05;
    }

    public function getMetaProduct(): ?array
    {
        return [
            'estimate_id' => $this->id,
            'amount' => $this->total,
            'price' => $this->total * 0.05,
            'customer_id' => $this->customer_id,
            'shop_id' => $this->shop_id,
        ];
    }

    public function getUniqueId(): string
    {
        return (string) $this->id;
    }

    public function customer()
    {
        return $this->belongsTo(User::class, 'customer_id', 'id');
    }

    public function request()
    {
        return $this->belongsTo(UserRequest::class);
    }

    public function shop()
    {
        return $this->belongsTo(Shop::class, 'shop_id', 'id');
    }

    public function replacements()
    {
        return $this->hasMany(EstimatePmsReplacement::class);
    }
}
