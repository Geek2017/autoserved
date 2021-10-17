<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MasterlistCarGeneration extends Model
{
    protected $fillable = [
        'model_id',
        'name',
        'year_start',
        'year_end',
        'type_id',
    ];

    public function model()
    {
        return $this->belongsTo(MasterlistCarModel::class, 'id', 'model_id');
    }
}
