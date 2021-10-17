<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;

class CarProfile extends Model
{
    use LogsActivity;
    use SoftDeletes;

    const TYPE_VEHICLE_COMPACT = 'compact/small sedan';
    const TYPE_VEHICLE_MEDIUM = 'medium sedan';
    const TYPE_VEHICLE_LARGE = 'large sedan/wagon';
    const TYPE_VEHICLE_SMALL = 'small SUV/AUV';
    const TYPE_VEHICLE_VAN = 'large SUV/pick-up/van';
    const TYPE_VEHICLE_COMMERCIAL = 'commercial';

    const TYPE_OIL_REGULAR = 'regular oil';
    const TYPE_OIL_SEMI = 'semi-synthetic oil';
    const TYPE_OIL_FULLY = 'fully synthetic oil';
    const TYPE_OIL_SHOP_RECOMMENDATION = 'shop recommendation';

    const TYPE_PART_OEM = 'OEM';
    const TYPE_PART_REPLACEMENT = 'replacement';
    const TYPE_PART_SHOP_RECOMMENDATION = 'shop recommendation';

    const TYPE_TRANSMISSION_AUTO = "AT";
    const TYPE_TRANSMISSION_MANUAL = "MT";

    const TYPE_ENGINE_DIESEL = "diesel";
    const TYPE_ENGINE_GASOLINE = "gasoline";

    protected $fillable = [
        'type',
        'make_id',
        'model_id',
        'trim_id',
        'car_year',
        'engine_type',
        'transmission',
        'color',
        'plate_number',
        'date_purchased',
        'current_mileage',
        'last_serviced',
        'longitude',
        'latitude',
        'user_id',
    ];

    protected static $logAttributes = [
        'type',
        'user_id',
        'make_id',
        'model_id',
        'car_year',
        'trim_id',
        'plate_number',
    ];

    protected $casts = [
        'id' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function car_make()
    {
        return $this->hasOne(MasterlistCarMake::class, 'id', 'make_id');
    }

    public function car_model()
    {
        return $this->hasOne(MasterlistCarModel::class, 'id', 'model_id');
    }

    public function car_trim()
    {
        return $this->hasOne(MasterlistCarTrim::class, 'id', 'trim_id');
    }

    public function schedules()
    {
        return $this->hasMany(CarSchedule::class, 'car_id', 'id');
    }

    public function requests()
    {
        return $this->hasMany(UserRequest::class, 'car_id', 'id');
    }
}
