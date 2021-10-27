angular.module('newApp').controller('jobordersCrtl', function($scope, $http, $filter, $timeout, $window) {

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
                            $('.return').show();
                            $('.loading').hide();
                            $('.suggestion0').text(response.result[0]);
                            $('.suggestion1').text(response.result[1]);
                            $('.suggestion2').text(response.result[2]);
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
                        }, 1000)
                    });

                });

            })
        });

    }

    $scope.pageChangeHandler = function(num) {
        console.log('pagedata page changed to ' + num);
    };

    $scope.pageChangeHandler = function(num) {
        console.log('going to page ' + num);
    };



})