var app = angular.module('myApp', []);
app.controller('changescad', function($scope, $http, $timeout) {

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

    firebase.database().ref('/calendar/').orderByChild('url').equalTo(key).on("value", function(snapshot) {

        $timeout(function() {
            $scope.$apply(function() {
                let returnArr = [];
                snapshot.forEach(childSnapshot => {
                    let item = childSnapshot.val();
                    item.key = childSnapshot.key;
                    returnArr.push(item);
                });
                console.log(returnArr);
                $scope.dates = returnArr;
            });

        })

    });


    setTimeout(function() {
        $('#changescad').modal('toggle');
        $(".cofd0").prop('disabled', true);
        $(".cofd1").prop('disabled', true);
        $(".cofd2").prop('disabled', true);
    }, 1000)



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
            date0: $('.cofd0').val(),
            date1: $('.cofd1').val(),
            date2: $('.cofd2').val(),
            approvedate: today,
            state: 0
        }

        console.log(jorder)

        updates['/appointment/' + uid] = jorder;
        firebase.database().ref().update(updates);

        if (updates) {

            var calschad0 = {
                url: uid,
                title: $scope.cofn,
                start: $('.cofd0').val(),
                color: COLOR_ORANGE,
            }

            var calschad1 = {
                url: uid,
                title: $scope.cofn,
                start: $('.cofd1').val(),
                color: COLOR_ORANGE,
            }

            var calschad2 = {
                    url: uid,
                    title: $scope.cofn,
                    start: $('.cofd2').val(),
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

    $scope.approve = function() {
        alert(1)
    }

    $scope.reschedule = function() {
        $('#changesdate').modal('toggle');
        $('#changescad').modal('toggle');
    }

    $scope.goback = function() {
        $('#changescad').modal('toggle');
        $('#changesdate').modal('toggle');
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