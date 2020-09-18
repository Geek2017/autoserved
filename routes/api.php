<?php

/*
|--------------------------------------------------------------------------
| Authentication API Routes
|--------------------------------------------------------------------------
 */

Route::post('login', 'Auth\LoginController@login');
Route::post('register/user', 'Auth\RegistrationController@register_user');
Route::post('register/user/campaign', 'Auth\RegistrationController@register_user_campaign');
Route::post('register/shop', 'Auth\RegistrationController@register_shop');
Route::post('register/fleet', 'Auth\RegistrationController@register_fleet');
Route::post('password/forgot', 'Auth\PasswordController@forgot');
Route::post('password/reset', 'Auth\PasswordController@reset');

Route::post('validate-fleet', 'FleetController@validate_fleet');
Route::get('app/version', 'AccountController@app_version');

/**
 * =========================
 * |     PUBLIC APIs       |
 * =========================
 */
Route::get('list/pms', 'MasterlistController@show_pms_list');
Route::get('list/pms-others', 'MasterlistController@show_pms_others_list');
Route::get('list/service-types', 'MasterlistController@show_service_types');
Route::get('list/services', 'MasterlistController@show_services');
Route::get('list/car-makes', 'MasterlistController@show_car_makes');
Route::get('list/car-models', 'MasterlistController@show_car_models');
Route::get('list/car-years', 'MasterlistController@show_car_years');
Route::get('list/car-trims', 'MasterlistController@show_car_trims');
Route::get('list/vehicle-types', 'MasterlistController@show_vehicle_types');
Route::get('list/engine-types', 'MasterlistController@show_engine_types');
Route::get('list/transmission-types', 'MasterlistController@show_transmission_types');
Route::get('list/oil-types', 'MasterlistController@show_oil_types');
Route::get('list/part-types', 'MasterlistController@show_part_types');
Route::get('list/shop-types', 'MasterlistController@show_shop_types');
Route::get('list/time', 'MasterlistController@show_time');
Route::get('pms', 'MasterlistController@get_pms_by_mileage');
Route::get('pms-others', 'MasterlistController@get_pms_others_by_type');

Route::post('request', 'RequestController@create');

