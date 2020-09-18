<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MasterlistCarModel extends Model
{
    protected $fillable = [
        'make_id',
        'name',
        'type_id',
    ];

    public function make()
    {
        return $this->belongsTo(MasterlistCarMake::class, 'id', 'make_id');
    }
}
