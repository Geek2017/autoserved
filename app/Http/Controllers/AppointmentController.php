<?php

namespace App\Http\Controllers;

use App\Appointment;
use App\Events\EstimateAcceptedEvent;
use App\Http\Controllers\Utils\Constants;
use App\Http\Controllers\Utils\Utilities;
use App\Notifications\EstimateAccepted;
use App\RequestPms;
use App\Services\AppointmentService;
use App\Services\EstimateService;
use App\Services\RequestService;
use App\User;
use App\UserRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;

class AppointmentController extends Controller
{
    protected $appointment_service;
    protected $estimate_service;
    protected $request_service;

    public function __construct(AppointmentService $appointment_service, EstimateService $estimate_service, RequestService $request_service)
    {
        $this->appointment_service = $appointment_service;
        $this->estimate_service = $estimate_service;
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
        $appointment = $this->appointment_service->get_appointments($user);

        if (!is_null($appointment)) {
            $response['success'] = true;
            $response['data'] = $appointment;

            foreach ($appointment as $appt) {
                $this->show_request_json($appt);
            }
        } else {
            $response = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot retrieve all appointment.");
        }

        return response()->json($response);
    }

    public function show($id)
    {
        $response = ['success' => false];
        $user = Auth::user();

        $appointment = $this->appointment_service->get($id);

        if (!is_null($appointment) && (
            $user['user_type'] === User::USER_TYPE_ADMIN ||
            ($user['user_type'] === User::USER_TYPE_VENDOR && $appointment->estimate->shop->user->id == $user->id) ||
            ($user['user_type'] === User::USER_TYPE_CUSTOMER && $appointment->estimate->customer_id == $user->id))
        ) {
            $response['success'] = true;
            $response['data'] = $appointment;
            $this->show_request_json($appointment);
        } else {
            $response = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot retrieve appointment with id=" . $id);
        }

        return response()->json($response);
    }

    public function create(Request $request)
    {
        $response = ['success' => false];
        $user = Auth::user();

        if ($user['user_type'] === User::USER_TYPE_ADMIN || $user['user_type'] === User::USER_TYPE_CUSTOMER) {
            $appointment = $this->appointment_service->create_appointment($request);

            if (!is_null($appointment)) {
                $this->estimate_service->decline_other_estimates($appointment->estimate->request_id);
                $this->request_service->accept_request($appointment->estimate->request_id);

                $response['success'] = true;
                $response['data'] = $appointment;
                $this->show_request_json($appointment);

                // send notification
                $notificationData = [
                    'id' => $appointment->estimate->shop->user->id,
                    'appointment' => $appointment,
                    'message' => 'Appointment has been set!',
                    'icon' => 'calendar_today',
                    'href' => '/appointments',
                ];
                Notification::send($appointment->estimate->shop->user, new EstimateAccepted($notificationData));
                event(new EstimateAcceptedEvent($notificationData));
            } else {
                $response = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot create appointment. Service returned 'null', estimate is not 'accepted', or appointment exists.");
            }
        } else {
            $response = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot create appointment. User type is neither 'admin' nor 'customer'");
        }

        return response()->json($response);
    }

    public function update(Request $request, $id)
    {
        $response = ['success' => false];
        $user = Auth::user();

        if ($user['user_type'] === User::USER_TYPE_ADMIN || $user['user_type'] === User::USER_TYPE_VENDOR) {
            $appointment = $this->appointment_service->update_appointment($request, $id);

            if (!is_null($appointment)) {
                $response['success'] = true;
                $response['data'] = $appointment;
                $this->show_request_json($appointment);
            } else {
                $response = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot update appointment. Service returned 'null'.");
            }
        } else {
            $response = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot update appointment. User type is neither 'admin' nor 'vendor'");
        }

        return response()->json($response);
    }

