var snowy_cities = ["ROC", "YBG", "YQB", "TOY", "CTS", "AOJ"];
var rainy_cities = ["OGG", "DLA", "SSG", "UIB", "GAU"];
var sunny_cities = ["SAN", "BCN", "YUM", "ASW", "LAS", "HLA", "DRW", "MCT"];
var user_origin_city;
var user_entered_origin_zipcode;
var user_entered_origin_country;
var user_origin_latitude;
var user_origin_longitude;
var user_origin_airport_code;
var user_weather_choice;
//Commenting out flight type, it returned 
// var user_flight_type;
var user_flight_class;
var user_destination_city;


$(document).ready(function () {
//Firebase backend config
    var config = {
        apiKey: "AIzaSyCelA6iNkZKZiTepqqsiGA5VMX4WpRggsU",
        authDomain: "canoe-database.firebaseapp.com",
        databaseURL: "https://canoe-database.firebaseio.com",
        projectId: "canoe-database",
        storageBucket: "canoe-database.appspot.com",
        messagingSenderId: "535476068586"
    };
    firebase.initializeApp(config);

    var database = firebase.database();
        
//Function to get flight information based on parameters provided    
    $("#search").on("click", function() {
        user_weather_choice = $("#weather").val();
        // user_flight_type = $("#flight-type").val();
        user_flight_class = $("#flight-class").val();
        user_entered_origin_zipcode = $("#select-zip").val();
        user_entered_origin_country = $("#select-country").val();

        if (user_entered_origin_zipcode === "" && user_entered_origin_country === "") {
            var queryURL = "http://api.ipstack.com/check?access_key=415674c515bf829f14381045fd241e54";

            $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function(response) {
                //
                console.log(response);
                user_origin_longitude = response.longitude;
                user_origin_latitude = response.latitude;
                user_origin_city = response.city;

                var queryURL = "http://aviation-edge.com/v2/public/nearby?key=70faba-ef2534&lat=" + user_origin_latitude + "&lng=" + user_origin_longitude + "&distance=25";
        
                    $.ajax({
                        url: queryURL,
                        method: "GET"
                    })
                    .then(function(response) {
                        var user_origin_airport_code = (JSON.parse(response)[1].codeIataAirport) + "-sky";

                        var queryURL = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/" + user_origin_airport_code + "/LAS-sky/2018-12-15/2018-12-25";

                        $.ajax({
                            url: queryURL,
                            type: "GET",
                            beforeSend: function(xhr) {
                                xhr.setRequestHeader("X-RapidAPI-Key", "e1fbeb00dbmshfb67c8437a76a82p1d0d29jsnddbb04551884");
                            },
                            success: function(response) {
                                console.log(response);
                            }
                        });
                    });
                });
        } else {

            var queryURL = "https://api.zippopotam.us/" + user_entered_origin_country + "/" + user_entered_origin_zipcode;

            $.ajax({
                url: queryURL, 
                method: "GET" 
            })
            .then(function(response) {
                console.log(response);
            });
        }


//Send that flight data to Firebase for safekeeping
        database.ref("user_flight_data").push({
            weather_choice: user_weather_choice,
            // flight_type: user_flight_type,
            flight_class: user_flight_class
        });

//And load it back into the browser, assigning it local variables
        database.ref("user_flight_data").on("child_added", function(snapshot) {
            user_weather_choice = snapshot.val().weather_choice;
            // user_flight_type = snapshot.val().flight_type;
            user_flight_class = snapshot.val().flight_class;
        });
    });
});
                  
