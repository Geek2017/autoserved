angular.module('newApp').controller('indexdCtrl', function($scope, $timeout) {

    var config = {
        apiKey: "AIzaSyDrHTFjhHridL50TZ_2gEq2L9T_EcMTweo",
        authDomain: "sms-blaster-e9c0d.firebaseapp.com",
        databaseURL: "https://sms-blaster-e9c0d-default-rtdb.firebaseio.com",
        projectId: "sms-blaster-e9c0d"
    };

    firebase.initializeApp(config);

    if (localStorage.getItem('otptoken') !== "P@$$w0rdk0") {
        var settings = {
            "url": "https://lj2e11f6r1.execute-api.ap-southeast-1.amazonaws.com/autoserved/users/" + localStorage.getItem('mn'),
            "method": "GET",
            "timeout": 0,
        };

        $.ajax(settings).done(function(response) {
            var resd = response.state;
            console.log(resd);
            if (resd !== 'approve') {
                window.location.href = './login.html';
            }
        });
    }



});