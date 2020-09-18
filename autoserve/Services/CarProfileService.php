<?php

namespace App\Services;

use App\CarProfile;
use App\Http\Requests\UpdateCarProfileRequest;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CarProfileService
{
    public function list_vehicle_types()
    {
        return [
            CarProfile::TYPE_VEHICLE_COMPACT,
            CarProfile::TYPE_VEHICLE_MEDIUM,
            CarProfile::TYPE_VEHICLE_LARGE,
            CarProfile::TYPE_VEHICLE_SMALL,
            CarProfile::TYPE_VEHICLE_VAN,
            CarProfile::TYPE_VEHICLE_COMMERCIAL,
        ];
    }

    public function list_engine_types()
    {
        return [
            CarProfile::TYPE_ENGINE_DIESEL,
            CarProfile::TYPE_ENGINE_GASOLINE,
        ];
    }

    public function list_transmission_types()
    {
        return [
            CarProfile::TYPE_TRANSMISSION_AUTO,
            CarProfile::TYPE_TRANSMISSION_MANUAL,
        ];
    }

    public function list_oil_types()
    {
        return [
            CarProfile::TYPE_OIL_REGULAR,
            CarProfile::TYPE_OIL_SEMI,
            CarProfile::TYPE_OIL_FULLY,
            CarProfile::TYPE_OIL_SHOP_RECOMMENDATION,
        ];
    }

    public function list_part_types()
    {
        return [
            CarProfile::TYPE_PART_OEM,
            CarProfile::TYPE_PART_REPLACEMENT,
            CarProfile::TYPE_PART_SHOP_RECOMMENDATION,
        ];
    }

    /**
     * =========================
     * |      CRUD METHODS     |
     * =========================
     */
    public function get_car_profiles($user)
    {
        $result = null;

        if ($user->user_type === User::USER_TYPE_ADMIN) {
            $result = CarProfile::withTrashed()->get(); // includes soft deleted records
        } else if ($user->user_type === User::USER_TYPE_CUSTOMER) {
            $result = CarProfile::where('user_id', $user->id)->get();
        }

        return $result;
    }

    // returns profiles that are not soft deleted
    public function get($id)
    {
        return CarProfile::find($id);
    }

    public function create_car_profile(Request $request, $user_id)
    {
        $result = null;

        $validatedData = $request->validate([
            'type' => 'required|string',
            'plate_number' => 'required|unique:car_profiles,plate_number',
        ]);

        $car = CarProfile::create([
            'type' => $validatedData['type'],
            'user_id' => $user_id,
            'make_id' => $request['make_id'],
            'car_year' => $request['car_year'],
            'model_id' => $request['model_id'],
            'trim_id' => $request['trim_id'],
            'engine_type' => $request['engine_type'],
            'transmission' => $request['transmission'],
            'color' => $request['color'],
            'plate_number' => $request['plate_number'],
            'date_purchased' => $request['date_purchased'],
            'current_mileage' => $request['current_mileage'],
            'last_serviced' => $request['last_serviced'],
            'longitude' => $request['longitude'],
            'latitude' => $request['latitude'],
        ]);

        if (!is_null($car)) {
            $result = $car;
        }

        return $result;
    }

    public function update_car_profile(UpdateCarProfileRequest $request, $car_id)
    {
        $result = false;
        $user = Auth::user();
        $car = CarProfile::where([
            'id' => $car_id,
            'user_id' => $user->id,
        ])->first();

        if (!is_null($car)) {
            $request['engine_type'] && $car->engine_type = $request['engine_type'];
            $request['transmission'] && $car->transmission = $request['transmission'];
            $request['color'] && $car->color = $request['color'];
            $request['plate_number'] && $car->plate_number = $request['plate_number'];
            $car->save();
            $result = true;
        }

        return $result;
    }

    // soft delete - returns deleted car profile object
    // if $check_user_id = true, $car->user_id == $user_id before deleting
    public function delete($car_id, $check_user_id = false, $user_id = -1)
    {
        $result = null;

        if ($check_user_id) {
            if ($user_id > 0) {
                $car = CarProfile::where([
                    ['id', $car_id],
                    ['user_id', $user_id],
                ])->first();
            }
        } else {
            $car = $this->get($car_id);
        }

        if (!is_null($car)) {
            $result = $car;
            $car->delete();
        }

        return $result;
    }

    // restore soft deleted car profile
    public function restore($car_id, $check_user_id = false, $user_id = -1)
    {
        $result = null;

        if ($check_user_id) {
            if ($user_id > 0) {
                $car = CarProfile::onlyTrashed()->where([
                    ['id', $car_id],
                    ['user_id', $user_id],
                ])->first();
            }
        } else {
            $car = CarProfile::onlyTrashed()->where('id', $car_id)->first();
        }

        if (!is_null($car)) {
            $car->restore();
            $result = $car;
        }

        return $result;
    }

    // permanently delete from DB - returns deleted car profile object
    public function hard_delete($car_id)
    {
        $result = null;

        $car = $this->get($car_id);
        if (!is_null($car)) {
            $result = $car;
            $car->forceDelete();
        }

        return $result;
    }

    /**
     * =========================
     * |     HELPER METHODS     |
     * =========================
     */
    public function update_coordinates($car_id, $long, $lat)
    {
        $result = null;

        $car = $this->get($car_id);

        if (!is_null($car) && !is_null($long) && !is_null($lat)) {
            $car->longitude = $long;
            $car->latitude = $lat;

            $car->save();

            $result = $car;
        }

        return $result;
    }

}
