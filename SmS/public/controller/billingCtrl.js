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


                    var data = {
                        email: item.email,
                        key: item.key,
                        mobileno: item.mobileno,
                        quotes: item.quotes,
                        total: item.total,
                        date: item.date
                    }

                    returnArr.push(data);

                    // returnArr.push(item);
                });

                $scope.joborders = returnArr;
                console.log(returnArr);

            });

        })

    });

    $("#ttotal").on('input', '.amtpaid', function() {

        var amt = $('.amtpaid').val();
        var amttotal = $('.amttotal').text().replace(/₱ /, '')

        let namt = parseFloat(amt)
        let namttotal = parseFloat(amttotal)

        console.log(namt, namttotal)
        if (amt > namttotal) {
            console.log(namt - namttotal);
            let amtchnge = namt - namttotal;
            var namtchnge = amtchnge.toFixed(2).toLocaleString()
            $('.amtchange').text(namtchnge);

        } else {
            $('.amtchange').text(parseFloat(0).toFixed(2).toLocaleString());
        }

    });

    $scope.paynow = function(joborder) {
        $('#pointofsale').modal('toggle');

        $(".cash").prop("checked", true);

        firebase.database().ref('/appointment/' + joborder.key).orderByChild('mobileno').on("value", function(snapshot) {

            $timeout(function() {
                $scope.$apply(function() {

                    console.log(snapshot.val())

                    $scope.fullname = snapshot.val().fullname;
                    $scope.email = snapshot.val().email;
                    $scope.mobile = snapshot.val().mobileno;
                    $scope.address = snapshot.val().address;
                    var ntotal = snapshot.val().total.replace(/₱ /, '');
                    $scope.total = ntotal;

                });

            })

        });
    }

    $scope.acceptpay = function() {


        console.log($scope.fullname);

        var today = new Date();
        today = parseInt(today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear() + "\nTime : " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        var uid = firebase.database().ref().child('/users/').push().key;
        var updates = {};

        // legend 
        // 0=partial;
        // 1=fullpaid;

        var earnings = {
            name: $scope.fullname,
            email: $scope.email,
            contact: $scope.mobile,
            address: $scope.address,
            amount: $scope.total,
            type: 'n/a',
            state: 1,
            datepaid: today
        }

        updates['/earnings/' + uid] = earnings;
        firebase.database().ref().update(updates);

        if (updates) {
            alert('Payment succesful, thank you!')
            $('#pointofsale').modal('toggle')
                // location.replace('#/')
                // location.replace('#/billing')
        }
    }


    $scope.pageChangeHandler = function(num) {
        console.log('pagedata page changed to ' + num);
    };

    $scope.pageChangeHandler = function(num) {
        console.log('going to page ' + num);
    };



})