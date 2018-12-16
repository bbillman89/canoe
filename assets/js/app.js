//user-input variables
var user_weather_choice;
var user_entered_origin_country;
var user_entered_origin_zipcode;
var user_flight_class;

//api determined variables
var user_origin_city;
var user_origin_latitude;
var user_origin_longitude;
var user_origin_airport_code;
// var user_flight_type;
var user_destination_city;
var flight_rates_array;

//weather arrays
var snowy_cities = ["ROC-sky", "YBG-sky", "YQB-sky", "TOY-sky", "CTS-sky"];
var rainy_cities = ["OGG-sky", "DLA-sky", "SSG-sky", "UIB-sky", "GAU-sky"];
var sunny_cities = ["SAN-sky", "BCN-sky", "YUM-sky", "ASW-sky", "LAS-sky"];


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

    // var database = firebase.database();
        
//Function to get flight information based on parameters provided    
    $("#search").on("click", function() {
        user_weather_choice = $("#weather").val();
        // user_flight_type = $("#flight-type").val();
        user_entered_origin_zipcode = $("#select-zip").val();
        user_entered_origin_country = $("#select-country").val();
        user_flight_class = $("#flight-class").val();

        
     

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
                    var airport_response_parsed = JSON.parse(response);
                    console.log(airport_response_parsed);
                    user_origin_airport_code = airport_response_parsed[2].codeIataAirport + "-sky";  
                    console.log(user_origin_airport_code); 

                    if (user_weather_choice === "sunny") {
                        // var sunny_cities = ["SAN-sky", "BCN-sky", "YUM-sky", "ASW-sky", "LAS-sky", + "HLA-sky", "DRW-sky", "MCT-sky"];
                        var queryURL = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/USD/en-US/" 
                        + user_origin_airport_code + "/" + 
                        sunny_cities[0] + "/2018-12-17/2018-12-25";

                        $.ajax({
                            url: queryURL,
                            type: "GET",
                            beforeSend: function(xhr) {
                                xhr.setRequestHeader("X-RapidAPI-Key", "e1fbeb00dbmshfb67c8437a76a82p1d0d29jsnddbb04551884");
                            },
                            success: function(response) {
                                console.log(response);
                                flight_rates_array = response.Quotes;
                                    
                                //sorts the flights by MinPrice
                                flight_rates_array.sort(function(a, b) {
                                    return parseFloat(a.MinPrice) - parseFloat(b.MinPrice);
                                });


                                var newRowDiv = $("<div>");

                                newRowDiv.addClass("row");
                                newRowDiv.addClass("border");

                                    var newSelectDiv = $("<div>");
                                    newSelectDiv.addClass("resultinfo");
                                    newSelectDiv.addClass("col-2");

                                        var newSelectButton = $("<button>");
                                        newSelectButton.attr("type", "button");
                                        newSelectButton.addClass("btn");
                                        newSelectButton.addClass("btn-outline-primary");
                                        newSelectButton.text("select");

                                    newSelectDiv.append(newSelectButton);

                                var newFlightDiv = $("<div>");
                                newFlightDiv.addClass("col-2");
                                newFlightDiv.addClass("resultinfo");
                                newFlightDiv.text("test flight");

                                var newPriceDiv = $("<div>");
                                newPriceDiv.addClass("resultinfo");
                                newPriceDiv.addClass("col-2");
                                newPriceDiv.text("$300");

                                var newCabinDiv = $("<div>");
                                newCabinDiv.addClass("resultinfo");
                                newCabinDiv.addClass("col-2");
                                newCabinDiv.text("Economy Class");
                                
                                var newDestinationDiv = $("<div>");
                                newDestinationDiv.addClass("resultinfo");
                                newDestinationDiv.addClass("col-2");
                                newDestinationDiv.text(sunny_cities[0]);

                                var newWeatherIconDiv = $("<div>");
                                newWeatherIconDiv.addClass("resultinfo");
                                newWeatherIconDiv.addClass("col-4");
                                newWeatherIconDiv.text("Sunny");

                                newRowDiv.append(newSelectDiv);
                                newRowDiv.append(newFlightDiv);
                                newRowDiv.append(newPriceDiv);
                                newRowDiv.append(newCabinDiv);
                                newRowDiv.append(newDestinationDiv);
                                newRowDiv.append(newWeatherIconDiv);

                                $("#nav-home").append(newRowDiv);
                            }
                        });   
                    } else if (user_weather_choice === "snowy") {
                        var queryURL = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/" 
                        + user_origin_airport_code + "/" + 
                        snowy_cities[0] + "/2018-12-17/2018-12-25";

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
                    } else if (user_weather_choice === "rainy") {
                        var queryURL = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/" 
                        + user_origin_airport_code + "/" + 
                        rainy_cities[0] + "/2018-12-17/2018-12-25";

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
                    }
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
                user_origin_latitude = response.places[0].latitude;
                user_origin_longitude = response.places[0].longitude;

                var queryURL = "http://aviation-edge.com/v2/public/nearby?key=70faba-ef2534&lat=" + user_origin_latitude + "&lng=" + user_origin_longitude + "&distance=25";
        
                $.ajax({
                    url: queryURL,
                    method: "GET"
                })
                .then(function(response) {
                    var airport_response_parsed = JSON.parse(response);
                    user_origin_airport_code = airport_response_parsed[1].codeIataAirport + "-sky";  
                    console.log(user_origin_airport_code);

                    var queryURL = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/" + user_origin_airport_code + "/LAS-sky/2018-12-17/2018-12-25";

                    $.ajax({
                        url: queryURL,
                        type: "GET",
                        beforeSend: function(xhr) {
                            xhr.setRequestHeader("X-RapidAPI-Key", "e1fbeb00dbmshfb67c8437a76a82p1d0d29jsnddbb04551884");
                        },
                        success: function(response) {
                            console.log(response);

                            flight_rates_array = response.Quotes;
                            
                            //sorts the flights by MinPrice
                            flight_rates_array.sort(function(a, b) {
                                return parseFloat(a.MinPrice) - parseFloat(b.MinPrice);
                            });                  
                        }
                    });
                });
            });
        } 
    });
});


// //Send that flight data to Firebase for safekeeping
//         database.ref("user_flight_data").push({
//             weather_choice: user_weather_choice,
//             flight_class: user_flight_class
//         });

// //And load it back into the browser, assigning it local variables
//         database.ref("user_flight_data").on("child_added", function(snapshot) {
//             user_weather_choice = snapshot.val().weather_choice;
//             user_flight_class = snapshot.val().flight_class;
//         });
//     });
                  


                                    
                                
                      