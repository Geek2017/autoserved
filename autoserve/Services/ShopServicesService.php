<?php

namespace App\Services;

use App\ShopCorrectiveService;
use App\ShopPmsLabor;
use App\ShopPmsOil;
use App\ShopPmsOther;
use App\ShopPmsOtherLabor;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ShopServicesService
{
    public function get_pms_data(User $user, $mileage)
    {
        $laborPrices = ShopPmsLabor::where('user_id', $user['id'])->where('mileage', $mileage)->get();
        $oilPrices = ShopPmsOil::where('user_id', $user['id'])->where('mileage', $mileage)->get();
        return [
            'labor_prices' => $laborPrices,
            'oil_type_prices' => $oilPrices,
        ];
    }

    public function get_all_pms_data()
    {
        $user = Auth::user();
        $laborPrices = ShopPmsLabor::select('mileage')->where('user_id', $user['id'])->groupBy('mileage')->orderBy('mileage')->get();
        $oilPrices = ShopPmsOil::select('mileage')->where('user_id', $user['id'])->groupBy('mileage')->orderBy('mileage')->get();
        $pricedLabor = [];
        $pricedOil = [];

        foreach ($laborPrices as $priced) {
            $pricedLabor[$priced['mileage']] = true;
        }

        foreach ($oilPrices as $priced) {
            $pricedOil[$priced['mileage']] = true;
        }

        return [
            'priced_labor' => $pricedLabor,
            'priced_oil' => $pricedOil,
        ];
    }

    public function get_all_pms_others_data()
    {
        $user = Auth::user();
        $pricedPmsOthers = ShopPmsOther::select('masterlist_pms_others_id')->where([
            'user_id' => $user['id'],
        ])->get();
        $result = [];

        foreach ($pricedPmsOthers as $priced) {
            $result[$priced->pms_others->name] = true;
        }

        return $result;
    }

    public function get_pms_others_price($id)
    {
        return [
            'oil_prices' => $this->get_pms_others($id),
            'labor_prices' => $this->get_pms_others_labor($id),
        ];
    }

    public function get_pms_others_labor($id)
    {
        $user = Auth::user();
        return ShopPmsOtherLabor::where([
            'user_id' => $user['id'],
            'masterlist_pms_others_id' => $id,
        ])->get();
    }

    public function get_pms_others_labor_by_type($id, $type)
    {
        $user = Auth::user();
        return ShopPmsOtherLabor::where([
            'user_id' => $user['id'],
            'masterlist_pms_others_id' => $id,
            'car_type' => $type,
        ])->first();
    }

    public function get_pms_others($id)
    {
        $user = Auth::user();
        return ShopPmsOther::where([
            'user_id' => $user['id'],
            'masterlist_pms_others_id' => $id,
        ])->first();
    }

    public function get_pms_labor_price(User $user, $mileage, $car_type)
    {
        return [
            'labor_price' => ShopPmsLabor::where([
                'user_id' => $user['id'],
                'mileage' => $mileage,
                'car_type' => $car_type,
            ])->first(),
        ];
    }

    public function get_pms_oil_price(User $user, $mileage, $oil_type)
    {
        return ['oil_price' => ShopPmsOil::where([
            'user_id' => $user['id'],
            'mileage' => $mileage,
            'oil_type' => $oil_type])->first()];
    }

    public function save_labor_prices(User $user, $mileage, $carType, $price)
    {
        $shopPmsLabor = ShopPmsLabor::where('user_id', $user['id'])
            ->where('mileage', $mileage)
            ->where('car_type', $carType)
            ->first();

        if (!is_null($shopPmsLabor)) {
            $shopPmsLabor->timestamps = false;
            $shopPmsLabor->update(['price' => $price]);
        } else {
            ShopPmsLabor::insert([
                'user_id' => $user['id'],
                'mileage' => $mileage,
                'car_type' => $carType,
                'price' => $price,
            ]);
        }
    }

    public function save_other_labor_prices($pms_id, $carType, $price)
    {
        $user = Auth::user();
        $shopPmsLabor = ShopPmsOtherLabor::where('user_id', $user['id'])
            ->where('masterlist_pms_others_id', $pms_id)
            ->where('car_type', $carType)
            ->first();

        if (!is_null($shopPmsLabor)) {
            $shopPmsLabor->timestamps = false;
            $shopPmsLabor->update(['price' => $price]);
        } else {
            ShopPmsOtherLabor::insert([
                'user_id' => $user['id'],
                'masterlist_pms_others_id' => $pms_id,
                'car_type' => $carType,
                'price' => $price,
            ]);
        }
    }

    public function save_oil_prices(User $user, $mileage, $oilType, $price)
    {
        $shopPmsOil = ShopPmsOil::where('user_id', $user['id'])
            ->where('mileage', $mileage)
            ->where('oil_type', $oilType)
            ->first();

        if (!is_null($shopPmsOil)) {
            $shopPmsOil->timestamps = false;
            $shopPmsOil->update(['price' => $price]);
        } else {
            ShopPmsOil::insert([
                'user_id' => $user['id'],
                'mileage' => $mileage,
                'oil_type' => $oilType,
                'price' => $price,
            ]);
        }
    }

    public function save_pms_others_data($request)
    {
        $result = true;
        $shopPmsOthers = $this->get_pms_others($request['pms_others_id']);
        $user = Auth::user();

        if (is_null($shopPmsOthers)) {
            ShopPmsOther::insert([
                'masterlist_pms_others_id' => $request['pms_others_id'],
                'user_id' => $user['id'],
            ]);
            $shopPmsOthers = $this->get_pms_others($request['pms_others_id']);
        }

        $shopPmsOthers->timestamps = false;
        $shopPmsOthers->update(['values' => $request['values']]);

        foreach ($request['labor_prices'] as $type => $value) {
            $shopPmsOthersLabor = $this->get_pms_others_labor_by_type($request['pms_others_id'], $type);

            if (!is_null($shopPmsOthersLabor)) {
                $shopPmsOthersLabor->timestamps = false;
                $shopPmsOthersLabor->update(['price' => $value]);
            } else {
                ShopPmsOtherLabor::insert([
                    'masterlist_pms_others_id' => $request['pms_others_id'],
                    'user_id' => $user['id'],
                    'car_type' => $type,
                    'price' => $price,
                ]);
            }
        }

        return $result;
    }

    /**
     * =========================
     * |      CRUD METHODS     |
     * =========================
     */
    public function get_services()
    {
        $result = null;
        $user = Auth::user();

        if ($user->user_type === User::USER_TYPE_ADMIN) {
            $result = ShopCorrectiveService::get();
        } else if ($user->user_type === User::USER_TYPE_VENDOR) {
            $result = ShopCorrectiveService::where('user_id', $user->id)->get();
        }

        return $result;
    }

    public function create_corrective_service(Request $request)
    {
        $user = Auth::user();
        return ShopCorrectiveService::create([
            'uuid' => Str::uuid(),
            'masterlist_service_id' => $request->service_id,
            'min_price' => $request->min,
            'max_price' => $request->max,
            'description' => $request->description,
            'require_documents' => !is_null($request->require_documents) ? $request->require_documents : false,
            'user_id' => $user->id,
        ]);
    }

    public function update_service(Request $request, $service_id)
    {
        $result = null;

        $service = $this->get($service_id);

        if (!is_null($service)) {
            $validatedData = $request->validate([
                'name' => 'required|max:100',
                'type' => 'required|max:20',
                'description' => 'string',
                'min' => 'integer|digits_between:1,20',
                'max' => 'integer|digits_between:1,20',
                'cap_type' => 'numeric|max:25',
                'capacity' => 'numeric|max:50',
            ]);

            $service->name = $validatedData['name'];
            $service->type = $validatedData['type'];
            $service->description = $validatedData['description'];
            $service->min = $validatedData['min'];
            $service->max = $validatedData['max'];
            $service->cap_type = $validatedData['cap_type'];
            $service->capacity = $validatedData['capacity'];

            $service->save();

            $result = $service;
        }

        return $result;
    }

    public function get($id)
    {
        $service = null;

        if ($id > 0) {
            $service = Service::find($id);
        }

        return $service;
    }

    // returns deleted service
    public function delete($id)
    {
        $service = null;

        $service_to_delete = $this->get($id);
        if (!is_null($service_to_delete)) {
            $service = $service_to_delete;
            $service_to_delete->delete();
        }

        return $service;
    }

    /**
     * =========================
     * |     Other METHODS     |
     * =========================
     */

    public function get_services_by_repair_id($repair_id)
    {
        $services = array();

        $services = Service::where('repair_id', $repair_id)->get();

        return $services;
    }
}
