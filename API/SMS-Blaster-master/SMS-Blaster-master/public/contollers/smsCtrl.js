angular.module('newApp').controller('smsCtrl', function($scope, $http, $filter, $timeout) {

    pageSetUp();

    $('input[type="checkbox"]').click(function() {
        if ($(this).prop("checked") == true) {
            console.log($(this).prop("checked"))
        } else {
            console.log($(this).prop("checked"))
        }
    });

    $scope.smssent = 0;




    firebase.database().ref('/masterSheet').on("value", function(snapshot) {

        $timeout(function() {
            $scope.$apply(function() {
                let returnArr = [];

                snapshot.forEach(childSnapshot => {

                    let item = childSnapshot.val();
                    item.key = childSnapshot.key;

                    returnArr.push(item[1]);

                });


                console.log(returnArr)
                $scope.glists = returnArr;
            });

        })





    });

    $('.fa-spin').hide();

    $scope.sendsms0 = function() {

        console.log($('input[type="checkbox"]').prop("checked"));

        var number = $('.idd0').find(":selected").text() + $scope.contact;

        var matches = number.match(/\d+/g);

        let fnum = '+' + matches[0] + matches[1]

        console.log(fnum)

        if ($('input[type="checkbox"]').prop("checked") === true) {
            var form = new FormData();
            form.append("To", fnum);
            form.append("From", "+18337601674");
            form.append("Body", $scope.smsmsg);

            var settings = {
                "url": "https://api.twilio.com/2010-04-01/Accounts/AC07d6a7e4efe2f50c60d75644a4227654/Messages.json",
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "Authorization": "Basic QUMwN2Q2YTdlNGVmZTJmNTBjNjBkNzU2NDRhNDIyNzY1NDoxM2YwYjI2NzMzNDBlYTUwMTkyZGY5ZTNmNjVhNmQ2Ng=="
                },
                "processData": false,
                "mimeType": "multipart/form-data",
                "contentType": false,
                "data": form
            };

            $.ajax(settings).done(function(response) {
                console.log(response);
            });
        } else {

            var settings = {
                "url": "./php/smsapi.php?data=" + fnum,
                "method": "POST",
                "timeout": 0,
            };

            $.ajax(settings).done(function(response) {
                console.log(JSON.parse(response));
            });
        }

    }

    $('.sentcounter').text(0);



    $scope.sendsms1 = function() {

        console.log($('input[type="checkbox"]').prop("checked"));

        var number = $('.idd1').find(":selected").text();

        var matches = number.match(/\d+/g);

        let fnum = '+' + matches

        console.log(matches)

        if ($('input[type="checkbox"]').prop("checked") === true) {


            firebase.database().ref('/masterSheet/').on("value", function(snapshot) {
                let cdata = $scope.listgroups;

                console.log(cdata);

                $timeout(function() {
                    $scope.$apply(function() {
                        // let returnArr = [];

                        snapshot.forEach(childSnapshot => {

                            let item = childSnapshot.val();
                            item.key = childSnapshot.key;

                            let a = cdata.trim()
                            let b = item[1].trim()


                            if (a === b) {
                                console.log(a, b, item[0]);

                                var mnum = fnum + item[0];

                                console.log(mnum)

                                var form = new FormData();

                                form.append("To", mnum);
                                form.append("From", "+18337601674");
                                form.append("Body", $scope.smsmsg);

                                var settings = {
                                    "url": "https://api.twilio.com/2010-04-01/Accounts/AC07d6a7e4efe2f50c60d75644a4227654/Messages.json",
                                    "method": "POST",
                                    "timeout": 0,
                                    "headers": {
                                        "Authorization": "Basic QUMwN2Q2YTdlNGVmZTJmNTBjNjBkNzU2NDRhNDIyNzY1NDoxM2YwYjI2NzMzNDBlYTUwMTkyZGY5ZTNmNjVhNmQ2Ng=="
                                    },
                                    "processData": false,
                                    "mimeType": "multipart/form-data",
                                    "contentType": false,
                                    "data": form
                                };

                                $.ajax(settings).done(function(response) {

                                    console.log(response)
                                    if (response) {
                                        // smssent++;
                                        // console.log(smssent, cl)
                                        // $('.sentcounter').text(smssent);
                                        // if (smssent === cl) {
                                        //     alert('SUCCESS! ALL SMS ARE QUEUED IN TWILLIO')
                                        //     console.log(smssent, cl)
                                        //     setTimeout(function() {
                                        //         location.replace('#/')
                                        //         location.replace('#/sms')
                                        //     }, 100);
                                        // }
                                    }
                                })
                            }

                        });

                        // $scope.osps = returnArr;



                    });

                })

            });




            // $http.get("https://esavenmaz7.execute-api.us-east-1.amazonaws.com/sms_api/alldirectoy").success(function(obj) {


            //     var str = $scope.listgroups.replace(/\s/g, '');
            //     var cl = 0;
            //     var smssent = 0;
            //     var ddatas = obj.Items;

            //     // $('#bulk').prop('disabled', true);
            //     // $('.fa-spin').show();

            //     console.log(obj.Items);

            //     var descriptors = ['L', 'M', 'N', 'S'];

            //     function flatten(o) {

            //         // flattens single property objects that have descriptors  
            //         for (let d of descriptors) {
            //             if (o.hasOwnProperty(d)) {
            //                 return o[d];
            //             }
            //         }

            //         Object.keys(o).forEach((k) => {

            //             for (let d of descriptors) {
            //                 if (o[k].hasOwnProperty(d)) {
            //                     o[k] = o[k][d];
            //                 }
            //             }
            //             if (Array.isArray(o[k])) {
            //                 o[k] = o[k].map(e => flatten(e))
            //             } else if (typeof o[k] === 'object') {
            //                 o[k] = flatten(o[k])
            //             }
            //         });

            //         return o;
            //     }

            //     ddatas = flatten(ddatas)
            //     console.log(ddatas)

            //     var fdata = $filter('filter')(ddatas, { group: '25k' }, true);

            //     console.log(fdata)

            //     setTimeout(() => {
            //         angular.forEach(fdata, function(value, key) {

            //             console.log(value, key);

            //             cl++;
            //             $('.sentcounter').text(cl);
            //             if (value.group.S == str) {
            //                 cl++;

            //                 console.log(value);

            //                 let pbumber = fnum + value.phone.S;

            //                 console.log(value.phone.S, cl);

            //                 console.log(pbumber)

            //                 var form = new FormData();
            //                 form.append("To", pbumber);
            //                 form.append("From", "+18337601674");
            //                 form.append("Body", $scope.smsmsg);

            //                 var settings = {
            //                     "url": "https://api.twilio.com/2010-04-01/Accounts/AC07d6a7e4efe2f50c60d75644a4227654/Messages.json",
            //                     "method": "POST",
            //                     "timeout": 0,
            //                     "headers": {
            //                         "Authorization": "Basic QUMwN2Q2YTdlNGVmZTJmNTBjNjBkNzU2NDRhNDIyNzY1NDoxM2YwYjI2NzMzNDBlYTUwMTkyZGY5ZTNmNjVhNmQ2Ng=="
            //                     },
            //                     "processData": false,
            //                     "mimeType": "multipart/form-data",
            //                     "contentType": false,
            //                     "data": form
            //                 };

            //                 $.ajax(settings).done(function(response) {

            //                     console.log(response)
            //                     if (response) {
            //                         smssent++;
            //                         console.log(smssent, cl)
            //                         $('.sentcounter').text(smssent);
            //                         if (smssent === cl) {
            //                             alert('SUCCESS! ALL SMS ARE QUEUED IN TWILLIO')
            //                             console.log(smssent, cl)
            //                             setTimeout(function() {
            //                                 location.replace('#/')
            //                                 location.replace('#/sms')
            //                             }, 100);
            //                         }
            //                     }
            //                 })

            //             }

            //         });
            //     }, 3000);



            // })



        } else {
            $http.get("https://esavenmaz7.execute-api.us-east-1.amazonaws.com/sms_api/alldirectoy").success(function(obj) {

                var str = $scope.listgroups.replace(/\s/g, '');
                var cl = 0;
                var smssent = 0;

                $('#bulk').prop('disabled', true);
                $('.fa-spin').show();

                angular.forEach(obj.Items, function(value, key) {
                    if (value.group.S === str) {
                        cl++;

                        console.log(value.phone.S, cl);
                        let pbumber = fnum + value.phone.S;

                        var settings = {
                            "url": "./php/smsapi.php?data=" + pbumber,
                            "method": "POST",
                            "timeout": 0,
                        };

                        $.ajax(settings).done(function(response) {

                            console.log(JSON.parse(response), key);
                            if (response) {
                                smssent++;
                                console.log(smssent, cl)
                                $('.sentcounter').text(smssent);
                                if (smssent === cl) {
                                    alert('SUCCESS! ALL SMS ARE QUEUED IN PLIVO')
                                    console.log(smssent, cl)
                                    setTimeout(function() {
                                        location.replace('#/')
                                        location.replace('#/sms')
                                    }, 100);
                                }
                            }
                        });
                    }
                });



            })
        }



    }

}).filter('unique', function() {

    return function(items, filterOn) {

        if (filterOn === false) {
            return items;
        }

        if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
            var hashCheck = {},
                newItems = [];

            var extractValueToCompare = function(item) {
                if (angular.isObject(item) && angular.isString(filterOn)) {
                    return item[filterOn];
                } else {
                    return item;
                }
            };

            angular.forEach(items, function(item) {
                var valueToCheck, isDuplicate = false;

                for (var i = 0; i < newItems.length; i++) {
                    if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                        isDuplicate = true;
                        break;
                    }
                }
                if (!isDuplicate) {
                    newItems.push(item);
                }

            });
            items = newItems;
        }
        return items;
    };
});