<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MasterlistPmsOthers extends Model
{
    protected $fillable = [
        'name',
        'type',
        'details',
        'items',
    ];

    protected $casts = [
        'items' => 'array',
    ];
}
