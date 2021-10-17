<?php

namespace App\Services;

use App\Application;
use App\Estimate;
use App\Http\Controllers\Utils\Constants;
use App\MasterlistPms;
use App\Shop;
use App\ShopPmsLabor;
use App\ShopPmsOil;
use App\User;
use App\UserRequest;
use Illuminate\Http\Request;

class ShopService
{
    public function list_shop_types()
    {
        return [
            Shop::SHOP_TYPE_ACCESSORY_SHOP,
            Shop::SHOP_TYPE_AUTO_AIRCON_REPAIR,
            Shop::SHOP_TYPE_AUTO_DETAILING,
            Shop::SHOP_TYPE_AUTO_PARTS,
            Shop::SHOP_TYPE_AUTO_REPAIR,
            Shop::SHOP_TYPE_AUTO_ELECTRICAL,
            Shop::SHOP_TYPE_BATTERY_SHOP,
            Shop::SHOP_TYPE_CAR_PAINT,
            Shop::SHOP_TYPE_CAR_WASH,
            Shop::SHOP_TYPE_CAR_WRAP,
            Shop::SHOP_TYPE_DEALER_SERVICE_CENTER,
            Shop::SHOP_TYPE_EMISSION_CENTER,
            Shop::SHOP_TYPE_GAS_STATION,
            Shop::SHOP_TYPE_GLASS_REPAIR,
            Shop::SHOP_TYPE_SERVICE_CENTER,
            Shop::SHOP_TYPE_TINT_SHOP,
            Shop::SHOP_TYPE_TIRE_SHOP,
            Shop::SHOP_TYPE_TOWING_SERVICE,
            Shop::SHOP_TYPE_UPHOLSTERY,
            Shop::SHOP_TYPE_VULCANIZING_SHOP,
        ];
    }

    public function get_shops()
    {
        return Shop::withTrashed()->get();
    }

    public function get_pms_enabled(User $user)
    {
        $result = null;

        if ($user->user_type === User::USER_TYPE_ADMIN) {
            $result = Shop::withTrashed()->get(); // includes soft deleted shops
        } else if ($user->user_type === User::USER_TYPE_VENDOR) {
            $result = Shop::where(['pms_enabled' => true, 'user_id' => $user->id])->get();
        }

        return $result;
    }

    // When listing PMS enabled available shops, filter out available shops
    public function get_pms_enabled_by_request(User $user, $requestId)
    {
        if (is_null($requestId) || $requestId <= 0 || !UserRequest::where('id', $requestId)->exists()) {
            return null;
        }

        $shops = $this->get_pms_enabled($user);

        if (!is_null($shops)) { // filter PMS enabled shops
            // get Estimates created for this request ID
            $estimates = Estimate::where([
                ['status', Estimate::ESTIMATE_STATUS_REQUESTED],
                ['request_id', $requestId]])
                ->whereHas('shop',
                    function ($query) use ($user) {
                        $query->where('user_id', $user->id);
                    })->with("shop")
                ->orderBy('id', 'desc')
                ->get();

            if (count($estimates) > 0) {
                $filteredShops = array();

                // filter shops
                foreach ($shops as $shop) {
                    $hasEstimate = false;

                    foreach ($estimates as $est) {
                        if ($shop->id == $est->shop->id) {
                            $hasEstimate = true;
                            break;
                        }
                    }

                    // only add shops that has no existing estimate
                    if (!$hasEstimate) {
                        array_push($filteredShops, $shop);
                    }
                }

                $shops = $filteredShops;
            }
        }

        return $shops;
    }

    public function get_all_shops()
    {
        return Shop::all();
    }

