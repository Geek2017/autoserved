<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MasterlistCarTrim extends Model
{
    protected $fillable = [
        'series_id',
        'model_id',
        'name',
        'year_start',
        'year_end',
        'type_id',
    ];

    public function series()
    {
        return $this->belongsTo(MasterlistCarSeries::class, 'id', 'series_id');
    }

    public function model()
    {
        return $this->belongsTo(MasterlistCarModel::class, 'id', 'model_id');
    }
}
