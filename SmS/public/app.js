// Application Modules and Routing
angular
    .module('newApp', ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/dashboard.html',
                controller: 'dashboardCtrl'
            }).when('/analytics', {
                templateUrl: 'views/analytics.html',
                controller: 'analyticsCrtl'
            })
            .when('/inquiries', {
                templateUrl: 'views/inquiries.html',
                controller: 'inquiriesCtrl'
            });
    });