Route::group(['middleware' => 'auth:api'], function () {
    Route::post('register/fleet-member', 'Auth\RegistrationController@register_fleet_member');
    Route::get('account', 'AccountController@index');
    Route::get('account/activities', 'AccountController@activity_logs');
    Route::get('account/notifications', 'AccountController@notifications');
    Route::get('account/notifications/all', 'AccountController@all_notifications');
    Route::get('account/notifications/read', 'AccountController@mark_as_read_all_notifications');
    Route::get('account/wallet', 'AccountController@wallet');
    Route::get('account/transactions', 'AccountController@transactions');
    Route::post('password/change', 'Auth\PasswordController@change');

    /**
     * =========================
     * |     VENDOR API        |
     * =========================
     */
    // shops
    Route::get('shops', 'ShopController@index');
    Route::post('shop', 'ShopController@create');
    Route::get('shops/pms', 'ShopController@get_pms_enabled_shops');
    Route::get('shops/pms/{reqId}', 'ShopController@get_pms_enabled_by_request');
    Route::put('shop/{id}/toggle-pms', 'ShopController@toggle_shop_pms');
    Route::get('shop/{slug}', 'ShopController@show');
    Route::put('shop/{slug}', 'ShopController@update');
    Route::delete('shop/{id}', 'ShopController@delete');
    Route::put('shop/{id}/restore', 'ShopController@restore_deleted');
    Route::get('shops/no-pricing', 'ShopController@get_shops_without_pricing_info');

    // uploads
    Route::post('shop/avatar', 'ShopController@upload_avatar');
    Route::post('shop/banner', 'ShopController@upload_banner');

    // application requests
    Route::post('shop/application/business-permit', 'ApplicationController@upload_biz_permit');
    Route::post('shop/application/bir-certificate', 'ApplicationController@upload_bir_cert');
    Route::post('shop/application/business-registration', 'ApplicationController@upload_biz_reg');
    Route::put('application/{id}', 'ApplicationController@update');
    Route::put('application/{id}/verify', 'ApplicationController@verify_requirement');

    // services
    Route::get('services/corrective', 'ServiceController@get_corrective_services');
    Route::post('service/corrective', 'ServiceController@create_corrective_service');
    Route::get('services/pms', 'ServiceController@get_pms_data');
    Route::get('services/pms/others', 'ServiceController@get_pms_others_data');
    Route::get('services/pms/all', 'ServiceController@get_all_pms_data');
    Route::get('services/pms/others/all', 'ServiceController@get_all_pms_others_data');
    Route::post('services/pms/{mileage}', 'ServiceController@save_pms_data');
    Route::get('service/{id}', 'ServiceController@show');
    Route::put('service/{id}', 'ServiceController@update');
    Route::delete('service/{id}', 'ServiceController@delete');
    Route::get('preventive/price/labor', 'ServiceController@get_pms_labor_price');
    Route::get('preventive/price/oil', 'ServiceController@get_pms_oil_price');
    Route::get('preventive/price/others', 'ServiceController@get_pms_others_price');
    Route::post('preventive/price/others', 'ServiceController@save_pms_others_data');

    /**
     * =========================
     * |     CUSTOMER API      |
     * =========================
     */
    // car profile
    Route::get('cars', 'CarProfileController@index');
    Route::get('car/{id}', 'CarProfileController@show');
    Route::post('car', 'CarProfileController@create');
    Route::put('car/{id}', 'CarProfileController@update');
    Route::delete('car/{id}', 'CarProfileController@delete');

    // car schedules
    Route::get('car/{id}/schedules', 'CarScheduleController@index');
    Route::get('car/{car_id}/schedule/{pms_id}', 'CarScheduleController@get_car_schedule');
    Route::post('car/{car_id}/schedule', 'CarScheduleController@generate');

    /**
     * =========================
     * |  CUSTOMER-VENDOR API   |
     * =========================
     */
    // estimates
    Route::get('estimates', 'EstimateController@index');
    Route::get('estimate/{id}', 'EstimateController@show');
    Route::post('estimate', 'EstimateController@create');
    Route::put('estimate/{id}', 'EstimateController@update');
    Route::put('estimate/{id}/expire', 'EstimateController@update_status_expired');
    Route::put('estimate/{id}/decline', 'EstimateController@update_status_declined');
    Route::put('estimate/{id}/accept', 'EstimateController@update_status_accepted');
    Route::put('estimate/{id}/cancel', 'EstimateController@update_status_cancelled');

    // requests
    Route::get('requests', 'RequestController@index');
    // Route::get('preventive/requests', 'RequestController@index_preventive');
    Route::get('preventive/request/{id}', 'RequestController@show_preventive');
    Route::post('preventive/request', 'RequestController@create');
    Route::post('preventive-others/request', 'RequestController@create_other_pms');
    Route::put('request/{id}/cancel', 'RequestController@cancel');

    // appointments
    Route::get('appointments', 'AppointmentController@index');
    Route::get('appointment/{id}', 'AppointmentController@show');
    Route::post('appointment', 'AppointmentController@create');
    Route::put('appointment/{id}', 'AppointmentController@update');
    Route::put('appointment/{id}/complete', 'AppointmentController@complete_appointment');
    Route::put('appointment/{id}/cancel', 'AppointmentController@update_status_cancel');
    Route::put('appointment/{id}/approve', 'AppointmentController@update_status_approve');
    Route::put('appointment/{id}/start', 'AppointmentController@update_status_start');
    Route::delete('appointment/{id}', 'AppointmentController@soft_delete');
    Route::put('appointment/{id}/restore', 'AppointmentController@restore_deleted');

    Route::get('repair-history/{id}', 'AppointmentController@get_car_repair_history');
    /**
     * =========================
     * |      FLEET API        |
     * =========================
     */
    Route::get('fleets', 'FleetController@index');
    Route::get('fleet/{id}', 'FleetController@show');
    Route::get('fleet/{id}/cars', 'FleetController@fleet_cars');
    Route::get('fleet/{id}/members', 'FleetController@fleet_users');
    Route::delete('fleet/{id}', 'FleetController@soft_delete');
    Route::put('fleet/{id}/restore', 'FleetController@restore');
    Route::put('fleet/{id}', 'FleetController@update');

    /**
     * =========================
     * |      ADMIN APIs        |
     * =========================
     */
    Route::get('users', 'UserController@index');
    Route::post('user/verification/resend', 'UserController@resend_verification');
    Route::get('users/count', 'UserController@count');
    Route::get('shops/count', 'ShopController@count');

    Route::post('wallet/top-up', 'PaypalPaymentController@pay_with_paypal');
    Route::get('wallet/payment/status', 'PaypalPaymentController@get_payment_status');

    Route::post('rate/{id}/shop', 'RatingController@rate_shop');
    Route::post('rate/{id}/customer', 'RatingController@rate_customer');
});

/**
 * =========================
 * |      ERROR API        |
 * =========================
 */
Route::fallback(function () {
    return response()->json(['error' => [
        'message' => 'Page Not Found',
        'userMessage' => "We couldn't find what you're looking for.",
        'developerMessage' => 'Resource not found',
    ]], 404);
});
