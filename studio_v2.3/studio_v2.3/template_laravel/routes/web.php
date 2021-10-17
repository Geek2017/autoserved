<?php

use Illuminate\Support\Facades\Route;

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


Route::get('/', function () {
    return view('/index');
});

Route::get('/analytics', function () {
    return view('/analytics');
});

Route::get('/email/inbox', function () {
    return view('/email-inbox');
});

Route::get('/email/compose', function () {
    return view('/email-compose');
});

Route::get('/email/detail', function () {
    return view('/email-detail');
});

Route::get('/widgets', function () {
    return view('/widgets');
});

Route::get('/ui/bootstrap', function () {
    return view('/ui-bootstrap');
});

Route::get('/ui/buttons', function () {
    return view('/ui-buttons');
});

Route::get('/ui/card', function () {
    return view('/ui-card');
});

Route::get('/ui/icons', function () {
    return view('/ui-icons');
});

Route::get('/ui/modal-notifications', function () {
    return view('/ui-modal-notifications');
});

Route::get('/ui/typography', function () {
    return view('/ui-typography');
});

Route::get('/ui/tabs-accordions', function () {
    return view('/ui-tabs-accordions');
});

Route::get('/form/elements', function () {
    return view('/form-elements');
});

Route::get('/form/plugins', function () {
    return view('/form-plugins');
});

Route::get('/form/wizards', function () {
    return view('/form-wizards');
});

Route::get('/table/elements', function () {
    return view('/table-elements');
});

Route::get('/table/plugins', function () {
    return view('/table-plugins');
});

Route::get('/chart/chart-js', function () {
    return view('/chart-js');
});

Route::get('/chart/chart-apex', function () {
    return view('/chart-apex');
});

Route::get('/map', function () {
    return view('/map');
});

Route::get('/layout/starter-page', function () {
    return view('/layout-starter-page');
});

Route::get('/layout/fixed-footer', function () {
    return view('/layout-fixed-footer');
});

Route::get('/layout/full-height', function () {
    return view('/layout-full-height');
});

Route::get('/layout/full-width', function () {
    return view('/layout-full-width');
});

Route::get('/layout/boxed-layout', function () {
    return view('/layout-boxed-layout');
});

Route::get('/layout/minified-sidebar', function () {
    return view('/layout-minified-sidebar');
});

Route::get('/page/scrum-board', function () {
    return view('/page-scrum-board');
});

Route::get('/page/products', function () {
    return view('/page-products');
});

Route::get('/page/orders', function () {
    return view('/page-orders');
});

Route::get('/page/gallery', function () {
    return view('/page-gallery');
});

Route::get('/page/search-results', function () {
    return view('/page-search-results');
});

Route::get('/page/coming-soon', function () {
    return view('/page-coming-soon');
});

Route::get('/page/error', function () {
    return view('/page-error');
});

Route::get('/page/login', function () {
    return view('/page-login');
});

Route::get('/page/register', function () {
    return view('/page-register');
});

Route::get('/profile', function () {
    return view('/profile');
});

Route::get('/calendar', function () {
    return view('/calendar');
});

Route::get('/settings', function () {
    return view('/settings');
});

Route::get('/helper', function () {
    return view('/helper');
});



