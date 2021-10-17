var app = angular.module('myApp', []);
app.controller('qoutes', function($scope, $http, $timeout) {

    var config = {
        apiKey: "AIzaSyBp5aAPOOntVPeVipRCPNRBRZdBFncfW98",
        authDomain: "autoserved-beta.firebaseapp.com",
        databaseURL: "https://autoserved-beta-default-rtdb.firebaseio.com/",
        projectId: "autoserved-beta"
    };

    firebase.initializeApp(config);


    var pathname = window.location.href;

    var fields = pathname.split('#');

    var url = fields[0];
    var key = fields[1];

    if (!key) {
        window.location.replace("/login.html");
    }

    console.log(url, key)

    var joborder;

    firebase.database().ref('/estimate/').orderByChild('ekey').equalTo(key).on("value", function(snapshot) {

        $timeout(function() {
            $scope.$apply(function() {
                let returnArr = [];
                snapshot.forEach(childSnapshot => {
                    let item = childSnapshot.val();
                    item.key = childSnapshot.key;

                    returnArr.push(item);

                });

                $scope.qoutes = returnArr[0];
                console.log(returnArr[0]);

                $scope.email = returnArr[0].email;
                $scope.mobile = returnArr[0].mobileno
                $scope.grandtotal = returnArr[0].total
                var num = $scope.grandtotal.replace(/₱ /g, '');
                var num2 = num.replace(/,/g, '');
                $scope.downpayment = parseFloat(num2) * 0.10;

                return joborder = returnArr[0];

            });

        })

    });

    $scope.accept = function() {

        console.log(JSON.stringify(joborder.quotes.aa));

        var uid = joborder.key;
        var updates = {};
        var jorder = {
            email: joborder.email,
            key: joborder.key,
            mobileno: joborder.mobileno,
            quotes: { aa: JSON.stringify(joborder.quotes.aa), bb: JSON.stringify(joborder.quotes.bb), cc: JSON.stringify(joborder.quotes.cc) },
            state: 4,
            total: joborder.total
        }

        updates['/joborders/' + uid] = jorder;
        firebase.database().ref().update(updates);

        if (updates) {
            setTimeout(function() {
                window.location.replace("/login.html");
            }, 1000)

        }
    }

    $scope.defered = function() {
        var ref = firebase.database().ref("/estimate/" + joborder.ekey);
        ref.remove()
            .then(function() {
                window.location.replace("/login.html");
            })
            .catch(function(error) {
                console.log(error.message)
            });
    }

});