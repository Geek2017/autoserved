<?php

namespace App\Services;

use App\MasterlistPmsOthers;

class MasterlistPmsOthersService
{
    public function list_all()
    {
        return MasterlistPmsOthers::all();
    }

    public function get_by_type($type)
    {
        return MasterlistPmsOthers::where('type', $type)->first();
    }
}
