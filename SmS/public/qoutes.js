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

    $scope.booking = function() {
        $('#modalSm').modal('toggle');
    }




    $(".accept").click(function() {


        console.log(JSON.stringify(joborder.quotes.aa));

        var today = new Date();
        today = parseInt(today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear() + "\nTime : " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        var val0, val1, val2;

        if (joborder.quotes.aa) {
            val0 = joborder.quotes.aa;
        } else {
            val0 = 'none';
        }

        if (joborder.quotes.bb) {
            val1 = joborder.quotes.bb;
        } else {
            val1 = 'none';
        }

        if (joborder.quotes.cc) {
            val2 = joborder.quotes.cc;
        } else {
            val2 = 'none';
        }



        var uid = joborder.key;
        var updates = {};
        var jorder = {
            email: joborder.email,
            key: joborder.key,
            mobileno: joborder.mobileno,
            quotes: { aa: JSON.stringify(val0), bb: JSON.stringify(val1), cc: JSON.stringify(val2) },
            state: 4,
            total: joborder.total,
            fullname: $scope.cofn,
            address: $scope.coadd,
            plateno: $scope.copn,
            date0: $scope.cofd0,
            date1: $scope.cofd1,
            date2: $scope.cofd2,
            approvedate: today,
            state: 0
        }

        console.log(jorder)

        updates['/appointment/' + uid] = jorder;
        firebase.database().ref().update(updates);

        if (updates) {
            console.log(updates)

            var calschad0 = {
                url: uid,
                title: $scope.cofn,
                start: $scope.cofd0.toISOString().substr(0, 10),
                color: COLOR_ORANGE,
            }

            var calschad1 = {
                url: uid,
                title: $scope.cofn,
                start: $scope.cofd1.toISOString().substr(0, 10),
                color: COLOR_ORANGE,
            }

            var calschad2 = {
                    url: uid,
                    title: $scope.cofn,
                    start: $scope.cofd2.toISOString().substr(0, 10),
                    color: COLOR_ORANGE,
                }
                // alert(0)
            var cid0 = firebase.database().ref().child('/calendar/').push().key;
            updates['/calendar/' + cid0] = calschad0;
            firebase.database().ref().update(updates);

            setTimeout(function() {
                var cid1 = firebase.database().ref().child('/calendar/').push().key;
                // alert(1)
                updates['/calendar/' + cid1] = calschad1;
                firebase.database().ref().update(updates);
            }, 500)

            setTimeout(function() {
                var cid2 = firebase.database().ref().child('/calendar/').push().key;
                // alert(2)
                updates['/calendar/' + cid2] = calschad2;
                firebase.database().ref().update(updates);
            }, 1000)




            console.log(updates)
                // setTimeout(function() {
                //     alert('Your appointment had been set, you will receive a notifcation ones your schedule is confirmed')
                //     window.location.replace("./");
                // }, 1000)

        }
    });


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