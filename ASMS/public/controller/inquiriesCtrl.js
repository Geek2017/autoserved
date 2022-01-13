angular.module('newApp').controller('inquiriesCtrl', function($scope, $http, $filter, $timeout) {

    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.pagedata = [];

    $('.accord1').hide();
    $('.accord2').hide();
    $('.accord3').hide();
    $('.accord4').hide();
    $('.accord5').hide();
    $('.accord6').hide();
    $('.accord7').hide();


    $('.errnotif').hide();
    $('.sucnotif').hide();

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

    // $('#estimate').modal('toggle')

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

    let cnt7 = 0;
    $scope.otrsaddtr = function() {
        $("#otrsadd").append('<tr class="row_to_clone"><td class="col-md-2"><input class="form-control" type="text" placeholder="Particulars"></td></td><td class="col-md-6"><input class="form-control" type="text" placeholder="Description"></td></td><td class="col-md-2"><input class="form-control otrstxt" type="number"  placeholder="Cost" /></td></tr>');
        cnt7++;
        $('table thead th').each(function(i) {

        });

        console.log(cnt3)
    }

    $scope.otrsremtr = function() {
        if (cnt7 !== 0) {
            console.log(cnt2)
            $('#otrsadd tr:last').remove();
            $('table thead th').each(function(i) {});

            cnt7--;
        }

        calculate7()
    }



    var obj0, obj1, obj2, obj3, obj4, obj5, obj6, obj7;

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

    $scope.tojson7 = function(obj7) {
        var table2 = $('#otrs').tableToJSON({
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
        obj6_arr = [],
        obj7_arr = [];

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
        obj6_arr.push($scope.tojson6(obj6));
        console.log(obj6_arr[0]);
    });

    $("#otrsadd").on('input', '.otrstxt', function() {
        calculate7();
        obj7_arr = [];
        $scope.tojson2(obj7);
        obj7_arr.push($scope.tojson7(obj7));
        console.log(obj7_arr[0]);
    });



    let stotal0 = 0,
        stotal1 = 0,
        stotal2 = 0,
        stotal3 = 0,
        stotal4 = 0,
        stotal5 = 0,
        stotal6 = 0,
        stotal7 = 0;

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

    function calculate7() {
        var sum = 0;
        //iterate through each textboxes and add the values
        $(".otrstxt").each(function() {

            //add only if the value is number
            if (!isNaN(this.value) && this.value.length != 0) {
                sum += parseFloat(this.value);

            }

        });
        //.toFixed() method will roundoff the final sum to 2 decimal places
        $("#otrssum").html('₱ ' + parseFloat(sum).toLocaleString());
        console.log('₱ ' + sum.toFixed(2).toLocaleString());
        stotal7 = sum.toFixed(2).toLocaleString();
        grandtotal();
    }

    function grandtotal() {
        let gtotal = parseFloat(stotal0) + parseFloat(stotal1) + parseFloat(stotal2) + parseFloat(stotal3) + parseFloat(stotal4) + parseFloat(stotal5) + parseFloat(stotal6) + parseFloat(stotal7);

        let gvat = gtotal * 0.12;
        let tgvat = gvat + gtotal;

        console.log(parseFloat(stotal0) + parseFloat(stotal1) + parseFloat(stotal2) + parseFloat(stotal3) + parseFloat(stotal4) + parseFloat(stotal5) + parseFloat(stotal6) + parseFloat(stotal7));



        $("#grandt").html('₱ ' + parseFloat(gtotal).toLocaleString());
        $("#gvat").html('₱ ' + parseFloat(gvat).toLocaleString());
        $("#tgvat").html('₱ ' + parseFloat(tgvat).toLocaleString());
    }

    var inq_email,
        inq_mobile,
        itemkey,
        cartype,
        engine,
        make,
        mileage,
        model,
        purchasedate,
        transmission,
        year,
        pmr,
        cor,
        war,
        tsr,
        gsr,
        pnmr,
        indr;


    $scope.estimate = function(inq) {
        inq_email = inq.email;
        inq_mobile = inq.mobileno;
        itemkey = inq.ekey;

        cartype = inq.cartype;
        engine = inq.engine;
        make = inq.make;
        mileage = inq.mileage;
        model = inq.model;
        purchasedate = inq.purchasedate;
        transmission = inq.transmission;
        year = inq.year;
        pmr = inq.pmr;
        cor = inq.cor;
        war = inq.war;
        tsr = inq.tsr;
        gsr = inq.gsr;
        pnmr = inq.pnmr;
        indr = inq.indr;

        console.log(inq)




        if (inq.pmr === 1) {
            $('.accord1').show();
            console.log(inq.pmr);
        } else {
            $('.accord1').hide();
        }

        if (inq.cor === 1) {
            $('.accord2').show();
            console.log(inq.cor);
        } else {
            $('.accord2').hide();
        }


        if (inq.war === 1) {
            $('.accord3').show();
            console.log(inq.war);
        } else {
            $('.accord3').hide();
        }


        if (inq.tsr === 1) {
            $('.accord4').show();
            console.log(inq.tsr);
        } else {
            $('.accord4').hide();
        }


        if (inq.gsr !== 0) {
            $('.accord5').show();
            console.log(inq.gsr);
        } else {
            $('.accord5').hide();

        }


        if (inq.pnmr !== 0) {
            $('.accord6').show();
            console.log(inq.pnmr);
        } else {
            $('.accord6').hide();

        }


        if (inq.indr !== 0) {
            $('.accord7').show();
            console.log(inq.indr);
            $scope.contentremarks = inq.indr;

        } else {
            $('.accord7').hide();
        }






        $('#estimate').modal('toggle');

        console.log(inq.ekey);

        ikey = inq.ekey;
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

        $('#save_notif').modal('toggle');

        $scope.confirmedso();

    }

    $scope.confirmedso = function() {
        var otrs;

        console.log(obj7_arr[0]);

        if (obj7_arr[0] === undefined) {
            otrs = 0;
        } else {
            otrs = obj7_arr[0];
        }

        var uid = ikey;

        console.log(uid);

        keyid = uid;

        let aav = obj0_arr[0],
            bbv = obj1_arr[0],
            ccv = obj2_arr[0],
            ddv = obj3_arr[0],
            eev = obj4_arr[0],
            ffv = obj5_arr[0],
            ggv = obj6_arr[0]


        if (aav == undefined) {
            aav = 0;
            console.log(aav);
        } else {
            aav = obj0_arr[0];
            console.log(aav);
        }

        if (bbv == undefined) {
            bbv = 0;
            console.log(bbv);
        } else {
            bbv = obj1_arr[0];
            console.log(bbv);
        }

        if (ccv == undefined) {
            ccv = 0;
            console.log(ccv);
        } else {
            ccv = obj2_arr[0];
            console.log(ccv);
        }

        if (ddv == undefined) {
            ddv = 0;
            console.log(ddv);
        } else {
            ddv = obj3_arr[0];
            console.log(ddv);
        }

        if (eev == undefined) {
            eev = 0;
            console.log(eev);
        } else {
            eev = obj4_arr[0];
            console.log(eev);
        }

        if (ffv == undefined) {
            ffv = 0;
            console.log(ffv);
        } else {
            ffv = obj5_arr[0];
            console.log(ffv);
        }

        if (ggv == undefined) {
            ggv = 0;
            console.log(ggv);
        } else {
            ggv = obj6_arr[0];
            console.log(ggv);
        }

        var qts = {
            aa: aav,
            stotal0,
            bb: bbv,
            stotal1,
            cc: ccv,
            stotal2,
            dd: ddv,
            stotal3,
            ee: eev,
            stotal4,
            ff: ffv,
            stotal5,
            gg: ggv,
            stotal6,
            others: otrs,
            stotal7
        }

        var details = {
            cartype: cartype,
            engine: engine,
            make: make,
            mileage: mileage,
            model: model,
            purchasedate: purchasedate,
            transmission: transmission,
            year: year,
            pmr: pmr,
            cor: cor,
            war: war,
            tsr: tsr,
            gsr: gsr,
            pnmr: pnmr,
            indr: indr
        }

        console.log(details, qts)

        var estimate = {
            ekey: uid,
            mobileno: inq_mobile,
            email: inq_email,
            quotes: qts,
            total: $("#grandt").text(),
            date: today,
            details: details,
            state: 1
        }

        try {
            var updates = {};
            updates['/estimate/' + uid] = estimate;
            firebase.database().ref().update(updates);

            if (updates) {
                console.log(updates)

                $('.sucnotif').show();

                var db = firebase.database();
                db.ref('/inquiries/')
                    .orderByChild("ekey")
                    .equalTo(itemkey)
                    .once('value')
                    .then(function(snapshot) {
                        snapshot.forEach(function(childSnapshot) {
                            childSnapshot.ref.child('stage').set(1);
                        });
                    });

                setTimeout(function() {
                    $('#estimate').modal('hide');
                    $('#save_sent_notif').modal('hide');
                    $('#save_notif').modal('hide');
                    location.replace('#/')
                    location.replace('#/inquiries')
                }, 3000);
            }
        } catch (error) {
            console.log(error);
            $('.errmsg').text(error)
            $('.errnotif').show();
        }
    }

    $scope.sendestimate = function() {

        $('#save_sent_notif').modal('toggle');

        $scope.confirmed = function() {
            try {
                var data = new FormData();
                data.append("number", '+63' + inq_mobile);
                data.append("message", "Hi !, the quote for your car is ready just click the link for details, Thank You ! : " + "  " + " autoserved-beta.web.app/qoutes.html#" + ikey);
                data.append("sendername", "AutoServed");

                var xhr = new XMLHttpRequest();
                xhr.withCredentials = true;

                xhr.addEventListener("readystatechange", function() {
                    if (this.readyState === 4) {
                        console.log(this.responseText);
                        $scope.confirmedso();
                    }
                });

                xhr.open("POST", "https://api.semaphore.co/api/v4/messages?apikey=86f2627fb974d84b9f91898ea8cea6c1");
                xhr.setRequestHeader("Cookie", "XSRF-TOKEN=eyJpdiI6ImsyZUwzWnRWQ0NxbHlGXC9EVENjb3JnPT0iLCJ2YWx1ZSI6ImVmTHBOVWE2eGk0eG82Z0tTWEV5QzVmVkxzSE0rWU56UW00TWdvZ2VnYUJLa3BpTWVcL3RoZWpSallRdTV5c0VISWNrVXVjVWxKSCt1OU91YTNoM1pDQT09IiwibWFjIjoiNTlmZTA5ZmMyN2RiN2JkMjg2NWFlZjFkODM0NmYxMGU4MGJlYTg5ZmI1N2MwYWJlNGQ2ZTlkODNkNTk1OGE1NiJ9; laravel_session=eyJpdiI6InUxZE9HUG9VUmNFWG95bEI5UGFWc0E9PSIsInZhbHVlIjoiaWRwcGJ3R0RYZzZnRmNzeVwvYzlmOENSVllPbHFLeTRkUXNlNDgwaGw2U2hZT2FXMEdzOVZBSmdcL21PM0taeGxtRTFzQWMwM29KVmV0ZStqYXJsajdTQT09IiwibWFjIjoiMWEwYzdmYzliNzdkMTBmM2U1NjY5ZDI4ZGZhZDcyNjQ2YTg0ZTVjY2Y2OWJmM2RiMzZmOGVlOWE3MTNhZWNjNiJ9");

                xhr.send(data);
            } catch (error) {
                alert(error)
            }
        }
    }

})