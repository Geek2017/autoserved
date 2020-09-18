<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\SlackMessage;
use Illuminate\Notifications\Notification;

class SlackRequestCreated extends Notification implements ShouldQueue
{
    use Queueable;

    protected $data;
    protected $user;

    public function __construct($data, $user)
    {
        $this->data = $data;
        $this->user = $user;
    }

    public function via($notifiable)
    {
        return ['slack'];
    }

    public function toSlack($notifiable)
    {
        return (new SlackMessage)
            ->error()
            ->content('Whoops! Something went wrong.')
            ->success()
            ->content('New Service Request')
            ->attachment(function ($attachment) {
                $attachment->title(
                    "Request #" . $this->data['request']['id'])
                    ->fields([
                        'User' => ucwords($this->user['fname'] . ' ' . $this->user['lname']),
                        'Email' => $this->user['email'],
                        'Type' => ucwords($this->data['request']['type']),
                        'Date' => $this->data['request']['created_at'],
                    ]);
            });
    }

    public function toArray($notifiable)
    {
        return $this->data;
    }
}
