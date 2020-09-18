<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Utils\Constants;
use App\Http\Controllers\Utils\Utilities;
use App\Services\ApplicationService;
use App\Services\ShopService;
use App\Services\UploadService;
use App\Shop;
use App\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ShopController extends Controller
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

    public function index()
    {
        $response = ['success' => false];
        $httpCode = 401;
        $user = Auth::user();

        if ($user['user_type'] === User::USER_TYPE_ADMIN) {
            $response['success'] = true;
            $httpCode = 200;
            $shops = $this->shop_service->get_shops();
            $response['success'] = true;
            $response['data'] = $shops;

            foreach ($shops as $shop) {
                $shop->avatar;
                $shop->banner;
                $shop->user;
                $shop->application;
                $shop->application->bir;
                $shop->application->business_permit;
                $shop->application->registration;
                $shop->services;
            }
        } else if ($user['user_type'] === User::USER_TYPE_VENDOR) {
            $response['success'] = true;
            $httpCode = 200;
            $shops = $user->shops;

            if (!is_null($shops)) {
                $response['success'] = true;
                $response['data'] = $shops;

                foreach ($shops as $shop) {
                    $shop->avatar;
                    $shop->banner;
                    $shop->user;
                    $shop->application;
                    $shop->application->bir;
                    $shop->application->business_permit;
                    $shop->application->registration;
                    $shop->services;
                }
            } else {
                $response['error'] = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 401, "Couldn't find any shop data.");
            }
        } else {
            $response['error'] = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 401, "Unauthorized access.");
        }

        return response()->json($response, $httpCode);
    }

    public function get_pms_enabled_shops()
    {
        $response = ['success' => false];
        $user = Auth::user();
        $shops = $this->shop_service->get_pms_enabled($user);

        if (!is_null($shops)) {
            $response['success'] = true;
            $response['data'] = $shops;

            foreach ($shops as $shop) {
                $shop->avatar;
                $shop->banner;
                $shop->user;
                $shop->application;
                $shop->application->bir;
                $shop->application->business_permit;
                $shop->application->registration;
                $shop->services;
            }
        } else {
            $response = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot retieve because there are NO PMS-enabled shops");
        }

        return response()->json($response);
    }

    public function get_pms_enabled_by_request($request_id)
    {
        $response = ['success' => false];
        $user = Auth::user();

        $shops = $this->shop_service->get_pms_enabled_by_request($user, $request_id);

        if (!is_null($shops)) {
            $response['success'] = true;
            $response['data'] = $shops;

            foreach ($shops as $shop) {
                $shop->avatar;
                $shop->banner;
                $shop->user;
                $shop->application;
                $shop->application->bir;
                $shop->application->business_permit;
                $shop->application->registration;
                $shop->services;
            }
        } else {
            $response = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Cannot retieve because there are NO PMS-enabled shops with request ID or request does not exist");
        }

        return response()->json($response);
    }

    public function create(Request $request)
    {
        $response = ['success' => false];
        $user = Auth::user();
        $shop = $this->shop_service->create_shop($user['id'], $request);

        if (!is_null($shop)) {
            $application = $this->application_service->create_shop_application($user['id'], $shop['id']);

            if (!is_null($application)) {
                $response['success'] = true;
                $response['data'] = $shop;
            } else {
                $response['error'] = [];
                $error = [
                    'message' => "Cannot create shop application.",
                ];
                array_push($response['error'], $error);
            }
        } else {
            $response['error'] = [];
            $error = [
                'message' => "Cannot create shop.",
            ];
            array_push($response['error'], $error);
        }

        return response()->json($response);
    }

    public function toggle_shop_pms($id)
    {
        $response = ['success' => false];
        $user = Auth::user();
        $shop = $this->shop_service->get($id);

        if (!is_null($shop)) {
            $this->shop_service->toggle_shop_pms($shop);
            $response['success'] = true;
            $response['data'] = $shop;
        }

        return response()->json($response);
    }

    public function show($slug)
    {
        $response = ['success' => false];
        $shop = $this->shop_service->get_by_slug($slug);

        if ($shop !== null) {
            $response['success'] = true;
            $response['data'] = $shop;
            $shop->avatar;
            $shop->banner;
            $shop->user;
            $shop->application;
            $shop->application->bir;
            $shop->application->business_permit;
            $shop->application->registration;
            $shop->services;
        } else {
            $httpCode = 403;
            $response['error'] = [];
            $error = [
                'message' => "You are not allowed to access this resource.",
            ];
            array_push($response['error'], $error);
        }

        return response()->json($response);
    }

    public function upload_avatar(Request $request)
    {
        return $this->upload_file($request, Constants::DOCUMENT_TYPE_AVATAR);
    }

    public function upload_banner(Request $request)
    {
        return $this->upload_file($request, Constants::DOCUMENT_TYPE_BANNER);
    }

    private function upload_file(Request $request, $upload_type)
    {
        $response = ['success' => false];
        $validatedData = $request->validate([
            'file' => 'required|file|mimes:jpeg,jpg,png|max:5000',
            'id' => 'required|numeric|exists:shops,id',
        ]);

        $file = $request->file('file');
        $uploaded_file = $this->upload_service->upload_file($file, $upload_type, 'shop');

        if ($uploaded_file !== null) {
            if ($this->shop_service->update_photo($request['id'], $upload_type, $uploaded_file['id'])) {
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

    /** Soft delete shop  */
    public function delete($id)
    {
        $response = ['success' => false];
        $user = Auth::user();

        if ($user['user_type'] === User::USER_TYPE_ADMIN || $user['user_type'] === User::USER_TYPE_VENDOR) {
            $shop_del = $this->shop_service->soft_delete($id);

            if (!is_null($shop_del)) {
                $response['success'] = true;
                $response['data'] = [
                    'id' => $shop_del->id,
                    'name' => $shop_del->name,
                ];
            } else {
                $response['error'] = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Deletion unsuccessful. Shop doesn't exist or is already deleted.");
            }
        } else {
            $response['error'] = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Deletion unsuccessful. Only vendors and admin can access this.");
        }

        return response()->json($response);
    }

    /**
     * Restores soft deleted shop
     */
    public function restore_deleted($id)
    {
        $response = ['success' => false];
        $user = Auth::user();

        if ($user['user_type'] === User::USER_TYPE_ADMIN) {
            $shop_restored = $this->shop_service->restore($id);

            if (!is_null($shop_restored)) {
                $response['success'] = true;
                $response['data'] = [
                    'id' => $shop_restored->id,
                    'name' => $shop_restored->name,
                ];
            } else {
                $response['error'] = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Restore unsuccessful. Shop doesn't exist or is NOT soft deleted.");
            }
        } else {
            $response['error'] = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Restore unsuccessful. Only admin and vendors can access this.");
        }

        return response()->json($response);
    }

    public function update(Request $request, $slug)
    {
        $response = ['success' => false];
        $user = Auth::user();

        try
        {
            if (strcasecmp($user['user_type'], User::USER_TYPE_VENDOR) == 0) {
                $shop = $this->shop_service->update_shop($request, $slug);

                if (!is_null($shop)) {
                    $response['success'] = true;
                    $response['data'] = $shop;
                    $shop->avatar;
                    $shop->banner;
                    $shop->user;
                    $shop->application;
                    $shop->application->bir;
                    $shop->application->business_permit;
                    $shop->application->registration;
                    $shop->services;
                } else {
                    $response['error'] = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Shop doesn't exist.");
                }
            } else {
                $response['error'] = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "User type is not 'vendor'.");

            }
        } catch (QueryException $e) {
            $response['error'] = Utilities::error(Constants::ERROR_MSG_SQL_EXCEPTION_SAVE, 403, $e->getMessage());
        }

        return response()->json($response);
    }

    public function ShopCompletion($shop)
    {
        $points = 0;
        // Compute Points for Tier
        if (isset($shop->name)) {$points = $points + 10;}
        if (isset($shop->shop_type)) {$points = $points + 10;}
        if (isset($shop->avatar_id)) {$points = $points + 10;}
        if (isset($shop->banner_id)) {$points = $points + 10;}
        if (isset($shop->contact)) {$points = $points + 10;}
        if (isset($shop->description)) {$points = $points + 5;}
        if (isset($shop->address)) {$points = $points + 2.5;}
        if (isset($shop->city)) {$points = $points + 2.5;}
        if (isset($shop->zip)) {$points = $points + 2.5;}
        if (isset($shop->latitude) && isset($shop->longitude)) {$points = $points + 2.5;}
        if (isset($shop->operations)) {$points = $points + 10;}
        if (isset($shop->features)) {$points = $points + 10;}
        if (isset($shop->amenities)) {$points = $points + 10;}
        if (isset($shop->payment_method)) {$points = $points + 5;}

        return $points;
    }

    public function get_shops_without_pricing_info()
    {
        $response = ['success' => false];
        $user = Auth::user();

        if ($user['user_type'] === User::USER_TYPE_ADMIN) {
            $nonCompliantShops = $this->shop_service->get_shops_without_pricing_info();

            if (!is_null($nonCompliantShops)) {
                $response['success'] = true;
                $response['data'] = $nonCompliantShops;
            } else {
                $response['error'] = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Either all shops are compliant or there is an error in service layer.");
            }
        } else {
            $response['error'] = Utilities::error(Constants::ERROR_MSG_NO_ACCESS, 403, "Only 'admin' users can access this.");
        }

        return response()->json($response);
    }
}
