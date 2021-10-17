var app = angular.module('newApp', []);
app.controller('iform', function($scope, $http) {

    var pnum = 0;

    $scope.nextp = function() {
        if (pnum == 0) {
            $(".step0").addClass("visually-hidden");
            $(".step1").removeClass("visually-hidden");

            $(".nav0").addClass("completed");
            $(".nav0").removeClass("active");

            $(".nav1").addClass("active");
            return pnum = 1, console.log(pnum);
        } else {
            if (pnum == 1) {
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
        var iid = firebase.database().ref().child('/inquiries/').push().key;

        var uid = firebase.database().ref().child('/users/').push().key;

        var today = new Date();
        today = parseInt(today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear() + "\nTime : " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        var inquiry = {
            "ekey": iid,
            "email": $scope.email,
            "mobileno": $scope.mobileno,
            "a_pm": '$scope.apm',
            "b_co": ' $scope.bco',
            "c_id": '$scope.cid',
            "cartype": $scope.CarType,
            "d_wa": '$scope.dwa',
            "e_ts": '$scope.ets',
            "engine": $scope.CarEngineType,
            "iqr_from": $scope.mobileno,
            "make": $scope.CarBrand,
            "mileage": $scope.Mileage,
            "model": $scope.CarBrand,
            "purchasedate": $scope.CarPurchaseDate,
            "transmission": $scope.CarTransmission,
            "year": $scope.CarYearModel,
            "pmr": $scope.pmr,
            "war": $scope.war,
            "cor": $scope.cor,
            "tsr": $scope.tsr,
            "gsr": $scope.gsr,
            "idr": $scope.idr,
            "pnmr": $scope.pnmr
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
            firebase.database().ref().update(saveusers, alert('Data Saved!'));
            console.log(savequotes, saveusers)
        }



    }


});