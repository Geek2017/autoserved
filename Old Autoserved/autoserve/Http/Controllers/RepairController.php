<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Utils\Constants;
use App\Http\Controllers\Utils\Utilities;
use App\Services\RepairService;
use Illuminate\Http\Request;

class RepairController extends Controller
{
    protected $repair_service;

    public function __construct(RepairService $repair_service)
    {
        $this->repair_service = $repair_service;
    }

    public function repair_types()
    {
        $response = ['success' => false];
        $repair_types = $this->repair_service->get_repair_types();

        if (!is_null($repair_types)) {
            $response['success'] = true;
            $types = [];

            foreach ($repair_types as $repair_type) {
                array_push($types, $repair_type->type);
            }

            $response['data'] = $types;
        } else {
            $response['error'] = Utilities::error(Constants::ERROR_MSG_GENERIC, 0, 'Error fetching repair types.');
        }

        return response()->json($response);
    }

    public function repair_names(Request $request)
    {
        $response = ['success' => false];
        $repairs = $this->repair_service->get_repair_names($request->query('name'));

        if (!is_null($repairs)) {
            $response['success'] = true;
            $response['data'] = $repairs;
        } else {
            $response['error'] = Utilities::error(Constants::ERROR_MSG_GENERIC, 0, 'Error fetching repair names.');
        }

        return response()->json($response);
    }
}
