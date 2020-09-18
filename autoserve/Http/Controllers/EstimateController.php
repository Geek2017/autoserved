<?php

namespace App\Http\Controllers;

use App\Estimate;
use App\Events\EstimateCancelledEvent;
use App\Events\EstimateSentEvent;
use App\Http\Controllers\Utils\Constants;
use App\Http\Controllers\Utils\Utilities;
use App\Notifications\EstimateCancelled;
use App\Notifications\EstimateSent;
use App\Services\EstimateService;
use App\Services\RequestService;
use App\Services\ShopService;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;

class EstimateController extends Controller
{
    protected $estimate_service;
    protected $shop_service;
    protected $request_service;

    public function __construct(EstimateService $estimate_service,
        ShopService $shop_service,
        RequestService $request_service) {
        $this->estimate_service = $estimate_service;
        $this->shop_service = $shop_service;
        $this->request_service = $request_service;
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
        $estimates = $this->estimate_service->get_estimates($user);

        if (!is_null($estimates)) {
            $response['success'] = true;
            $response['data'] = $estimates;

            foreach ($estimates as $est) {
                $est['distance'] = Utilities::get_distance([
                    'latitude' => $est->request['latitude'],
                    'longitude' => $est->request['longitude'],
                ], [
                    'latitude' => $est->shop['latitude'],
                    'longitude' => $est->shop['longitude'],
                ]);
                $this->show_request_json($est);
            }
        } else {
            $response = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot retrieve all Estimates.");
        }

        return response()->json($response);
    }

    public function show($id)
    {
        $response = ['success' => false];
        $user = Auth::user();

        $estimate = $this->estimate_service->get($id);

        if (!is_null($estimate) && (
            $user['user_type'] === User::USER_TYPE_ADMIN ||
            ($user['user_type'] === User::USER_TYPE_VENDOR && $estimate->shop->user->id == $user->id) ||
            ($user['user_type'] === User::USER_TYPE_CUSTOMER && $estimate->customer_id == $user->id))
        ) {
            $response['success'] = true;
            $response['data'] = $estimate;
            $this->show_request_json($estimate);
        } else {
            $response = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot retrieve Estimate with id=" . $id);
        }

        return response()->json($response);
    }

    public function create(Request $request)
    {
        $response = ['success' => false];
        $user = Auth::user();

        if ($user['user_type'] === User::USER_TYPE_ADMIN || $user['user_type'] === User::USER_TYPE_VENDOR) {
            $service_request = $this->request_service->get_by_id($request['request_id']);
            $shop = $this->shop_service->get($request['shop_id']);
            $estimate = $this->estimate_service->create_estimate($request, $user['id']);

            if (!is_null($estimate)) {
                $response['success'] = true;
                $response['data'] = $estimate;
                $this->show_request_json($estimate);
                $notificationData = [
                    'id' => $service_request->car->user->id,
                    'estimate' => $estimate,
                    'message' => $shop['name'] . ' sent an estimation for your review.',
                    'icon' => 'store',
                    'href' => '/estimates',
                ];
                Notification::send($service_request->car->user, new EstimateSent($notificationData));
                event(new EstimateSentEvent($notificationData));
            } else {
                $response = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot create Estimate. Service returned 'null'.");
            }
        } else {
            $response = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot create Estimate. User type is neither 'admin' nor 'vendor'");
        }

        return response()->json($response);
    }

    public function update(Request $request, $id)
    {
        $response = ['success' => false];
        $user = Auth::user();

        if ($user['user_type'] === User::USER_TYPE_ADMIN || $user['user_type'] === User::USER_TYPE_VENDOR) {
            $estimate = $this->estimate_service->update_estimate($request, $user['id'], $id);

            if (!is_null($estimate)) {
                $response['success'] = true;
                $response['data'] = $estimate;
                $this->show_request_json($estimate);
            } else {
                $response = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot update Estimate. Service returned 'null'.");
            }
        } else {
            $response = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot update Estimate. User type is neither 'admin' nor 'vendor'");
        }

        return response()->json($response);
    }

    /**
     * =========================
     * |     Status update     |
     * =========================
     */
    public function update_status_expired($id)
    {
        return $this->update_status($id, Estimate::ESTIMATE_STATUS_EXPIRED, true);
    }

    public function update_status_declined($id)
    {
        $user = Auth::user();
        return $this->update_status($id, Estimate::ESTIMATE_STATUS_DECLINED, $user['user_type'] === User::USER_TYPE_CUSTOMER);
    }

    public function update_status_accepted($id)
    {
        $user = Auth::user();
        return $this->update_status($id, Estimate::ESTIMATE_STATUS_ACCEPTED, $user['user_type'] === User::USER_TYPE_CUSTOMER);
    }

    public function update_status_cancelled($id)
    {
        $user = Auth::user();
        return $this->update_status($id, Estimate::ESTIMATE_STATUS_CANCELLED, $user['user_type'] === User::USER_TYPE_VENDOR);
    }

    private function update_status($id, $status, $authorized)
    {
        $response = ['success' => false];
        $user = Auth::user();

        if ($authorized || $user['user_type'] === User::USER_TYPE_ADMIN) {
            $estimate = $this->estimate_service->update_status($id, $status);

            if (!is_null($estimate)) {
                $response['success'] = true;
                $response['data'] = $estimate;
                $this->show_request_json($estimate);

                if ($status === Estimate::ESTIMATE_STATUS_CANCELLED) {
                    $request = $estimate->request;
                    $shop = $estimate->shop;

                    $notificationData = [
                        'id' => $estimate->customer_id,
                        'estimate' => $estimate,
                        'message' => $shop['name'] . ' cancelled their estimation.',
                        'icon' => 'edit',
                        'href' => '/estimates',
                    ];
                    Notification::send($estimate->customer, new EstimateCancelled($notificationData));
                    event(new EstimateCancelledEvent($notificationData));
                }

            } else {
                $response = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot update estimate status to '" . $status . ", id=" . $id . ". Service returned to null.");
            }
        } else {
            $response = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot update estimate status to '" . $status . ", id=" . $id . ". No user access.");
        }

        return response()->json($response);
    }

    /**
     * =========================
     * |    Helper METHODS     |
     * =========================
     */
    // explicitly prints out the nested JSON objects in model
    private function show_request_json($estimate)
    {
        $estimate->request;
        $estimate->request->pms_request;
        $estimate->request->car;
        $estimate->request->car->car_make;
        $estimate->request->car->car_model;
        $estimate->request->car->car_trim;
        $estimate->request->car->user;
        $estimate->shop;
        $estimate->shop->avatar;
        $estimate->replacements;
    }
}
