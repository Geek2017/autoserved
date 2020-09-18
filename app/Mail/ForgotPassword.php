<?php

namespace App\Mail;

use App\Http\Controllers\Utils\Constants;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ForgotPassword extends Mailable
{
    use Queueable, SerializesModels;

    public $fname;
    public $email;
    public $token;

    public function __construct($user, $token)
    {
        $this->fname = $user['fname'];
        $this->email = $user['email'];
        $this->token = $token;
    }

    public function build()
    {
        return $this->subject(Constants::EMAIL_FORGOT_PASSWORD)->view('emails.forgot');
    }
}
