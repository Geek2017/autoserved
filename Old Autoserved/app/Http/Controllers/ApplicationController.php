<?php

namespace App\Http\Controllers;

use App\Events\VerifyDocumentEvent;
use App\Http\Controllers\Utils\Constants;
use App\Http\Controllers\Utils\Utilities;
use App\Notifications\VerifyDocument;
use App\Services\ApplicationService;
use App\Services\ShopService;
use App\Services\UploadService;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;

class ApplicationController extends Controller
{
    protected $application_service;
    protected $shop_service;
    protected $upload_service;

    public function __construct(
        ApplicationService $application_service,
        ShopService $shop_service,
        UploadService $upload_service
    ) {
        $this->application_service = $application_service;
        $this->shop_service = $shop_service;
        $this->upload_service = $upload_service;
    }

    public function upload_biz_permit(Request $request)
    {
        return $this->upload_file($request, Constants::DOCUMENT_TYPE_BUSINESS_PERMIT);
    }

    public function upload_bir_cert(Request $request)
    {
        return $this->upload_file($request, Constants::DOCUMENT_TYPE_BIR_CERTIFICATE);
    }

    public function upload_biz_reg(Request $request)
    {
        return $this->upload_file($request, Constants::DOCUMENT_TYPE_BUSINESS_REGISTRATION);
    }

    private function upload_file(Request $request, $doc_type)
    {
        $response = ['success' => false];
        $httpCode = 200;

        $validatedData = $request->validate([
            'file' => 'required|file|mimes:jpeg,jpg,png,pdf,docx|max:5000',
            'id' => 'required|numeric|exists:applications,id',
        ]);

        $file = $request->file('file');
        $uploaded_file = $this->upload_service->upload_file($file, $doc_type, 'applications');

        if ($uploaded_file !== null) {
            $application = $this->application_service->update_application($request['id'], $doc_type, $uploaded_file['id']);

            if ($application !== null) {
                $response['success'] = true;
                $response['data'] = [
                    'filename' => $uploaded_file['filename'],
                    'path' => $uploaded_file['path'],
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

        return response()->json($response, $httpCode);
    }

    public function update(Request $request, $id)
    {
        $response = ['success' => false];
        $application = $this->application_service->get($id);

        if (!is_null($application)) {
            $response['success'] = true;
            $result = $this->application_service->update($request, $id);
            $response['data'] = $result;
        } else {
            $httpCode = 500;
            $response['error'] = [];
            $error = [
                'message' => Constants::ERROR_MSG_GENERIC,
            ];
            array_push($response['error'], $error);
        }

        return response()->json($response);
    }

    public function verify_requirement(Request $request, $id)
    {
        $response = ['success' => false];
        $user = Auth::user();
        $type = $request->query('type');
        $application = $this->application_service->verify($id, $type);

        if ($user->user_type === User::USER_TYPE_ADMIN) {
            if (!is_null($application)) {
                $response = ['success' => true];
                $this->shop_service->update_points($application->shop_id, $type);
                $documentType = [
                    Constants::SHOP_ACTIVATION_REQ_BIZ_REG => 'SEC/DTI Certificate of Registration',
                    Constants::SHOP_ACTIVATION_REQ_BIZ_PERMIT => "Mayor's Permit",
                    Constants::SHOP_ACTIVATION_REQ_BIR_CERT => 'BIR Certificate of Registration',
                    Constants::SHOP_ACTIVATION_REQ_MERCH_CERT => 'Certifications',
                    Constants::SHOP_ACTIVATION_REQ_LIFTERS => 'Lifters',
                    Constants::SHOP_ACTIVATION_REQ_SPECIAL_TOOLS => 'Special Tools',
                ];
                $notificationData = [
                    'id' => $application->shop->user->id,
                    'application' => $application,
                    'type' => $type,
                    'message' => $documentType[$type] . ' has been verified.',
                    'icon' => 'file_copy',
                    'href' => '/shop/' . $application->shop->slug . '/documents',
                ];
                Notification::send($application->shop->user, new VerifyDocument($notificationData));
                event(new VerifyDocumentEvent($notificationData));
            } else {
                $response = Utilities::error("Not found", 404, "Resource not found");
            }
        } else {
            $response = Utilities::error("Unauthorized", 403, "You are not allowed to modify this resource");
        }

        return response()->json($response);
    }
}
