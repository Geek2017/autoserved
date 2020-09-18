<?php

namespace App\Jobs;

use App\Notifications\UserRegistration;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Notification;

class SendRegistrationEmailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected $user;
    protected $password;

    public function __construct($user, $password = null)
    {
        $this->user = $user;
        $this->password = $password;
    }

    public function handle()
    {
        Notification::route('mail', $this->user['email'])
            ->route('slack', env('SLACK_APP_WEBHOOK_URL'))
            ->notify(new UserRegistration($this->user, $this->password));
    }
}
