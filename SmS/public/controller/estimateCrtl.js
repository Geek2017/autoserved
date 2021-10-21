angular.module('newApp').controller('estimateCrtl', function($scope, $http, $filter, $timeout) {


    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.pagedata = [];

    firebase.database().ref('/estimate/').orderByChild('mobileno').on("value", function(snapshot) {

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
                        total: item.total
                    }

                    returnArr.push(data);

                });

                $scope.estimates = returnArr;
                console.log(returnArr);

            });

        })

    });


    let estdata = [];

    $scope.viewestimate = function(est) {
        console.log(est)

        estdata = [];
        estdata.push(est);

        $scope.quotes = est;

        $('#viewestimate').modal('toggle');

        setTimeout(() => {
            calculate0();
            calculate1();
            calculate2();
        }, 1000);

    }

    let stotal0 = 0,
        stotal1 = 0,
        stotal2 = 0;

    $("#aind").on('input', '.aintxt', function() {
        calculate0();
        obj0_arr = [];
        $scope.tojson0(obj0);
        obj0_arr.push($scope.tojson0(obj0));
        console.log(obj0_arr[0]);
    });


    $("#bpmdadd").on('input', '.pmtxt', function() {
        calculate1();
        obj1_arr = [];
        $scope.tojson1(obj1);
        obj1_arr.push($scope.tojson1(obj1));
        console.log(obj1_arr[0]);
    });


    $("#ccoadd").on('input', '.ccotxt', function() {
        calculate2();
        obj2_arr = [];
        $scope.tojson2(obj2);
        obj2_arr.push($scope.tojson2(obj2));
        console.log(obj2_arr[0]);
    });


    function calculate0() {
        var sum = 0;
        //iterate through each textboxes and add the values
        $(".aintxt").each(function() {

            let thisv = parseFloat(this.value);

            // console.log(thisv);

            //add only if the value is number
            if (!isNaN(thisv) && thisv.length != 0) {
                sum += parseFloat(thisv);
                console.log(sum)
            }

        });
        //.toFixed() method will roundoff the final sum to 2 decimal places
        $("#ainsum").html('₱ ' + parseFloat(sum).toLocaleString());
        console.log('₱ ' + parseFloat(sum).toLocaleString());
        stotal0 = sum.toFixed(2).toLocaleString();
        // grandtotal();
    }

    function calculate1() {
        var sum = 0;
        //iterate through each textboxes and add the values
        $(".pmtxt").each(function() {

            let thisv = parseFloat(this.value);

            console.log(thisv);

            //add only if the value is number
            if (!isNaN(thisv) && thisv.length != 0) {
                sum += parseFloat(thisv);
            }

        });
        //.toFixed() method will roundoff the final sum to 2 decimal places
        $("#pmsum").html('₱ ' + parseFloat(sum).toLocaleString());
        console.log('₱ ' + parseFloat(sum).toLocaleString());

        stotal1 = sum.toFixed(2).toLocaleString();
        grandtotal();
    }

    function calculate2() {
        var sum = 0;
        //iterate through each textboxes and add the values
        $(".ccotxt").each(function() {

            //add only if the value is number
            if (!isNaN(this.value) && this.value.length != 0) {
                sum += parseFloat(this.value);

            }

        });
        //.toFixed() method will roundoff the final sum to 2 decimal places
        $("#ccosum").html('₱ ' + parseFloat(sum).toLocaleString());
        console.log('₱ ' + sum.toFixed(2).toLocaleString());
        stotal2 = sum.toFixed(2).toLocaleString();
        grandtotal();
    }

    function grandtotal() {
        let gtotal = parseFloat(stotal0) + parseFloat(stotal1) + parseFloat(stotal2);
        let gvat = gtotal * 0.12;
        let tgvat = gvat + gtotal;
        console.log(parseFloat(stotal0) + parseFloat(stotal1) + parseFloat(stotal2));

        $("#grandt").html('₱ ' + parseFloat(gtotal).toLocaleString());
        $("#gvat").html('₱ ' + parseFloat(gvat).toLocaleString());
        $("#tgvat").html('₱ ' + parseFloat(tgvat).toLocaleString());
    }

    $scope.convert2jo = function() {

        console.log(estdata[0]);

        var today = new Date();
        today = parseInt(today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear() + "\nTime : " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        var uid = estdata[0].key;
        var updates = {};
        var jorder = {
            email: estdata[0].email,
            key: estdata[0].key,
            mobileno: estdata[0].mobileno,
            quotes: { aa: JSON.stringify(estdata[0].quotes.aa), bb: JSON.stringify(estdata[0].quotes.bb), cc: JSON.stringify(estdata[0].quotes.cc) },
            state: 4,
            total: estdata[0].total,
            approvedate: today
        }

        updates['/joborders/' + uid] = jorder;
        firebase.database().ref().update(updates);

        if (updates) {

            alert('Thank you for accepting the Qoutation')
            $('#viewestimate').modal('toggle')
            location.replace('#/')
            location.replace('#/estimate')


        }
    }

    $scope.unsestimate = function() {
        alert('Sent & Update Successful')
        $('#viewestimate').modal('toggle')
        location.replace('#/')
        location.replace('#/estimate')
    }
    $scope.upestimate = function() {
        alert('Update Successful')
        $('#viewestimate').modal('toggle')
        location.replace('#/')
        location.replace('#/estimate')
    }

    $scope.pageChangeHandler = function(num) {
        console.log('pagedata page changed to ' + num);
    };

    $scope.pageChangeHandler = function(num) {
        console.log('going to page ' + num);
    };

})