    public function soft_delete($id)
    {
        $response = ['success' => false];
        $user = Auth::user();

        if ($user['user_type'] === User::USER_TYPE_ADMIN || $user['user_type'] === User::USER_TYPE_VENDOR) {
            $appointment_del = $this->appointment_service->soft_delete($id);

            if (!is_null($appointment_del)) {
                $response['success'] = true;
                $response['data'] = $appointment_del;
                $this->show_request_json($appointment_del);
            } else {
                $response['error'] = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Deletion unsuccessful. Appointment doesn't exist or is already deleted.");
            }
        } else {
            $response = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot delete appointment. User type is neither 'admin' nor 'vendor'");
        }

        return response()->json($response);
    }

    public function get_car_repair_history($car_id)
    {
        $response = ['success' => false];
        $user = Auth::user();

        if ($user['user_type'] === User::USER_TYPE_VENDOR || $user['user_type'] === User::USER_TYPE_ADMIN || $user['user_type'] === User::USER_TYPE_CUSTOMER) {
            $appointments = $this->appointment_service->get_car_repair_history($car_id);
            $data = array();

            if (count($appointments) > 0) {
                foreach ($appointments as $apt) {
                    $datum = [
                        'date' => $apt->scheduled_date,
                        'time' => $apt->scheduled_time,
                        'notes' => $apt->notes,
                        'shop' => [
                            'name' => $apt->estimate->shop->name,
                            'type' => $apt->estimate->shop->type,
                            'description' => $apt->estimate->shop->description,
                        ],
                        'total_cost' => $apt->estimate->total,
                        'type' => 'preventive',
                        'details' => [],
                    ];

                    if ($apt->estimate->request->type === 'preventive') {
                        // PMS based on mileage
                        $req = RequestPms::find($apt->estimate->request->id);
                        if (!is_null($req)) {
                            $datum['details'] = [
                                'mileage' => $req->request->current_mileage,
                                'check' => $req->pms->check_items,
                                'clean' => $req->pms->clean_items,
                                'change' => $req->pms->change_items,
                            ];
                        }

                        // TODO other types
                        // Change oil
                        // Change tire
                        // Replacements
                    } else if ($apt->estimate->request->type === 'corrective') {
                        // TODO corrective
                    }

                    array_push($data, $datum);
                }
            }

            $response['success'] = true;
            $response['data'] = $data;
        }

        return response()->json($response);
    }

    public function get_repair_history($customer_id)
    {
        $response = ['success' => false];
        $user = Auth::user();

        if ($user['user_type'] === User::USER_TYPE_VENDOR || $user['user_type'] === User::USER_TYPE_ADMIN || $user['user_type'] === User::USER_TYPE_CUSTOMER) {
            $appointments = $this->appointment_service->get_all($customer_id, User::USER_TYPE_CUSTOMER, Appointment::APPOINTMENT_STATUS_COMPLETED);

            if (count($appointments) > 0) {
                $data = array();

                foreach ($appointments as $apt) {
                    $datum = [
                        'date' => $apt->scheduled_date,
                        'time' => $apt->scheduled_time,
                        'notes' => $apt->notes,
                        'shop' => [
                            'name' => $apt->estimate->shop->name,
                            'type' => $apt->estimate->shop->type,
                            'description' => $apt->estimate->shop->description,
                        ],
                        'total_cost' => $apt->estimate->total,
                        'type' => 'preventive',
                        'details' => [],
                    ];

                    if ($apt->estimate->request->type === 'preventive') {
                        // PMS based on mileage
                        $req = RequestPms::find($apt->estimate->request->id);
                        if (!is_null($req)) {
                            $datum['details'] = [
                                'mileage' => $req->request->current_mileage,
                                'check' => $req->pms->check_items,
                                'clean' => $req->pms->clean_items,
                                'change' => $req->pms->change_items,
                            ];
                        }

                        // TODO other types
                        // Change oil
                        // Change tire
                        // Replacements
                    } else if ($apt->estimate->request->type === 'corrective') {
                        // TODO corrective
                    }

                    array_push($data, $datum);
                }

                $response['success'] = true;
                $response['data'] = $data;

            }
        }

        return response()->json($response);
    }

