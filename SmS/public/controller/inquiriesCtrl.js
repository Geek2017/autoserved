angular.module('newApp').controller('inquiriesCtrl', function($scope, $http, $filter, $timeout) {

    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.pagedata = [];

    $scope.pageChangeHandler = function(num) {
        console.log('pagedata page changed to ' + num);
    };

    $scope.pageChangeHandler = function(num) {
        console.log('going to page ' + num);
    };

    firebase.database().ref('/inquiries/').orderByChild('mobileno').on("value", function(snapshot) {

        $timeout(function() {
            $scope.$apply(function() {
                let returnArr = [];
                snapshot.forEach(childSnapshot => {
                    let item = childSnapshot.val();
                    item.key = childSnapshot.key;
                    returnArr.push(item);

                });

                $scope.inqs = returnArr;
                console.log(returnArr);

            });

        })

    });

    $('#estimate').modal('toggle')

    let cnt0 = 0;
    $scope.addtr = function() {
        $("#aindadd").append('<tr class="row_to_clone"><td class="col-md-2"><input class="form-control" type="text" placeholder="Particulars"></td></td><td class="col-md-6"><input class="form-control" type="text" placeholder="Description"></td></td><td class="col-md-2"><input class="form-control aintxt" type="number"  placeholder="Cost" /></td></tr>');
        cnt0++;
        $('table thead th').each(function(i) {

        });

        calculate0();
        console.log(cnt0)
    }

    $scope.remtr = function() {
        if (cnt0 !== 0) {
            addtr
            console.log(cnt0)
            $('#aindadd tr:last').remove();
            $('table thead th').each(function(i) {

            });
            cnt0--;
        }

        calculate0();
    }

    let cnt1 = 0;
    $scope.bpmaddtr = function() {

        $("#bpmdadd").append('<tr class="row_to_clone"><td class="col-md-2"><input class="form-control" type="text" placeholder="Particulars"></td></td><td class="col-md-6"><input class="form-control" type="text" placeholder="Description"></td></td><td class="col-md-2"><input class="form-control pmtxt" type="number"  placeholder="Cost" /></td></tr>');
        cnt1++;
        $('table thead th').each(function(i) {

        });
        calculate1()
        console.log(cnt1)
    }

    $scope.bpmremtr = function() {
        if (cnt1 !== 0) {
            console.log(cnt1)
            $('#bpmdadd tr:last').remove();
            $('table thead th').each(function(i) {});

            cnt1--;
        }

        calculate1()
    }


    let cnt2 = 0;
    $scope.ccoaddtr = function() {
        $("#ccoadd").append('<tr class="row_to_clone"><td class="col-md-2"><input class="form-control" type="text" placeholder="Particulars"></td></td><td class="col-md-6"><input class="form-control" type="text" placeholder="Description"></td></td><td class="col-md-2"><input class="form-control ccotxt" type="number"  placeholder="Cost" /></td></tr>');
        cnt2++;
        $('table thead th').each(function(i) {

        });

        console.log(cnt2)
    }

    $scope.ccoremtr = function() {
        if (cnt2 !== 0) {
            console.log(cnt2)
            $('#ccoadd tr:last').remove();
            $('table thead th').each(function(i) {});

            cnt2--;
        }

        calculate2()
    }

    let cnt3 = 0;
    $scope.dtsaddtr = function() {
        $("#dtsadd").append('<tr class="row_to_clone"><td class="col-md-2"><input class="form-control" type="text" placeholder="Particulars"></td></td><td class="col-md-6"><input class="form-control" type="text" placeholder="Description"></td></td><td class="col-md-2"><input class="form-control dtstxt" type="number"  placeholder="Cost" /></td></tr>');
        cnt3++;
        $('table thead th').each(function(i) {

        });

        console.log(cnt3)
    }

    $scope.dtsremtr = function() {
        if (cnt3 !== 0) {
            console.log(cnt2)
            $('#dtsadd tr:last').remove();
            $('table thead th').each(function(i) {});

            cnt3--;
        }

        calculate2()
    }

    let cnt4 = 0;
    $scope.grsaddtr = function() {
        $("#grsadd").append('<tr class="row_to_clone"><td class="col-md-2"><input class="form-control" type="text" placeholder="Particulars"></td></td><td class="col-md-6"><input class="form-control" type="text" placeholder="Description"></td></td><td class="col-md-2"><input class="form-control grstxt" type="number"  placeholder="Cost" /></td></tr>');
        cnt4++;
        $('table thead th').each(function(i) {

        });

        console.log(cnt3)
    }

    $scope.grsremtr = function() {
        if (cnt4 !== 0) {
            console.log(cnt2)
            $('#grsadd tr:last').remove();
            $('table thead th').each(function(i) {});

            cnt4--;
        }

        calculate4()
    }

    let cnt5 = 0;
    $scope.pnmsaddtr = function() {
        $("#pnmsadd").append('<tr class="row_to_clone"><td class="col-md-2"><input class="form-control" type="text" placeholder="Particulars"></td></td><td class="col-md-6"><input class="form-control" type="text" placeholder="Description"></td></td><td class="col-md-2"><input class="form-control pnmstxt" type="number"  placeholder="Cost" /></td></tr>');
        cnt5++;
        $('table thead th').each(function(i) {

        });

        console.log(cnt3)
    }

    $scope.pnmsremtr = function() {
        if (cnt5 !== 0) {
            console.log(cnt2)
            $('#pnmsadd tr:last').remove();
            $('table thead th').each(function(i) {});

            cnt5--;
        }

        calculate5()
    }

    let cnt6 = 0;
    $scope.indsaddtr = function() {
        $("#pnmsadd").append('<tr class="row_to_clone"><td class="col-md-2"><input class="form-control" type="text" placeholder="Particulars"></td></td><td class="col-md-6"><input class="form-control" type="text" placeholder="Description"></td></td><td class="col-md-2"><input class="form-control indstxt" type="number"  placeholder="Cost" /></td></tr>');
        cnt6++;
        $('table thead th').each(function(i) {

        });

        console.log(cnt3)
    }

    $scope.indsremtr = function() {
        if (cnt6 !== 0) {
            console.log(cnt2)
            $('#indsadd tr:last').remove();
            $('table thead th').each(function(i) {});

            cnt6--;
        }

        calculate6()
    }


    var obj0, obj1, obj2, obj3, obj4, obj5, obj6;

    $scope.tojson0 = function(obj0) {
        var table0 = $('#aind').tableToJSON({
            extractor: function(cellIndex, $cell) {
                return $cell.find('input').val() || $cell.text();
            }
        })
        return table0;
    }

    $scope.tojson1 = function(obj1) {
        var table1 = $('#bpm').tableToJSON({
            extractor: function(cellIndex, $cell) {
                return $cell.find('input').val() || $cell.text();
            }
        })
        return table1;
    }

    $scope.tojson2 = function(obj2) {
        var table2 = $('#cco').tableToJSON({
            extractor: function(cellIndex, $cell) {
                return $cell.find('input').val() || $cell.text();
            }
        })
        return table2;
    }

    $scope.tojson3 = function(obj3) {
        var table2 = $('#dts').tableToJSON({
            extractor: function(cellIndex, $cell) {
                return $cell.find('input').val() || $cell.text();
            }
        })
        return table2;
    }

    $scope.tojson4 = function(obj4) {
        var table2 = $('#grs').tableToJSON({
            extractor: function(cellIndex, $cell) {
                return $cell.find('input').val() || $cell.text();
            }
        })
        return table2;
    }

    $scope.tojson5 = function(obj5) {
        var table2 = $('#pnms').tableToJSON({
            extractor: function(cellIndex, $cell) {
                return $cell.find('input').val() || $cell.text();
            }
        })
        return table2;
    }

    $scope.tojson6 = function(obj6) {
        var table2 = $('#inds').tableToJSON({
            extractor: function(cellIndex, $cell) {
                return $cell.find('input').val() || $cell.text();
            }
        })
        return table2;
    }

    var obj0_arr = [],
        obj1_arr = [],
        obj2_arr = [],
        obj3_arr = [],
        obj4_arr = [],
        obj5_arr = [],
        obj6_arr = []

    var ikey;

    var today = new Date();
    today = parseInt(today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear() + "\nTime : " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

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

    $("#dtsadd").on('input', '.dtstxt', function() {
        calculate3();
        obj3_arr = [];
        $scope.tojson2(obj3);
        obj3_arr.push($scope.tojson3(obj3));
        console.log(obj3_arr[0]);
    });

    $("#grsadd").on('input', '.grstxt', function() {
        calculate4();
        obj4_arr = [];
        $scope.tojson2(obj4);
        obj4_arr.push($scope.tojson4(obj4));
        console.log(obj4_arr[0]);
    });

    $("#pnmsadd").on('input', '.pnmstxt', function() {
        calculate5();
        obj5_arr = [];
        $scope.tojson2(obj5);
        obj5_arr.push($scope.tojson5(obj5));
        console.log(obj5_arr[0]);
    });

    $("#indsadd").on('input', '.indstxt', function() {
        calculate6();
        obj6_arr = [];
        $scope.tojson2(obj6);
        obj6_arr.push($scope.tojson5(obj6));
        console.log(obj6_arr[0]);
    });



    let stotal0 = 0,
        stotal1 = 0,
        stotal2 = 0,
        stotal3 = 0,
        stotal4 = 0,
        stotal5 = 0,
        stotal6 = 0

    function calculate0() {
        var sum = 0;
        //iterate through each textboxes and add the values
        $(".aintxt").each(function() {

            //add only if the value is number
            if (!isNaN(this.value) && this.value.length != 0) {
                sum += parseFloat(this.value);
                console.log(sum)
            }



        });
        //.toFixed() method will roundoff the final sum to 2 decimal places
        $("#ainsum").html('₱ ' + parseFloat(sum).toLocaleString());
        console.log('₱ ' + parseFloat(sum).toLocaleString());
        stotal0 = sum.toFixed(2).toLocaleString();
        grandtotal();
    }

    function calculate1() {
        var sum = 0;
        //iterate through each textboxes and add the values
        $(".pmtxt").each(function() {

            //add only if the value is number
            if (!isNaN(this.value) && this.value.length != 0) {
                sum += parseFloat(this.value);
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

    function calculate3() {
        var sum = 0;
        //iterate through each textboxes and add the values
        $(".dtstxt").each(function() {

            //add only if the value is number
            if (!isNaN(this.value) && this.value.length != 0) {
                sum += parseFloat(this.value);

            }

        });
        //.toFixed() method will roundoff the final sum to 2 decimal places
        $("#dtssum").html('₱ ' + parseFloat(sum).toLocaleString());
        console.log('₱ ' + sum.toFixed(2).toLocaleString());
        stotal3 = sum.toFixed(2).toLocaleString();
        grandtotal();
    }

    function calculate4() {
        var sum = 0;
        //iterate through each textboxes and add the values
        $(".grstxt").each(function() {

            //add only if the value is number
            if (!isNaN(this.value) && this.value.length != 0) {
                sum += parseFloat(this.value);

            }

        });
        //.toFixed() method will roundoff the final sum to 2 decimal places
        $("#grssum").html('₱ ' + parseFloat(sum).toLocaleString());
        console.log('₱ ' + sum.toFixed(2).toLocaleString());
        stotal4 = sum.toFixed(2).toLocaleString();
        grandtotal();
    }

    function calculate5() {
        var sum = 0;
        //iterate through each textboxes and add the values
        $(".pnmstxt").each(function() {

            //add only if the value is number
            if (!isNaN(this.value) && this.value.length != 0) {
                sum += parseFloat(this.value);

            }

        });
        //.toFixed() method will roundoff the final sum to 2 decimal places
        $("#pnmssum").html('₱ ' + parseFloat(sum).toLocaleString());
        console.log('₱ ' + sum.toFixed(2).toLocaleString());
        stotal5 = sum.toFixed(2).toLocaleString();
        grandtotal();
    }

    function calculate6() {
        var sum = 0;
        //iterate through each textboxes and add the values
        $(".indstxt").each(function() {

            //add only if the value is number
            if (!isNaN(this.value) && this.value.length != 0) {
                sum += parseFloat(this.value);

            }

        });
        //.toFixed() method will roundoff the final sum to 2 decimal places
        $("#indssum").html('₱ ' + parseFloat(sum).toLocaleString());
        console.log('₱ ' + sum.toFixed(2).toLocaleString());
        stotal6 = sum.toFixed(2).toLocaleString();
        grandtotal();
    }

    function grandtotal() {
        let gtotal = parseFloat(stotal0) + parseFloat(stotal1) + parseFloat(stotal2) + parseFloat(stotal3) + parseFloat(stotal4) + parseFloat(stotal5) + parseFloat(stotal6);
        let gvat = gtotal * 0.12;
        let tgvat = gvat + gtotal;
        console.log(parseFloat(stotal0) + parseFloat(stotal1) + parseFloat(stotal2) + parseFloat(stotal3) + parseFloat(stotal4) + parseFloat(stotal5) + parseFloat(stotal6));



        $("#grandt").html('₱ ' + parseFloat(gtotal).toLocaleString());
        $("#gvat").html('₱ ' + parseFloat(gvat).toLocaleString());
        $("#tgvat").html('₱ ' + parseFloat(tgvat).toLocaleString());
    }

    var inq_email,
        inq_mobile;

    $scope.estimate = function(inq) {
        inq_email = inq.email;
        inq_mobile = inq.mobileno;

        console.log(inq)

        $('#estimate').modal('toggle');

        return ikey = inq.key;
    }

    $scope.newinquery = function() {
        $('#inquiry').modal('toggle');
    }

    let keyid;

    $scope.savedestimate = function() {
        // state legend
        // 0=saved
        // 1=sent
        // 2=defered
        // 3=scheduled
        // 4=approved
        // 5=done

        var uid = ikey;

        console.log(uid);

        keyid = uid;

        let aav = obj0_arr[0];

        var qts = {
            aa: aav,
            stotal0,
            bb: obj1_arr[0],
            stotal1,
            cc: obj2_arr[0],
            stotal2,
            dd: obj3_arr[0],
            stotal3,
            ee: obj4_arr[0],
            stotal4,
            ff: obj5_arr[0],
            stotal5,
            gg: obj6_arr[0],
            stotal6
        }

        console.log(qts)

        var estimate = {
            ekey: uid,
            mobileno: inq_mobile,
            email: inq_email,
            quotes: qts,
            total: $("#grandt").text(),
            date: today
        }



        // var updates = {};
        // updates['/estimate/' + uid] = estimate;
        // firebase.database().ref().update(updates);


        // if (updates) {
        //     console.log(updates)
        //     alert('Process Successful!')
        //     setTimeout(function() {
        //         $('#estimate').modal('hide');
        //         location.replace('#/')
        //         location.replace('#/inquiries')
        //     }, 1000);
        // }

    }

    $scope.sendestimate = function() {

        $scope.savedestimate();

        var form = new FormData();
        form.append("To", '+63' + inq_mobile);
        form.append("From", "+14157924897");
        form.append("Body", "Mabuhay!, Ang quote para sa iyong kotse ay handa na e-click lamang ang link para sa detalye, Maraming Salamat po!: " + "&nbsp;" + "autoserved-beta.web.app/qoutes.html#" + keyid);

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
        });

    }

})