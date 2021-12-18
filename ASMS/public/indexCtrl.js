angular.module('newApp').controller('indexCtrl', function($scope) {

    $scope.exitnow = function() {
        firebase.auth().signOut();
    }

    firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
            console.log(user)

            window.location.replace("login.html");
        } else {
            $('.mobileno').text(user.phoneNumber);
            $scope.loginuser = user.phoneNumber;
        }
    });

});