    /**
     * =========================
     * | Other Request Methods |
     * =========================
     */
    public function complete_appointment($id)
    {
        $response = ['success' => false];
        $user = Auth::user();

        if ($user['user_type'] === User::USER_TYPE_VENDOR || $user['user_type'] === User::USER_TYPE_ADMIN) {
            $appointment = $this->appointment_service->complete_appointment($id);

            if (!is_null($appointment)) {
                $response['success'] = true;
                $response['data'] = $appointment;
                $this->show_request_json($appointment);
            } else {
                $response = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot end appointment with id=" . $id . ". Service returned to null.");
            }
        } else {
            $response = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot end appointment with id=" . $id . ". No user access.");
        }

        return response()->json($response);
    }

    public function restore_deleted($id)
    {
        $response = ['success' => false];
        $user = Auth::user();

        if ($user['user_type'] === User::USER_TYPE_ADMIN) {
            $appointment_restored = $this->appointment_service->restore($id);

            if (!is_null($appointment_restored)) {
                $response['success'] = true;
                $response['data'] = [
                    'id' => $appointment_restored->id,
                    'name' => $appointment_restored->name,
                ];
            } else {
                $response['error'] = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Restore unsuccessful. Appointment doesn't exist or is NOT soft deleted.");
            }
        } else {
            $response['error'] = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Restore unsuccessful. Only admins can access this.");
        }

        return response()->json($response);
    }

    /**
     * =========================
     * |     Status update     |
     * =========================
     */
    public function update_status_cancel(Request $request, $id)
    {
        $user = Auth::user();
        return $this->update_status($id, Appointment::APPOINTMENT_STATUS_CANCELLED, $user['user_type'] === User::USER_TYPE_CUSTOMER, $request);
    }

    public function update_status_approve($id)
    {
        $user = Auth::user();
        return $this->update_status($id, Appointment::APPOINTMENT_STATUS_APPROVED, $user['user_type'] === User::USER_TYPE_VENDOR);
    }

    public function update_status_start(Request $request, $id)
    {
        $user = Auth::user();
        return $this->update_status($id, Appointment::APPOINTMENT_STATUS_STARTED, $user['user_type'] === User::USER_TYPE_VENDOR);
    }

    private function update_status($id, $status, $authorized, $request = null)
    {
        $response = ['success' => false];
        $user = Auth::user();

        if ($authorized || $user['user_type'] === User::USER_TYPE_ADMIN) {
            $appointment = $this->appointment_service->update_status($id, $status, $request);

            if (!is_null($appointment)) {
                $response['success'] = true;
                $response['data'] = $appointment;

                $this->show_request_json($appointment);
            } else {
                $response = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot update appointment status to '" . $status . ", id=" . $id . ". Service returned to null.");
            }
        } else {
            $response = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot update appointment status to '" . $status . "', id=" . $id . ". No user access.");
        }

        return response()->json($response);
    }

    /**
     * =========================
     * |    Helper METHODS     |
     * =========================
     */
    // explicitly prints out the nested JSON objects in model
    private function show_request_json($appointment)
    {
        $appointment->shop_rating;
        $appointment->customer_rating;
        $appointment->estimate;
        $appointment->estimate->shop;
        $appointment->estimate->shop->avatar;
        $appointment->estimate->shop->avatar;
        $appointment->estimate->shop->banner;
        $appointment->estimate->shop->user;
        $appointment->estimate->request;
        $appointment->estimate->request->car;
        $appointment->estimate->request->car->user;
        $appointment->estimate->request->car->car_make;
        $appointment->estimate->request->car->car_model;
        $appointment->estimate->request->car->car_trim;

        if ($appointment->estimate->request->type === UserRequest::REQUEST_TYPE_PREVENTIVE) {
            $appointment->estimate->request->pms_request->pms;
            $appointment->estimate->request->pms_request->pms->check_items;
            $appointment->estimate->request->pms_request->pms->clean_items;
            $appointment->estimate->request->pms_request->pms->change_items;
            $appointment->estimate->request->pms_request->replacements;
        } else {
            $appointment->estimate->request->pms_others_request;
        }
    }

}
