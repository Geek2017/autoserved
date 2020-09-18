<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    protected $user_service;

    public function __construct(UserService $user_service)
    {
        $this->user_service = $user_service;
    }

    public function login(Request $request)
    {
        $response = ['success' => false];

        if (Auth::attempt([
            'email' => $request->email,
            'password' => $request->password,
        ])) {
            $user = Auth::user();
            $first_time_login = $user->first_time_login;

            if ($first_time_login) {
                $this->user_service->update_first_time_login();
            }

            if (is_null($user->email_verified_at)) {
                $user = $this->user_service->verify_email($user->id, $request->token);
            }

            $response['success'] = true;
            $response['data'] = [
                'id' => $user->id,
                'fname' => $user->fname,
                'lname' => $user->lname,
                'email' => $user->email,
                'api_token' => $user->createToken(env('APP_ACCESS_TOKEN_NAME'))->accessToken,
                'user_type' => $user->user_type,
                'avatar' => $user->image,
                'email_verified' => $user->email_verified_at !== null,
                'first_time_login' => $first_time_login,
            ];
        } else {
            $response['error'] = [];
            $error = [
                'message' => "Invalid email or password.",
            ];
            array_push($response['error'], $error);
        }

        return response()->json($response);
    }
}
