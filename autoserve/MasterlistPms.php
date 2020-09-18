<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MasterlistPms extends Model
{
    protected $fillable = [
        'mileage',
        'check_items',
        'clean_items',
        'change_items',
    ];

    protected $casts = [
        'mileage' => 'integer',
        'check_items' => 'array',
        'clean_items' => 'array',
        'change_items' => 'array',
    ];
}