    public function create_shop($user_id, $data)
    {
        $result = null;
        $operating_hours = [
            'sun' => [
                'open' => false,
                'start' => null,
                'end' => null,
            ],
            'mon' => [
                'open' => false,
                'start' => null,
                'end' => null,
            ],
            'tue' => [
                'open' => false,
                'start' => null,
                'end' => null,
            ],
            'wed' => [
                'open' => false,
                'start' => null,
                'end' => null,
            ],
            'thu' => [
                'open' => false,
                'start' => null,
                'end' => null,
            ],
            'fri' => [
                'open' => false,
                'start' => null,
                'end' => null,
            ],
            'sat' => [
                'open' => false,
                'start' => null,
                'end' => null,
            ],
        ];
        $shop = Shop::create([
            'name' => $data['name'],
            'contact' => $data['contact'],
            'status' => 'pending',
            'user_id' => $user_id,
            'operations' => $operating_hours,
        ]);

        if (!is_null($shop)) {
            $result = $shop;
        }

        return $result;
    }

    public function toggle_shop_pms(Shop $shop)
    {
        $shop->pms_enabled = !$shop->pms_enabled;
        $shop->save();
    }

    public function update_shop(Request $request, $slug)
    {
        $result = null;
        $shop = $this->get_by_slug($slug);

        if (!is_null($shop)) {
            $shop->name = $request['name'] ? $request['name'] : $shop->name;
            $shop->type = $request['type'] ? $request['type'] : $shop->type;
            $shop->contact = $request['contact'] ? $request['contact'] : $shop->contact;
            $shop->description = $request['description'] ? $request['description'] : $shop->description;
            $shop->address = $request['address'] ? $request['address'] : $shop->address;
            $shop->longitude = $request['longitude'] ? $request['longitude'] : $shop->longitude;
            $shop->latitude = $request['latitude'] ? $request['latitude'] : $shop->latitude;
            $shop->operations = $request['operations'];
            $shop->features = $request['features'];
            $shop->amenities = $request['amenities'];
            $shop->payment_method = $request['payment_method'];

            if (!is_null($shop->name) && !is_null($shop->type) &&
                !is_null($shop->contact) && !is_null($shop->description) &&
                !is_null($shop->address) && !is_null($shop->operations) &&
                !is_null($shop->features) && !is_null($shop->amenities) &&
                !is_null($shop->payment_method) && !is_null($shop->avatar_id) &&
                !is_null($shop->banner_id) && $shop->status === Constants::SHOP_STATUS_PENDING) {
                $shop->status = Constants::SHOP_STATUS_CONFIRMED;
            }

            $shop->save();
            $result = $shop;
        }

        return $result;
    }

    public function soft_delete($id)
    {
        $result = null;

        $shop = $this->get($id);
        if (!is_null($shop)) {
            $result = $shop;
            $shop->delete();
        }

        return $result;
    }

    public function restore($id)
    {
        $result = null;

        $shop = $this->get_deleted($id);
        if (!is_null($shop)) {
            $shop->restore();
            $result = $shop;
        }

        return $result;
    }

    public function get_deleted($id)
    {
        $shop = Shop::onlyTrashed()->where('id', $id)->first();

        return $shop;
    }

    public function get_by_slug($slug)
    {
        return Shop::where('slug', $slug)->first();
    }

    /**
     * Returns shops that are not soft deleted
     */
    public function get($id)
    {
        $shop = Shop::find($id);

        return $shop;
    }

    public function update_points($shop_id, $activation_req)
    {
        $result = false;
        $shop = $this->get($shop_id);

        if (!is_null($shop)) {
            $points = 0;
            $completion = $shop->completion;
            $result = true;
            $status = null;

            switch ($activation_req) {
                case Application::APPLICATION_TYPE_BIZ_REG:
                    $points = Constants::SHOP_POINTS_BUSINESS_REGISTRATION;
                    break;
                case Application::APPLICATION_TYPE_PERMIT:
                    $points = Constants::SHOP_POINTS_BUSINESS_PERMIT;
                    break;
                case Application::APPLICATION_TYPE_BIR_CERT:
                    $points = Constants::SHOP_POINTS_BIR_CERTIFICATE;
                    break;
                case Application::APPLICATION_TYPE_MERCH_CERT:
                    $points = Constants::SHOP_POINTS_MERCHANT_CERTIFICATE;
                    break;
                case Application::APPLICATION_TYPE_LIFTERS:
                    $points = Constants::SHOP_POINTS_LIFTERS;
                    break;
                case Application::APPLICATION_TYPE_SPECIAL_TOOLS:
                    $points = Constants::SHOP_POINTS_SPECIAL_TOOLS;
                    break;
            }

            $completion += $points / 100;
            $totalPoints = $completion * 100;

            if ($totalPoints < 30) {
                $status = $shop->status;
            } else if ($totalPoints < 60) {
                $status = Constants::SHOP_STATUS_VERIFIED3;
            } else if ($totalPoints < 100) {
                $status = Constants::SHOP_STATUS_VERIFIED2;
            } else {
                $status = Constants::SHOP_STATUS_VERIFIED1;
            }

            $data = Shop::where(['id' => $shop_id])->first();
            $data->completion = number_format($completion, 2);
            $data->status = $status;
            $data->save();
        }

        return $result;
    }

