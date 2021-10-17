<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ShopCorrectiveService extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'uuid',
        'user_id',
        'min_price',
        'max_price',
        'masterlist_service_id',
        'description',
        'require_documents',
    ];

    protected $hidden = [
        'id',
        'user_id',
        'masterlist_service_id',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $casts = [
        'user_id' => 'integer',
        'masterlist_service_id' => 'integer',
        'require_documents' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function corrective_service()
    {
        return $this->hasOne(MasterlistService::class, 'id', 'masterlist_service_id');
    }
}
