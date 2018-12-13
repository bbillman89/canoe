$("#get-current-location").on("click", function(event) {
    event.preventDefault();

    var queryURL = "http://api.ipstack.com/check?access_key=415674c515bf829f14381045fd241e54";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        console.log(response);
    }); 

});
