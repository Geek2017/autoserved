<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Utils\Constants;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{

    public function index()
    {
        $response = ['success' => false];
        $httpCode = 200;
        $user = Auth::user();

        if ($user !== null) {
            $response['success'] = true;
            $response['data'] = $user;
            $user->shop_count = $user->shops->count();
            $user->car_count = $user->cars->count();
            $user->wallet;

            foreach ($user->shops as $shop) {
                $shop->service_count = $shop->services->count();
                $shop->avatar;
                $shop->banner;
            }

            foreach ($user->cars as $car) {
                $car->carMake;
                $car->carModel;
                $car->carTrim;
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

    public function upload_image(Request $request)
    {
        return $this->upload_file($request, Constants::DOCUMENT_TYPE_AVATAR);
    }

    private function upload_file(Request $request, $upload_type)
    {
        $response = ['success' => false];
        $validatedData = $request->validate([
            'file' => 'required|file|mimes:jpeg,jpg,png|max:5000',
            'id' => 'required|numeric|exists:profiles,id',
        ]);

        $file = $request->file('file');
        $uploaded_file = $this->upload_service->upload_file($file, $upload_type, 'profile');

        if ($uploaded_file !== null) {
            if ($this->profile_service->update_photo($request['id'], $upload_type, $uploaded_file['id'])) {
                $response['success'] = true;
                $response['data'] = [
                    'filename' => $uploaded_file['filename'],
                    'path' => asset($uploaded_file['path']),
                    'document_type' => $uploaded_file['document_type'],
                ];
            } else {
                $httpCode = 500;
                $response['error'] = [];
                $error = [
                    'message' => Constants::ERROR_MSG_GENERIC,
                ];
                array_push($response['error'], $error);
            }
        } else {
            $httpCode = 400;
            $response['error'] = [];
            $error = [
                'message' => Constants::ERROR_MSG_INVALID_PARAMS,
            ];
            array_push($response['error'], $error);
        }

        return response()->json($response);
    }

    /** Soft delete profile  */
    public function delete($id)
    {
        $response = ['success' => false];
        $user = Auth::user();

        return response()->json($response);
    }

    /**
     * Restores soft deleted profile
     */
    public function restore_deleted($id)
    {
        $response = ['success' => false];
        $user = Auth::user();

        return response()->json($response);
    }

    public function update(Request $request, $id)
    {
        $response = ['success' => false];
        $user = Auth::user();

        return response()->json($response);
    }

}
