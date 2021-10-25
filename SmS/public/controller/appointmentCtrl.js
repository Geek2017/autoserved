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

                var calendar = new FullCalendar.Calendar(calendarEl, {
                    eventClick: function(info) {
                        var eventObj = info.event;

                        if (eventObj) {
                            objk = eventObj.url;
                            dater = eventObj.start.toLocaleDateString('zh-Hans-CN');
                            console.log(dater);

                            $('#viewscad').modal('toggle');

                            firebase.database().ref('/inquiries/' + eventObj.url).orderByChild('ekey').on("value", function(snapshot) {

                                $timeout(function() {
                                    $scope.$apply(function() {
                                        console.log(snapshot.val());
                                        $scope.coname = eventObj.title;

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

                                    if (cdate === ndater) {
                                        console.log('Approvedate', item.start, ndater, item.key);
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

                $scope.closed = function() {
                    $('#viewscad').modal('toggle');
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