<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Utils\Utilities;
use App\Http\Requests\CreateCampaignCustomerRequest;
use App\Http\Requests\CreateCustomerRequest;
use App\Http\Requests\CreateFleetMemberRequest;
use App\Http\Requests\CreateFleetRequest;
use App\Http\Requests\CreateShopRequest;
use App\Jobs\SendRegistrationEmailJob;
use App\Services\ApplicationService;
use App\Services\FleetService;
use App\Services\ShopService;
use App\Services\UserService;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class RegistrationController extends Controller
{
    protected $application_service;
    protected $fleet_service;
    protected $shop_service;
    protected $user_service;

    public function __construct(
        ApplicationService $application_service,
        FleetService $fleet_service,
        ShopService $shop_service,
        UserService $user_service
    ) {
        $this->application_service = $application_service;
        $this->fleet_service = $fleet_service;
        $this->shop_service = $shop_service;
        $this->user_service = $user_service;
    }

    public function register_admin(Request $request)
    {
        $response = ['success' => false];
        $user = $this->user_service->create_user($request);

        if (!is_null($user)) {
            $response['success'] = true;
            $response['data'] = $user;
        }

        return response()->json($response);
    }

    public function register_user_campaign(CreateCampaignCustomerRequest $request)
    {
        $response = ['success' => false];
        $request['country'] = 'Philippines';

        if (!isset($request['password'])) {
            $request['password'] = Str::random(10);
        }

        $user = $this->user_service->create_user($request, User::USER_TYPE_CUSTOMER);

        if (!is_null($user)) {
            $job = (new SendRegistrationEmailJob($user, $request['password']))
                ->delay(Carbon::now()->addSeconds(5));
            dispatch($job);
            $response['success'] = true;
            $response['data'] = $user;
        } else {
            $response['error'] = Utilities::error("Failed to create user", 0, "There was a problem creating this user.");
        }

        return response()->json($response);
    }

    public function register_user(CreateCustomerRequest $request)
    {
        $response = ['success' => false];
        $user = $this->user_service->create_user($request, User::USER_TYPE_CUSTOMER);

        if (!is_null($user)) {
            $job = (new SendRegistrationEmailJob($user))
                ->delay(Carbon::now()->addSeconds(5));
            dispatch($job);
            $response['success'] = true;
            $response['data'] = $user;
        } else {
            $response['error'] = Utilities::error("Failed to create user", 0, "There was a problem creating this user.");
        }

        return response()->json($response);
    }

    public function register_fleet_member(CreateFleetMemberRequest $request)
    {
        $response = ['success' => false];
        $user = Auth::user();

        if ($user['user_type'] === User::USER_TYPE_FLEET_ADMIN) {
            if (is_null($request['password'])) {
                $request['password'] = Str::random(10);
            }

            $user = $this->user_service->create_user($request, User::USER_TYPE_CUSTOMER);

            if (!is_null($user)) {
                $job = (new SendRegistrationEmailJob($user))
                    ->delay(Carbon::now()->addSeconds(5));
                dispatch($job);
                $response['success'] = true;
                $response['data'] = $user;
            } else {
                $response['error'] = Utilities::error("Failed to create user", 0, "There was a problem creating this user.");
            }
        } else {
            $response['error'] = Utilities::error("Unauthenticated", 0, "You are not allowed to create this user.");
        }

        return response()->json($response);
    }

    public function register_fleet(CreateFleetRequest $request)
    {
        $response = ['success' => false];
        $request['fleet_key'] = Str::random(5);
        $request['token'] = Str::uuid();

        if (!isset($request['password'])) {
            $request['password'] = Str::random(10);
        }

        // Create user account
        $user = $this->user_service->create_user($request, User::USER_TYPE_FLEET_ADMIN);

        if (!is_null($user)) {
            // Create fleet account
            $fleet = $this->fleet_service->create_fleet($user['id'], $request);

            if (!is_null($fleet)) {
                // Send email
                $job = (new SendRegistrationEmailJob($user, $request['password']))
                    ->delay(Carbon::now()->addSeconds(5));
                dispatch($job);

                // update fleet admin with fleet id (bi-directional)
                $success = $this->user_service->update_admin_with_fleet_id($user['id'], $fleet['id']);

                $response['success'] = true;
                $response['data'] = [
                    'id' => $fleet['id'],
                    'name' => $fleet['name'],
                ];
            } else {
                $response['error'] = Utilities::error("Failed to create fleet account", 0, "Create fleet returned null");

            }
        } else {
            $response['error'] = Utilities::error("Failed to create user", 0, "Either no access or e-mail exists");
        }

        return response()->json($response);
    }

    public function register_shop(CreateShopRequest $request)
    {
        $response = ['success' => false];

        if (!isset($request['password'])) {
            $request['password'] = Str::random(10);
        }

        // Create user account
        $user = $this->user_service->create_user($request, User::USER_TYPE_VENDOR);

        if (!is_null($user)) {
            // Create shop account
            $shop = $this->shop_service->create_shop($user['id'], $request);

            if (!is_null($shop)) {
                // Create application entry
                $application = $this->application_service->create_shop_application($user['id'], $shop['id']);

                if (!is_null($application)) {
                    // Send email
                    $job = (new SendRegistrationEmailJob($user, $request['password']))
                        ->delay(Carbon::now()->addSeconds(5));
                    dispatch($job);
                    $response['success'] = true;
                    $response['data'] = [
                        'id' => $shop['id'],
                        'name' => $shop['name'],
                    ];
                } else {
                    $response['error'] = Utilities::error("Failed to create shop application", 0, "Create shop application returned null");
                }
            } else {
                $response['error'] = Utilities::error("Failed to create shop", 0, "Create shop returned null");

            }
        } else {
            $response['error'] = Utilities::error("Failed to create user", 0, "Either no access or e-mail exists");
        }

        return response()->json($response);
    }

}
