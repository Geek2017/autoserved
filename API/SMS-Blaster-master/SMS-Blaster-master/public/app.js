// Application Modules and Routing
angular
    .module('newApp', ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/dashboard.html',
                controller: "dashboardCtrl"
            })
            .when('/logs', {
                templateUrl: 'views/logs.html',
                controller: "logsCtrl"
            })
            .when('/sms', {
                templateUrl: 'views/sms.html',
                controller: "smsCtrl"
            })
            .when('/directory', {
                templateUrl: 'views/directory.html',
                controller: "directoryCtrl"
            })
            .when('/sms', {
                templateUrl: 'views/sms.html',
                controller: "smsCtrl"

            });
    });