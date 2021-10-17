<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MasterlistCarSeries extends Model
{
    protected $fillable = [
        'model_id',
        'gen_id',
        'name',
        'type_id',
    ];

    public function model()
    {
        return $this->belongsTo(MasterlistCarModel::class, 'id', 'model_id');
    }

    public function generation()
    {
        return $this->belongsTo(MasterlistCarGeneration::class, 'id', 'gen_id');
    }
}
