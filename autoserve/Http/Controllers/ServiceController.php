<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Utils\Constants;
use App\Http\Controllers\Utils\Utilities;
use App\Http\Requests\CreateCorrectiveServiceRequest;
use App\Http\Requests\SavePmsDataRequest;
use App\Http\Requests\SavePmsOtherDataRequest;
use App\Service;
use App\Services\ShopServicesService;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ServiceController extends Controller
{
    protected $shop_services_service;

    public function __construct(ShopServicesService $shop_services_service)
    {
        $this->shop_services_service = $shop_services_service;
    }

    public function get_pms_data(Request $request)
    {
        $response = ['success' => false];
        $user = Auth::user();
        $mileage = $request->query('mileage');
        $data = $this->shop_services_service->get_pms_data($user, $mileage);

        if (!is_null($data)) {
            $response['success'] = true;
            $response['data'] = $data;
        }

        return response()->json($response);
    }

    public function get_pms_others_data(Request $request)
    {
        $response = ['success' => false];
        $others_id = $request->query('others_id');
        $data = $this->shop_services_service->get_pms_others_data($others_id);

        if (!is_null($data)) {
            $response['success'] = true;
            $response['data'] = $data;
        }

        return response()->json($response);
    }

    public function get_all_pms_data()
    {
        $response = ['success' => true];
        $response['data'] = $this->shop_services_service->get_all_pms_data();
        return response()->json($response);
    }

    public function get_all_pms_others_data()
    {
        $response = ['success' => true];
        $response['data'] = $this->shop_services_service->get_all_pms_others_data();
        return response()->json($response);
    }

    public function get_pms_others_price()
    {
        $response = ['success' => true];
        $id = request()->query('id');
        $data = $this->shop_services_service->get_pms_others_price($id);
        $response['data'] = $data;

        if (!is_null($data['oil_prices'])) {
            $data['oil_prices']->pms_others;
        }

        return response()->json($response);
    }

    public function get_pms_labor_price(Request $request)
    {
        $response = ['success' => false];
        $user = Auth::user();
        $mileage = $request->query('mileage');
        $car_type = $request->query('car_type');
        $data = $this->shop_services_service->get_pms_labor_price($user, $mileage, $car_type);

        if (!is_null($data)) {
            $response['success'] = true;
            $response['data'] = $data;
        }

        return response()->json($response);
    }

    public function get_pms_oil_price(Request $request)
    {
        $response = ['success' => false];
        $user = Auth::user();
        $mileage = $request->query('mileage');
        $oil_type = $request->query('oil_type');
        $data = $this->shop_services_service->get_pms_oil_price($user, $mileage, $oil_type);

        if (!is_null($data)) {
            $response['success'] = true;
            $response['data'] = $data;
        }

        return response()->json($response);
    }

    public function save_pms_data(SavePmsDataRequest $request, $mileage)
    {
        $response = ['success' => true];
        $user = Auth::user();
        $vehicle_types = [];
        $oil_types = [];

        foreach ($request['labor_prices'] as $key => $value) {
            $this->shop_services_service->save_labor_prices($user, $mileage, $key, $value);
            array_push($vehicle_types, $key);
        }

        foreach ($request['oil_type_prices'] as $key => $value) {
            $this->shop_services_service->save_oil_prices($user, $mileage, $key, $value);
            array_push($oil_types, $key);
        }

        $response['data'] = [
            'vehicle_types' => $vehicle_types,
            'oil_types' => $oil_types,
        ];
        return response()->json($response);
    }

    public function save_pms_others_data(SavePmsOtherDataRequest $request)
    {
        $response = ['success' => false];

        foreach ($request['labor_prices'] as $key => $value) {
            $this->shop_services_service->save_other_labor_prices($request['pms_others_id'], $key, $value);
        }

        $result = $this->shop_services_service->save_pms_others_data($request);

        if ($result) {
            $response['success'] = true;
        }

        return response()->json($response);
    }

    /** Returns all services */
    public function get_corrective_services()
    {
        $response = ['success' => false];
        $services = $this->shop_services_service->get_services();

        if (!is_null($services)) {
            $response['success'] = true;
            $response['data'] = $services;

            foreach ($services as $service) {
                $service->corrective_service;
            }
        } else {
            $response['error'] = Utilities::error(Constants::ERROR_MSG_GENERIC, 0, 'Error fetching services.');
        }

        return response()->json($response);
    }

    /** Returns selected service */
    public function show($id)
    {
        $response = ['success' => false];
        $service = $this->shop_services_service->get($id);

        if (!is_null($service)) {
            $response['success'] = true;
            $response['data'] = $service;
            $service->user;
            $service->shops;
        } else {
            $httpCode = 403;
            $response['error'] = [];
            $error = [
                'message' => Constants::ERROR_MSG_NO_ACCESS,
            ];
            array_push($response['error'], $error);
        }

        return response()->json($response);
    }

    public function create_corrective_service(CreateCorrectiveServiceRequest $request)
    {
        $response = ['success' => false];
        $user = Auth::user();

        if ($user->user_type === User::USER_TYPE_VENDOR) {
            $service = $this->shop_services_service->create_corrective_service($request);

            if (!is_null($service)) {
                $response['success'] = true;
                $response['data'] = $service;
            } else {
                $response['error'] = Utilities::error(Constants::ERROR_MSG_GENERIC, 0, 'Error creating service.');
            }
        } else {
            $response['error'] = Utilities::error(Constants::ERROR_MSG_GENERIC, 403, 'Unauthorized.');
        }

        return response()->json($response);
    }

    public function update(Request $request, $id)
    {
        $response = ['success' => false];
        $user = Auth::user();

        if (strcasecmp($user['user_type'], Constants::USER_TYPE_VENDOR) == 0) {
            $result = $this->shop_services_service->update_service($request, $id);

            if (!is_null($result)) {
                $response['success'] = true;
                $response['data'] = $result;
                $result->user;
            } else {
                $response['error'] = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 0, "service is result is null");
            }
        } else {
            $response['error'] = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 0, "User type is not 'vendor'");
        }

        return response()->json($response);
    }

    public function delete($id)
    {
        $response = ['success' => false];

        $service_del = $this->shop_services_service->delete($id);
        if (!is_null($service_del)) {
            $response['success'] = true;
            $response['data'] = [
                'id' => $service_del->id,
                'name' => $service_del->name,
            ];
        } else {
            $response['error'] = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 0, "Deletion unsuccessful. Service doesn't exist");
        }

        return response()->json($response);
    }

    public function get_service_by_name($shop_id, $service_name)
    {
        if (is_null($service_name) || is_null($shop_id)) {
            return false;
        }

        $service = Service::where([
            ['shop_id', '=', $shop_id],
            ['name', '=', $service_name],
        ])->first();

        return $service;
    }

    public function get_all_services_by_shop($shop_id)
    {
        $services = Service::where('shop_id', $shop_id)->get();
        return $services;
    }

    // services required should be an array of string
    public function get_selected_services_by_shop($shop_id, $services_required)
    {
        $selected_services = array();

        sort($services_required);
        $services = get_all_services_by_shop($shop_id);

        foreach ($services as $serv) {
            if (in_array($serv->name, $services_required)) {
                array_push($selected_services, $serv);
            }

        }

        return $selected_services;
    }

    public function get_all_service_names_by_shop($shop_id)
    {
        $services = $this->get_all_services_by_shop($shop_id);

        // TODO Improve
        // match by name and return list
        $service_array = array();
        foreach ($services as $service) {
            array_push($service_array, $service->name);
        }
        sort($service_array);

        return $service_array;
    }
}
