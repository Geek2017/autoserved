<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Fleet extends Model
{
    use HasSlug;
    use LogsActivity;
    use SoftDeletes;

    protected $table = "fleet";

    protected $fillable = [
        'name',
        'type',
        'avatar_id',
        'banner_id',
        'contact',
        'description',
        'address',
        'longitude',
        'latitude',
        'tin',
        'fleet_admin',
        'fleet_key',
        'token',
    ];

    protected $hidden = [
        'created_at',
        'deleted_at',
    ];

    protected static $logAttributes = [
        'name',
    ];

    protected static $ignoreChangedAttributes = [
        'updated_at',
    ];

    protected static $submitEmptyLogs = false;

    public function getSlugOptions()
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id', 'fleet_id');
    }

    public function avatar()
    {
        return $this->hasOne(Upload::class, 'id', 'avatar_id');
    }

    public function banner()
    {
        return $this->hasOne(Upload::class, 'id', 'banner_id');
    }
}
