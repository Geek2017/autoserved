<?php

namespace App\Services;

use App\MasterlistCarMake;
use App\MasterlistCarModel;
use App\MasterlistCarTrim;

class MasterlistCarService
{
    public function list_car_makes()
    {
        return MasterlistCarMake::orderBy('name', 'asc')->get();
    }

    public function list_car_models($make_id)
    {
        return MasterlistCarModel::where('make_id', $make_id)->orderBy('name', 'asc')->get();
    }

    public function list_car_years($model_id)
    {
        $years = [];
        $filtered_trims = MasterlistCarTrim::where([['model_id', '=', $model_id], ['year_start', '>', 0]])->get();

        if ($filtered_trims->count() > 0) {
            $min_year = $filtered_trims->min('year_start');
            $max_year = date('Y');
            $has_null_year_end = $filtered_trims->where('year_end', null, true)->count() > 0;

            if (!$has_null_year_end) {
                $max_year = $filtered_trims->max('year_end');
            }

            if (!is_null($min_year) && !is_null($max_year) && $max_year >= $min_year) {
                $years = range($min_year, $max_year);
                rsort($years);
            }
        }

        return $years;
    }

    public function list_car_trims($model_id, $year)
    {
        $trims = [];

        $filtered_trims = MasterlistCarTrim::where([['model_id', '=', $model_id],
            ['year_start', '>', 0],
            ['year_start', '<=', $year]])->get();

        if ($filtered_trims->count() > 0) {

            foreach ($filtered_trims as $trim) {
                if ($trim->year_end > 0) {
                    if ($trim->year_end >= $year) {
                        array_push($trims, $trim);
                    }
                } else {
                    array_push($trims, $trim);
                }
            }
        }

        return $trims;
    }
}
