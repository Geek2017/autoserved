<?php

namespace App;

use App\CarProfile;
use App\MasterlistPms;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;

class CarSchedule extends Model
{
    use LogsActivity;

    protected $fillable = [
        'schedule',
        'masterlist_pms_id',
        'car_id',
    ];

    protected $hidden = [
        'masterlist_pms_id',
        'car_id',
        'created_at',
        'updated_at',
    ];

    protected static $logAttributes = [
        'schedule',
        'car_id',
    ];

    public function car()
    {
        return $this->hasOne(CarProfile::class, 'id', 'car_id');
    }

    public function pms()
    {
        return $this->hasOne(MasterlistPms::class, 'id', 'masterlist_pms_id');
    }
}
