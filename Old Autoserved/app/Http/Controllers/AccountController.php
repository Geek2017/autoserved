<?php

namespace App\Http\Controllers;

use App\Services\ActivityService;
use Illuminate\Support\Facades\Auth;

class AccountController extends Controller
{
    protected $activity_service;

    public function __construct(ActivityService $activity_service)
    {
        $this->activity_service = $activity_service;
    }

    public function app_version()
    {
        // return response_success([
        //     'version' => env('APP_VERSION'),
        // ]);
        $response['success'] = true;
        $response['data'] = [
            'version' => env('APP_VERSION'),
        ];
        return response()->json($response);
    }

    public function index()
    {
        $response['success'] = true;
        $user = Auth::user();
        $response['data'] = $user;
        $user->full_name = $user->full_name;
        $user->fleet;

        if (isset($user->fleet)) {
            $user->fleet->fleet_key;
            $user->fleet->token;
        }

        return response()->json($response);
    }

    public function activity_logs()
    {
        $response['success'] = false;
        $user = Auth::user();
        $logs = $this->activity_service->get_by_user($user['id']);

        if (!is_null($logs)) {
            $response['success'] = true;
            $response['data'] = $logs;

            foreach ($logs as $log) {
                $log->subject;
            }
        }

        return response()->json($response);
    }

    public function notifications()
    {
        $response['success'] = true;
        $user = Auth::user();
        $response['data'] = $user->notifications()->paginate(5)->sortByDesc('created_at');
        return response()->json($response);
    }

    public function all_notifications()
    {
        $response['success'] = true;
        $user = Auth::user();
        $response['data'] = $user->notifications->sortByDesc('created_at');
        return response()->json($response);
    }

    public function mark_as_read_all_notifications()
    {
        $response['success'] = true;
        $user = Auth::user();

        foreach ($user->unreadNotifications as $notification) {
            $notification->markAsRead();
        }

        return response()->json($response);
    }

    public function wallet()
    {
        $response['success'] = true;
        $user = Auth::user();
        $response['data'] = $user->wallet;
        return response()->json($response);
    }

    public function transactions()
    {
        $response['success'] = true;
        $user = Auth::user();
        $response['data'] = $user->transactions()->orderBy('created_at', 'desc')->get();
        return response()->json($response);
    }
}
