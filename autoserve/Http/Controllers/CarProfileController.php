<?php

namespace App\Http\Controllers;

use App\CarModel;
use App\CarTrim;
use App\Http\Controllers\Utils\Constants;
use App\Http\Controllers\Utils\Utilities;
use App\Http\Requests\UpdateCarProfileRequest;
use App\Services\CarProfileService;
use App\Services\FleetService;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CarProfileController extends Controller
{
    protected $car_profile_service;
    protected $fleet_service;

    public function __construct(
        CarProfileService $car_profile_service,
        FleetService $fleet_service) {
        $this->car_profile_service = $car_profile_service;
        $this->fleet_service = $fleet_service;
    }

    /**
     * =========================
     * |      CRUD METHODS     |
     * =========================
     */

    // View all
    public function index()
    {
        $response = ['success' => false];
        $user = Auth::user();
        $car_profiles = null;

        if ($user['user_type'] === User::USER_TYPE_CUSTOMER) {
            $car_profiles = $this->car_profile_service->get_car_profiles($user);
        } else if ($user['user_type'] === User::USER_TYPE_FLEET_ADMIN) {
            $car_profiles = $this->fleet_service->get_fleet_cars($user->fleet->id);
        }

        if (!is_null($car_profiles)) {
            $response['success'] = true;
            $response['data'] = $car_profiles;

            foreach ($car_profiles as $car) {
                $car->car_make;
                $car->car_model;
                $car->car_trim;
                $car->user;
                $car->schedules;
            }
        } else {
            $response = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot retrieve all Car Profiles.");
        }

        return response()->json($response);
    }

    // View
    public function show($id)
    {
        $response = ['success' => false];
        $user = Auth::user();
        $car = $this->car_profile_service->get($id);

        if (!is_null($car) && (
            $user->user_type === User::USER_TYPE_ADMIN ||
            ($user->user_type === User::USER_TYPE_CUSTOMER && $car->user_id == $user->id)
        )) {
            $response['success'] = true;
            $response['data'] = $car;
            $car->car_make;
            $car->schedules;
            $car->car_model;
            $car->car_trim;
            $car->user;
        } else {
            $response = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot retrieve Car Profile with id=" . $id);
        }

        return response()->json($response);
    }

    // Create
    public function create(Request $request)
    {
        $response = ['success' => false];
        $user = Auth::user();

        try {
            if ($user->user_type == User::USER_TYPE_ADMIN ||
                $user->user_type == User::USER_TYPE_CUSTOMER ||
                $user->user_type == User::USER_TYPE_FLEET_ADMIN) {
                $car = $this->car_profile_service->create_car_profile($request, $user->id);

                if (!is_null($car)) {
                    $response['success'] = true;
                    $response['data'] = $car;
                    $car->car_make;
                    $car->car_model;
                    $car->car_trim;
                    $car->user;
                    $car->schedules;

                } else {
                    $response['error'] = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot create car profile. Service returned null.");
                }

            } else {
                $response['error'] = Utilities::error(Constants::ERROR_MSG_GENERIC, 403);
            }
        } catch (QueryException $e) {
            $response['error'] = Utilities::error(Constants::ERROR_MSG_SQL_EXCEPTION_SAVE, 403, $e->getMessage());
        }
        // Uncomment if you want to get the stacktrace
         catch (Exception $e) {
            $response['error'] = Utilities::error(Constants::ERROR_MSG_SQL_EXCEPTION_SAVE, 403, $e->getMessage());
        }

        return response()->json($response);
    }

    // Update
    public function update(UpdateCarProfileRequest $request, $car_id)
    {
        $response = ['success' => false];
        $result = $this->car_profile_service->update_car_profile($request, $car_id);

        if ($result) {
            $response['success'] = true;
        } else {
            $response['error'] = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot update car profile. Service returned null or user ID != car->user.");
        }

        return response()->json($response);
    }

    // soft delete - returns deleted car profile
    public function delete($id)
    {
        $response = ['success' => false];
        $user = Auth::user();

        if ($user->user_type == User::USER_TYPE_ADMIN || $user->user_type == User::USER_TYPE_CUSTOMER) {
            $deleted_car = $this->car_profile_service->delete($id, $user->user_type, $user->id); // only customer role needs the user check

            if (!is_null($deleted_car)) {
                $response['success'] = true;
                $response['data'] = $deleted_car;
            } else {
                $response['error'] = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot delete car profile. Service returned null or user ID != car->user.");
            }
        } else {
            $response['error'] = Utilities::error(Constants::ERROR_MSG_GENERIC, 403, "User role not 'admin' or 'customer'.");
        }

        return response()->json($response);
    }

    // restore soft deleted car profile
    public function restore($id)
    {
        $response = ['success' => false];
        $user = Auth::user();

        if ($user->user_type == User::USER_TYPE_ADMIN || $user->user_type == User::USER_TYPE_CUSTOMER) {
            $car = $this->car_profile_service->restore($id, $user->user_type, $user->id); // only customer role needs the user check

            if (!is_null($car)) {
                $response['success'] = true;
                $response['data'] = $car;
            } else {
                $response['error'] = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot restore car profile. Car doesn't exist or is NOT soft deleted.");
            }
        } else {
            $response['error'] = Utilities::error(Constants::ERROR_MSG_GENERIC, 403, "User role not 'admin' or 'customer'.");
        }

        return response()->json($response);
    }

    // Only admin users have access to this API
    public function hard_delete($id)
    {
        $response = ['success' => false];
        $user = Auth::user();

        if ($user->user_type == User::USER_TYPE_ADMIN) {
            $deleted_car = $this->car_profile_service->hard_delete($id);

            if (!is_null($deleted_car)) {
                $response['success'] = true;
                $response['data'] = $deleted_car;
            } else {
                $response['error'] = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot delete car profile. Service returned null or user ID != car->user.");
            }
        } else {
            $response['error'] = Utilities::error(Constants::ERROR_MSG_GENERIC, 403, "User role not 'admin.");
        }

        return response()->json($response);
    }

    /**
     * =========================
     * |   Estimation Wizard    |
     * =========================
     */

    // Returns all car makes
    public function get_car_makes()
    {
        $response = ['success' => false];

        $makes = $this->car_profile_service->get_car_makes();
        if (!is_null($makes)) {
            $response['success'] = true;
            $response['data'] = $makes;
        } else {
            $response['error'] = Utilities::error(Constants::ERROR_MSG_GENERIC, 403, "Cannot retrieve car makes.");
        }

        return response()->json($response);
    }

    // Returns all car models by make
    public function get_car_models_by_make(Request $request)
    {
        $response = ['success' => false];
        $make_id = $request->query('make_id');

        if (!is_null($make_id)) {
            // $models = $this->car_profile_service->get_car_models_by_make($make_id);

            $models = CarModel::where('make_id', $make_id)->orderBy('name', 'asc')->get();
            if (!is_null($models)) {
                $response['success'] = true;
                $response['data'] = $models;
            } else {
                $response['error'] = Utilities::error(Constants::ERROR_MSG_GENERIC, 403, "Cannot retrieve car models.");
            }
        } else {
            $response['error'] = Utilities::error(Constants::ERROR_MSG_GENERIC, 403, "'make_id' not set in request body");
        }

        return response()->json($response);
    }

    // Returns all car years by model
    public function get_car_years_by_model(Request $request)
    {
        $response = ['success' => false];
        $model_id = $request->query('model_id');

        if (!is_null($model_id)) {
            // $years = $this->car_profile_service->get_car_years_by_model($model_id);
            $years = array();

            // exclude trims with NULL value for 'year_start'
            $filtered_trims = CarTrim::where([['model_id', '=', $model_id], ['year_start', '>', 0]])->get();

            if ($filtered_trims->count() > 0) {
                // min year
                $min_year = $filtered_trims->min('year_start');
                // max year - default is present year
                $max_year = date('Y');
                $has_null_year_end = $filtered_trims->where('year_end', null, true)->count() > 0;

                if (!$has_null_year_end) {
                    $max_year = $filtered_trims->max('year_end');
                }

                // years range
                if (!is_null($min_year) && !is_null($max_year) && $max_year >= $min_year) {
                    $years = range($min_year, $max_year);
                    rsort($years);
                }
            }
            if (!is_null($years)) {
                $response['success'] = true;
                $response['data'] = $years;
            } else {
                $response['error'] = Utilities::error(Constants::ERROR_MSG_GENERIC, 403, "Cannot retrieve car years.");
            }
        } else {
            $response['error'] = Utilities::error(Constants::ERROR_MSG_GENERIC, 403, "'model_id' not set in request body");
        }

        return response()->json($response);
    }

    // Returns all car trims by year
    public function get_car_trims_by_year(Request $request)
    {
        $response = ['success' => false];
        $model_id = $request->query('model_id');
        $year = $request->query('year');

        if (!is_null($model_id) && !is_null($year)) {

            // $trims = $this->car_profile_service->get_car_trims_by_year($model_id, $year);
            $trims = array();

            // exclude trims with NULL value for 'year_start'
            $filtered_trims = CarTrim::where([['model_id', '=', $model_id],
                ['year_start', '>', 0],
                ['year_start', '<=', $year]])->get();

            if ($filtered_trims->count() > 0) {

                foreach ($filtered_trims as $trim) {
                    if ($trim->year_end > 0) { // year_end is not null
                        if ($trim->year_end >= $year) {
                            array_push($trims, $trim);
                        }
                    } else {
                        array_push($trims, $trim);
                    }
                }
            }
            if (!is_null($trims)) {
                $response['success'] = true;
                $response['data'] = $trims;
            } else {
                $response['error'] = Utilities::error(Constants::ERROR_MSG_GENERIC, 403, "Cannot retrieve car trims.");
            }
        } else {
            $response['error'] = Utilities::error(Constants::ERROR_MSG_GENERIC, 403, "'model_id' or 'year' not set in request body");
        }

        return response()->json($response);
    }

}
