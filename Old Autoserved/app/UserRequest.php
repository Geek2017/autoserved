<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;

class UserRequest extends Model
{
    use LogsActivity;

    const SCHEDULE_TIME_AM = 'AM';
    const SCHEDULE_TIME_PM = 'PM';
    const SCHEDULE_TIME_ANYTIME = 'anytime';

    const STATUS_OPEN = 'open';
    const STATUS_CANCELLED = 'cancelled';
    const STATUS_ACCEPTED = 'accepted';
    const STATUS_EXPIRED = 'expired';

    const REQUEST_TYPE_CORRECTIVE = 'corrective';
    const REQUEST_TYPE_PREVENTIVE = 'preventive';

    protected $table = 'requests';

    protected $fillable = [
        'car_id',
        'preferred_schedule',
        'type',
        'longitude',
        'latitude',
        'status',
        'current_mileage',
    ];

    protected $hidden = [
        'create_at',
        'updated_at',
    ];

    protected $casts = [
        'car_id' => 'integer',
        'preferred_schedule' => 'array',
    ];

    protected static $logAttributes = [
        'type',
        'status',
    ];

    public function car()
    {
        return $this->hasOne(CarProfile::class, 'id', 'car_id')->withTrashed();
    }

    public function pms_request()
    {
        return $this->hasOne(RequestPms::class, 'request_id', 'id');
    }

    public function pms_others_request()
    {
        return $this->hasOne(RequestPmsOther::class, 'request_id', 'id');
    }

    public function estimates()
    {
        return $this->hasMany(Estimate::class, 'request_id', 'id');
    }
}
