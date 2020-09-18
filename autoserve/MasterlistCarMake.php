<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MasterlistCarMake extends Model
{
    protected $fillable = [
        'name',
        'type_id',
    ];
}
