angular.module('newApp').controller('directoryCtrl', function($scope, $filter, $http, $timeout) {

    pageSetUp();




    $('.fa-spin').hide();

    var ref = firebase.database().ref("masterSheet");
    ref.on("value", function(snapshot) {
        const rdata = snapshot.numChildren();
        $scope.dcount = rdata;
        console.log(rdata)
    });

    $scope.wipeit = function(directory) {
        console.log(directory)
        var ref = firebase.database().ref("masterSheet/" + directory.key);
        ref.on("child_added", function(snapshot) {
            console.log(snapshot.val())
            ref.remove()
        });
    }


    firebase.database().ref('/masterSheet/').on("value", function(snapshot) {


        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.rdata = snapshot.val();

        $scope.numberOfPages = () => {
            return Math.ceil(
                $scope.rdata.length / $scope.pageSize
            );
        }

        for (var i = 0; i < 10; i++) {
            $scope.rdata.push(`Question number ${i}`);
        }


        $timeout(function() {

            $scope.$apply(function() {
                let returnArr = [];
                snapshot.forEach(childSnapshot => {
                    let item = childSnapshot.val();
                    item.key = childSnapshot.key;



                    returnArr.push(item);


                });
                $scope.directories = returnArr;
                console.log(returnArr);

            });

            $scope.numberOfPages = () => {
                return Math.ceil(
                    $scope.rdata.length / $scope.pageSize
                );
            }

            for (var i = 0; i < 10; i++) {
                $scope.rdata.push(`Question number ${i}`);

            }

        })

    });

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



    //Function for converting from CSV to JSON. This function is consider as a backend component for performing this task.
    var csvjsonConverter = (csvdata, delimiter) => {
        //This array will store the each of the patterns from the regular expression below.
        let arrmatch = [];

        //This array will store the data from the CSV.
        let array = [
            []
        ];

        //Stores matched values for quoted values.
        let quotevals = "";

        //Storing JSON array
        let jsonarray = [];

        //Increment value
        let k = 0;

        //Uses regular expression to parse the CSV data and determines if any values has their own quotes in case if any
        // delimiters are within.
        let regexp = new RegExp(("(\\" + delimiter + "|\\r?\\n|\\r|^)" + "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            "([^\"\\" + delimiter + "\\r\\n]*))"), "gi");

        //This will loop to find any matchings with the regular expressions.
        while (arrmatch = regexp.exec(csvdata)) {
            //This will determine what the delimiter is.
            let delimitercheck = arrmatch[1];
            //Matches the delimiter and determines if it is a row delimiter and matches the values to the first rows.
            //If it reaches to a new row, then an empty array will be created as an empty row in array.
            if ((delimitercheck !== delimiter) && delimitercheck.length) {
                array.push([]);
            }

            //This determines as to what kind of value it is whether it has quotes or not for these conditions.
            if (arrmatch[2]) {
                quotevals = arrmatch[2].replace('""', '\"');
            } else {
                quotevals = arrmatch[3];
            }

            //Adds the value from the data into the array
            array[array.length - 1].push(quotevals);
        }

        //This will parse the resulting array into JSON format
        for (let i = 0; i < array.length - 1; i++) {
            jsonarray[i - 1] = {};
            for (let j = 0; j < array[i].length && j < array[0].length; j++) {
                let key = array[0][j];
                jsonarray[i - 1][key] = array[i][j]
            }
        }

        //This will determine what the properties of each values are from the JSON
        //such as removing quotes for integer value.
        for (k = 0; k < jsonarray.length; k++) {
            let jsonobject = jsonarray[k];
            for (let prop in jsonobject) {
                if (!isNaN(jsonobject[prop]) && jsonobject.hasOwnProperty(prop)) {
                    jsonobject[prop] = +jsonobject[prop];
                }
            }
        }

        //This will stringify the JSON and formatting it.
        let formatjson = JSON.stringify(jsonarray, null, 2);
        console.log(formatjson.length)
            //Returns the converted result from CSV to JSON
        return formatjson;
    };

    //This jQuery will perform in the front-end to convert from CSV to JSON.
    $(function() {
        //When the 'Convert' button is clicked, it will first make sure if the csv file is uploaded and then it goes to the
        //convert function above to convert it from CSV to JSON. Afterwards, it will print the result in a textarea.
        $("form").submit(function() {
            var csv = $("#csv")[0].files[0];
            if (csv !== undefined) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    var rows = e.target.result;
                    var convertjson = csvjsonConverter(rows, $("#delimiter").val());
                    console.log(JSON.parse(convertjson))

                    var constacts = JSON.parse(convertjson);

                    $("#json").val(convertjson);

                    console.log(constacts.length);

                    if (constacts.length > 50000) {
                        alert('BROWSER CAN ONLY PROCESS 50k POST PER MINUTE PLS. REDUCE YOUR DATA')
                    } else {
                        var dlength = constacts.length
                        var count = 0;

                        $('#convert').prop('disabled', true);
                        $('.fa-spin').show();

                        angular.forEach(constacts, function(value, key) {


                            let gname = $scope.groupname.replace(/\s/g, '');

                            var uid = firebase.database().ref().child('directory').push().key;

                            var data = {
                                phone: value.phone,
                                group: gname,
                                datetime: firebase.database.ServerValue.TIMESTAMP
                            };

                            var kc = key + 1;

                            var updates = {};
                            updates['/directory/' + uid] = data;
                            firebase.database().ref().update(updates);
                            count++

                            console.log(updates, uid, count, kc, dlength)



                            if (updates) {
                                $scope.uploadcount = count++;
                                if (kc === dlength) {
                                    console.log(updates)
                                    alert('DONE!')
                                    setTimeout(function() {
                                        location.replace('#/')
                                        location.replace('#/directory')
                                    }, 100);
                                }
                            }






                        });

                    }



                };
                reader.readAsText(csv);
            } else {
                $("#json").val("");
                alert("Please upload your csv file.");
            }
        });

        //After the user clicks on 'Download JSON Result" button, it will download the converted JSON file.
        $("#download").click(function() {
            var result = $("#json").val();
            if (result === null || result === undefined || result === "") {
                alert("Please make sure there is JSON data in the text area.");
            } else {
                $("<a />", {
                        "download": "data.json",
                        "href": "data:application/json;charset=utf-8," + encodeURIComponent(result),
                    }).appendTo("body")
                    .click(function() {
                        $(this).remove()
                    })[0].click()
            }
        });
    });




}).filter('startFrom', function() {
    return function(input, start) {
        if (!input || !input.length) { return; }
        start = +start; //parse to int
        return input.slice(start);
    }
});