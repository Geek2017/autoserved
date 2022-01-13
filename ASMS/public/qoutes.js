var app = angular.module('myApp', []);
app.controller('qoutes', function($scope, $http, $timeout) {



    var pathname = window.location.href;

    var fields = pathname.split('#');

    var url = fields[0];
    var key = fields[1];

    if (!key) {
        window.location.replace("/login.html");
    }

    console.log(url, key)

    var joborder;


    var myVar = setInterval(myTimer, 100);

    function myTimer() {
        console.log('Calling firebase.....')
        firebase.database().ref('/estimate/').orderByChild('ekey').equalTo(key).on("value", function(snapshot) {

            $timeout(function() {
                $scope.$apply(function() {
                    let returnArr = [];

                    snapshot.forEach(childSnapshot => {
                        let item = childSnapshot.val();
                        item.key = childSnapshot.key;
                        returnArr.push(item);
                        console.log(item.key)
                    });


                    $scope.qoutes = returnArr[0];

                    console.log($scope.qoutes.quotes.aa)

                    if ($scope.qoutes.quotes.aa === 0) {
                        $('.sra').hide();
                    }

                    if ($scope.qoutes.quotes.bb === 0) {
                        $('.srb').hide();
                    }

                    if ($scope.qoutes.quotes.cc === 0) {
                        $('.src').hide();
                    }

                    if ($scope.qoutes.quotes.dd === 0) {
                        $('.srd').hide();
                    }

                    if ($scope.qoutes.quotes.ee === 0) {
                        $('.sre').hide();
                    }

                    if ($scope.qoutes.quotes.ff === 0) {
                        $('.srf').hide();
                    }

                    if ($scope.qoutes.quotes.gg === 0) {
                        $('.srg').hide();
                    }

                    if ($scope.qoutes.quotes.others === 0) {
                        $('.sro').hide();
                    }


                    joborder = returnArr[0];

                    $scope.email = returnArr[0].email;
                    $scope.mobile = returnArr[0].mobileno

                    $scope.grandtotal = returnArr[0].total

                    var num = $scope.grandtotal.replace(/₱ /g, '');

                    var num2 = num.replace(/,/g, '');

                    var num3 = num2 * 0.12;

                    $scope.downpayment = parseFloat(num2) * 0.10;

                    $scope.ngrandtotal = num2;

                    $scope.taxntodal = parseInt(num2) + parseInt(num3)


                    console.log(parseInt(num2) + parseInt(num3));

                    console.log(returnArr[0]);


                    $scope.cmake = returnArr[0].details.make;
                    $scope.cmodel = returnArr[0].details.model;
                    $scope.transmission = returnArr[0].details.transmission;
                    $scope.cyear = returnArr[0].details.year;
                    $scope.cengine = returnArr[0].details.engine;
                    $scope.ckm = returnArr[0].details.mileage;




                });

            })

        });
    }

    setTimeout(function() {
        console.log('stop')
        clearInterval(myVar);

    }, 1000)

    $scope.booking = function() {
        $('#modalLg').modal('toggle');
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
            setTimeout(function() {
                alert('Your appointment had been sent, you will receive a notification ones your schedule is confirmed')
                window.location.replace("./");
            }, 1000)

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