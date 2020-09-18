<?php

namespace App\Services;

use Spatie\Activitylog\Models\Activity;

class ActivityService
{
    public function get_by_user($user_id)
    {
        return Activity::where('causer_id', $user_id)->orderBy('id', 'desc')->get();
    }
}
