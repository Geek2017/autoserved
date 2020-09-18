<?php

namespace App\Services;

use App\Estimate;
use App\EstimatePmsOther;
use App\EstimatePmsReplacement;
use App\Http\Controllers\Utils\Constants;
use App\RequestPms;
use App\RequestPmsOther;
use App\ShopPmsLabor;
use App\ShopPmsOil;
use App\ShopPmsOther;
use App\ShopPmsOtherLabor;
use App\User;
use App\UserRequest;
use Illuminate\Http\Request;

class EstimateService
{
    /**
     * =========================
     * |      CRUD METHODS     |
     * =========================
     */
    public function get_estimates($user)
    {
        $result = null;

        if ($user->user_type === User::USER_TYPE_ADMIN) {
            $result = Estimate::all();
        } else if ($user->user_type === User::USER_TYPE_VENDOR) {
            // get requested estimates of this user
            $result = Estimate::where('status', Estimate::ESTIMATE_STATUS_REQUESTED)
                ->whereHas('shop',
                    function ($query) use ($user) {
                        $query->where('user_id', $user->id);
                    })->with("shop")
                ->orderBy('id', 'desc')
                ->get();
        } else if ($user->user_type === User::USER_TYPE_CUSTOMER) {
            // get estimates with requested status of this user
            $result = Estimate::where('customer_id', $user->id)
                ->where('status', Estimate::ESTIMATE_STATUS_REQUESTED)
                ->orderBy('created_at', 'desc')
                ->get();
        }

        return $result;
    }

    public function get($id)
    {
        $estimate = Estimate::find($id);

        return $estimate;
    }

    public function create_estimate(Request $httpReq, $user_id)
    {
        return $this->create_update_estimate($httpReq, $user_id, true);
    }

    public function update_estimate(Request $httpReq, $user_id, $id)
    {
        return $this->create_update_estimate($httpReq, $user_id, false, $id);
    }

    public function update_status($id, $status)
    {
        $estimate = Estimate::where([['id', $id], ['status', '<>', $status]])->first();
        if (!is_null($estimate)) {
            $estimate->status = $status;
            $estimate->save();
        }

        return $estimate;
    }

    public function decline_other_estimates($request_id)
    {
        Estimate::where([
            'request_id' => $request_id,
            'status' => Estimate::ESTIMATE_STATUS_REQUESTED,
        ])->update(['status' => Estimate::ESTIMATE_STATUS_DECLINED]);
    }

    /**
     * =========================
     * |    Helper Methods     |
     * =========================
     */
    private function create_update_estimate(Request $httpReq, $user_id, $create, $id = -1)
    {
        $result = null;
        $request = UserRequest::find($httpReq['request_id']);
        if (is_null($request)) {
            return $result;
        }

        // preventive
        if ($request->type === Constants::REQUEST_TYPE_PMS) {
            $result = $this->create_update_estimate_pms($httpReq, $request, $user_id, $create, $id);
        } else if ($request->type === Constants::REQUEST_TYPE_OTHER_SERVICES) {
            $result = $this->create_update_estimate_pms_others($httpReq, $request, $user_id, $create, $id);
        }

        return $result;
    }

    private function create_update_estimate_pms_others(Request $httpReq, UserRequest $request, $user_id, $create, $estimate_id = -1)
    {
        $estimate = null;

        // get estimate is 'update'
        if (!$create) {
            $estimate = $this->get($estimate_id);

            if (is_null($estimate) || (!is_null($estimate) && $estimate->status !== Estimate::ESTIMATE_STATUS_REQUESTED)) {
                return null;
            }
        }

        // data validation
        $validatedData = $httpReq->validate([
            'shop_id' => 'required|numeric',
            'freebies' => 'array',
            'discount' => 'required',
            'preferred_date' => 'required|string',
            'preferred_time' => 'required|string',
            'other_services' => 'required|array',
            'other_items' => 'array',
            'other_replacement_items' => 'array',
        ]);

        // validate shop accepts PMS requests
        $shop = app(ShopService::class)->get($validatedData['shop_id']);
        if (!$shop->pms_enabled) {
            return null;
        }
        $request_pms_other = RequestPmsOther::where('request_id', $request->id)->first();

        // process data
        $subtotal = $this->get_subtotal_pms_others($request_pms_other, $user_id, $validatedData['other_services']['liters'], $request->car->type, $validatedData['other_items'], $validatedData['other_replacement_items']);
        $total = $this->get_total($subtotal, $validatedData['discount']);

        if ($create) {
            // create Estimate entry
            $estimate = Estimate::create([
                'request_id' => $request->id,
                'shop_id' => $validatedData['shop_id'],
                'freebies' => $validatedData['freebies'],
                'customer_id' => $request->car->user->id,
                'notes' => $httpReq['notes'],
                'status' => Estimate::ESTIMATE_STATUS_REQUESTED,
                'discount' => $validatedData['discount'],
                'amount' => $subtotal,
                'total' => $total,
                'preferred_date' => $validatedData['preferred_date'],
                'preferred_time' => $validatedData['preferred_time'],
            ]);
            $other_services = $httpReq['other_services'];
            // create estimate_pms_replacements record for each replacement
            EstimatePmsOther::insert([
                'request_pms_others_id' => $other_services['pms_others_id'],
                'liters' => $other_services['liters'],
                'estimate_id' => $estimate->id,
                'other_items' => json_encode($validatedData['other_items']),
                'other_replacement_items' => json_encode($validatedData['other_replacement_items']),
            ]);
        } else {
            $estimate->request_id = $request->id;
            $estimate->shop_id = $validatedData['shop_id'];
            $estimate->freebies = $validatedData['freebies'];
            $estimate->notes = isset($httpReq['notes']) ? $httpReq['notes'] : $estimate->notes;
            $estimate->discount = $validatedData['discount'];
            $estimate->amount = $subtotal;
            $estimate->total = $total;
            $estimate->preferred_date = $validatedData['preferred_date'];
            $estimate->preferred_time = $validatedData['preferred_time'];
            $estimate->save();
        }

        return $estimate;
    }

