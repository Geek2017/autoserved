<?php

namespace App\Http\Controllers;

use App\Appointment;
use App\CarMake;
use App\CarModel;
use App\CarProfile;
use App\CarSchedule;
use App\CarSerie;
use App\CarTrim;
use App\Estimate;
use App\Order;
use App\RequestJob;
use App\Request_Shop;
use App\Shop;
use App\Upload;
use App\User;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $response = ['success' => false];
        $httpCode = 200;
        $user = Auth::user();

        if ($user !== null) {
            if ($user->user_type == 'admin') {
                $vendors = User::where('user_type', 'vendor')->count();
                $customers = User::where('user_type', 'customer')->count();

                $shops = Shop::where('user_id', $user->id)
                    ->get('id');
                $appointments = Appointment::whereIn('shop_id', $shops)->get();
                $appointment_count = $appointments->count();
                $estimates = Estimate::where('user_id', $user->id)->get();
                $estimate_count = $estimates->count();
                $requests = RequestJob::all(); // Still need to change this. need to edit request table add coordinates to do comparison
                $request_count = $requests->count();

                $response['success'] = true;

                $response['data'] = [
                    'user' => $user,
                    'vendors' => $vendors,
                    'customers' => $customers,
                    'requests' => $requests,
                    'request_count' => $request_count,
                    'estimates' => $estimates,
                    'estimate_count' => $estimate_count,
                    'appointments' => $appointments,
                    'appointment_count' => $appointment_count,
                    'shops' => $shops,
                ];
            } elseif ($user->user_type == 'customer') {
                $credits = $user->balance;
                $car_profiles = CarProfile::where('user_id', $user->id)->get('id');
                $appointments = Appointment::whereIn('car_id', $car_profiles)->get();
                $appointment_count = $appointments->count();
                $estimates = Estimate::where('customer_id', $user->id)->get();
                $estimate_count = $estimates->count();
                $requests = RequestJob::all(); // Still need to change this. need to edit request table add coordinates to do comparison
                $request_count = $requests->count();
                $schedules = CarSchedule::where('user_id', $user->id)->get();
                $request_estimate = [];

                foreach ($estimates as $estimate) {
                    $car = CarProfile::find($estimate->car_id)->first();
                    $shop = Shop::find($estimate->shop_id)->first();
                    $avatar = Upload::where('id', $shop->avatar_id)->first();
                    $request_estimate[] = array(
                        'id' => $estimate->id,
                        'distance' => $estimate->distance,
                        'multiplier' => $estimate->multiplier,
                        'items' => $estimate->items,
                        'freebies' => $estimate->freebies,
                        'amount' => $estimate->amount,
                        'discount' => $estimate->discount,
                        'status' => $estimate->status,
                        'customer_id' => $estimate->customer_id,
                        'car_id' => $estimate->car_id,
                        'shop_id' => $estimate->shop_id,
                        'shop' => $shop,
                        'shop_avatar' => $avatar->filename,
                        'car' => $car,
                        'user_id' => $estimate->user_id,
                        'created_at' => $estimate->created_at,

                    );
                }
                $response['success'] = true;

                $response['data'] = [
                    'user' => $user,
                    'credits' => $credits,
                    'schedules' => $schedules,
                    'schedule_count' => $schedules->count(),
                    'estimates' => $request_estimate,
                    'estimate_count' => $estimate_count,
                    'appointments' => $appointments,
                    'appointment_count' => $appointment_count,
                ];

            } elseif ($user->user_type == 'vendor') {
                $credits = $user->balance;
                $shops = Shop::where('user_id', $user->id)->first();
                $requested = [];
                $client = null;
                $car_name = null;
                $new_appointments = [];
                $appointments = Appointment::where('shop_id', $shops)->get();
                $appointment_count = $appointments->count();
                $estimates = Estimate::where('user_id', $user->id)->get();
                $estimate_count = $estimates->count();
                $requests = $shops ? Request_Shop::where('shop_id', $shops->id)->get() : []; // Still need to change this. need to edit request table add coordinates to do comparison
                $request_count = $shops ? $requests->count() : count($requests);

                foreach ($appointments as $appointment) {
                    $car = CarProfile::where('id', $appointment->car_id)->first();
                    $order = Order::find($appointment->order_id)->first();
                    $estimate = Estimate::find($order->estimate_id)->first();
                    $client = User::where('id', $car->user_id)->first();
                    $new_appointments[] = array(
                        'id' => $appointment->id,
                        'preferred_time' => $appointment->preferred_time,
                        'schedule_date' => $appointment->schedule_date,
                        'schedule_time' => $appointment->schedule_time,
                        'schedule_end' => $appointment->schedule_end,
                        'notes' => $appointment->notes,
                        'status' => $appointment->status,
                        'order_id' => $appointment->order_id,
                        'car_id' => $appointment->car_id,
                        'shop_id' => $appointment->shop_id,
                        'receivable' => $estimate->amount,
                        'client' => array(
                            'name' => $client->lname . ', ' . $client->fname,
                            'avatar' => $client->image,
                        ),
                        'created_at' => $appointment->created_at,
                    );

                }

                foreach ($requests as $request) {
                    $client_request = RequestJob::where('id', $request->request_id)->first();
                    $request_shop = Request_Shop::where('request_id', $client_request->id)->first();
                    $car = CarProfile::where('id', $client_request->car_id)->first();
                    $carmake = CarMake::find($car->car_make);
                    $carmodel = CarModel::find($car->car_model);
                    $carserie = CarSerie::find($car->car_series);
                    $cartrim = CarTrim::find($car->car_trim);
                    $customer = User::where('id', $client_request->user_id)->first();
                    $name = $customer->lname . ', ' . $customer->fname;
                    $car_name = $carmake->name . ' ' . $carmodel->name . ' ' . $carserie->name . ' ' . $cartrim->name;
                    $requested[] = array(
                        'status' => $client_request->status,
                        'requirements' => $client_request->requirements,
                        'longitude' => $client_request->longitude,
                        'latitude' => $client_request->latitude,
                        'schedules' => $client_request->schedules,
                        'distance' => $request_shop->distance,
                        'car' => $car_name,
                        'customer' => $name,
                        'avatar' => $customer->image,
                    );
                }

                $response['success'] = true;

                $response['data'] = [
                    'user' => $user,
                    'credits' => $credits,
                    'requests' => $requested,
                    'request_count' => $request_count,
                    'client' => $client,
                    'car' => $car_name,
                    'estimates' => $estimates,
                    'estimate_count' => $estimate_count,
                    'appointments' => $new_appointments,
                    'appointment_count' => $appointment_count,
                    'shops' => $shops,
                ];
            }

        } else {
            $httpCode = 403;
            $response['error'] = [];
            $error = [
                'message' => "You are not allowed to access this resource.",
            ];
            array_push($response['error'], $error);
        }

        return response()->json($response, $httpCode);

    }
}
