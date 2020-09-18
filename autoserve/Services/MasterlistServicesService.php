<?php

namespace App\Services;

use App\MasterlistService;

class MasterlistServicesService
{
    public function list_types()
    {
        return MasterlistService::select('type')->groupBy('type')->orderBy('id')->get();
    }

    public function list_services($type)
    {
        return MasterlistService::where('type', $type)->orderBy('id')->get();
    }
}
