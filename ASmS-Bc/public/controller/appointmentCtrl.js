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

                // var calendarEl = document.getElementById('calendar');

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

                const d = new Date();

                d.getMonth() + 1; // Month	[mm]	(1 - 12)
                d.getDate(); // Day		[dd]	(1 - 31)
                d.getFullYear();

                // let curdate = d.getFullYear() + '-' + parseInt(d.getMonth() + 1) + '-' + d.getDate();

                // console.log(curdate);
                // fullcalendar

                var month = d.getMonth() + 1;
                month = (month < 10) ? '0' + month : month;
                var year = d.getFullYear();

                var calendarElm = document.getElementById('calendar');
                var calendar = new FullCalendar.Calendar(calendarElm, {
                    headerToolbar: {
                        left: 'dayGridMonth,timeGridWeek,timeGridDay',
                        center: 'title',
                        right: 'prev,next today'
                    },
                    buttonText: {
                        today: 'Today',
                        month: 'Month',
                        week: 'Week',
                        day: 'Day'
                    },
                    initialView: 'dayGridMonth',
                    editable: true,
                    droppable: true,
                    themeSystem: 'bootstrap',
                    eventLimit: true, // for all non-TimeGrid views
                    views: {
                        timeGrid: {
                            eventLimit: 6 // adjust to 6 only for timeGridWeek/timeGridDay
                        }
                    },
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

                                    function senddate() {
                                        console.log(cdate, comobile)

                                        var data = new FormData();
                                        data.append("number", '+63' + comobile);
                                        data.append("message", "Hello! your auto-shop has approve " + cdate + " as your proposed schedule, do bring your car in the shop as per date approve thank you!");
                                        data.append("sendername", "AutoServed");

                                        var xhr = new XMLHttpRequest();
                                        xhr.withCredentials = true;

                                        xhr.addEventListener("readystatechange", function() {
                                            if (this.readyState === 4) {
                                                console.log(this.responseText);

                                                window.location.reload();
                                            }
                                        });

                                        xhr.open("POST", "https://api.semaphore.co/api/v4/messages?apikey=762e101f7ee48d5a34ef8316bb074716");
                                        xhr.setRequestHeader("Cookie", "XSRF-TOKEN=eyJpdiI6ImsyZUwzWnRWQ0NxbHlGXC9EVENjb3JnPT0iLCJ2YWx1ZSI6ImVmTHBOVWE2eGk0eG82Z0tTWEV5QzVmVkxzSE0rWU56UW00TWdvZ2VnYUJLa3BpTWVcL3RoZWpSallRdTV5c0VISWNrVXVjVWxKSCt1OU91YTNoM1pDQT09IiwibWFjIjoiNTlmZTA5ZmMyN2RiN2JkMjg2NWFlZjFkODM0NmYxMGU4MGJlYTg5ZmI1N2MwYWJlNGQ2ZTlkODNkNTk1OGE1NiJ9; laravel_session=eyJpdiI6InUxZE9HUG9VUmNFWG95bEI5UGFWc0E9PSIsInZhbHVlIjoiaWRwcGJ3R0RYZzZnRmNzeVwvYzlmOENSVllPbHFLeTRkUXNlNDgwaGw2U2hZT2FXMEdzOVZBSmdcL21PM0taeGxtRTFzQWMwM29KVmV0ZStqYXJsajdTQT09IiwibWFjIjoiMWEwYzdmYzliNzdkMTBmM2U1NjY5ZDI4ZGZhZDcyNjQ2YTg0ZTVjY2Y2OWJmM2RiMzZmOGVlOWE3MTNhZWNjNiJ9");

                                        xhr.send(data);
                                    }

                                    if (cdate == ndater) {
                                        console.log('Approvedate', item.start, ndater, item.key);
                                        var joborders = {};
                                        joborders['/joborders/' + ccdata.ekey] = ccdata;
                                        firebase.database().ref().update(joborders);


                                        if (joborders) {
                                            console.log(joborders)

                                            var db = firebase.database();
                                            db.ref('/calendar/')
                                                .orderByChild("start")
                                                .equalTo(ndater)
                                                .once('value')
                                                .then(function(snapshot) {
                                                    snapshot.forEach(function(childSnapshot) {
                                                        childSnapshot.ref.child('color').set('#1abd36');
                                                        senddate();
                                                    });
                                                });

                                            var db = firebase.database();
                                            db.ref('/estimate/')
                                                .orderByChild("ekey")
                                                .equalTo(ccdata.ekey)
                                                .once('value')
                                                .then(function(snapshot) {
                                                    snapshot.forEach(function(childSnapshot) {
                                                        childSnapshot.ref.child('state').set(3);

                                                    });
                                                });

                                        }



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

                    // var ref = firebase.database().ref("/calendar/");
                    // ref.orderByChild("url").equalTo(objk).on("value", function(snapshot) {


                    //     var form = new FormData();
                    //     form.append("To", '+63' + comobile);
                    //     form.append("From", "+14157924897");
                    //     form.append("Body", "Hello! your auto shop is requesting a reschedule for your car maintenance pls. click the link for details" + "&nbsp;" + "autoserved-beta.web.app/reschadule.html#" + objk);

                    //     var settings = {
                    //         "url": "https://api.twilio.com/2010-04-01/Accounts/AC742b2637d81ad25881d744ba9e098eda/Messages.json",
                    //         "method": "POST",
                    //         "timeout": 0,
                    //         "headers": {
                    //             "Authorization": "Basic QUM2MTZkZDIxOWM4YmVhMzgxMWQwYzUwMmY1NzNhZjY4MTpiNThlNTYwNGRjNzE5MDlhODYwNDgzZjljZmZiZDU0Mg=="
                    //         },
                    //         "processData": false,
                    //         "mimeType": "multipart/form-data",
                    //         "contentType": false,
                    //         "data": form
                    //     };

                    //     $.ajax(settings).done(function(response) {
                    //         console.log(response);
                    //         if (response) {

                    //         }
                    //     });

                    // });
                    genjo();

                    function genjo() {
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