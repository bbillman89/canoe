var cities = ["SFO", "LAX"];

$(document).ready(function () {
    var queryURL = "http://api.ipstack.com/check?access_key=415674c515bf829f14381045fd241e54";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        console.log(response.city);
        //need a way to convert city name to airport code
        //ideally response.city would go into airport and then origin-city
    
        for (var i = 0; i < cities.length; i++) {
            
            var origin_city = "CLE-sky";
            var destination_city = cities[i] + "-sky"; 
            var departure_date = "2018-12-15";
            var arrival_date = "2018-12-31";

            var queryURL = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/" + origin_city + "/" + destination_city + "/" + departure_date + "/" + arrival_date;
            
            $.ajax({
                url: queryURL,
                type: "GET",
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("X-RapidAPI-Key", "e1fbeb00dbmshfb67c8437a76a82p1d0d29jsnddbb04551884");
                },
                success: function(response) {
                    console.log(response)
                    console.log("------------");
                }
            });
        } 
    });   
});