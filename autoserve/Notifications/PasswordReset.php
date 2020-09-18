<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use App\Mail\ForgotPassword;

class PasswordReset extends Notification implements ShouldQueue
{
    use Queueable;

    protected $user;
    protected $token;

    public function __construct($user, $token)
    {
        $this->user = $user;
        $this->token = $token;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new ForgotPassword($this->user, $this->token))
            ->to($this->user['email']);
    }

    public function toArray($notifiable)
    {
        return [];
    }
}
