<?php

namespace App\Http\Controllers;

use App\Http\Requests\ShowCarModelsRequest;
use App\Services\CarProfileService;
use App\Services\MasterlistCarService;
use App\Services\MasterlistPmsOthersService;
use App\Services\MasterlistPmsService;
use App\Services\MasterlistServicesService;
use App\Services\RequestService;
use App\Services\ShopService;
use Illuminate\Http\Request;

class MasterlistController extends Controller
{
    protected $car_profile_service;
    protected $masterlist_car_service;
    protected $masterlist_pms_service;
    protected $masterlist_pms_others_service;
    protected $masterlist_services_service;
    protected $request_service;
    protected $shop_service;

    public function __construct(
        CarProfileService $car_profile_service,
        MasterlistCarService $masterlist_car_service,
        MasterlistPmsService $masterlist_pms_service,
        MasterlistPmsOthersService $masterlist_pms_others_service,
        MasterlistServicesService $masterlist_services_service,
        RequestService $request_service,
        ShopService $shop_service
    ) {
        $this->car_profile_service = $car_profile_service;
        $this->masterlist_car_service = $masterlist_car_service;
        $this->masterlist_pms_service = $masterlist_pms_service;
        $this->masterlist_pms_others_service = $masterlist_pms_others_service;
        $this->masterlist_services_service = $masterlist_services_service;
        $this->request_service = $request_service;
        $this->shop_service = $shop_service;
    }

    public function show_pms_list()
    {
        // return response_success($this->masterlist_pms_service->list_all());
        $response['success'] = true;
        $response['data'] = $this->masterlist_pms_service->list_all();
        return response()->json($response);
    }

    public function show_pms_others_list()
    {
        // return response_success($this->masterlist_pms_others_service->list_all());
        $response['success'] = true;
        $response['data'] = $this->masterlist_pms_others_service->list_all();
        return response()->json($response);
    }

    public function show_service_types()
    {
        // $types = [];
        // $serviceTypes = $this->masterlist_services_service->list_types();

        // foreach ($serviceTypes as $serviceType) {
        //     array_push($types, $serviceType['type']);
        // }

        // return response_success($types);
        $response['success'] = true;
        $types = [];
        $serviceTypes = $this->masterlist_services_service->list_types();

        foreach ($serviceTypes as $serviceType) {
            array_push($types, $serviceType['type']);
        }

        $response['data'] = $types;
        return response()->json($response);
    }

    public function show_services()
    {
        // $type = request()->query('type');
        // return response_success($this->masterlist_services_service->list_services($type));
        $response['success'] = true;
        $response['data'] = $this->masterlist_services_service->list_services(
            request()->query('type'));
        return response()->json($response);
    }

    public function show_car_makes()
    {
        // return response_success($this->masterlist_car_service->list_car_makes());
        $response['success'] = true;
        $response['data'] = $this->masterlist_car_service->list_car_makes();
        return response()->json($response);
    }

    public function show_car_models(ShowCarModelsRequest $request)
    {
        // return response_success($this->masterlist_car_service->list_car_models($request->make_id));
        $response['success'] = true;
        $response['data'] = $this->masterlist_car_service->list_car_models($request->make_id);
        return response()->json($response);
    }

    public function show_car_years()
    {
        // $model_id = request()->query('model_id');
        // return response_success($this->masterlist_car_service->list_car_years($model_id));
        $response['success'] = true;
        $response['data'] = $this->masterlist_car_service->list_car_years(
            request()->query('model_id'));
        return response()->json($response);
    }

    public function show_car_trims()
    {
        // $model_id = request()->query('model_id');
        // $year = request()->query('year');
        // return response_success($this->masterlist_car_service->list_car_trims($model_id, $year));
        $response['success'] = true;
        $response['data'] = $this->masterlist_car_service->list_car_trims(
            request()->query('model_id'), request()->query('year'));
        return response()->json($response);
    }

    public function show_vehicle_types()
    {
        $response['success'] = true;
        $response['data'] = $this->car_profile_service->list_vehicle_types();
        return response()->json($response);
    }

    public function show_engine_types()
    {
        $response['success'] = true;
        $response['data'] = $this->car_profile_service->list_engine_types();
        return response()->json($response);
    }

    public function show_transmission_types()
    {
        $response['success'] = true;
        $response['data'] = $this->car_profile_service->list_transmission_types();
        return response()->json($response);
    }

    public function show_oil_types()
    {
        $response['success'] = true;
        $response['data'] = $this->car_profile_service->list_oil_types();
        return response()->json($response);
    }

    public function show_part_types()
    {
        $response['success'] = true;
        $response['data'] = $this->car_profile_service->list_part_types();
        return response()->json($response);
    }

    public function show_shop_types()
    {
        $response['success'] = true;
        $response['data'] = $this->shop_service->list_shop_types();
        return response()->json($response);
    }

    public function show_time()
    {
        $response['success'] = true;
        $response['data'] = $this->request_service->list_time();
        return response()->json($response);
    }

    public function get_pms_by_mileage()
    {
        $response['success'] = false;
        $mileage = request()->query('mileage');
        $pms = $this->masterlist_pms_service->get_by_mileage($mileage);

        if (!is_null($pms)) {
            $response['success'] = true;
            $response['data'] = $pms;
        }

        return $response;
    }

    public function get_pms_others_by_type()
    {
        $response['success'] = false;
        $type = request()->query('type');
        $otherService = $this->masterlist_pms_others_service->get_by_type($type);

        if (!is_null($otherService)) {
            $response['success'] = true;
            $response['data'] = $otherService;
        }

        return $response;
    }
}
