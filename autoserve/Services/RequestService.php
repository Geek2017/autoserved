<?php

namespace App\Services;

use App\CarProfile;
use App\CarSchedule;
use App\Http\Controllers\Utils\Constants;
use App\RequestPms;
use App\RequestPmsOther;
use App\RequestPmsReplacement;
use App\User;
use App\UserRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RequestService
{
    public function list_time()
    {
        return [
            UserRequest::SCHEDULE_TIME_AM,
            UserRequest::SCHEDULE_TIME_PM,
            UserRequest::SCHEDULE_TIME_ANYTIME,
        ];
    }

    /**
     * =========================
     * |      CRUD METHODS     |
     * =========================
     */
    public function get_requests()
    {
        $user = Auth::user();
        $result = null;

        // update remaining time
        UserRequest::where('status', UserRequest::STATUS_OPEN)->whereRaw('created_at < ?',
            date('Y-m-d H:i:s', strtotime('-1 day', strtotime(now()))))->update(['status' => UserRequest::STATUS_EXPIRED]);

        if ($user->user_type === User::USER_TYPE_ADMIN) {
            $result = UserRequest::all();
        } else if ($user->user_type === User::USER_TYPE_VENDOR) {
            $result = UserRequest::where('status', UserRequest::STATUS_OPEN)->orderBy('id', 'desc')->get();
        } else if ($user->user_type === User::USER_TYPE_CUSTOMER) {
            $result = UserRequest::whereHas('car',
                function ($query) use ($user) {
                    $query->whereHas('user', function ($query) use ($user) {
                        $query->where('id', $user->id);
                    });
                }
            )->with('car')->orderBy('id', 'desc')->get();
        }

        return $result;
    }

    public function get_car_requests($car_id)
    {
        return UserRequest::where(['car_id' => $car_id])->get();
    }

    public function get_by_id($id)
    {
        return UserRequest::where(['id' => $id])->first();
    }

    public function get($id, $type)
    {
        $request = null;

        if ($type === Constants::REQUEST_TYPE_PMS) {
            $request = RequestPms::find($id);
        } else if ($type === Constants::REQUEST_TYPE_SERVICES) {
        }

        return $request;
    }

    public function accept_request($request_id)
    {
        UserRequest::where(['id' => $request_id])->update(['status' => UserRequest::STATUS_ACCEPTED]);
    }

    public function create_request(Request $validatedData)
    {
        $success = false;
        $result = null;

        // add to 'Requests' table
        $car_sched = CarSchedule::where(['id' => $validatedData['car_schedule_id']])->first();
        $request = UserRequest::create([
            'car_id' => $car_sched->car_id,
            'preferred_schedule' => $validatedData['preferred_schedules'],
            'type' => $validatedData['type'],
            'longitude' => $car_sched->car->longitude,
            'latitude' => $car_sched->car->latitude,
            'status' => Constants::REQUEST_STATUS_OPEN,
            'current_mileage' => $car_sched->car->current_mileage,
        ]);
        // return if request creation is unsuccessful
        if (is_null($request)) {
            return null;
        }

        // add to requests - PREVENTIVE
        if ($validatedData['type'] === Constants::REQUEST_TYPE_PMS) {
            // create Request PMS
            $reqPmsId = RequestPms::insertGetId([
                'request_id' => $request->id,
                'oil_type' => $validatedData['oil_type'],
                'masterlist_pms_id' => $car_sched->masterlist_pms_id,
                'user_id' => $car_sched->car->user->id,
            ]);

            // create Request PMS Replacement
            if (!is_null($reqPmsId)) {
                $success = true;
                foreach ($validatedData['replacements'] as $key => $val) {
                    $replacementId = RequestPmsReplacement::insertGetId([
                        'change_index' => $val['index'],
                        'parts_type' => $val['type'],
                        'request_pms_id' => $reqPmsId,
                    ]);

                    if ($replacementId <= 0) {
                        $success = false;
                        break;
                    }
                }

                // return Request PMS object
                if ($success) {
                    $result = $request;
                }

            }
        }
        // add to requests - CORRECTIVE
        else if ($validatedData['type'] === Constants::REQUEST_TYPE_SERVICES) {
        }

        return $result;
    }

    public function create_other_request($httpRequest)
    {
        $result = null;
        $user = Auth::user();
        $car = CarProfile::where('id', $httpRequest['car_id'])->first();
        $request = UserRequest::create([
            'car_id' => $car->id,
            'preferred_schedule' => $httpRequest['preferred_schedules'],
            'type' => $httpRequest['type'],
            'longitude' => $car->longitude,
            'latitude' => $car->latitude,
            'status' => Constants::REQUEST_STATUS_OPEN,
        ]);

        if (is_null($request)) {
            return null;
        }

        if ($httpRequest['type'] === Constants::REQUEST_TYPE_OTHER_SERVICES) {
            $reqPmsId = RequestPmsOther::insertGetId([
                'request_id' => $request->id,
                'value' => $httpRequest['oil_type'],
                'masterlist_pms_others_id' => $httpRequest['pms_others_id'],
                'user_id' => $user->id,
            ]);

            if (!is_null($reqPmsId)) {
                $result = $request;
            }
        }

        return $result;
    }

    public function cancel($id)
    {
        $result = null;
        $request = UserRequest::where('id', $id)->first();

        if (!is_null($request)) {
            $request->status = UserRequest::STATUS_CANCELLED;
            $request->save();
            $result = $request;
        }

        return $result;
    }
}
