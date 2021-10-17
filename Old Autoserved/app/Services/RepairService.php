<?php
namespace App\Services;

use App\Repair;

class RepairService
{
    public function get_repair_types()
    {
        return Repair::select('type')->groupBy('type')->orderBy('id')->get();
    }

    public function get_repair_names($name)
    {
        return Repair::where('type', $name)->orderBy('id')->get();
    }

    public function get_repair($id)
    {
        return Repair::find($id);
    }

    public function get_repair_id_by_name($repair_name)
    {
        return Repair::where('name', $repair_name)->first();
    }
}
