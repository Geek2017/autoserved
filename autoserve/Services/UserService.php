<?php

namespace App\Services;

use App\Http\Controllers\Utils\Utilities;
use App\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UserService
{
    public function create_user(FormRequest $request, $type = User::USER_TYPE_ADMIN)
    {
        $result = null;
        $user = User::create([
            'fname' => $request->fname,
            'lname' => $request->lname,
            'email' => $request->email,
            'mobile' => $request->contact,
            'password' => Utilities::hash_data($request->password),
            'country' => $request->country,
            'user_type' => $type,
            'verification_token' => Utilities::random_string(),
            'fleet_id' => $request->fleet_id,
        ]);
        $api_token = $user->createToken('AutoServed API Access')->accessToken;

        if (!is_null($user)) {
            $result = [
                'id' => $user->id,
                'fname' => $request->fname,
                'lname' => $request->lname,
                'email' => $request->email,
                'api_token' => $api_token,
                'user_type' => $type,
                'verification_token' => $user->verification_token,
                'fleet_id' => $user->fleet_id,
            ];
        }

        return $result;
    }

    public function update_first_time_login()
    {
        $user = Auth::user();
        $user->first_time_login = false;
        $user->save();
    }

    public function update_admin_with_fleet_id($user_id, $fleet_id)
    {
        $user = $this->get_user($user_id);

        if (!is_null($user)) {
            $user->fleet_id = $fleet_id;
            $user->save();
        }

        return !is_null($user->fleet_id);
    }

    public function get_user($id)
    {
        return User::find($id);
    }

    public function get_users()
    {
        return User::withTrashed()->get();
    }

    public function get_users_by_type($type)
    {
        return User::where(['user_type' => $type])->get();
    }

    public function get_fleet_users($fleet_id)
    {
        return User::where(['fleet_id' => $fleet_id])->withTrashed()->get();
    }

    public function get_user_by_email($email)
    {
        return User::where('email', $email)->first();
    }

    public function reset_password(User $user, $newPassword)
    {
        $user->update([
            'password' => Utilities::hash_data($newPassword),
        ]);
    }

    public function verify_email($id, $token)
    {
        $user = User::find($id);

        if ($token === $user->verification_token) {
            $user->email_verified_at = now();
            $user->save();
        }

        return $user;
    }
}
