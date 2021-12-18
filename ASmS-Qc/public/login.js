var app = angular.module('newApp', []);
app.controller('loginCtrl', function($scope, $http) {


    $('#otp').hide()

    $("#showit").click(function() {
        $('#otp').show()
        $('#inquery').hide()
    });

    function getUiConfig() {
        return {
            'callbacks': {
                'signInSuccess': function(user, credential, redirectUrl) {
                    handleSignedInUser(user);
                    return false;
                }
            },
            'signInFlow': 'invisible',
            'signInOptions': [{
                provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                recaptchaParameters: {
                    type: 'image',
                    size: 'invisible',
                    badge: 'bottomleft'
                },
                defaultCountry: 'PH',
                defaultNationalNumber: '639216686509',
                loginHint: '+639216686509'
            }],
            'tosUrl': 'https://www.google.com'
        };
    }

    var ui = new firebaseui.auth.AuthUI(firebase.auth());

    var handleSignedInUser = function(user) {
        window.location.href = './';
    }

    var handleSignedOutUser = function() {

        ui.start('#firebaseui-container', getUiConfig());
    };

    firebase.auth().onAuthStateChanged(function(user) {
        // document.getElementById('loading').style.display = 'none';
        // document.getElementById('loaded').style.display = 'block';
        user ? handleSignedInUser(user) : handleSignedOutUser();
    });

    var initApp = function() {
        // document.getElementById('sign-out').addEventListener('click', function() {
        //     firebase.auth().signOut();
        // });
    };

    window.addEventListener('load', initApp);

    $("#closeit").click(function() {
        $('#exampleModal').modal('hide');
    });

    $("#ibutton").click(function() {
        $('#exampleModal').modal('hide');
    });

    $("#logout").click(function() {
        $('#exampleModal').modal('hide');
        window.location.href = '#/enroll';
    });


});