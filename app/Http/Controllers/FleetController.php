<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Utils\Constants;
use App\Http\Controllers\Utils\Utilities;
use App\Http\Requests\CreateCustomerRequest;
use App\Services\FleetService;
use App\Services\UserService;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FleetController extends Controller
{
    protected $fleet_service;
    protected $user_service;

    public function __construct(
        FleetService $fleet_service,
        UserService $user_service
    ) {
        $this->user_service = $user_service;
        $this->fleet_service = $fleet_service;
    }

    public function validate_fleet(Request $request)
    {
        $response = ['success' => false];
        $fleet = $this->fleet_service->validate(
            $request['slug'],
            $request['key'],
            $request['token']
        );

        if (!is_null($fleet)) {
            $response['success'] = true;
            $response['data'] = $fleet;
        } else {
            $response = Utilities::error('Invalid fleet tokens', 401, 'Either the slug, key or token are invalid.');
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
        $fleets = $this->fleet_service->get_fleets($user);

        if (!is_null($fleets)) {
            $response['success'] = true;
            $response['data'] = $fleets;

            foreach ($fleets as $fleet) {
                $this->show_request_json($fleet);
            }
        } else {
            $response = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot retrieve all fleets. Only 'admin' type can access this.");
        }

        return response()->json($response);
    }

    public function show($id)
    {
        $response = ['success' => false];
        $user = Auth::user();

        $fleet = $this->fleet_service->get($id);

        if (!is_null($fleet) && (
            $user['user_type'] === User::USER_TYPE_ADMIN ||
            ($user['user_type'] === User::USER_TYPE_FLEET_ADMIN && $fleet->user_id == $user->id))
        ) {
            $response['success'] = true;
            $response['data'] = $fleet;
            $this->show_request_json($fleet);
        } else {
            $response = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot retrieve fleet with id=" . $id . ". Only 'admin' and 'fleet admin' assigned can have access.");
        }

        return response()->json($response);
    }

    public function update(Request $request, $id)
    {
        $response = ['success' => false];
        $user = Auth::user();

        if ($user['user_type'] === User::USER_TYPE_ADMIN || $user['user_type'] === User::USER_TYPE_FLEET_ADMIN) {
            $fleet = $this->fleet_service->update_fleet($request, $user['id'], $id);

            if (!is_null($fleet)) {
                $response['success'] = true;
                $response['data'] = $fleet;
                $this->show_request_json($fleet);
            } else {
                $response = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot update fleet. Service returned 'null'.");
            }
        } else {
            $response = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot update fleet. User type is neither 'admin' nor 'fleet admin'");
        }

        return response()->json($response);
    }

    public function soft_delete($id)
    {
        $response = ['success' => false];
        $user = Auth::user();

        if ($user['user_type'] === User::USER_TYPE_ADMIN || $user['user_type'] === User::USER_TYPE_FLEET_ADMIN) {
            $fleet_del = $this->fleet_service->soft_delete($id);

            if (!is_null($fleet_del)) {
                $response['success'] = true;
                $response['data'] = $fleet_del;
                $this->show_request_json($fleet_del);
            } else {
                $response['error'] = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Deletion unsuccessful. fleet doesn't exist or is already deleted.");
            }
        } else {
            $response = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot delete fleet. User type is neither 'admin' nor 'fleet admin'");
        }

        return response()->json($response);
    }

    /**
     * ===========================
     * |   Additional METHODS    |
     * ===========================
     */

    public function restore($id)
    {
        $response = ['success' => false];
        $user = Auth::user();

        if ($user['user_type'] === User::USER_TYPE_ADMIN) {
            $fleet_restored = $this->fleet_service->restore($id);

            if (!is_null($fleet_restored)) {
                $response['success'] = true;
                $response['data'] = [
                    'id' => $fleet_restored->id,
                    'name' => $fleet_restored->name,
                ];
            } else {
                $response['error'] = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Restore unsuccessful. fleet doesn't exist or is NOT soft deleted.");
            }
        } else {
            $response['error'] = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Restore unsuccessful. Only admins can access this.");
        }

        return response()->json($response);
    }

    public function fleet_users($id)
    {
        $response = ['success' => false];
        $user = Auth::user();

        if ($user['user_type'] === User::USER_TYPE_ADMIN || $user['user_type'] === User::USER_TYPE_FLEET_ADMIN) {
            $fleet_users = $this->fleet_service->get_fleet_users($id);

            if (!is_null($fleet_users)) {
                $response['success'] = true;
                $response['data'] = $fleet_users;

                foreach ($fleet_users as $fleet) {
                    $this->show_request_json($fleet);
                }
            } else {
                $response = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot retrieve all fleets users. Service returned null.");
            }
        } else {
            $response = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot retrieve all fleets users. User type is neither 'admin' nor 'fleet admin'.");
        }

        return response()->json($response);
    }

    public function fleet_cars($id)
    {
        $response = ['success' => false];
        $user = Auth::user();

        if ($user['user_type'] === User::USER_TYPE_ADMIN || $user['user_type'] === User::USER_TYPE_FLEET_ADMIN) {
            $fleet_cars = $this->fleet_service->get_fleet_cars($id);

            if (!is_null($fleet_cars)) {
                $response['success'] = true;
                $response['data'] = $fleet_cars;

                // foreach ($fleet_cars as $fleet) {
                //     $this->show_request_json($fleet);
                // }
            } else {
                $response = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot retrieve all fleets users. Service returned null.");
            }
        } else {
            $response = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot retrieve all fleets users. User type is neither 'admin' nor 'fleet admin'.");
        }

        return response()->json($response);
    }

    /**
     * =========================
     * |    Helper METHODS     |
     * =========================
     */
    private function show_request_json($fleet)
    {
        $fleet->avatar;
        $fleet->banner;
        $fleet->user;
    }
}
