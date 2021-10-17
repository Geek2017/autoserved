<?php

namespace App\Http\Controllers;

use App\Http\Controllers\DistanceMultiplierController;
use App\Http\Controllers\Utils\Constants;
use App\Http\Controllers\Utils\Utilities;
use App\Http\Requests\ResendVerificationRequest;
use App\Notifications\UserRegistration;
use App\Request as AppRequest;
use App\Services\UserService;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;

class UserController extends Controller
{

    protected $user_service;

    public function __construct(UserService $user_service)
    {
        $this->user_service = $user_service;
    }

    public function index()
    {
        $response = ['success' => false];
        $httpCode = 401;
        $user = Auth::user();

        if ($user['user_type'] === User::USER_TYPE_ADMIN) {
            $response['success'] = true;
            $httpCode = 200;
            $response['data'] = $this->user_service->get_users();
        } else if ($user['user_type'] === User::USER_TYPE_FLEET_ADMIN) {
            $response['success'] = true;
            $httpCode = 200;
            $response['data'] = $this->user_service->get_fleet_users($user->fleet->id);
        } else {
            $response['error'] = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 401, "Unauthorized access.");
        }

        return response()->json($response, $httpCode);
    }

    public function resend_verification(ResendVerificationRequest $request)
    {
        $response = ['success' => false];
        $httpCode = 401;
        $account = Auth::user();

        if ($account['user_type'] === User::USER_TYPE_ADMIN) {
            $user = $this->user_service->get_user_by_email($request['email']);
            Notification::route('mail', $user['email'])
                ->route('slack', env('SLACK_APP_WEBHOOK_URL'))
                ->notify(new UserRegistration($user, null));
            $response['success'] = true;
            $httpCode = 200;
        } else {
            $response['error'] = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 401, "Unauthorized access.");
        }

        return response()->json($response, $httpCode);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'description' => 'required',
        ]);

        $user = User::create([
            'name' => $validatedData['name'],
            'description' => $validatedData['description'],
        ]);

        return response()->json('User created!');
    }

    public function show($id)
    {
        $user = User::find($id);

        return $user->toJson();
    }

    public function get_user($email)
    {
        $user = DB::table('users')->where('email', $email)->first();
        return $user;
    }

    public function get_user_by_id($id)
    {
        $user = DB::table('users')->where('id', $id)->first();
        return $user;
    }

    public function generate_pms_schedule($id, $car_id)
    {
        $user = get_user_by_id($id);

        // computation
        send_estimate_request($id, $user->car);
    }

    public function create_estimate_request(Request $request)
    {
        return response()->json($this->send_estimate($request['user_id'],
            $request['car_id'],
            $request['sched_id'],
            $request['user_coordinates'],
            $request['services_required'],
            $request['radius']));
    }

    // User coordinates: 15.4240623,120.9390987

    // For estimation
    public function send_estimate($user_id, $car_id, $sched_id, $user_coordinates, $services_required, $radius)
    {
        $shopsWithinRadius = app(ShopController::class)->get_shops_within_radius($user_coordinates,
            $services_required, $radius);

        // get difference between farthest and nearest match
        $distanceDifference = app(DistanceMultiplierController::class)->get_distance_difference($shopsWithinRadius,
            $user_coordinates);

        // notification
        $shopsMultiplier = array(); // [[shop object, multiplier]]
        foreach ($shopsWithinRadius as $shop) {
            $distance = Utilities::get_distance($shop['coordinates'], $user_coordinates);
            $multiplier = app(DistanceMultiplierController::class)->get_multiplier($distance, $distanceDifference);

            $temp = array();
            array_push($temp, $shop);
            array_push($temp, $multiplier);
            array_push($shopsMultiplier, $temp);

            // event($shop, $multiplier);
        }

        $request = AppRequest::create([
            'status' => Constants::ESTIMATE_STATUS_PENDING,
            'schedule_id' => $sched_id,
            'car_id' => $car_id,
            'user_id' => $user_id,
        ]);

        return $shopsMultiplier;
    }

}
