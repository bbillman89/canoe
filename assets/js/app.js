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
    $("#search").on("click", function() {

        
        user_weather_choice = $("#weather").val();
        user_entered_origin_zipcode = $("#select-zip").val();
        user_entered_origin_country = $("#select-country").val();
        user_flight_class = $("#flight-class").val();
        user_departure = $("#dep-date").val();
        user_return = $("#return-date").val();

        function renderDepartureDivs () {
            var newTableRow = $("<tr>");

            newTableRow.addClass("row");
            newTableRow.attr("id", "resultRow");

                var newTableDataButton = $("<td>");
                newTableDataButton.addClass("resultinfo col-2");
                newTableDataButton.attr("id", "selectButton");

                    var selectButton = $("<button>");
                    selectButton.attr("type", "button");
                    selectButton.addClass("btn btn-outline-primary");
                    selectButton.text("Select");
                    
                    newTableDataButton.append(selectButton);

                newTableRow.append(newTableDataButton);

                var newTableFlightData = $("<td>");
                newTableFlightData.addClass("resultinfo col-2");
                newTableFlightData.attr("id", "flightDiv");

                    var flightNoPara = $("<p>");
                    flightNoPara.attr("id", "flightNo");
                    newTableFlightData.append(flightNoPara);

                    var flightDatePara = $("<p>");
                    flightDatePara.attr("id", "flightDate");
                    newTableFlightData.append(flightDatePara);

                    var flightTimePara = $("<p>");
                    flightTimePara.attr("id", "flightTime");
                    newTableFlightData.append(flightTimePara);

                    var cabinTypePara = $("<p>");
                    cabinTypePara.attr("id", "cabinType");
                    newTableFlightData.append(cabinTypePara);

                newTableRow.append(newTableFlightData);


                var newTablePriceData = $("<td>");
                newTablePriceData.addClass("resultinfo col-2");
                newTablePriceData.attr("id", "priceDiv");
                newTablePriceData.text("");
                newTableRow.append(newTablePriceData);

                var newTableDestData = $("<td>");
                newTableDestData.addClass("resultinfo col-2");
                newTableDestData.attr("id", "destinationDiv");
                newTableRow.append(newTableDestData);

                var newTableWeatherIconData = $("<td>");
                newTableWeatherIconData.addClass("resultinfo col-4");
                
                    var newWeatherIcon = $("<img>");
                    newWeatherIcon.addClass("forecast");
                    newWeatherIcon.attr("id", "forecast1");
                    newWeatherIcon.attr("src", "");
                    newTableWeatherIconData.append(newWeatherIcon);

                    var newWeatherIcon = $("<img>");
                    newWeatherIcon.addClass("forecast");
                    newWeatherIcon.attr("id", "forecast2");
                    newWeatherIcon.attr("src", "");
                    newTableWeatherIconData.append(newWeatherIcon);

                    var newWeatherIcon = $("<img>");
                    newWeatherIcon.addClass("forecast");
                    newWeatherIcon.attr("id", "forecast3");
                    newWeatherIcon.attr("src", "");
                    newTableWeatherIconData.append(newWeatherIcon);
                
                newTableRow.append(newTableWeatherIconData);
            $("#departure_flight_content").append(newTableRow);

        }

        function renderReturnDivs () {
            var newTableRow = $("<tr>");

            newTableRow.addClass("row");
            newTableRow.attr("id", "resultRow");

                var newTableDataButton = $("<td>");
                newTableDataButton.addClass("resultinfo col-2");
                newTableDataButton.attr("id", "selectButton");

                    var selectButton = $("<button>");
                    selectButton.attr("type", "button");
                    selectButton.addClass("btn btn-outline-primary");
                    selectButton.text("Select");
                    
                    newTableDataButton.append(selectButton);

                newTableRow.append(newTableDataButton);

                var newTableFlightData = $("<td>");
                newTableFlightData.addClass("resultinfo col-2");
                newTableFlightData.attr("id", "flightDiv");

                    var flightNoPara = $("<p>");
                    flightNoPara.attr("id", "flightNo");
                    newTableFlightData.append(flightNoPara);

                    var flightDatePara = $("<p>");
                    flightDatePara.attr("id", "flightDate");
                    newTableFlightData.append(flightDatePara);

                    var flightTimePara = $("<p>");
                    flightTimePara.attr("id", "flightTime");
                    newTableFlightData.append(flightTimePara);

                    var cabinTypePara = $("<p>");
                    cabinTypePara.attr("id", "cabinType");
                    newTableFlightData.append(cabinTypePara);

                newTableRow.append(newTableFlightData);


                var newTablePriceData = $("<td>");
                newTablePriceData.addClass("resultinfo col-2");
                newTablePriceData.attr("id", "priceDiv");
                newTablePriceData.text("");
                newTableRow.append(newTablePriceData);

                var newTableDestData = $("<td>");
                newTableDestData.addClass("resultinfo col-2");
                newTableDestData.attr("id", "destinationDiv");
                newTableRow.append(newTableDestData);

                var newTableWeatherIconData = $("<td>");
                newTableWeatherIconData.addClass("resultinfo col-4");
                
                    var newWeatherIcon = $("<img>");
                    newWeatherIcon.addClass("forecast");
                    newWeatherIcon.attr("id", "forecast1");
                    newWeatherIcon.attr("src", "");
                    newTableWeatherIconData.append(newWeatherIcon);

                    var newWeatherIcon = $("<img>");
                    newWeatherIcon.addClass("forecast");
                    newWeatherIcon.attr("id", "forecast2");
                    newWeatherIcon.attr("src", "");
                    newTableWeatherIconData.append(newWeatherIcon);

                    var newWeatherIcon = $("<img>");
                    newWeatherIcon.addClass("forecast");
                    newWeatherIcon.attr("id", "forecast3");
                    newWeatherIcon.attr("src", "");
                    newTableWeatherIconData.append(newWeatherIcon);
                
                newTableRow.append(newTableWeatherIconData);
            $("#return_flight_content").append(newTableRow);

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

                                    renderDepartureDivs();
                                    renderReturnDivs();



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
});


                                    
                                
                      