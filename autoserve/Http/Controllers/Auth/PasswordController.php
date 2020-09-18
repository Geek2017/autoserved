<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Utils\Utilities;
use App\Http\Requests\PasswordChangeRequest;
use App\Http\Requests\PasswordResetRequest;
use App\Jobs\SendPasswordResetEmailJob;
use App\Services\UserService;
use Carbon\Carbon;
use Illuminate\Auth\Passwords\PasswordBroker;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class PasswordController extends Controller
{
    use SendsPasswordResetEmails;

    protected $user_service;

    public function __construct(UserService $user_service)
    {
        $this->user_service = $user_service;
    }

    public function forgot(Request $request)
    {
        $response = ['success' => true];
        $user = $this->user_service->get_user_by_email($request->email);

        if (!is_null($user)) {
            $token = app(PasswordBroker::class)->createToken($user);
            $response['data'] = [
                'email' => $request->email,
            ];
            $job = (new SendPasswordResetEmailJob($user, $token))
                ->delay(Carbon::now()->addSeconds(5));
            dispatch($job);
        }

        return response()->json($response);
    }

    public function change(PasswordChangeRequest $request)
    {
        $response = ['success' => false];
        $user = Auth::user();

        if (!is_null($user)) {
            if (Hash::check($request->old_password, $user->password)) {
                $this->user_service->reset_password($user, $request->new_password);
                $response['success'] = true;
            } else {
                $response['error'] = Utilities::error("Couldn't update password. Current password isn't correct.", 0, "Failed to update password");
            }
        } else {
            $response['error'] = Utilities::error("Failed to find user", 0, "Unauthorized access");
        }

        return response()->json($response);
    }

    public function reset(PasswordResetRequest $request)
    {
        $response = ['success' => false];
        $user = $this->user_service->get_user_by_email($request->email);

        if (!is_null($user)) {
            $passwordBroker = app(PasswordBroker::class);
            $tokenExists = $passwordBroker->tokenExists($user, $request->token);

            if ($tokenExists) {
                $response['success'] = true;
                $this->user_service->reset_password($user, $request->password);
                $passwordBroker->deleteToken($user);
                $response['data'] = [
                    'email' => $user->email,
                ];
            } else {
                $response['error'] = Utilities::error("Failed to update password", 0, "Either token or e-mail does not exists");
            }
        } else {
            $response['error'] = Utilities::error("Failed to find user", 0, "User with this email does not exist");
        }

        return response()->json($response);
    }
}
