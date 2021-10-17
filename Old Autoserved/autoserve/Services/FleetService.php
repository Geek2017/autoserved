<?php

namespace App\Services;

use App\CarProfile;
use App\Fleet;
use App\User;

class FleetService
{

    /**
     * =========================
     * |      CRUD METHODS     |
     * =========================
     */
    public function get_fleets($user)
    {
        $result = null;

        if ($user->user_type === User::USER_TYPE_ADMIN) {
            $result = Fleet::all();
        }

        return $result;
    }

    public function get($fleet_id)
    {
        return Fleet::find($fleet_id);
    }

    public function get_fleet_users($id)
    {
        return User::where('fleet_id', $id)->orderBy('updated_at', 'ASC')->get();
    }

    public function validate($slug, $key, $token)
    {
        return Fleet::where([
            'slug' => $slug,
            'fleet_key' => $key,
            'token' => $token,
        ])->first();
    }

    public function get_fleet_cars($id)
    {
        $result = null;
        $users = $this->get_fleet_users($id);

        $result = CarProfile::whereHas('user',
            function ($query) use ($id) {
                $query->where(['fleet_id' => $id]);
            })
            ->get();

        return $result;
    }

    public function create_fleet($user_id, $data)
    {
        $result = null;
        $fleet = Fleet::create([
            'name' => $data['name'],
            'contact' => $data['contact'],
            'fleet_admin' => $user_id,
            'fleet_key' => $data['fleet_key'],
            'token' => $data['token'],
        ]);

        if (!is_null($fleet)) {
            $result = $fleet;
        }

        return $result;
    }

    public function update_fleet($request, $user_id, $id)
    {
        $result = null;

        $validatedData = $request->validate([
            'name' => 'required|string',
            'contact' => 'required|string',
        ]);

        $fleet = $this->get($id);

        if (!is_null($fleet)) {
            $fleet->name = $validatedData['name'];
            $fleet->avatar_id = $request['avatar_id'];
            $fleet->banner_id = $request['banner_id'];
            $fleet->contact = $validatedData['contact'];
            $fleet->description = $request['description'];
            $fleet->address = $request['address'];
            $fleet->tin = $request['tin'];
            $fleet->longitude = $request['longitude'];
            $fleet->latitude = $request['latitude'];

            $fleet->save();
            $result = $fleet;
        }

        return $result;
    }

    public function soft_delete($id)
    {
        $result = null;

        $fleet = $this->get($id);
        if (!is_null($fleet)) {
            $result = $fleet;
            $fleet->delete();
        }

        return $result;
    }

    /**
     * =========================
     * |   Additional METHODS   |
     * =========================
     */
    public function restore($id)
    {
        $result = null;

        $fleet = $this->get_deleted($id);
        if (!is_null($fleet)) {
            $fleet->restore();
            $result = $fleet;
        }

        return $result;
    }

}
