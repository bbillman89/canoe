//user-input variables
var user_weather_choice;
var user_entered_origin_country;
var user_entered_origin_zipcode;
var user_departure;
var user_return;

//api determined variables
var user_origin_city;
var user_origin_latitude;
var user_origin_longitude;
var user_origin_airport_code;
var user_destination_city;


//weather arrays
var snowy_cities = ["LGA", "IAD", "ORD", "DEN", "MCI"];
var rainy_cities = ["SEA", "PDX", "BHM", "FLL", "MEM"];
var sunny_cities = ["SAN", "MIA", "LAX", "MCO", "LAS"];

//variables used to retrieve and display flight data
var flight_destination;
var flight_departure_date;
var flight_return_date;
var flight_departure_time;
var flight_return_time;
var flight_price;
var flight_no;
var flight_airline;



$(document).ready(function () {

        
//Function to get flight information based on parameters provided    
    $("#search").on("click", function() {

        
        user_weather_choice = $("#weather").val();
        user_entered_origin_zipcode = $("#select-zip").val();
        user_entered_origin_country = $("#select-country").val();
        user_flight_class = $("#flight-class").val();
        user_departure = $("#dep-date").val();
        user_return = $("#return-date").val();

        //Populates Flight Banner section
        $("#userWeather").text(user_weather_choice);
        $("#userLocation").text("Cleveland (CLE)");
        $("#tripType").text("Round Trip");
        $("#seatType").text("Economy");

        //function to create new flight information divs for departure data
        function renderDepartureDivs (weatherIconLink) {
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
                    flightNoPara.text(flight_airline + " Flight " + flight_no);
                    newTableFlightData.append(flightNoPara);

                    var flightDatePara = $("<p>");
                    flightDatePara.attr("id", "flightDate");
                    flightDatePara.text(flight_departure_date);
                    newTableFlightData.append(flightDatePara);

                    var flightTimePara = $("<p>");
                    flightTimePara.attr("id", "flightTime");
                    flightTimePara.text(flight_departure_time)
                    newTableFlightData.append(flightTimePara);

                    var cabinTypePara = $("<p>");
                    cabinTypePara.attr("id", "cabinType");
                    cabinTypePara.text("Economy");
                    newTableFlightData.append(cabinTypePara);

                newTableRow.append(newTableFlightData);


                var newTablePriceData = $("<td>");
                newTablePriceData.addClass("resultinfo col-2");
                newTablePriceData.attr("id", "priceDiv");
                newTablePriceData.text("$" + flight_price);
                newTableRow.append(newTablePriceData);

                var newTableDestData = $("<td>");
                newTableDestData.addClass("resultinfo col-2");
                newTableDestData.attr("id", "destinationDiv");
                newTableDestData.text(flight_destination);
                newTableRow.append(newTableDestData);

                var newTableWeatherIconData = $("<td>");
                newTableWeatherIconData.addClass("resultinfo col-4");
                
                    var newWeatherIcon = $("<img>");
                    newWeatherIcon.addClass("forecast");
                    newWeatherIcon.attr("id", "forecast1");
                    newWeatherIcon.attr("src", weatherIconLink);
                    newTableWeatherIconData.append(newWeatherIcon);

                    var newWeatherIcon = $("<img>");
                    newWeatherIcon.addClass("forecast");
                    newWeatherIcon.attr("id", "forecast2");
                    newWeatherIcon.attr("src", weatherIconLink);
                    newTableWeatherIconData.append(newWeatherIcon);

                    var newWeatherIcon = $("<img>");
                    newWeatherIcon.addClass("forecast");
                    newWeatherIcon.attr("id", "forecast3");
                    newWeatherIcon.attr("src", weatherIconLink);
                    newTableWeatherIconData.append(newWeatherIcon);
                
                newTableRow.append(newTableWeatherIconData);
            $("#departure_flight_content").append(newTableRow);

        }

        //same function as above except for return data
        function renderReturnDivs (weatherIconLink) {

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
                    flightNoPara.text(flight_airline + " Flight " + flight_no);
                    newTableFlightData.append(flightNoPara);

                    var flightDatePara = $("<p>");
                    flightDatePara.attr("id", "flightDate");
                    flightDatePara.text(flight_return_date);
                    newTableFlightData.append(flightDatePara);

                    var flightTimePara = $("<p>");
                    flightTimePara.attr("id", "flightTime");
                    flightTimePara.text(flight_return_time);
                    newTableFlightData.append(flightTimePara);

                    var cabinTypePara = $("<p>");
                    cabinTypePara.attr("id", "cabinType");
                    cabinTypePara.text("Economy");
                    newTableFlightData.append(cabinTypePara);

                newTableRow.append(newTableFlightData);


                var newTablePriceData = $("<td>");
                newTablePriceData.addClass("resultinfo col-2");
                newTablePriceData.attr("id", "priceDiv");
                newTablePriceData.text("$" + flight_price);
                newTableRow.append(newTablePriceData);

                var newTableDestData = $("<td>");
                newTableDestData.addClass("resultinfo col-2");
                newTableDestData.attr("id", "destinationDiv");
                newTableDestData.text("CLE");
                newTableRow.append(newTableDestData);

                var newTableWeatherIconData = $("<td>");
                newTableWeatherIconData.addClass("resultinfo col-4");
                
                    var newWeatherIcon = $("<img>");
                    newWeatherIcon.addClass("forecast");
                    newWeatherIcon.attr("id", "forecast1");
                    newWeatherIcon.attr("src", weatherIconLink);
                    newTableWeatherIconData.append(newWeatherIcon);

                    var newWeatherIcon = $("<img>");
                    newWeatherIcon.addClass("forecast");
                    newWeatherIcon.attr("id", "forecast2");
                    newWeatherIcon.attr("src", weatherIconLink);
                    newTableWeatherIconData.append(newWeatherIcon);

                    var newWeatherIcon = $("<img>");
                    newWeatherIcon.addClass("forecast");
                    newWeatherIcon.attr("id", "forecast3");
                    newWeatherIcon.attr("src", weatherIconLink);
                    newTableWeatherIconData.append(newWeatherIcon);
                
                newTableRow.append(newTableWeatherIconData);
            $("#return_flight_content").append(newTableRow);

        }

        //conditional to run logic dependent on weather user entered a specific zipcode/country --> otherwise, we just use their current location from the IPStack API
        if (user_entered_origin_zipcode === "" && user_entered_origin_country === "") {

            var queryURL = "https://api.ipstack.com/check?access_key=415674c515bf829f14381045fd241e54";

            $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function(response) {
                console.log(response);

                //grabbing this information from the API object and inputting it into next query to determine closest Airport to user
                user_origin_longitude = response.longitude;
                user_origin_latitude = response.latitude;
                user_origin_city = response.city;
            

                var queryURL = "https://aviation-edge.com/v2/public/nearby?key=70faba-ef2534&lat=" + user_origin_latitude + "&lng=" + user_origin_longitude + "&distance=25";
                 
                $.ajax({
                    url: queryURL,
                    method: "GET"
                })
                .then(function(response) {
                       console.log(JSON.parse(response));
                       //Here, we are grabbing the nearest airport within 25 miles, determined by the API. Multiple airports are returned, so we decided it was best to
                       //pick the airport about 12-13 miles away, half of 25. This presented some issues as will be explored below.

                       //var airport_response_parsed = JSON.parse(response);
                       //user_origin_airport_code = airport_response_parsed; 
                       if (user_weather_choice === "sunny") {
                        
                        //clears out any existing flight data so that user can do mulitple searches without new results appending to previous ones
                        $("#departure_flight_content").empty();
                        $("#return_flight_content").empty();

                            for (var i = 0; i < sunny_cities.length; i++) {

                                //Using the airport code that we received from the previous API, we would plug that into our flights API as the origin city. However, because we are using a free
                                //version, our flights api will only return cached data from user queries in the past 48 hours. This means that if a user has not searched a flight from say "Burke Lakefront" to "LAX", 
                                //we simply will not return any flight data. For this reason, we have decided to hard code in "CLE" as our origin city to ensure we are able to display results.
                                var queryURL = "https://api.travelpayouts.com/v1/prices/cheap?origin=CLE&destination=" + sunny_cities[i] + "&depart_date=" + user_departure + "&return_date=" + user_return + "&token=06e7274ac072c4bc0d482997c118a6ce";
                                    
                                $.ajax({
                                    url: queryURL,
                                    method: "GET"
                                })
                                .then(function(response) {

                                    flight_destination = Object.keys(response.data)[0];
                        
                                    resulting_data = Object.values(response.data); // makes us able to access the specific price
                        
                                    flight_departure_date = moment(resulting_data[0][1].departure_at).format("LL");
                                    
                                    flight_return_date = moment(resulting_data[0][1].return_at).format("LL");
                                                            
                                    flight_departure_time = moment(resulting_data[0][1].departure_at).format("LT");
                                    
                                    flight_return_time = moment(resulting_data[0][1].return_at).format("LT"); 
                        
                                    flight_price = parseInt(resulting_data[0][1].price / 66); //gives us flight price in $$$
                        
                                    flight_no = resulting_data[0][1].flight_number;
                        
                                    flight_airline = resulting_data[0][1].airline;


                                    renderDepartureDivs("./assets/images/sunimage.png");
                                    renderReturnDivs("./assets/images/snowflake.png");
                                
                                });
                    
                            }
                            
                        } else if (user_weather_choice === "snowy")  {

                            $("#departure_flight_content").empty();
                            $("#return_flight_content").empty();
                        
                            for (var i = 0; i < snowy_cities.length; i++) {
                                var queryURL = "https://api.travelpayouts.com/v1/prices/cheap?origin=CLE&destination=" + snowy_cities[i] + "&depart_date=" + user_departure + "&return_date=" + user_return + "&token=06e7274ac072c4bc0d482997c118a6ce";
                                    
                                $.ajax({
                                    url: queryURL,
                                    method: "GET"
                                })
                                .then(function(response) {
                                    console.log(response);

                                    flight_destination = Object.keys(response.data)[0];

                                    resulting_data = Object.values(response.data); 

                                    flight_departure_date = moment(resulting_data[0][1].departure_at).format("LL");
                                    
                                    flight_return_date = moment(resulting_data[0][1].return_at).format("LL");
                                                            
                                    flight_departure_time = moment(resulting_data[0][1].departure_at).format("LT");
                                    
                                    flight_return_time = moment(resulting_data[0][1].return_at).format("LT"); 

                                    flight_price = parseInt(resulting_data[0][1].price / 66); 

                                    flight_no = resulting_data[0][1].flight_number;

                                    flight_airline = resulting_data[0][1].airline;

                                    renderDepartureDivs("./assets/images/snowflake.png");
                                    renderReturnDivs("./assets/images/snowflake.png");
                                })
                            }
                        } else if (user_weather_choice === "rainy") {

                            $("#departure_flight_content").empty();
                            $("#return_flight_content").empty();

                            for (var i = 0; i < rainy_cities.length; i++) {
                                var queryURL = "https://api.travelpayouts.com/v1/prices/cheap?origin=CLE&destination=" + rainy_cities[i] + "&depart_date=" + user_departure + "&return_date=" + user_return + "&token=06e7274ac072c4bc0d482997c118a6ce";
                                    
                                $.ajax({
                                    url: queryURL,
                                    method: "GET"
                                })
                                .then(function(response) {
                                    console.log(response);

                                    flight_destination = Object.keys(response.data)[0];

                                    resulting_data = Object.values(response.data); // makes us able to access the specific price

                                    flight_departure_date = moment(resulting_data[0][1].departure_at).format("LL");
                                    
                                    flight_return_date = moment(resulting_data[0][1].return_at).format("LL");
                                                            
                                    flight_departure_time = moment(resulting_data[0][1].departure_at).format("LT");
                                    
                                    flight_return_time = moment(resulting_data[0][1].return_at).format("LT"); 

                                    flight_price = parseInt(resulting_data[0][1].price / 66); //gives us flight price in $$$

                                    flight_no = resulting_data[0][1].flight_number;

                                    flight_airline = resulting_data[0][1].airline;
                                    
                                    renderDepartureDivs("./assets/images/rain.png");
                                    renderReturnDivs("./assets/images/snowflake.png");
                                })
                            }
                        }
                    });
                });             
        } else {

            //Here is our else statement to run code if the user has entered their own custom zipcode and country. Here, we use an API called Zippopotamus that takes the user entered origin country and zipcode
            //and determines the user's latitude and longitude. Similar to above, we would then plug this data into our nearest airport API to determine the closest airport within 25 miles.
            //Finally, we would input the nearest airport's IATA code into our flights API and return flight data.

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
                        $("#departure_flight_content").empty();
                        $("#return_flight_content").empty();

                        for (var i = 0; i < sunny_cities.length; i++) {
                            var queryURL =  "https://api.travelpayouts.com/v1/prices/cheap?origin=" + user_origin_airport_code + "&destination=" + sunny_cities[i] + "&depart_date=" + user_departure + "&return_date=" + user_return + "&token=06e7274ac072c4bc0d482997c118a6ce";

                            $.ajax({
                                url: queryURL,
                                method: "GET"
                            })
                            .then(function(response) {
                                console.log(response);

                                flight_destination = Object.keys(response.data)[0];

                                resulting_data = Object.values(response.data); // makes us able to access the specific price

                                flight_departure_date = moment(resulting_data[0][1].departure_at).format("LL");
                                
                                flight_return_date = moment(resulting_data[0][1].return_at).format("LL");
                                                        
                                flight_departure_time = moment(resulting_data[0][1].departure_at).format("LT");
                                
                                flight_return_time = moment(resulting_data[0][1].return_at).format("LT"); 

                                flight_price = parseInt(resulting_data[0][1].price / 66); //gives us flight price in $$$

                                flight_no = resulting_data[0][1].flight_number;

                                flight_airline = resulting_data[0][1].airline;
                                
                                renderDepartureDivs("./assets/images/sunimage.png");
                                renderReturnDivs("./assets/images/snowflake.png");
                            })
                        }
                    } else if (user_weather_choice === "snowy")  {

                        $("#departure_flight_content").empty();
                        $("#return_flight_content").empty();
                        
                        for (var i = 0; i < snowy_cities.length; i++) {
                            var queryURL =  "https://api.travelpayouts.com/v1/prices/cheap?origin=CLE&destination=" + snowy_cities[i] + "&depart_date=" + user_departure + "&return_date=" + user_return + "&token=06e7274ac072c4bc0d482997c118a6ce";

                            $.ajax({
                                url: queryURL,
                                method: "GET"
                            })
                            .then(function(response) {
                                console.log(response);

                                flight_destination = Object.keys(response.data)[0];

                                resulting_data = Object.values(response.data); // makes us able to access the specific price

                                flight_departure_date = moment(resulting_data[0][1].departure_at).format("LL");
                                
                                flight_return_date = moment(resulting_data[0][1].return_at).format("LL");
                                                        
                                flight_departure_time = moment(resulting_data[0][1].departure_at).format("LT");
                                
                                flight_return_time = moment(resulting_data[0][1].return_at).format("LT"); 

                                flight_price = parseInt(resulting_data[0][1].price / 66); //gives us flight price in $$$

                                flight_no = resulting_data[0][1].flight_number;

                                flight_airline = resulting_data[0][1].airline;
                                
                                renderDepartureDivs("./assets/images/snowflake.png");
                                renderReturnDivs("./assets/images/snowflake.png");
                            })
                        }
                    } else if (user_weather_choice === "rainy") {

                        $("#departure_flight_content").empty();
                        $("#return_flight_content").empty();
                        for (var i = 0; i < rainy_cities.length; i++) {
                            var queryURL =  "https://api.travelpayouts.com/v1/prices/cheap?origin=CLE&destination=" + rainy_cities[i] + "&depart_date=" + user_departure + "&return_date=" + user_return + "&token=06e7274ac072c4bc0d482997c118a6ce";

                            $.ajax({
                                url: queryURL,
                                method: "GET"
                            })
                            .then(function(response) {
                                console.log(response);

                                flight_destination = Object.keys(response.data)[0];

                                resulting_data = Object.values(response.data); // makes us able to access the specific price

                                flight_departure_date = moment(resulting_data[0][1].departure_at).format("LL");
                                
                                flight_return_date = moment(resulting_data[0][1].return_at).format("LL");
                                                        
                                flight_departure_time = moment(resulting_data[0][1].departure_at).format("LT");
                                
                                flight_return_time = moment(resulting_data[0][1].return_at).format("LT"); 

                                flight_price = parseInt(resulting_data[0][1].price / 66); //gives us flight price in $$$

                                flight_no = resulting_data[0][1].flight_number;

                                flight_airline = resulting_data[0][1].airline;
                                
                                renderDepartureDivs("./assets/images/rain.png");
                                renderReturnDivs("./assets/images/snowflake.png");
                            })
                        }
                    }
                });
            });
        } 
    });   
});


                                    
                                
                      
