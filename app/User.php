<?php

namespace App;

use Bavix\Wallet\Interfaces\Confirmable;
use Bavix\Wallet\Interfaces\Customer;
use Bavix\Wallet\Interfaces\Wallet;
use Bavix\Wallet\Traits\CanConfirm;
use Bavix\Wallet\Traits\CanPay;
use Cmgmyr\Messenger\Traits\Messagable;
use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Spatie\Activitylog\Traits\CausesActivity;
use Spatie\Activitylog\Traits\LogsActivity;

class User extends Authenticatable implements Wallet, Customer, Confirmable, MustVerifyEmail, CanResetPassword
{
    use CanConfirm;
    use CausesActivity;
    use HasApiTokens;
    use CanPay;
    use LogsActivity;
    use Messagable;
    use Notifiable;
    use SoftDeletes;

    const USER_TYPE_ADMIN = "admin";
    const USER_TYPE_CUSTOMER = "customer";
    const USER_TYPE_VENDOR = "vendor";
    const USER_TYPE_FLEET_ADMIN = "fleet_admin";

    protected $fillable = [
        'fname',
        'lname',
        'email',
        'password',
        'mobile',
        'image',
        'provider',
        'provider_id',
        'country',
        'user_type',
        'verification_token',
        'social',
        'email_verified_at',
        'fleet_id',
        'first_time_login',
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'created_at',
        'updated_at',
        'verification_token',
    ];

    protected $casts = [
        'id' => 'integer',
        'email_verified_at' => 'datetime',
        'first_time_login' => 'boolean',
    ];

    protected static $logAttributes = [
        'fname',
        'lname',
        'email',
        'user_type',
    ];

    public function getFullNameAttribute()
    {
        return ucwords("{$this->fname} {$this->lname}");
    }

    public function fleet()
    {
        return $this->hasOne(Fleet::class, 'fleet_admin', 'id');
    }

    public function shops()
    {
        return $this->hasMany(Shop::class);
    }

    public function cars()
    {
        return $this->hasMany(CarProfile::class);
    }

    public function routeNotificationForSlack($notification)
    {
        return env('SLACK_APP_WEBHOOK_URL');
    }
}
