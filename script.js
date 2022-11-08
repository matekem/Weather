const cardSection = document.getElementById('forecast-cards-container')

function getDayName(dateStr, locale)
{
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });        
}


function get_data(city, request_type){

    var forecastRequest = new XMLHttpRequest;
    var method = 'GET'
    var url = "https://api.weatherapi.com/v1/" + request_type + ".json?key=dfe69afa42c94175859113227222710&q=" + city +"&days=6&aqi=no&alerts=no";
    var fObj;

    forecastRequest.open(method, url, 'true');
    forecastRequest.responseType = 'text';
    forecastRequest.send(null);

     
     forecastRequest.onload = function(){
        if(forecastRequest.status === 200){
            fObj = JSON.parse(forecastRequest.responseText)
            console.log(fObj);
            //Creating the current weather and forecast for today
            document.getElementById('location').innerHTML = fObj.location.name + ", " + fObj.location.country + "\n"
            document.getElementById('current-temp').innerHTML = fObj.current.temp_c + " C°"
            document.getElementById('current-desc').innerHTML = fObj.current.condition.text
            document.getElementById('current-weather-image').src = fObj.current.condition.icon
            document.getElementById('wind').innerHTML = fObj.current.wind_kph + "km/h"
            document.getElementById('min-temp').innerHTML = fObj.forecast.forecastday[0].day.mintemp_c  + " C°"
            document.getElementById('max-temp').innerHTML = fObj.forecast.forecastday[0].day.maxtemp_c + " C°"
            document.getElementById('date').innerHTML = fObj.forecast.forecastday[0].date 
            document.getElementById('sunrise').innerHTML = fObj.forecast.forecastday[0].astro.sunrise
            document.getElementById('rain-chance').innerHTML = fObj.forecast.forecastday[0].day.daily_chance_of_rain + "%"
            document.getElementById('sunset').innerHTML = fObj.forecast.forecastday[0].astro.sunset
            
            //Creating the next 5 days forecast cards

            for(let i = 1; i <= 5; i++){

                //Creating the card body
                const cardBody = document.createElement('div')
                cardBody.id = "forecast-card"
                cardSection.appendChild(cardBody)

                //Creating card date span
                const cardDay = document.createElement('span')
                cardDay.id = "day-of-card"
                var currentDate = fObj.forecast.forecastday[i].date
                
                cardDay.innerHTML = getDayName(currentDate, "en-EN")
                cardBody.appendChild(cardDay)
                
                //Creating card image
                const cardImg = document.createElement('img')
                cardImg.id = 'card-image'
                cardImg.src = fObj.forecast.forecastday[i].day.condition.icon
                cardBody.appendChild(cardImg)

                //Creating card min-max element
                const cardMinMax = document.createElement('span')
                cardMinMax.id = "min-to-max"
                cardMinMax.innerHTML = fObj.forecast.forecastday[i].day.mintemp_c + " - " + fObj.forecast.forecastday[i].day.mintemp_c
                cardBody.appendChild(cardMinMax)
            }
            
        }
    }
}



get_data("Budapest", "forecast")




