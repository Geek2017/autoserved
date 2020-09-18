<?php

namespace App\Mail;

use App\Http\Controllers\Utils\Constants;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class Registration extends Mailable
{
    use Queueable, SerializesModels;

    public $password = null;
    public $fname;
    public $email;
    public $token;

    public function __construct($user, $password)
    {
        $this->fname = $user['fname'];
        $this->email = $user['email'];
        $this->token = $user['verification_token'];

        if (!is_null($password)) {
            $this->password = $password;
        }
    }

    public function build()
    {
        return $this->subject(Constants::EMAIL_REGISTRATION)->view('emails.registration');
    }
}
