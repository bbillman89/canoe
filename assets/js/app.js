//user-input variables
var user_weather_choice;
var user_entered_origin_country;
var user_entered_origin_zipcode;
var user_flight_class;
var user_departure;
var user_return;

//api determined variables
var user_origin_city;
var user_origin_latitude;
var user_origin_longitude;
var user_origin_airport_code;
// var user_flight_type;
var user_destination_city;
var flight_rates_array;


//weather arrays
var snowy_cities = ["LGA", "IAD", "ORD", "DEN", "MCI"];
var rainy_cities = ["SEA", "PDX", "BHM", "FLL", "MEM"];
var sunny_cities = ["SAN", "MIA", "LAX", "MCO", "LAS"];

//flight data
var flight_destination;
var flight_departure_date;
var flight_return_date;
var flight_departure_time;
var flight_return_time;
var flight_price;



$(document).ready(function () {

        
//Function to get flight information based on parameters provided    
    $("#search").on("click", function(event) {

        event.Prev

        
        user_weather_choice = $("#weather").val();
        user_entered_origin_zipcode = $("#select-zip").val();
        user_entered_origin_country = $("#select-country").val();
        user_flight_class = $("#flight-class").val();
        user_departure = $("#dep-date").val();
        user_return = $("#return-date").val();

        function appendDepartureData () {
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
            newFlightDiv.append("<p>" + "airline" + "</p>");
            newFlightDiv.append("<p>" + localStorage.getItem("departure_time") + "</p>");
            newFlightDiv.append("<p>" + localStorage.getItem("departure_time") + "</p>");

            var newPriceDiv = $("<div>");
            newPriceDiv.addClass("resultinfo");
            newPriceDiv.addClass("col-2");
            newPriceDiv.text(localStorage.getItem("price"));

            var newCabinDiv = $("<div>");
            newCabinDiv.addClass("resultinfo");
            newCabinDiv.addClass("col-2");
            newCabinDiv.text("Economy");
            
            var newDestinationDiv = $("<div>");
            newDestinationDiv.addClass("resultinfo");
            newDestinationDiv.addClass("col-2");
            newDestinationDiv.text(localStorage.getItem("destination"));

            var newWeatherIconDiv = $("<div>");
            newWeatherIconDiv.addClass("resultinfo");
            newWeatherIconDiv.addClass("col-4");
            newWeatherIconDiv.text(localStorage.getItem("weather_choice"));

            newRowDiv.append(newSelectDiv);
            newRowDiv.append(newFlightDiv);
            newRowDiv.append(newPriceDiv);
            newRowDiv.append(newCabinDiv);
            newRowDiv.append(newDestinationDiv);
            newRowDiv.append(newWeatherIconDiv);

            $("#nav-home").append(newRowDiv);

        }

        function appendReturnData () {
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
            newFlightDiv.append("<p>" + "airline" + "</p>");
            newFlightDiv.append("<p>" + localStorage.getItem("return_time") + "</p>");
            newFlightDiv.append("<p>" + localStorage.getItem("return_time") + "</p>");

            var newPriceDiv = $("<div>");
            newPriceDiv.addClass("resultinfo");
            newPriceDiv.addClass("col-2");
            newPriceDiv.text(flight_price);

            var newCabinDiv = $("<div>");
            newCabinDiv.addClass("resultinfo");
            newCabinDiv.addClass("col-2");
            newCabinDiv.text("Economy");
            
            var newDestinationDiv = $("<div>");
            newDestinationDiv.addClass("resultinfo");
            newDestinationDiv.addClass("col-2");
            newDestinationDiv.text(localStorage.getItem("origin_city"));

            var newWeatherIconDiv = $("<div>");
            newWeatherIconDiv.addClass("resultinfo");
            newWeatherIconDiv.addClass("col-4");
            newWeatherIconDiv.text("opposite of user weather choice");

            newRowDiv.append(newSelectDiv);
            newRowDiv.append(newFlightDiv);
            newRowDiv.append(newPriceDiv);
            newRowDiv.append(newCabinDiv);
            newRowDiv.append(newDestinationDiv);
            newRowDiv.append(newWeatherIconDiv);

            $("#nav-profile").append(newRowDiv);
        }
            

        if (user_entered_origin_zipcode === "" && user_entered_origin_country === "") {

            var queryURL = "http://api.ipstack.com/check?access_key=415674c515bf829f14381045fd241e54";

            $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function(response) {
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
                       console.log(JSON.parse(response));
                    //    var airport_response_parsed = JSON.parse(response);
                    //    user_origin_airport_code = airport_response_parsed; 
                       if (user_weather_choice === "sunny") {
                    
                            for (var i = 0; i < sunny_cities.length; i++) {
                                var queryURL = "https://api.travelpayouts.com/v1/prices/cheap?origin=CLE&destination=" + sunny_cities[i] + "&token=06e7274ac072c4bc0d482997c118a6ce";
                                    
                                $.ajax({
                                    url: queryURL,
                                    method: "GET"
                                })
                                .then(function(response) {

                                    console.log(response);

                                    flight_destination = Object.keys(response.data)[0];

                                    resulting_data = Object.values(response.data); // makes us able to access the specifc price
                                                            
                                    flight_departure_time = resulting_data[0][1].departure_at; //need to convert this with moment.js
                                    
                                    flight_return_time = resulting_data[0][1].return_at; //need to convert this with moment.js

                                    flight_price = parseInt(resulting_data[0][1].price / 66); //gives us flight price in doll hairs

                                })
                            }


                        } else if (user_weather_choice === "snowy")  {
                        
                            for (var i = 0; i < snowy_cities.length; i++) {
                                var queryURL = "https://api.travelpayouts.com/v1/prices/cheap?origin=CLE&destination=" + snowy_cities[i] + "&token=06e7274ac072c4bc0d482997c118a6ce";
                                    
                                $.ajax({
                                    url: queryURL,
                                    method: "GET"
                                })
                                .then(function(response) {
                                    flight_destination = Object.keys(response.data)[0];
                                    
                                    resulting_data = Object.values(response.data); // makes us able to access the specifc price
                                                            
                                    flight_departure_time = resulting_data[0][1].departure_at; //need to convert this with moment.js
                                    flight_return_time = resulting_data[0][1].return_at; //need to convert this with moment.js

                                    flight_price = parseInt(resulting_data[0][1].price / 66); //gives us flight price in doll hairs
                                })
                            }
                        } else if (user_weather_choice === "rainy") {

                            for (var i = 0; i < rainy_cities.length; i++) {
                                var queryURL = "https://api.travelpayouts.com/v1/prices/cheap?origin=CLE&destination=" + rainy_cities[i] + "&token=06e7274ac072c4bc0d482997c118a6ce";
                                    
                                $.ajax({
                                    url: queryURL,
                                    method: "GET"
                                })
                                .then(function(response) {
                                    flight_destination = Object.keys(response.data)[0];
                                    
                                    resulting_data = Object.values(response.data); // makes us able to access the specifc price
                                                            
                                    flight_departure_time = resulting_data[0][1].departure_at; //need to convert this with moment.js
                                    flight_return_time = resulting_data[0][1].return_at; //need to convert this with moment.js

                                    flight_price = parseInt(resulting_data[0][1].price / 66); //gives us flight price in doll hairs
                                })
                            }
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
                    user_origin_airport_code = airport_response_parsed[2].codeIataAirport;
                    console.log(user_origin_airport_code);

                    if (user_weather_choice === "sunny") {
                        // var sunny_cities = ["SAN-sky", "BCN-sky", "YUM-sky", "ASW-sky", "LAS-sky", + "HLA-sky", "DRW-sky", "MCT-sky"];

                        for (var i = 0; i < sunny_cities.length; i++) {
                            var queryURL =  "https://api.travelpayouts.com/v1/prices/cheap?origin=CLE&destination=" + sunny_cities[i] + "&depart_date=" + user_departure + "&return_date=" + user_return + "&token=06e7274ac072c4bc0d482997c118a6ce";

                            $.ajax({
                                url: queryURL,
                                method: "GET"
                            })
                            .then(function(response) {
                                console.log(response);
                                flight_destination = Object.keys(response.data)[0];
                                    
                                resulting_data = Object.values(response.data); // makes us able to access the specifc price
                                
                                flight_departure_time = resulting_data[0][1].departure_at; //need to convert this with moment.js
                                flight_return_time = resulting_data[0][1].return_at; //need to convert this with moment.js

                                flight_price = parseInt(resulting_data[0][1].price / 66); //gives us flight price in doll hairs
                            })
                        }
                    } else if (user_weather_choice === "snowy")  {
                        
                        for (var i = 0; i < snowy_cities.length; i++) {
                            var queryURL =  "https://api.travelpayouts.com/v1/prices/cheap?origin=CLE&destination=" + snowy_cities[i] + "&depart_date=" + user_departure + "&return_date=" + user_return + "&token=06e7274ac072c4bc0d482997c118a6ce";

                            $.ajax({
                                url: queryURL,
                                method: "GET"
                            })
                            .then(function(response) {
                                console.log(response);
                                flight_destination = Object.keys(response.data)[0];
                                    
                                resulting_data = Object.values(response.data); // makes us able to access the specifc price
                                
                                flight_departure_time = resulting_data[0][1].departure_at; //need to convert this with moment.js
                                flight_return_time = resulting_data[0][1].return_at; //need to convert this with moment.js

                                flight_price = parseInt(resulting_data[0][1].price / 66); //gives us flight price in doll hairs
                            })
                        }
                    } else if (user_weather_choice === "rainy") {
                        for (var i = 0; i < rainy_cities.length; i++) {
                            var queryURL =  "https://api.travelpayouts.com/v1/prices/cheap?origin=CLE&destination=" + rainy_cities[i] + "&depart_date=" + user_departure + "&return_date=" + user_return + "&token=06e7274ac072c4bc0d482997c118a6ce";

                            $.ajax({
                                url: queryURL,
                                method: "GET"
                            })
                            .then(function(response) {
                                console.log(response);
                                flight_destination = Object.keys(response.data)[0];
                                    
                                resulting_data = Object.values(response.data); // makes us able to access the specifc price
                                
                                flight_departure_time = resulting_data[0][1].departure_at; //need to convert this with moment.js
                                flight_return_time = resulting_data[0][1].return_at; //need to convert this with moment.js

                                flight_price = parseInt(resulting_data[0][1].price / 66); //gives us flight price in doll hairs
                            })
                        }
                    }
                });
            });
        } 
        if (user_weather_choice == "sunny") {
            console.log("weather is sunny")
            $("#forecast1").attr("src", "./assets/images/sunimage.png")
            $("#forecast2").attr("src", "./assets/images/sunimage.png")
            $("#forecast3").attr("src", "./assets/images/sunimage.png")
        }
        
        else if (user_weather_choice == "snowy") {
            console.log("weather is snowy")
            $("#forecast1").attr("src", "./assets/images/snowflake.png")
            $("#forecast2").attr("src", "./assets/images/snowflake.png")
            $("#forecast3").attr("src", "./assets/images/snowflake.png")
        }
        
        else if (user_weather_choice == "rainy") {
            console.log("weather is rainy")
            $("#forecast1").attr("src", "./assets/images/rain.png")
            $("#forecast2").attr("src", "./assets/images/rain.png")
            $("#forecast3").attr("src", "./assets/images/rain.png")
        
        };


    });   
    
    if (!localStorage) {
        console.log("Nothing stored in local storage");
    } else {
        addDepartureData();
        addReturnData();
    } 

});


                                    
                                
                      