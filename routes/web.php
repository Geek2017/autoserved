<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

Route::view('/{path?}', 'app');

Route::view('/customer-registration', 'app');
Route::view('/shop-registration', 'app');
Route::view('/login', 'app');
Route::view('/forgot-password', 'app');
Route::view('/password-reset', 'app');
Route::view('/f/register', 'app');

Route::view('/shop/{slug}', 'app');

Route::view('/vendor', 'app');
Route::view('/vendor/dashboard', 'app');
Route::view('/vendor/shops', 'app');
Route::view('/vendor/shop/{id}', 'app');
Route::view('/vendor/shop/{id}/edit', 'app');
Route::view('/vendor/shop/{id}/documents', 'app');
Route::view('/vendor/services', 'app');
Route::view('/vendor/appointments', 'app');
Route::view('/vendor/mechanics', 'app');
Route::view('/vendor/personnels', 'app');
Route::view('/vendor/estimates', 'app');
Route::view('/vendor/requests', 'app');
Route::view('/vendor/orders', 'app');
Route::view('/vendor/reviews', 'app');
Route::view('/vendor/transaction-history', 'app');
Route::view('/vendor/report', 'app');
Route::view('/vendor/referrals', 'app');
Route::view('/vendor/loyalty', 'app');
Route::view('/vendor/promo', 'app');
Route::view('/account/profile', 'app');

Route::view('/customer', 'app');
Route::view('/customer/book', 'app');
Route::view('/customer/dashboard', 'app');
Route::view('/customer/cars', 'app');
Route::view('/customer/car/{id}/schedule', 'app');
Route::view('/customer/car-schedules', 'app');
Route::view('/customer/appointments', 'app');
Route::view('/customer/estimates', 'app');
Route::view('/customer/requests', 'app');
Route::view('/customer/orders', 'app');
Route::view('/customer/reviews', 'app');
Route::view('/customer/transaction-history', 'app');
Route::view('/customer/report', 'app');
Route::view('/customer/referrals', 'app');
Route::view('/customer/loyalty', 'app');
Route::view('/customer/promo', 'app');
