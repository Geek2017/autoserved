angular.module('newApp').controller('billingCtrl', function($scope, $http, $filter, $timeout) {

    $scope.currentPage = 1;
    $scope.pageSize = 10;
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
                        stat = 'Paid';
                    }

                    var data = {
                        email: item.email,
                        key: item.key,
                        mobileno: item.mobileno,
                        quotes: item.quotes,
                        state: stat,
                        total: item.total
                    }

                    returnArr.push(data);

                    // returnArr.push(item);
                });

                $scope.joborders = returnArr;
                console.log(returnArr);

            });

        })

    });



    $scope.paynow = function(joborder) {

        console.log(joborder);

        var today = new Date();
        today = parseInt(today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear() + "\nTime : " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        var uid = joborder.key;
        var updates = {};
        var jorder = {
            email: joborder.email,
            key: joborder.key,
            mobileno: joborder.mobileno,
            quotes: { aa: JSON.stringify(joborder.quotes.aa), bb: JSON.stringify(joborder.quotes.bb), cc: JSON.stringify(joborder.quotes.cc) },
            state: 5,
            total: joborder.total,
            approvedate: today
        }

        updates['/joborders/' + uid] = jorder;
        firebase.database().ref().update(updates);

        if (updates) {

            alert('Payment succesful, thank you!')
            $('#viewestimate').modal('toggle')
            location.replace('#/')
            location.replace('#/billing')


        }
    }


    $scope.pageChangeHandler = function(num) {
        console.log('pagedata page changed to ' + num);
    };

    $scope.pageChangeHandler = function(num) {
        console.log('going to page ' + num);
    };



})