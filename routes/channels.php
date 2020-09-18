<?php
use App\User;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
 */

Broadcast::channel('service-requests.vendor', function ($user) {
    return $user->user_type === User::USER_TYPE_VENDOR;
});
