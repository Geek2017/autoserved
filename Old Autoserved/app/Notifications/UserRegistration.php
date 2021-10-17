<?php

namespace App\Notifications;

use App\Mail\Registration;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\SlackMessage;
use Illuminate\Notifications\Notification;

class UserRegistration extends Notification implements ShouldQueue
{
    use Queueable;

    protected $user;
    protected $password;

    public function __construct($user, $password)
    {
        $this->user = $user;
        $this->password = $password;
    }

    public function via($notifiable)
    {
        return ['mail', 'slack'];
    }

    public function toMail($notifiable)
    {
        return (new Registration($this->user, $this->password))
            ->to($this->user['email']);
    }

    public function toSlack($notifiable)
    {
        return (new SlackMessage)
            ->error()
            ->content('Whoops! Something went wrong.')
            ->success()
            ->content('A new user has joined AutoServed!')
            ->attachment(function ($attachment) {
                $attachment->title(
                    ucwords($this->user['fname'] . ' ' . $this->user['lname']))
                    ->fields([
                        'Email' => $this->user['email'],
                        'Type' => ucwords($this->user['user_type']),
                    ]);
            });
    }

    public function toArray($notifiable)
    {
        return [
            'name' => ucwords($this->user->fname . ' ' . $this->user->lname),
            'email' => $this->user->email,
            'type' => ucwords($this->user->user_type),
        ];
    }
}
