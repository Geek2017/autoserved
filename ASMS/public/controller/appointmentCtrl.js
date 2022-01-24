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



                var objk;

                var objkid;

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
                    eventClick: function(info) {
                        var eventObj = info.event;
                        console.log(eventObj.url)
                        if (eventObj) {

                            objk = eventObj.url;

                            objkid = eventObj.extendedProps.key

                            console.log("This is it", eventObj.extendedProps.key);

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

                        $timeout(function() {
                            $scope.$apply(function() {

                                var cdate
                                var rdatainfo = [];

                                snapshot.forEach(childSnapshot => {
                                    let item = childSnapshot.val();
                                    item.key = childSnapshot.key;
                                    cdate = item.start;
                                    rdatainfo.push(item);
                                });



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

                                    xhr.open("POST", "https://api.semaphore.co/api/v4/messages?apikey=86f2627fb974d84b9f91898ea8cea6c1");
                                    xhr.setRequestHeader("Cookie", "XSRF-TOKEN=eyJpdiI6ImsyZUwzWnRWQ0NxbHlGXC9EVENjb3JnPT0iLCJ2YWx1ZSI6ImVmTHBOVWE2eGk0eG82Z0tTWEV5QzVmVkxzSE0rWU56UW00TWdvZ2VnYUJLa3BpTWVcL3RoZWpSallRdTV5c0VISWNrVXVjVWxKSCt1OU91YTNoM1pDQT09IiwibWFjIjoiNTlmZTA5ZmMyN2RiN2JkMjg2NWFlZjFkODM0NmYxMGU4MGJlYTg5ZmI1N2MwYWJlNGQ2ZTlkODNkNTk1OGE1NiJ9; laravel_session=eyJpdiI6InUxZE9HUG9VUmNFWG95bEI5UGFWc0E9PSIsInZhbHVlIjoiaWRwcGJ3R0RYZzZnRmNzeVwvYzlmOENSVllPbHFLeTRkUXNlNDgwaGw2U2hZT2FXMEdzOVZBSmdcL21PM0taeGxtRTFzQWMwM29KVmV0ZStqYXJsajdTQT09IiwibWFjIjoiMWEwYzdmYzliNzdkMTBmM2U1NjY5ZDI4ZGZhZDcyNjQ2YTg0ZTVjY2Y2OWJmM2RiMzZmOGVlOWE3MTNhZWNjNiJ9");

                                    xhr.send(data);
                                }


                                if (cdate = ndater) {
                                    console.log(cdate, ndater)
                                }

                                if (cdate === ndater) {

                                    console.log(cdate, ndater);

                                    var joborders = {};
                                    joborders['/joborders/' + ccdata.ekey] = ccdata;
                                    firebase.database().ref().update(joborders);

                                    if (joborders) {

                                        firebase.database().ref('/calendar/' + objkid).once("value").then(function(snapshot) {
                                            console.log('calendar', snapshot.val());
                                            snapshot.ref.child('color').set('#1abd36');
                                        });


                                        firebase.database().ref('/estimate/' + objkid).once("value").then(function(snapshot) {
                                            console.log('estimate', snapshot.val());
                                            snapshot.ref.child('state').set(3);
                                        });

                                        var delkey = [];
                                        angular.forEach(rdatainfo, function(value, key) {
                                            console.log(value, key);
                                            if (value.key !== objkid) {
                                                console.log('date', objkid, value.key);
                                                delkey.push(value.key)
                                            }
                                        });

                                        setTimeout(function() {

                                            console.log(delkey);

                                            var ref = firebase.database().ref("/calendar/" + delkey[0]);
                                            ref.remove()
                                                .then(function() {
                                                    console.log(delkey[0], "Deleted")

                                                })
                                                .catch(function(error) {
                                                    console.log(error.message)
                                                });

                                            var ref = firebase.database().ref("/calendar/" + delkey[1]);
                                            ref.remove()
                                                .then(function() {
                                                    console.log(delkey[1], "Deleted")

                                                })
                                                .catch(function(error) {
                                                    console.log(error.message)
                                                });
                                        }, 2000)




                                    }



                                }

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