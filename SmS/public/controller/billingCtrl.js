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

    $scope.repairorder = function(joborder) {
        $('#repairorder').modal('toggle')
        firebase.database().ref('/estimate/').orderByChild('ekey').equalTo(joborder.key).on("value", function(snapshot) {
            let returnArr = [];
            $timeout(function() {
                $scope.$apply(function() {
                    snapshot.forEach(childSnapshot => {
                        let item = childSnapshot.val();
                        item.key = childSnapshot.key;
                        returnArr.push(item);
                        console.log(item.key)
                    });

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

                    if (returnArr[0].details.pmr === 1) {
                        $('.aa').show();
                        console.log(returnArr[0].details.pmr);
                    } else {
                        $('.aa').hide();
                    }

                    if (returnArr[0].details.cor === 1) {
                        $('.bb').show();
                        console.log(returnArr[0].cor);
                    } else {
                        $('.bb').hide();
                    }


                    if (returnArr[0].details.war === 1) {
                        $('.cc').show();
                        console.log(returnArr[0].war);
                    } else {
                        $('.cc').hide();
                    }


                    if (returnArr[0].details.tsr === 1) {
                        $('.dd').show();
                        console.log(returnArr[0].tsr);
                    } else {
                        $('.dd').hide();
                    }


                    if (returnArr[0].details.gsr !== 0) {
                        $('.ee').show();
                        console.log(returnArr[0].gsr);
                    } else {
                        $('.ee').hide();
                    }


                    if (returnArr[0].details.pnmr !== 0) {
                        $('.ff').show();
                        console.log(returnArr[0].pnmr);
                    } else {
                        $('.ff').hide();
                    }

                    if (returnArr[0].details.indr !== 0) {
                        $('.gg').show();
                        console.log(returnArr[0].indr);
                    } else {
                        $('.gg').hide();
                    }

                    if (returnArr[0].details.others !== 0) {
                        $('.hh').show();
                        console.log(returnArr[0].others);
                    } else {
                        $('.hh').hide();
                    }


                    $scope.cmake = returnArr[0].details.make;
                    $scope.cmodel = returnArr[0].details.model;
                    $scope.transmission = returnArr[0].details.transmission;
                    $scope.cyear = returnArr[0].details.year;
                    $scope.cengine = returnArr[0].details.engine;
                    $scope.ckm = returnArr[0].details.mileage;

                    $('#viewestimate').modal('toggle')

                    $scope.qoutes = returnArr[0];
                });

            })

        });

        $scope.print = function() {
            $(".btnhide").hide();

            printElement(document.getElementById("printThis"));



            function printElement(elem) {
                var domClone = elem.cloneNode(true);

                var $printSection = document.getElementById("printSection");

                if (!$printSection) {
                    var $printSection = document.createElement("div");
                    $printSection.id = "printSection";
                    document.body.appendChild($printSection);
                }

                $printSection.innerHTML = "";
                $printSection.appendChild(domClone);
                window.print();

                setTimeout(function() {
                    $('#repairorder').modal('toggle')
                    $(".btnhide").show();
                }, 1000);

            }

        }


    }

})