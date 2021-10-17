<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Utils\Constants;
use App\Http\Controllers\Utils\Utilities;
use App\Services\CarScheduleService;
use App\Services\RequestService;
use App\User;
use Illuminate\Support\Facades\Auth;

class CarScheduleController extends Controller
{
    protected $car_schedule_service;
    protected $request_service;

    public function __construct(CarScheduleService $car_schedule_service, RequestService $request_service)
    {
        $this->car_schedule_service = $car_schedule_service;
        $this->request_service = $request_service;
    }

    /**
     * =========================
     * |      CRUD METHODS     |
     * =========================
     */
    // View all
    public function index($car_id)
    {
        $response = ['success' => false];
        $user = Auth::user();
        $car_schedules = $this->car_schedule_service->get_car_schedules($user, $car_id);
        $requests = $this->request_service->get_car_requests($car_id);

        if (!is_null($car_schedules)) {
            $response['success'] = true;
            $response['data'] = $car_schedules;

            foreach ($car_schedules as $car_sched) {
                $car_sched->car;
                $car_sched->pms;

                foreach ($requests as $req) {
                    if ($req->type === Constants::REQUEST_TYPE_PMS) {
                        $car_sched->is_requested = $req->pms_request->pms->id === $car_sched->pms->id;

                        if ($car_sched->is_requested) {
                            break;
                        }
                    }
                }
            }
        } else {
            $response = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot retrieve all Car Schedules.");
        }

        return response()->json($response);
    }

    public function get_car_schedule($car_id, $pms_id)
    {
        $response = ['success' => false];

        $user = Auth::user();

        $car_sched = $this->car_schedule_service->get_car_schedule($car_id, $pms_id);

        if (!is_null($car_sched)) {
            $response['success'] = true;
            $response['data'] = $car_sched;
        } else {
            $response = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot retrieve car schedule.");
        }

        return response()->json($response);
    }

    public function show($car_id, $id)
    {
        $response = ['success' => false];
        $user = Auth::user();
        $car_sched = $this->car_schedule_service->get($id);

        if (!is_null($car_sched) &&
            ($user->user_type === User::USER_TYPE_ADMIN || $user->user_type === User::USER_TYPE_CUSTOMER)
        ) {
            $response['success'] = true;
            $response['data'] = $car_sched;
            $car_sched->car;
            $car_sched->pms;
        } else {
            $response = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot retrieve Car Schedule with id=" . $id);
        }

        return response()->json($response);
    }

    // CREATE
    public function generate($car_id)
    {
        $response = ['success' => false];
        $user = Auth::user();

        if ($user->user_type === User::USER_TYPE_ADMIN || $user->user_type === User::USER_TYPE_CUSTOMER || $user->user_type === User::USER_TYPE_FLEET_ADMIN) {
            $response = $this->car_schedule_service->generate_schedule($car_id);
        } else {
            $response = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "User has no access (not admin, customer, or fleet admin). Cannot generate schedule with car id=" . $id);
        }

        return response()->json($response);
    }

}
