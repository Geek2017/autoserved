<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;

class Upload extends Model
{
    use LogsActivity;

    protected $fillable = [
        'user_id',
        'filename',
        'type',
        'path',
        'size',
        'document_type',
    ];

    protected $hidden = [
        'created_at',
    ];

    protected static $logAttributes = [
        'user_id',
        'filename',
        'path',
        'document_type',
    ];

    public function getPathAttribute($value)
    {
        return asset($value);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id', 'user_id');
    }
}
