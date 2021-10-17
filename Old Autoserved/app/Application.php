<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;

class Application extends Model
{
    use LogsActivity;

    const APPLICATION_TYPE_BIZ_REG = "biz_reg";
    const APPLICATION_TYPE_PERMIT = "permit";
    const APPLICATION_TYPE_BIR_CERT = "bir_cert";
    const APPLICATION_TYPE_LIFTERS = "lifters";
    const APPLICATION_TYPE_MERCH_CERT = "merch_cert";
    const APPLICATION_TYPE_SPECIAL_TOOLS = "special_tools";

    protected $fillable = [
        'biz_reg',
        'verified_biz_reg',
        'permit',
        'verified_permit',
        'bir_cert',
        'verified_bir_cert',
        'lifters',
        'verified_lifters',
        'merch_cert',
        'verified_merch_cert',
        'special_tools',
        'verified_special_tools',
        'shop_id',
    ];

    protected $hidden = [
        'biz_reg',
        'permit',
        'bir_cert',
        'shop_id',
    ];

    protected $casts = [
        'merch_cert' => 'array',
        'special_tools' => 'array',
        'verified_biz_reg' => 'integer',
        'verified_permit' => 'integer',
        'verified_bir_cert' => 'integer',
        'verified_lifters' => 'integer',
        'verified_merch_cert' => 'integer',
        'verified_special_tools' => 'integer',

    ];

    protected static $logAttributes = [
        'biz_reg',
        'permit',
        'bir_cert',
        'shop_id',
    ];

    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }

    public function registration()
    {
        return $this->hasOne(Upload::class, 'id', 'biz_reg');
    }

    public function business_permit()
    {
        return $this->hasOne(Upload::class, 'id', 'permit');
    }

    public function bir()
    {
        return $this->hasOne(Upload::class, 'id', 'bir_cert');
    }
}
