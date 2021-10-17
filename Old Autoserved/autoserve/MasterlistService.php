<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MasterlistService extends Model
{
    protected $fillable = [
        'type',
        'name',
        'details',
    ];
}
