<?php

namespace App\Services;

use App\MasterlistPms;

class MasterlistPmsService
{
    public function list_all()
    {
        return MasterlistPms::all();
    }

    public function get_by_mileage($mileage)
    {
        return MasterlistPms::where('mileage', $mileage)->first();
    }
}
