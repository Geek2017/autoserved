// Application Modules and Routing
angular
    .module('newApp', ['ngRoute', 'angularUtils.directives.dirPagination'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/dashboard.html',
                controller: 'dashboardCtrl'
            }).when('/analytics', {
                templateUrl: 'views/analytics.html',
                controller: 'analyticsCrtl'
            }).when('/inquiries', {
                templateUrl: 'views/inquiries.html',
                controller: 'inquiriesCtrl'
            }).when('/estimate', {
                templateUrl: 'views/estimate.html',
                controller: 'estimateCrtl'
            }).when('/joborder', {
                templateUrl: 'views/joborder.html',
                controller: 'jobordersCrtl'
            }).when('/billing', {
                templateUrl: 'views/billing.html',
                controller: 'billingCtrl'
            }).when('/appointment', {
                templateUrl: 'views/appointment.html',
                controller: 'appointmentCtrl'
            }).when('/earnings', {
                templateUrl: 'views/earnings.html',
                controller: 'earningsCtrl'
            })
    }).config(function(paginationTemplateProvider) {
        paginationTemplateProvider.setPath('./views/customTemplate.html');
    });