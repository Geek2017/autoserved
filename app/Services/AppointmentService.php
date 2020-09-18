<?php

namespace App\Services;

use App\Appointment;
use App\Estimate;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AppointmentService
{

    /**
     * =========================
     * |      CRUD METHODS     |
     * =========================
     */
    public function get_appointments($user)
    {
        // if ($user->user_type === User::USER_TYPE_ADMIN) {
        //     $result = Appointment::all();
        // } else if ($user->user_type === User::USER_TYPE_CUSTOMER) {
        //     $result = Appointment::whereHas('estimate',
        //         function ($query) use ($user_id) {
        //             $query->where('customer_id', $$user_id);
        //         })->with('estimate')
        //     // ->where('status', Appointment::APPOINTMENT_STATUS_COMPLETED)
        //         ->get();
        // } else if ($user->user_type === User::USER_TYPE_VENDOR) {
        //     $result = Appointment::whereHas('estimate',
        //         function ($query) use ($user) {
        //             $query->whereHas('shop',
        //                 function ($query) use ($user) {
        //                     $query->where('user_id', $user->id);
        //                 })->with("shop");
        //         })->with('estimate')
        //         ->orderBy('scheduled_date')
        //         ->get();
        // }
        // return $result;
        return $this->get_all($user->id, $user->user_type, null);
    }

    public function get_car_repair_history($car_id)
    {
        return Appointment::where([
            'status' => Appointment::APPOINTMENT_STATUS_COMPLETED,
            'car_id' => $car_id,
        ])->orderBy('scheduled_date')
            ->get();
    }

    public function get_all($user_id, $user_type, $status = "")
    {
        $result = null;

        if ($user_type === User::USER_TYPE_ADMIN) {
            $result = Appointment::all();
        } else if ($user_type === User::USER_TYPE_CUSTOMER) {
            $result = Appointment::whereHas('estimate',
                function ($query) use ($user_id) {
                    $query->where('customer_id', $user_id);
                })->with('estimate')
                ->orderBy('scheduled_date')
                ->get();
        } else if ($user_type === User::USER_TYPE_VENDOR) {
            $result = Appointment::whereHas('estimate',
                function ($query) use ($user_id) {
                    $query->whereHas('shop',
                        function ($query) use ($user_id) {
                            $query->where('user_id', $user_id);
                        })->with("shop");
                })->with('estimate')
                ->orderBy('scheduled_date')
                ->get();
        }

        return $result;
    }

    public function get($id)
    {
        $order = Appointment::find($id);

        return $order;
    }

    public function create_appointment(Request $request)
    {
        $result = null;

        $validatedData = $request->validate([
            'car_id' => 'required|integer',
            'estimate_id' => 'required|integer',
            'notes' => 'string',
        ]);

        $estimate = app(EstimateService::class)->get($validatedData['estimate_id']);

        if (is_null($estimate) ||
            (!is_null($estimate) && // Prevent duplicate appointments
                $estimate->status === Estimate::ESTIMATE_STATUS_ACCEPTED)) {
            return $result;
        }

        $appointment = Appointment::create([
            'car_id' => $validatedData['car_id'],
            'estimate_id' => $validatedData['estimate_id'],
            'scheduled_date' => $estimate->preferred_date,
            'scheduled_time' => $estimate->preferred_time,
            'notes' => isset($validatedData['notes']) ? $validatedData['notes'] : "",
            'status' => Appointment::APPOINTMENT_STATUS_PENDING,
        ]);
        $estimate->update(['status' => Estimate::ESTIMATE_STATUS_ACCEPTED]);
        // Estimate::where(['request_id' => $estimate['request_id'], ['status', Estimate::ESTIMATE_STATUS_REQUESTED]])
        //     ->update(['status' => Estimate::ESTIMATE_STATUS_DECLINED]);

        if (!is_null($appointment)) {
            $result = $appointment;
        }

        return $result;
    }

    public function update_appointment(Request $request, $id)
    {
        $result = null;

        $appointment = $this->get($id);

        if (!is_null($appointment) && $appointment->status !== Appointment::APPOINTMENT_STATUS_APPROVED) {
            $validatedData = $request->validate([
                'notes' => 'required|string',
            ]);

            $appointment->notes = $validatedData['notes'];
            $appointment->save();

            $result = $appointment;
        }

        return $result;
    }

    public function soft_delete($id)
    {
        $result = null;

        $appointment = $this->get($id);
        if (!is_null($appointment)) {
            $result = $appointment;
            $appointment->delete();
        }

        return $result;
    }

    public function restore($id)
    {
        $result = null;

        $appointment = $this->get_deleted($id);
        if (!is_null($appointment)) {
            $appointment->restore();
            $result = $appointment;
        }

        return $result;
    }

    public function get_deleted($id)
    {
        $appointment = Appointment::onlyTrashed()->where('id', $id)->first();

        return $appointment;
    }

    public function update_status($id, $status, $request)
    {
        $appointment = Appointment::where([['id', $id], ['status', '<>', $status]])->first();

        if (!is_null($appointment)) {
            // cancelled or declined appointment should have notes
            // if (($status === Appointment::APPOINTMENT_STATUS_CANCELLED || $status === Appointment::APPOINTMENT_STATUS_DECLINED)
            //     && (is_null($request) || !isset($request['notes']))) {
            //     return null;
            // }

            // Append additional notes when appointment changes status
            if (!is_null($request) && isset($request['notes'])) {
                $notes = $appointment->notes . "\n\n---\n" . $status . " on " . date("Y-m-d h:i A")
                    . ":\n" . $request['notes'];
                $appointment->notes = $notes;
            }

            $appointment->status = $status;
            $appointment->save();
        }

        return $appointment;
    }

    public function complete_appointment($id)
    {
        $user = Auth::user();
        $result = null;
        $appointment = $this->get($id);

        if (!is_null($appointment) && $user->balance > 0) {
            $user->pay($appointment->estimate);
            $appointment->end_date = date('Y-m-d');
            $appointment->status = Appointment::APPOINTMENT_STATUS_COMPLETED;
            $appointment->save();
            $result = $appointment;
        }

        return $result;
    }
}
