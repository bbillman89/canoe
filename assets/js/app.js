var snowy_cities = [];
var sunny_cities = [];
var rainy_cities = [];
var user_weather_choice;
var city1;
var city2;
var city3;
var city4;
var city5;
var user_current_location;

$(document).ready(function () {
//user picks dropdown 
//corresponds to five cities
//grab current locaiton and append to the origin div 
//put in skyscanner api (origin and desination)
    $("#get-current-location").on("click", function(event) {
        event.preventDefault();

        var queryURL = "http://api.ipstack.com/check?access_key=415674c515bf829f14381045fd241e54";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response) {
            console.log(response.city);
            user_current_location = response.city;
        }); 
    });

    $("#find-flights").on("click", function(event) {
        event.preventDefault();

        var origin_city = "LAX-sky";
        var destination_city = "SFO-sky";
        var departure_date = "2018-12-15";
        var arrival_date = "2018-12-31"
        
        var queryURL = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/" + origin_city + "/" + destination_city + "/" + departure_date + "/" + arrival_date;

        $.ajax({
            url: queryURL,
            type: "GET",
            beforeSend: function(xhr) {
                xhr.setRequestHeader("X-RapidAPI-Key", "e1fbeb00dbmshfb67c8437a76a82p1d0d29jsnddbb04551884");
            },
            success: function(response) {
                console.log(response);
                alert("it worked");
            }
        });
    })



    // $("#SUBMITBUTTON").on("click", function() {
        
    //     user_weather_choice = $("#DROPDOWN").val().trim();

    //     if (user_weather_choice === "snowy") {
    //         city1 = snowy_cities[0];
            

    //     } else if (user_weather_choice === "sunny") {
    //         city1 = sunny.cities[0];
            
    //     } else if (user_weather_choice === "rainy") {
    //         city1 = rainy_cities[0];
    //     }
        
        



});