    private function create_update_estimate_pms(Request $httpReq, UserRequest $request, $user_id, $create, $estimate_id = -1)
    {
        $estimate = null;

        // get estimate is 'update'
        if (!$create) {
            $estimate = $this->get($estimate_id);

            if (is_null($estimate) || (
                !is_null($estimate) && $estimate->status !== Estimate::ESTIMATE_STATUS_REQUESTED// only allow update when status is still requesting
            )) {
                return null;
            }
        }

        // data validation
        $validatedData = $httpReq->validate([
            'shop_id' => 'required|numeric',
            'freebies' => 'array',
            'discount' => 'required',
            'preferred_date' => 'required|string',
            'preferred_time' => 'required|string',
            'replacements' => 'required|array',
        ]);

        // validate shop accepts PMS requests
        $shop = app(ShopService::class)->get($validatedData['shop_id']);
        if (!$shop->pms_enabled) {
            return null;
        }
        $request_pms = RequestPms::where('request_id', $request->id)->first();

        // process data
        $subtotal = $this->get_subtotal_pms($shop, $request, $request_pms, $validatedData['replacements'], $user_id);
        $total = $this->get_total($subtotal, $validatedData['discount']);

        if ($create) {
            // create Estimate entry
            $estimate = Estimate::create([
                'request_id' => $request->id,
                'shop_id' => $validatedData['shop_id'],
                'freebies' => $validatedData['freebies'],
                'customer_id' => $request->car->user->id,
                'notes' => $httpReq['notes'],
                'status' => Estimate::ESTIMATE_STATUS_REQUESTED,
                'discount' => $validatedData['discount'],
                'amount' => $subtotal,
                'total' => $total,
                'preferred_date' => $validatedData['preferred_date'],
                'preferred_time' => $validatedData['preferred_time'],
            ]);

            // create estimate_pms_replacements record for each replacement
            foreach ($httpReq['replacements'] as $replacement) {
                $estimate_pms_replacement = EstimatePmsReplacement::insert([
                    'request_pms_replacement_id' => $replacement['replacement_id'],
                    'price' => $replacement['price'],
                    'liters' => $replacement['liters'],
                    'estimate_id' => $estimate->id,
                ]);
            }
        } else {
            $estimate->request_id = $request->id;
            $estimate->shop_id = $validatedData['shop_id'];
            $estimate->freebies = $validatedData['freebies'];
            $estimate->notes = isset($httpReq['notes']) ? $httpReq['notes'] : $estimate->notes;
            $estimate->discount = $validatedData['discount'];
            $estimate->amount = $subtotal;
            $estimate->total = $total;
            $estimate->preferred_date = $validatedData['preferred_date'];
            $estimate->preferred_time = $validatedData['preferred_time'];

            $estimate->save();
        }

        return $estimate;
    }

    private function get_subtotal_pms_others(RequestPmsOther $request_pms_other, $user_id, $liters, $car_type, $other_items, $other_replacement_items)
    {
        $shop_pms_other = ShopPmsOther::where(['user_id' => $user_id])->first();
        $shop_pms_labor = ShopPmsOtherLabor::where([
            'user_id' => $user_id,
            'masterlist_pms_others_id' => $request_pms_other['masterlist_pms_others_id'],
            'car_type' => $car_type,
        ])->first();
        $subtotal = $shop_pms_labor->price;
        $subtotal += $shop_pms_other->values[$request_pms_other->value] * $liters;

        foreach ($other_items as $item) {
            $subtotal += $item['price'];
        }

        foreach ($other_replacement_items as $item) {
            $subtotal += $item;
        }

        return $subtotal;
    }

    private function get_subtotal_pms($shop, UserRequest $request, RequestPms $request_pms, array $replacements, $user_id)
    {
        $subtotal = 0.0;

        // add PMS labor
        $shop_pms_labors = ShopPmsLabor::where([
            ['user_id', $user_id],
            ['mileage', $request_pms->pms->mileage],
            ['car_type', $request->car->type],
        ])->get();

        foreach ($shop_pms_labors as $labor) {
            $subtotal += $labor->price;
        }

        $shop_pms_oil = ShopPmsOil::where([
            ['user_id', $user_id],
            ['mileage', $request_pms->pms->mileage],
            ['oil_type', $request_pms->oil_type],
        ])->first();

        // add replacements
        for ($i = 0; $i < count($replacements); $i++) {
            if ($i !== count($replacements) - 1) {
                $subtotal += $replacements[$i]['price'];
            } else {
                $subtotal += $replacements[$i]['liters'] * $shop_pms_oil->price;
            }
        }

        return $subtotal;
    }

    private function get_total($subtotal, $discount)
    {
        if ($discount > 1) {
            $discount /= 100;
        }

        return $subtotal * (1 - $discount);
    }

}