    public function update_photo($shop_id, $doc_type, $file_id)
    {
        $result = false;

        $shop = $this->get($shop_id);

        if ($shop !== null) {
            $result = true;
            $shop[$doc_type . '_id'] = $file_id;

            $shop->save();
        }

        return $result;
    }

    // For admin only
    public function get_shops_without_pricing_info()
    {
        $shops = $this->get_shops();
        if (is_null($shops) || count($shops) <= 0) {return null;}

        $nonConformingShops = array();
        $masterlistPms = MasterlistPms::select('mileage')->distinct()->pluck('mileage')->toArray();

        foreach ($shops as $shop) {
            $data['shop'] = [
                'shop_name' => $shop->name,
                'user_name' => $shop->user->fname . ' ' . $shop->user->lname,
                'email' => $shop->user->email,
                'mobile' => $shop->user->mobile,
            ];

            // LABOR
            $mileages = $masterlistPms;
            $labors = ShopPmsLabor::select('mileage')->where('user_id', $shop->user->id)
                ->distinct()->pluck('mileage')->toArray(); // only get mileage values
            $diff_labor = array_values(array_diff($mileages, $labors));
            $data['shop']['labor-mileages'] = implode(', ', $diff_labor);

            // OIL
            $mileages = $masterlistPms;
            $oils = ShopPmsOil::select('mileage')->where('user_id', $shop->user->id)
                ->distinct()->pluck('mileage')->toArray(); // only get mileage values
            $diff_oils = array_values(array_diff($mileages, $oils));
            $data['shop']['oil_type-mileages'] = implode(', ', $diff_oils);

            array_push($nonConformingShops, $data);
        }

        return $nonConformingShops;
    }

    /***
     * --------------------------
     *      PRIVATE METHODS
     * --------------------------
     */

    // services should be an array string with all service names listed alphabetically
    private function get_shops_with_service($services_needed, $shops_list)
    {
        $qualified_shops = array(); // [shop]

        if (empty($services_needed) || empty($shops_list)) {
            return $qualified_shops;
        }

        sort($services_needed);

        // get qualified shops
        foreach ($shops_list as $shop) {
            $shop_services = app(ServiceController::class)->get_all_service_names_by_shop($shop['id']);
            $service_intersect = array_intersect($shop_services, $services_needed);

            // check if this shop has all services needed
            if (count($service_intersect) == count($services_needed)) {
                array_push($qualified_shops, $shop);
            }
        }

        return $qualified_shops;
    }

    /**
     * Returns all the shops within the set radius
     * TODO use API (but for MVP, it may be heavy so we could manually compute it for now)
     */
    public function get_shops_within_radius($user_coordinates, $services_required, $radius_km)
    {
        if (is_null($user_coordinates) || is_null($services_required) || $radius_km < 1) {
            return array();
        }

        $all_shops = $this->get_all_shops();

        $shops_within_radius = array(); // [shop]
        foreach ($all_shops as $shop) {
            $distance = Utilities::get_distance($shop["coordinates"], $user_coordinates);

            if ($distance <= $radius_km) {
                array_push($shops_within_radius, $shop);
            }
        }

        // filter shops within the radius
        $qualified_shops = $this->get_shops_with_service($services_required, $shops_within_radius);

        return $qualified_shops;
    }
}
