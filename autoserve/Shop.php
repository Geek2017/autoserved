<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Shop extends Model
{
    use HasSlug;
    use LogsActivity;
    use SoftDeletes;

    const SHOP_TYPE_ACCESSORY_SHOP = 'accessory shop';
    const SHOP_TYPE_AUTO_AIRCON_REPAIR = 'auto aircon repair';
    const SHOP_TYPE_AUTO_DETAILING = 'auto detailing';
    const SHOP_TYPE_AUTO_PARTS = 'auto parts';
    const SHOP_TYPE_AUTO_REPAIR = 'auto repair';
    const SHOP_TYPE_AUTO_ELECTRICAL = 'auto-electrical';
    const SHOP_TYPE_BATTERY_SHOP = 'battery shop';
    const SHOP_TYPE_CAR_PAINT = 'car paint';
    const SHOP_TYPE_CAR_WASH = 'car wash';
    const SHOP_TYPE_CAR_WRAP = 'car wrap';
    const SHOP_TYPE_DEALER_SERVICE_CENTER = 'dealer service center';
    const SHOP_TYPE_EMISSION_CENTER = 'emission center';
    const SHOP_TYPE_GAS_STATION = 'gas station';
    const SHOP_TYPE_GLASS_REPAIR = 'glass repair';
    const SHOP_TYPE_SERVICE_CENTER = 'service center';
    const SHOP_TYPE_TINT_SHOP = 'tint shop';
    const SHOP_TYPE_TIRE_SHOP = 'tire shop';
    const SHOP_TYPE_TOWING_SERVICE = 'towing service';
    const SHOP_TYPE_UPHOLSTERY = 'upholstery';
    const SHOP_TYPE_VULCANIZING_SHOP = 'vulcanizing shop';

    protected $fillable = [
        'name',
        'type',
        'avatar_id',
        'banner_id',
        'contact',
        'description',
        'address',
        'city',
        'zip',
        'longitude',
        'latitude',
        'operations',
        'features',
        'amenities',
        'payment_method',
        'status',
        'completion',
        'level',
        'user_id',
        'pms_enabled',
    ];

    protected $hidden = [
        'created_at',
        'deleted_at',
    ];

    protected $casts = [
        'operations' => 'array',
        'amenities' => 'array',
        'features' => 'array',
        'payment_method' => 'array',
        'pms_enabled' => 'boolean',
        'avatar_id' => 'integer',
        'banner_id' => 'integer',
        'user_id' => 'integer',
    ];

    protected static $logAttributes = [
        'name',
        'status',
    ];

    protected static $ignoreChangedAttributes = [
        'pms_enabled',
        'updated_at',
    ];

    protected static $submitEmptyLogs = false;

    public function getSlugOptions()
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function avatar()
    {
        return $this->hasOne(Upload::class, 'id', 'avatar_id');
    }

    public function banner()
    {
        return $this->hasOne(Upload::class, 'id', 'banner_id');
    }

    public function application()
    {
        return $this->hasOne(Application::class);
    }
}
