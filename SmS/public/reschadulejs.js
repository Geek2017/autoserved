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

    let ccdata;

    firebase.database().ref('/calendar/').orderByChild('url').equalTo(key).on("value", function(snapshot) {

        $timeout(function() {
            $scope.$apply(function() {
                let returnArr = [];
                let cardata = [];
                snapshot.forEach(childSnapshot => {
                    let item = childSnapshot.val();
                    item.key = childSnapshot.key;
                    returnArr.push(item);
                });

                $scope.dates = returnArr;

                firebase.database().ref('/estimate/' + key).orderByChild('ekey').on("value", function(snapshot) {
                    snapshot.forEach(childSnapshot => {
                        let item = childSnapshot.val();
                        item.key = childSnapshot.key;
                        cardata.push(item);
                    });
                });


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

    var spdates = [];

    $('.fd0').change(function() {
        spdates.push($('.fd0').val());
        console.log(spdates, spdates.length)
        if (spdates.length == 3) {
            $(".btn-success").prop('disabled', false);
        }
    });

    $('.fd1').change(function() {
        spdates.push($('.fd1').val());
        console.log(spdates, )
        if (spdates.length == 3) {
            $(".btn-success").prop('disabled', false);
        }
    });

    $('.fd2').change(function() {
        spdates.push($('.fd2').val());
        console.log(spdates[0])
        if (spdates.length == 3) {
            $(".btn-success").prop('disabled', false);
        }
    });

    $scope.reschedule = function() {
        $('#changesdate').modal('toggle');
        $('#changescad').modal('toggle');
        $(".btn-success").prop('disabled', true);
    }

    $scope.proposedate = function() {
        var ref = firebase.database().ref("/calendar/");
        ref.orderByChild("url").equalTo(key).on("value", function(snapshot) {
            $timeout(function() {
                $scope.$apply(function() {
                    var valc = [];
                    var i = 0;
                    snapshot.forEach(childSnapshot => {
                        let item = childSnapshot.val();
                        item.key = childSnapshot.key;
                        valc.push(item)
                        console.log(item.key)
                        var db = firebase.database();
                        db.ref('/calendar/' + item.key)
                            .orderByChild("start")
                            // .equalTo(item.key)
                            .once('value')
                            .then(function(snapshot) {

                                console.log(snapshot.val(), i);

                                childSnapshot.ref.child('start').set(spdates[i])

                                var param = valc.length - 1;

                                console.log(param - 1, i);

                                if (param === i) {
                                    setTimeout(function() {
                                        alert('Proposed date Sent!')
                                        location.replace('login.html')
                                    }, 100);
                                }
                                i++;
                            });

                    });

                });
            });
        });
    }

    let pickdate;

    $scope.approve = function() {

        // console.log(pickdate);

        let ndater = pickdate;

        var ref = firebase.database().ref("calendar");
        ref.orderByChild("url").equalTo(key).on("value", function(snapshot) {

            // console.log(ndater)

            $timeout(function() {
                $scope.$apply(function() {

                    snapshot.forEach(childSnapshot => {
                        let item = childSnapshot.val();
                        item.key = childSnapshot.key;

                        let cdate = item.start
                        console.log(cdate)

                        if (cdate == ndater) {
                            console.log('Approvedate', item.start, ndater, item.key);
                            // var joborders = {};
                            // joborders['/joborders/' + ccdata.ekey] = ccdata;
                            // firebase.database().ref().update(joborders);


                            // if (joborders) {
                            //     console.log(joborders)
                            // }

                            var db = firebase.database();
                            db.ref('/calendar/')
                                .orderByChild("start")
                                .equalTo(ndater)
                                .once('value')
                                .then(function(snapshot) {
                                    snapshot.forEach(function(childSnapshot) {
                                        childSnapshot.ref.child('color').set('#1abd36');
                                    });
                                });

                        } else {

                            console.log('Not-Approvedate', item.start, ndater, item.key);
                            var ref = firebase.database().ref("/calendar/" + item.key);
                            ref.remove()
                                .then(function() {
                                    console.log("Remove succeeded.")

                                })
                                .catch(function(error) {
                                    console.log(error.message)
                                });
                        }

                        setTimeout(function() {

                            location.replace('login.html')

                        }, 2000);
                    });
                    // console.log(returnArr);
                });
            });
        });
    }

    $scope.pickdate = function(dt) {
        // console.log(dt);
        pickdate = dt;
    }

    $scope.goback = function() {
        $('#changescad').modal('toggle');
        $('#changesdate').modal('toggle');
    }


});