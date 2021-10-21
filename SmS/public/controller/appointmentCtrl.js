angular.module('newApp').controller('appointmentCtrl', function($scope, $http, $filter, $timeout, $window) {

    $scope.currentPage = 1;
    $scope.pageSize = 5;
    $scope.pagedata = [];

    firebase.database().ref('/joborders/').orderByChild('mobileno').on("value", function(snapshot) {

        $timeout(function() {
            $scope.$apply(function() {
                let returnArr = [];
                snapshot.forEach(childSnapshot => {
                    let item = childSnapshot.val();
                    item.key = childSnapshot.key;

                    var stat;

                    if (item.state === 0) {
                        stat = '';
                        stat = 'Saved';
                    } else if (item.state === 1) {
                        stat = '';
                        stat = 'Sent';
                    } else if (item.state === 2) {
                        stat = '';
                        stat = 'Defered';
                    } else if (item.state === 3) {
                        stat = '';
                        stat = 'Scheduled';
                    } else if (item.state === 4) {
                        stat = '';
                        stat = 'Approved';
                    } else if (item.state === 5) {
                        stat = '';
                        stat = 'Done';
                    }

                    var data = {
                        email: item.email,
                        key: item.key,
                        mobileno: item.mobileno,
                        quotes: item.quotes,
                        state: stat,
                        total: item.total,
                        approvedate: item.approvedate
                    }

                    returnArr.push(data);

                    // returnArr.push(item);
                });

                $scope.joborders = returnArr;
                console.log(returnArr);

            });

        })

    });



    $scope.pageChangeHandler = function(num) {
        console.log('pagedata page changed to ' + num);
    };

    $scope.pageChangeHandler = function(num) {
        console.log('going to page ' + num);
    };


    var handleRenderFullcalendar = function() {
        // external events
        var containerEl = document.getElementById('external-events');
        var Draggable = FullCalendarInteraction.Draggable;
        new Draggable(containerEl, {
            itemSelector: '.fc-event-link',
            eventData: function(eventEl) {
                return {
                    title: eventEl.innerText,
                    color: eventEl.getAttribute('data-color')
                };
            }
        });

        // fullcalendar
        var d = new Date();
        var month = d.getMonth() + 1;
        month = (month < 10) ? '0' + month : month;
        var year = d.getFullYear();
        var calendarElm = document.getElementById('calendar');
        var calendar = new FullCalendar.Calendar(calendarElm, {
            headerToolbar: {
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
            events: [{
                    title: 'Visit Apple Company',
                    start: year + '-' + month + '-22T05:00:00',
                    color: COLOR_GREEN
                },
                {
                    title: 'Exercise Class',
                    start: year + '-' + month + '-22T07:30:00',
                    color: COLOR_ORANGE
                },
                {
                    title: 'Live Recording',
                    start: year + '-' + month + '-22T03:00:00',
                    color: COLOR_BLUE
                },
                {
                    title: 'Announcement',
                    start: year + '-' + month + '-22T15:00:00',
                    color: COLOR_RED
                },
                {
                    title: 'Dinner',
                    start: year + '-' + month + '-22T18:00:00'
                },
                {
                    title: 'New Android App Discussion',
                    start: year + '-' + month + '-25T08:00:00',
                    end: year + '-' + month + '-25T10:00:00',
                    color: COLOR_RED
                },
                {
                    title: 'Marketing Plan Presentation',
                    start: year + '-' + month + '-25T12:00:00',
                    end: year + '-' + month + '-25T14:00:00',
                    color: COLOR_BLUE
                },
                {
                    title: 'Chase due',
                    start: year + '-' + month + '-26T12:00:00',
                    color: COLOR_ORANGE
                },
                {
                    title: 'Heartguard',
                    start: year + '-' + month + '-26T08:00:00',
                    color: COLOR_ORANGE
                },
                {
                    title: 'Lunch with Richard',
                    start: year + '-' + month + '-28T14:00:00',
                    color: COLOR_BLUE
                },
                {
                    title: 'Web Hosting due',
                    start: year + '-' + month + '-30',
                    color: COLOR_BLUE
                }
            ]
        });

        calendar.render();
    };



    $(document).ready(function() {
        handleRenderFullcalendar();
    });


})