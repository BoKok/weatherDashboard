// fetch("https://api.openweathermap.org/data/2.5/weather?q=london&appid=6bd99a172fcab706a75e9217f1badfef").then(function(response) {
//   response.json().then(function(data) {
//     console.log(data);
//     console.log(data.coord)
//   });
// });

var rHistory = function(event,cityName2) {
    console.log(event, cityName2)
    $("textarea").val(cityName2);
    cities;
}

var cities = function() {
    var cityName = $("textarea").val();

    localStorage.setItem(cityName, cities);
    const cityHeader = $("<h4>");
    cityHeader.text(cityName)
    .on("click", rHistory(event,cityName)); 
    $(".history").append(cityHeader);


    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=6bd99a172fcab706a75e9217f1badfef").then(function(response) {
    response.json().then(function(data) {
    console.log(data);
    var latitude = data.coord.lat;
    var longitude = data.coord.lon;

    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=6bd99a172fcab706a75e9217f1badfef").then(function(response) {
    response.json().then(function(oneCall) {
    console.log(oneCall);
    $("#temp").text("Temp: " + oneCall.current.temp + "°F");
    $("#wind").text("Wind: " + oneCall.current.wind_speed + " MPH");
    $("#humidity").text("Humidity: " + oneCall.current.humidity + "%");

    $("#uv").text("UV Index: " + oneCall.current.uvi);
    
    var uv = parseInt(oneCall.current.uvi);
    if (uv <= 2) {
        $("#uv").addClass("favorable");
    } else if (uv >= 3 && uv <= 5) {
        $("#uv").addClass("moderate");
    } else {
        $("#uv").addClass("severe");
    }

    if ($("img") != "undefined") {
        $("img").remove()
    }
    for (i=1; i < 6; i++) {
    var epoch = oneCall.daily[i].dt;
    var epochConv = new Date(epoch * 1000);
    var newTime = epochConv.toLocaleDateString()
    $(".day-" + i).text(newTime);
    var wIcon = oneCall.daily[i].weather[0].icon;

    var wIconP = "http://openweathermap.org/img/wn/" + wIcon +"@2x.png"
    $(".icon-" + i).append("<img src='" + wIconP + "'>");
    var dayT = oneCall.daily[i].temp.day;
    $("#temp-" + i).text("Temp: " + dayT + " °F");
    var dayW = oneCall.daily[i].wind_speed;
    $("#wind-" + i).text("Wind: " + dayW + " MPH");
    var dayH = oneCall.daily[i].humidity;
    $("#humidity-" + i).text("Humidity: " + dayW + "%");
    }

  });
});
    
  });
});
    $("#cityHeading").text(cityName);


}
var cityName = $("textarea").val();
localStorage.setItem(cityName, cities);
$(".submit").on("click", cities);
