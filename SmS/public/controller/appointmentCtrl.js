angular.module('newApp').controller('appointmentCtrl', function($scope, $http, $filter, $timeout, $window) {

    $scope.currentPage = 1;
    $scope.pageSize = 5;
    $scope.pagedata = [];



    firebase.database().ref('/calendar/').orderByChild('mobileno').on("value", function(snapshot) {

        $timeout(function() {
            $scope.$apply(function() {
                let returnArr = [];
                snapshot.forEach(childSnapshot => {
                    let item = childSnapshot.val();
                    item.key = childSnapshot.key;
                    returnArr.push(item);
                });


                console.log(returnArr);

                var calendarEl = document.getElementById('calendar');

                var objk;

                var dater;

                let ccdata;

                var comobile

                var spdates = [];

                $('.cofd0').change(function() {
                    spdates.push($('.cofd0').val());
                    console.log(spdates)
                });

                $('.cofd1').change(function() {
                    spdates.push($('.cofd1').val());
                    console.log(spdates)
                });

                $('.cofd2').change(function() {
                    spdates.push($('.cofd2').val());
                    console.log(spdates[0])
                });

                var calendar = new FullCalendar.Calendar(calendarEl, {
                    eventClick: function(info) {
                        var eventObj = info.event;
                        console.log(eventObj.url)
                        if (eventObj) {
                            objk = eventObj.url;
                            dater = eventObj.start.toLocaleDateString('zh-Hans-CN');
                            console.log(dater);

                            $('#viewscad').modal('toggle');

                            firebase.database().ref('/inquiries/' + eventObj.url).orderByChild('ekey').on("value", function(snapshot) {

                                firebase.database().ref('/estimate/' + eventObj.url).orderByChild('ekey').on("value", function(snapshot) {
                                    ccdata = snapshot.val();
                                });

                                $timeout(function() {
                                    $scope.$apply(function() {
                                        console.log(snapshot.val());
                                        $scope.coname = eventObj.title;

                                        comobile = snapshot.val().mobileno;

                                        $scope.apdate = eventObj.start;

                                        $scope.coemail = snapshot.val().email;

                                        $scope.cbrand = snapshot.val().make;

                                        $scope.cengine = snapshot.val().engine;

                                        $scope.ctransmission = snapshot.val().transmission;

                                        $scope.cbodytype = snapshot.val().cartype;

                                        $scope.cmodel = snapshot.val().model;

                                        $scope.creading = snapshot.val().mileage;

                                        $scope.cpdate = snapshot.val().purchasedate;

                                        $scope.cymodel = snapshot.val().year;

                                    });

                                })

                            });

                            info.jsEvent.preventDefault();
                        } else {
                            alert('Clicked ' + eventObj.title);
                        }
                    },
                    initialDate: '2021-10-15',
                    events: returnArr
                });

                calendar.render();

                $scope.approvedate = function() {

                    let ndater = dater.replace(/\//g, '-');;

                    var ref = firebase.database().ref("calendar");
                    ref.orderByChild("url").equalTo(objk).on("value", function(snapshot) {
                        let objs = snapshot.val();

                        console.log(ndater)

                        $timeout(function() {
                            $scope.$apply(function() {

                                snapshot.forEach(childSnapshot => {
                                    let item = childSnapshot.val();
                                    item.key = childSnapshot.key;

                                    let cdate = item.start
                                    console.log(cdate)

                                    var form = new FormData();
                                    form.append("To", '+639' + comobile);
                                    form.append("From", "+14157924897");
                                    form.append("Body", "Hello! your auto-shop has approve " + dater + " as your proposed schedule, do bring your car in the shop as per date approve thank you!");

                                    var settings = {
                                        "url": "https://api.twilio.com/2010-04-01/Accounts/AC616dd219c8bea3811d0c502f573af681/Messages.json",
                                        "method": "POST",
                                        "timeout": 0,
                                        "headers": {
                                            "Authorization": "Basic QUM2MTZkZDIxOWM4YmVhMzgxMWQwYzUwMmY1NzNhZjY4MTpiNThlNTYwNGRjNzE5MDlhODYwNDgzZjljZmZiZDU0Mg=="
                                        },
                                        "processData": false,
                                        "mimeType": "multipart/form-data",
                                        "contentType": false,
                                        "data": form
                                    };

                                    $.ajax(settings).done(function(response) {
                                        console.log(response);
                                        if (response) {
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
                                                                        $('#changescad').modal('hide');
                                                                        location.replace('#/analytics')
                                                                        location.replace('#/appointment')
                                                                    }, 100);
                                                                }
                                                                i++;
                                                            });
                                                    });
                                                });
                                            });
                                        }
                                    });

                                    if (cdate == ndater) {
                                        console.log('Approvedate', item.start, ndater, item.key);
                                        var joborders = {};
                                        joborders['/joborders/' + ccdata.ekey] = ccdata;
                                        firebase.database().ref().update(joborders);


                                        if (joborders) {
                                            console.log(joborders)
                                        }

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
                                });
                                // console.log(returnArr);
                            });
                        });
                    });
                }

                $scope.changeschad = function() {
                    $('#changescad').modal('toggle');
                    $('#viewscad').modal('toggle');
                }

                $scope.spdate = function() {

                    console.log(comobile)

                    var ref = firebase.database().ref("/calendar/");
                    ref.orderByChild("url").equalTo(objk).on("value", function(snapshot) {


                        var form = new FormData();
                        form.append("To", '+639' + comobile);
                        form.append("From", "+14157924897");
                        form.append("Body", "Hello! your auto shop is requesting a reschedule for your car maintenance pls. click the link for details" + "&nbsp;" + "autoserved-beta.web.app/reschadule.html#" + objk);

                        var settings = {
                            "url": "https://api.twilio.com/2010-04-01/Accounts/AC616dd219c8bea3811d0c502f573af681/Messages.json",
                            "method": "POST",
                            "timeout": 0,
                            "headers": {
                                "Authorization": "Basic QUM2MTZkZDIxOWM4YmVhMzgxMWQwYzUwMmY1NzNhZjY4MTpiNThlNTYwNGRjNzE5MDlhODYwNDgzZjljZmZiZDU0Mg=="
                            },
                            "processData": false,
                            "mimeType": "multipart/form-data",
                            "contentType": false,
                            "data": form
                        };

                        $.ajax(settings).done(function(response) {
                            console.log(response);
                            if (response) {
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
                                                            $('#changescad').modal('hide');
                                                            location.replace('#/analytics')
                                                            location.replace('#/appointment')
                                                        }, 100);
                                                    }
                                                    i++;
                                                });
                                        });
                                    });
                                });
                            }
                        });


                    });
                }

            });

        })

    });




    $scope.pageChangeHandler = function(num) {
        console.log('pagedata page changed to ' + num);
    };

    $scope.pageChangeHandler = function(num) {
        console.log('going to page ' + num);
    };





})