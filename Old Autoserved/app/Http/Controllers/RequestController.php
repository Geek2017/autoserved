<?php

namespace App\Http\Controllers;

use App\Events\RequestCreatedEvent;
use App\Http\Controllers\Utils\Constants;
use App\Http\Controllers\Utils\Utilities;
use App\Http\Requests\CreatePmsOtherServiceRequest;
use App\Notifications\RequestCreated;
use App\Notifications\SlackRequestCreated;
use App\Services\RequestService;
use App\Services\UserService;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;

class RequestController extends Controller
{
    protected $request_service;
    protected $user_service;

    public function __construct(RequestService $request_service, UserService $user_service)
    {
        $this->request_service = $request_service;
        $this->user_service = $user_service;
    }

    /**
     * =========================
     * |  CRUD - Preventive    |
     * =========================
     */
    public function show_preventive($id)
    {
        return $this->show(Constants::REQUEST_TYPE_PMS, $id);
    }

    // public function index_preventive()
    // {
    //     return $this->index(Constants::REQUEST_TYPE_PMS);
    // }

    public function cancel($id)
    {
        $response = ['success' => false];
        $user = Auth::user();

        if ($user['user_type'] === User::USER_TYPE_ADMIN || $user['user_type'] === User::USER_TYPE_CUSTOMER) {
            $request = $this->request_service->cancel($id);
            $response['success'] = true;
            $response['data'] = [
                'id' => $request['id'],
                'status' => $request['status'],
                'updated_at' => $request['updated_at'],
            ];
        } else {
            $response = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot update id=" . $id);
        }

        return response()->json($response);
    }

    // Shows all OPEN pms to shops
    public function shops_show_all_pms()
    {
        return $this->index(Constants::REQUEST_TYPE_PMS);
    }

    /**
     * =========================
     * |  CRUD - Corrective    |
     * =========================
     */
    public function show_corrective($id)
    {
        return $this->show(Constants::REQUEST_TYPE_SERVICES, $id);
    }

    /**
     * =========================
     * |    Public Methods     |
     * =========================
     */
    public function create(Request $httpRequest)
    {
        $response = ['success' => false];
        $user = Auth::user();

        if ($user['user_type'] === User::USER_TYPE_ADMIN || $user['user_type'] === User::USER_TYPE_CUSTOMER) {
            $request = $this->request_service->create_request($httpRequest);
            $users = $this->user_service->get_users_by_type(User::USER_TYPE_VENDOR);

            if (!is_null($request)) {
                $response['success'] = true;
                $response['data'] = $request;
                $notificationData = [
                    'user_type' => 'vendor',
                    'request' => $request,
                    'message' => 'A new service request has been created. Check it out!',
                    'icon' => 'assignment_return',
                    'href' => '/requests',
                ];
                Notification::send($users, new RequestCreated($notificationData));
                Notification::route('slack', env('SLACK_APP_WEBHOOK_URL'))
                    ->notify(new SlackRequestCreated($notificationData, $user));
                event(new RequestCreatedEvent($notificationData));
            } else {
                $response['error'] = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot create request job. Service returned null.");
            }
        } else {
            $response['error'] = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot create request job. User type is neither 'admin' nor 'customer'.");
        }

        return response()->json($response);
    }

    public function create_other_pms(CreatePmsOtherServiceRequest $httpRequest)
    {
        $response = ['success' => false];
        $user = Auth::user();

        if ($user['user_type'] === User::USER_TYPE_ADMIN || $user['user_type'] === User::USER_TYPE_CUSTOMER) {
            $request = $this->request_service->create_other_request($httpRequest);
            $users = $this->user_service->get_users_by_type(User::USER_TYPE_VENDOR);

            if (!is_null($request)) {
                $response['success'] = true;
                $response['data'] = $request;
                $notificationData = [
                    'user_type' => 'vendor',
                    'request' => $request,
                    'message' => 'A new service request has been created. Check it out!',
                    'icon' => 'assignment_return',
                    'href' => '/requests',
                ];
                Notification::send($users, new RequestCreated($notificationData));
                Notification::route('slack', env('SLACK_APP_WEBHOOK_URL'))
                    ->notify(new SlackRequestCreated($notificationData, $user));
                event(new RequestCreatedEvent($notificationData));
            } else {
                $response['error'] = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot create request job. Service returned null.");
            }
        } else {
            $response['error'] = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot create request job. User type is neither 'admin' nor 'customer'.");
        }

        return response()->json($response);
    }

    /**
     * =========================
     * |      CRUD METHODS     |
     * =========================
     */
    public function index()
    {
        $response = ['success' => false];
        $user = Auth::user();
        $requests = $this->request_service->get_requests();

        if (!is_null($requests)) {
            $response['success'] = true;
            $response['data'] = $requests;

            foreach ($requests as $req) {
                $req['expiry'] = date('Y-m-d H:i:s',
                    strtotime('+1 day', strtotime($req['created_at'])));
                $this->show_request_json($req);
                $req->estimates;
            }
        } else {
            $response = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot retrieve all requests with type=" . $type);
        }

        return response()->json($response);
    }

    private function show(string $type, $id)
    {
        $response = ['success' => false];
        $user = Auth::user();

        $request = $this->request_service->get($id, $type);

        // All admins and vendors have access to request. Customers only have access to their own requests.
        if (!is_null($request) && ($user['user_type'] === User::USER_TYPE_ADMIN || $user['user_type'] === User::USER_TYPE_VENDOR ||
            ($user['user_type'] === User::USER_TYPE_CUSTOMER && $user['id'] == $request->request->car->user->id))
        ) {
            $response['success'] = true;
            $response['data'] = $request;
            $this->show_request_json($request, $type);
        } else {
            $response = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot retrieve request job with id=" . $id . ", type=" . $type);
        }

        return response()->json($response);
    }

    /**
     * =========================
     * |    Helper METHODS     |
     * =========================
     */
    // explicitly prints out the nested JSON objects in model
    private function show_request_json($request)
    {
        $user = Auth::user();
        $request->car;
        $request->car->user;
        $request->car->car_make;
        $request->car->car_model;
        $request->car->car_trim;

        if ($request['type'] === Constants::REQUEST_TYPE_PMS) {
            $request->pms_request;
            $request->pms_request->pms;
            $request->pms_request->replacements;
        } else if ($request['type'] === Constants::REQUEST_TYPE_OTHER_SERVICES) {
            $request->pms_others_request;

            if ($user['user_type'] === User::USER_TYPE_VENDOR) {
                $request->pms_others_request->pms_others;
            }
        } else if ($request['type'] === Constants::REQUEST_TYPE_PMS) {
        }
    }
}
