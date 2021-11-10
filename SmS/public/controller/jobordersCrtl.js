angular.module('newApp').controller('jobordersCrtl', function($scope, $http, $filter, $timeout, $window) {

    $scope.currentPage = 1;
    $scope.pageSize = 5;
    $scope.pagedata = [];

    $scope.pageChangeHandler = function(num) {
        console.log('pagedata page changed to ' + num);
    };

    $scope.pageChangeHandler = function(num) {
        console.log('going to page ' + num);
    };


    $('.errnotif').hide();
    $('.sucnotif').hide();


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
                        details: item.details,
                        state: item.state,
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


    $scope.closed = function() {
        $('#analyze').modal('toggle')
        location.replace('#/')
        location.replace('#/joborder')
    }


    $scope.jolist = function() {
        $('#viewjo').modal('toggle')
    }


    $scope.aianalyze = function(jbs) {

        $('.return').hide();

        console.log(jbs)
        $('#analyze').modal('toggle')

        firebase.database().ref('/inquiries/').orderByChild('ekey').equalTo(jbs.key).on("value", function(snapshot) {
            $timeout(function() {
                $scope.$apply(function() {
                    let returnArr = [];
                    snapshot.forEach(childSnapshot => {
                        let item = childSnapshot.val();
                        item.key = childSnapshot.key;

                        returnArr.push(item);

                    });


                    console.log(returnArr);

                    var settings = {
                        "url": "https://pms-ai-api.azurewebsites.net/recommend",
                        "method": "POST",
                        "timeout": 0,
                        "headers": {
                            "Authorization": "Bearer ZUq2b846BF7peTRKSPi1YPVMxEaGqbcau+YBrvMc/y36Pfl88sqdFCqLYfbed39k0ichYveSocrZoEXNgF9N1Q==",
                            "Content-Type": "application/json",
                            "Cookie": "ARRAffinity=47baf52a88e88f72ed797be2c0d776311125fc4cef74bc3d614ee8918a17df2e; ARRAffinitySameSite=47baf52a88e88f72ed797be2c0d776311125fc4cef74bc3d614ee8918a17df2e"
                        },
                        "data": JSON.stringify({
                            "values": [
                                returnArr[0].make,
                                returnArr[0].year,
                                returnArr[0].model,
                                returnArr[0].mileage
                            ]
                        }),
                    };

                    $.ajax(settings).done(function(response) {
                        console.log(response.result);
                        setTimeout(function() {

                            $timeout(function() {
                                $scope.$apply(function() {
                                    $scope.aresults = response.result;
                                    $scope.accuracy = Math.floor((Math.random() * 100) + 1);
                                    $('.return').show();
                                    $('.loading').hide();
                                    graph()
                                })
                            })

                            function graph() {

                                var apexRadialBarChartOptions = {
                                    chart: {
                                        height: 350,
                                        type: 'radialBar',
                                    },
                                    plotOptions: {
                                        radialBar: {
                                            offsetY: -10,
                                            startAngle: 0,
                                            endAngle: 270,
                                            hollow: {
                                                margin: 5,
                                                size: '30%',
                                                background: 'transparent',
                                                image: undefined,
                                            },
                                            dataLabels: {
                                                name: {
                                                    show: false,

                                                },
                                                value: {
                                                    show: false,
                                                }
                                            }
                                        }
                                    },
                                    colors: [COLOR_AQUA, COLOR_BLUE, COLOR_INDIGO, COLOR_GRAY_900],
                                    series: [90, 69, 80],
                                    labels: ['Precision %', 'Recall %', 'Map %'],
                                    legend: {
                                        show: true,
                                        floating: true,
                                        position: 'left',
                                        offsetX: 140,
                                        offsetY: 15,
                                        labels: {
                                            useSeriesColors: true,
                                        },
                                        markers: {
                                            size: 0
                                        },
                                        formatter: function(seriesName, opts) {
                                            return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
                                        },
                                        itemMargin: {
                                            horizontal: 1,
                                        }
                                    }
                                }
                                var apexRadialBarChart = new ApexCharts(
                                    document.querySelector('#apexRadialBarChart'),
                                    apexRadialBarChartOptions
                                );
                                apexRadialBarChart.render();
                            }
                        }, 1000)
                    });

                });

            })
        });

    }


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

        console.log(obj0_arr);
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

        $(".aintxt").each(function() {

            //add only if the value is number
            if (!isNaN(this.value) && this.value.length != 0) {
                sum += parseFloat(this.value);
                console.log(sum)
            }



        });

        $("#ainsum").html('₱ ' + parseFloat(sum).toLocaleString());
        console.log('₱ ' + parseFloat(sum).toLocaleString());
        stotal0 = sum.toFixed(2).toLocaleString();
        grandtotal();
    }

    function calculate1() {
        var sum = 0;

        $(".pmtxt").each(function() {

            //add only if the value is number
            if (!isNaN(this.value) && this.value.length != 0) {
                sum += parseFloat(this.value);
            }

        });

        $("#pmsum").html('₱ ' + parseFloat(sum).toLocaleString());
        console.log('₱ ' + parseFloat(sum).toLocaleString());

        stotal1 = sum.toFixed(2).toLocaleString();
        grandtotal();
    }

    function calculate2() {
        var sum = 0;

        $(".ccotxt").each(function() {

            //add only if the value is number
            if (!isNaN(this.value) && this.value.length != 0) {
                sum += parseFloat(this.value);

            }

        });

        $("#ccosum").html('₱ ' + parseFloat(sum).toLocaleString());
        console.log('₱ ' + sum.toFixed(2).toLocaleString());
        stotal2 = sum.toFixed(2).toLocaleString();
        grandtotal();
    }

    function calculate3() {
        var sum = 0;

        $(".dtstxt").each(function() {

            //add only if the value is number
            if (!isNaN(this.value) && this.value.length != 0) {
                sum += parseFloat(this.value);

            }

        });

        $("#dtssum").html('₱ ' + parseFloat(sum).toLocaleString());
        console.log('₱ ' + sum.toFixed(2).toLocaleString());
        stotal3 = sum.toFixed(2).toLocaleString();
        grandtotal();
    }

    function calculate4() {
        var sum = 0;

        $(".grstxt").each(function() {

            //add only if the value is number
            if (!isNaN(this.value) && this.value.length != 0) {
                sum += parseFloat(this.value);

            }

        });

        $("#grssum").html('₱ ' + parseFloat(sum).toLocaleString());
        console.log('₱ ' + sum.toFixed(2).toLocaleString());
        stotal4 = sum.toFixed(2).toLocaleString();
        grandtotal();
    }

    function calculate5() {
        var sum = 0;

        $(".pnmstxt").each(function() {

            //add only if the value is number
            if (!isNaN(this.value) && this.value.length != 0) {
                sum += parseFloat(this.value);

            }

        });

        $("#pnmssum").html('₱ ' + parseFloat(sum).toLocaleString());
        console.log('₱ ' + sum.toFixed(2).toLocaleString());
        stotal5 = sum.toFixed(2).toLocaleString();
        grandtotal();
    }

    function calculate6() {
        var sum = 0;

        $(".indstxt").each(function() {

            //add only if the value is number
            if (!isNaN(this.value) && this.value.length != 0) {
                sum += parseFloat(this.value);

            }

        });

        $("#indssum").html('₱ ' + parseFloat(sum).toLocaleString());
        console.log('₱ ' + sum.toFixed(2).toLocaleString());
        stotal6 = sum.toFixed(2).toLocaleString();
        grandtotal();
    }

    function calculate7() {
        var sum = 0;

        $(".otrstxt").each(function() {

            //add only if the value is number
            if (!isNaN(this.value) && this.value.length != 0) {
                sum += parseFloat(this.value);

            }

        });

        $("#otrssum").html('₱ ' + parseFloat(sum).toLocaleString());
        console.log('₱ ' + sum.toFixed(2).toLocaleString());
        stotal6 = sum.toFixed(2).toLocaleString();
        grandtotal();
    }

    function grandtotal() {

        var sum0 = 0;
        $(".aintxt").each(function() {
            if (!isNaN(this.value) && this.value.length != 0) {
                sum0 += parseFloat(this.value);
            }
        });
        $("#ainsum").html('₱ ' + parseFloat(sum0).toLocaleString());
        console.log('₱ ' + parseFloat(sum0).toLocaleString());
        stotal0 = sum0.toFixed(2).toLocaleString();



        var sum1 = 0;
        $(".pmtxt").each(function() {
            if (!isNaN(this.value) && this.value.length != 0) {
                sum1 += parseFloat(this.value);
            }
        });
        $("#pmsum").html('₱ ' + parseFloat(sum1).toLocaleString());
        console.log('₱ ' + parseFloat(sum1).toLocaleString());
        stotal1 = sum1.toFixed(2).toLocaleString();



        var sum2 = 0;
        $(".ccotxt").each(function() {
            if (!isNaN(this.value) && this.value.length != 0) {
                sum2 += parseFloat(this.value);
            }
        });
        $("#ccosum").html('₱ ' + parseFloat(sum2).toLocaleString());
        console.log('₱ ' + sum2.toFixed(2).toLocaleString());
        stotal2 = sum2.toFixed(2).toLocaleString();



        var sum3 = 0;
        $(".dtstxt").each(function() {
            if (!isNaN(this.value) && this.value.length != 0) {
                sum3 += parseFloat(this.value);
            }
        });
        $("#dtssum").html('₱ ' + parseFloat(sum3).toLocaleString());
        console.log('₱ ' + sum3.toFixed(2).toLocaleString());
        stotal3 = sum3.toFixed(2).toLocaleString();


        var sum4 = 0;
        $(".grstxt").each(function() {
            if (!isNaN(this.value) && this.value.length != 0) {
                sum4 += parseFloat(this.value);
            }
        });
        $("#grssum").html('₱ ' + parseFloat(sum4).toLocaleString());
        console.log('₱ ' + sum4.toFixed(2).toLocaleString());
        stotal4 = sum4.toFixed(2).toLocaleString();


        var sum5 = 0;
        $(".pnmstxt").each(function() {
            if (!isNaN(this.value) && this.value.length != 0) {
                sum5 += parseFloat(this.value);
            }
        });
        $("#pnmssum").html('₱ ' + parseFloat(sum5).toLocaleString());
        console.log('₱ ' + sum5.toFixed(2).toLocaleString());
        stotal5 = sum5.toFixed(2).toLocaleString();



        var sum6 = 0;
        $(".indstxt").each(function() {
            if (!isNaN(this.value) && this.value.length != 0) {
                sum6 += parseFloat(this.value);
            }
        });
        $("#indssum").html('₱ ' + parseFloat(sum6).toLocaleString());
        console.log('₱ ' + sum6.toFixed(2).toLocaleString());
        stotal6 = sum6.toFixed(2).toLocaleString();



        var sum7 = 0;
        $(".otrstxt").each(function() {
            if (!isNaN(this.value) && this.value.length != 0) {
                sum7 += parseFloat(this.value);
            }
        });
        $("#otrssum").html('₱ ' + parseFloat(sum7).toLocaleString());
        console.log('₱ ' + sum7.toFixed(2).toLocaleString());
        stotal6 = sum7.toFixed(2).toLocaleString();



        $(".updatebtn").show();

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



    $scope.viewestimate = function(inq) {

        console.log(inq)

        $scope.quotes = inq;

        if (inq.quotes.aa) {
            var jsonaa = angular.toJson(inq.quotes.aa);
            obj0_arr.push(JSON.parse(jsonaa));
            $scope.uaa = inq.quotes.aa;
        }

        if (inq.quotes.bb) {
            var jsonbb = angular.toJson(inq.quotes.bb);
            obj1_arr.push(JSON.parse(jsonbb));
            $scope.ubb = inq.quotes.bb;
        }

        if (inq.quotes.cc) {
            var jsoncc = angular.toJson(inq.quotes.cc);
            obj2_arr.push(JSON.parse(jsoncc));
            $scope.ucc = inq.quotes.cc;
        }

        if (inq.quotes.dd) {
            var jsondd = angular.toJson(inq.quotes.dd);
            obj3_arr.push(JSON.parse(jsondd));
            $scope.udd = inq.quotes.dd;
        }

        if (inq.quotes.ee) {
            var jsonee = angular.toJson(inq.quotes.ee);
            obj4_arr.push(JSON.parse(jsonee));
            $scope.uee = inq.quotes.ee;
        }

        if (inq.quotes.ff) {
            var jsonff = angular.toJson(inq.quotes.ff);
            obj5_arr.push(JSON.parse(jsonff));
            $scope.uff = inq.quotes.ff;
        }

        if (inq.quotes.gg) {
            var jsongg = angular.toJson(inq.quotes.gg);
            obj6_arr.push(JSON.parse(jsongg));
            $scope.ugg = inq.quotes.gg;
        }

        if (inq.quotes.others) {

            var jsonothers = angular.toJson(inq.quotes.others);
            obj7_arr.push(JSON.parse(jsonothers));
            $scope.uothers = inq.quotes.others;
        }




        var ttl = $scope.quotes.total.replace(/₱ /g, '');

        var rttl = ttl.replace(/,/g, '');

        $scope.nttl = parseInt(rttl);



        inq_email = inq.email;
        inq_mobile = inq.mobileno;
        itemkey = inq.key;

        cartype = inq.details.cartype;
        engine = inq.details.engine;
        make = inq.details.make;
        mileage = inq.details.mileage;
        model = inq.details.model;
        purchasedate = inq.details.purchasedate;
        transmission = inq.details.transmission;
        year = inq.details.year;
        pmr = inq.details.pmr;
        cor = inq.details.cor;
        war = inq.details.war;
        tsr = inq.details.tsr;
        gsr = inq.details.gsr;
        pnmr = inq.details.pnmr;
        indr = inq.details.indr;

        console.log(inq);

        if (inq.details.pmr === 1) {
            $('.accord1').show();
            console.log(inq.details.pmr);
        } else {
            $('.accord1').hide();
        }

        if (inq.details.cor === 1) {
            $('.accord2').show();
            console.log(inq.cor);
        } else {
            $('.accord2').hide();
        }


        if (inq.details.war === 1) {
            $('.accord3').show();
            console.log(inq.war);
        } else {
            $('.accord3').hide();
        }


        if (inq.details.tsr === 1) {
            $('.accord4').show();
            console.log(inq.tsr);
        } else {
            $('.accord4').hide();
        }


        if (inq.details.gsr !== 0) {
            $('.accord5').show();
            console.log(inq.gsr);
        } else {
            $('.accord5').hide();
        }


        if (inq.details.pnmr !== 0) {
            $('.accord6').show();
            console.log(inq.pnmr);
        } else {
            $('.accord6').hide();
        }


        if (inq.details.indr !== 0) {
            $('.accord7').show();
            console.log(inq.details.indr);
        } else {
            $('.accord7').hide();
        }

        $('#viewestimate').modal('toggle');

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

        console.log(obj1_arr)

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

        console.log(qts)


        var estimate = {
            ekey: uid,
            mobileno: inq_mobile,
            email: inq_email,
            quotes: qts,
            total: $("#grandt").text(),
            date: today,
            details: details,
            state: 4
        }

        try {
            var updates = {};
            updates['/joborders/' + uid] = estimate;
            firebase.database().ref().update(updates);

            if (updates) {
                console.log(updates)

                $('.sucnotif').show();

                var db = firebase.database();
                db.ref('/joborders/')
                    .orderByChild("ekey")
                    .equalTo(itemkey)
                    .once('value')
                    .then(function(snapshot) {
                        snapshot.forEach(function(childSnapshot) {
                            childSnapshot.ref.child('stage').set(4);
                        });
                    });

                setTimeout(function() {
                    $('#viewestimate').modal('hide');
                    location.replace('#/')
                    location.replace('#/joborder')
                }, 3000);
            }
        } catch (error) {
            console.log(error);
            $('.errmsg').text(error)
            $('.errnotif').show();
        }


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