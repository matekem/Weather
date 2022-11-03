

function get_data(city, request_type){

    var forecastRequest = new XMLHttpRequest();
    var method = 'GET'
    var url = "//api.weatherapi.com/v1/" + request_type + ".json?key=dfe69afa42c94175859113227222710&q=" + city +"&days=1&aqi=no&alerts=no";
    var fObj;

    forecastRequest.open(method, url, 'true');
    forecastRequest.responseType = 'text';
    forecastRequest.send(null);

     
     forecastRequest.onload = function(){
        if(forecastRequest.status === 200){
            fObj = JSON.parse(forecastRequest.responseText)
            console.log(fObj);
            document.getElementById('location').innerHTML = fObj.location.name + ", " + fObj.location.country + "\n"
            document.getElementById('date').innerHTML = fObj.forecast.forecastday[0].date
            document.getElementById('current-temp').innerHTML = fObj.current.temp_c + " C°"
            document.getElementById('current-desc').innerHTML = fObj.current.condition.text
            document.getElementById('current-weather-image').src = fObj.current.condition.icon
            /*document.getElementById('forecast-desc').innerHTML = "Today's forecast is: " + fObj.forecast.forecastday[0].day.condition.text
            document.getElementById('forecast-desc-img').src = fObj.forecast.forecastday[0].day.condition.icon*/
            document.getElementById('min-temp').innerHTML = fObj.forecast.forecastday[0].day.mintemp_c
            document.getElementById('max-temp').innerHTML = fObj.forecast.forecastday[0].day.maxtemp_c
            document.getElementById('wind').innerHTML = fObj.current.wind_kph + "km/h"
            document.getElementById('sunrise').innerHTML = fObj.forecast.forecastday[0].astro.sunrise
            document.getElementById('rain-chance').innerHTML = fObj.forecast.forecastday[0].day.daily_will_it_rain
            document.getElementById('sunset').innerHTML = fObj.forecast.forecastday[0].astro.sunset

           
        }
    }
}

get_data("Budapest", "forecast")



