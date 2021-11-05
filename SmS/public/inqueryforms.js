var app = angular.module('newApp', []);
app.controller('iform', function($scope, $http) {

    $('.inqerr').hide();
    $('.cir').hide();
    $('.cinfo').hide();
    $('.alert-success').hide();


    var pnum = 0;

    $scope.inputs = {
        'mobileno': {
            'MaxLength': 10
        }
    }

    $scope.nextp = function() {
        if (pnum == 0) {
            if ($scope.inputs.mobileno.Value && $scope.email) {
                $(".step0").addClass("visually-hidden");
                $(".step1").removeClass("visually-hidden");

                $(".nav0").addClass("completed");
                $(".nav0").removeClass("active");

                $(".nav1").addClass("active");
                return pnum = 1, console.log(pnum);
            } else {
                $('.cir').show();
                setTimeout(function() {
                    $('.cir').hide();
                }, 3000)
            }

        } else {
            if (pnum == 1) {

                console.log($scope.CarBrand, $scope.CarModel, $scope.CarPurchaseDate, $scope.CarEngineType, $scope.CarType, $scope.Mileage, $scope.CarYearModel, $scope.CarTransmission)

                if ($scope.CarBrand && $scope.CarModel && $scope.CarPurchaseDate && $scope.CarEngineType && $scope.CarType && $scope.Mileage && $scope.CarYearModel && $scope.CarTransmission) {

                    $(".step1").addClass("visually-hidden");
                    $(".step2").removeClass("visually-hidden");

                    $(".nav1").addClass("completed");
                    $(".nav1").removeClass("active");

                    $(".nav2").addClass("active");

                    $(".btng0").addClass("btng1");
                    $(".btng0").removeClass("btng0");

                    $(".nextp").text("SUBMIT");
                    return pnum = 2, console.log(pnum);
                } else {
                    $('.cinfo').show();
                    setTimeout(function() {
                        $('.cinfo').hide();
                    }, 3000)
                }

            } else {
                if (pnum == 2) {
                    $scope.savedinqform();
                    // alert(1)
                }
            }
        }

    }

    $scope.prevp = function() {
        if (pnum == 2) {
            $(".step2").addClass("visually-hidden");
            $(".step1").removeClass("visually-hidden");


            $(".nav2").removeClass("active");

            $(".nav1").addClass("completed");
            $(".nav1").addClass("active");

            $(".btng1").addClass("btng0");
            $(".btng1").removeClass("btng1");

            $(".nextp").text("NEXT");

            return pnum = 1, console.log(pnum);
        } else {
            if (pnum == 1) {
                $(".step1").addClass("visually-hidden");
                $(".step0").removeClass("visually-hidden");

                $(".nav1").removeClass("active");
                $(".nav1").removeClass("completed");

                $(".nav0").addClass("completed");
                $(".nav0").addClass("active");

                return pnum = 0, console.log(pnum);
            }
        }

    }

    $scope.savedinqform = function() {
        var pmr, war, cor, tsr, gsr, idr, pnmr;

        if ($scope.pmr === undefined) {
            pmr = 0;
            console.log(pmr);
        } else {
            pmr = 1;
        }

        if ($scope.war === undefined) {
            war = 0;
            console.log(war);
        } else {
            war = 1;
        }

        if ($scope.cor === undefined) {
            cor = 0;
            console.log(cor);
        } else {
            cor = 1;
        }

        if ($scope.tsr === undefined) {
            tsr = 0;
            console.log(tsr);
        } else {
            tsr = 1;
        }

        if (!$scope.gsr) {
            gsr = 0;
            console.log(gsr);
        } else {
            gsr = $scope.gsr;
        }

        if (!$scope.idr) {
            idr = 0;
            console.log(idr);
        } else {
            idr = $scope.idr;
        }

        if (!$scope.pnmr) {
            pnmr = 0;
            console.log(pnmr);
        } else {
            pnmr = $scope.pnmr;
        }





        var iid = firebase.database().ref().child('/inquiries/').push().key;

        var uid = firebase.database().ref().child('/users/').push().key;

        var today = new Date();
        today = parseInt(today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear() + "\nTime : " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        if (pmr == 0 && war == 0 && cor == 0 && tsr == 0 && gsr == 0 && idr == 0 && pnmr == 0) {
            $('.inqerr').show();

            setTimeout(function() {
                $('.inqerr').hide();
            }, 2000)
        } else {

            var inquiry = {
                "ekey": iid,
                "email": $scope.email,
                "mobileno": $scope.inputs.mobileno.Value,
                "cartype": $scope.CarType,
                "engine": $scope.CarEngineType,
                "make": $scope.CarBrand,
                "mileage": $scope.Mileage,
                "model": $scope.CarModel,
                "purchasedate": $scope.CarPurchaseDate,
                "transmission": $scope.CarTransmission,
                "year": $scope.CarYearModel,
                "pmr": pmr,
                "war": war,
                "cor": cor,
                "tsr": tsr,
                "gsr": gsr,
                "idr": idr,
                "pnmr": pnmr,
                "requestdate": today,
                "stage": 0
            };

            var users = {
                "email": $scope.email,
                "mobileno": $scope.mobileno
            }

            var savequotes = {};
            savequotes['/inquiries/' + iid] = inquiry;
            firebase.database().ref().update(savequotes);

            if (savequotes) {
                var saveusers = {};
                savequotes['/users/' + uid] = users;
                firebase.database().ref().update(saveusers);
                console.log(savequotes, saveusers)

                if (savequotes && saveusers) {
                    $('.alert-success').show();
                    setTimeout(function() {
                        window.location.reload();
                    }, 3000)
                }
            }

        }

    }


});