const cardSection = document.getElementById('forecast-cards-container')
const locationData = document.getElementById('location')
const currentTemp = document.getElementById('current-temp')
const currentDesc = document.getElementById('current-desc')
const currentWeatherImage = document.getElementById('current-weather-image')
const windData = document.getElementById('wind')
const minTemp = document.getElementById('min-temp')
const maxTemp = document.getElementById('max-temp')
const dateData = document.getElementById('date')
const sunriseData = document.getElementById('sunrise')
const rainChance = document.getElementById('rain-chance')
const sunsetData = document.getElementById('sunset')
const nextXdays = document.getElementById('next-days')



  

function getDayName(dateStr, locale)
{
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });        
}


function get_data(city, request_type){

    var forecastRequest = new XMLHttpRequest;
    var method = 'GET'
    var url = "https://api.weatherapi.com/v1/" + request_type + ".json?key=dfe69afa42c94175859113227222710&q=" + city +"&days=11&aqi=no&alerts=no";
    var fObj;

    forecastRequest.open(method, url, 'true');
    forecastRequest.responseType = 'text';
    forecastRequest.send(null);

     
     forecastRequest.onload = function(){
         if(forecastRequest.status === 200){
            fObj = JSON.parse(forecastRequest.responseText)
            console.log(fObj);
            //Creating the current weather and forecast for today
            locationData.innerHTML = fObj.location.name + ", " + fObj.location.country + "\n"
            currentTemp.innerHTML = Math.round(fObj.current.temp_c) + " °C"
            currentDesc.innerHTML = fObj.current.condition.text
            currentWeatherImage.src = fObj.current.condition.icon
            windData.innerHTML = fObj.current.wind_kph + "km/h"
            minTemp.innerHTML = Math.round(fObj.forecast.forecastday[0].day.mintemp_c)  + " °C"
            maxTemp.innerHTML = Math.round(fObj.forecast.forecastday[0].day.maxtemp_c) + " °C"
            dateData.innerHTML = fObj.forecast.forecastday[0].date 
            sunriseData.innerHTML = fObj.forecast.forecastday[0].astro.sunrise
            rainChance.innerHTML = fObj.forecast.forecastday[0].day.daily_chance_of_rain + "%"
            sunsetData.innerHTML = fObj.forecast.forecastday[0].astro.sunset
            
            //Creating the next x days forecast cards
            // Create a condition that targets viewports at least 768px wide
            const mediaQueryTablet = window.matchMedia('(min-width: 768px)')
            const mediaQueryDesktop = window.matchMedia('(min-width: 1140px)')
            
              /*
            cardSection.innerHTML = '';

            for(let i = 1; i <= 4; i++){

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
                cardMinMax.innerHTML = Math.round(fObj.forecast.forecastday[i].day.mintemp_c)  + " - " + Math.round(fObj.forecast.forecastday[i].day.maxtemp_c) + " °C"
                cardBody.appendChild(cardMinMax)
            }
*/
            function handleTabletChange(e) {
                // Check if the media query is true
                if (e.matches) {
                    cardSection.innerHTML = '';
                    for(let i = 1; i <= 7; i++){

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
                        cardMinMax.innerHTML = Math.round(fObj.forecast.forecastday[i].day.mintemp_c)  + " - " + Math.round(fObj.forecast.forecastday[i].day.maxtemp_c) + " °C"
                        cardBody.appendChild(cardMinMax)

                        nextXdays.innerHTML = "Next " + i + " days"
                    }   
                }else{
                    cardSection.innerHTML = '';

            for(let i = 1; i <= 4; i++){

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
                cardMinMax.innerHTML = Math.round(fObj.forecast.forecastday[i].day.mintemp_c)  + " - " + Math.round(fObj.forecast.forecastday[i].day.maxtemp_c) + " °C"
                cardBody.appendChild(cardMinMax)
                nextXdays.innerHTML = "Next " + i + " days"
            }

                }
              }

              function handleDesktopChange(e) {
                // Check if the media query is true
                if (e.matches) {
                    cardSection.innerHTML = '';
                    for(let i = 1; i <= 10; i++){

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
                        cardMinMax.innerHTML = Math.round(fObj.forecast.forecastday[i].day.mintemp_c)  + " - " + Math.round(fObj.forecast.forecastday[i].day.maxtemp_c) + " °C"
                        cardBody.appendChild(cardMinMax)

                        nextXdays.innerHTML = "Next " + i + " days"

                        
                    }   
                }else{
                    cardSection.innerHTML = '';
                    for(let i = 1; i <= 7; i++){

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
                        cardMinMax.innerHTML = Math.round(fObj.forecast.forecastday[i].day.mintemp_c)  + " - " + Math.round(fObj.forecast.forecastday[i].day.maxtemp_c) + " °C"
                        cardBody.appendChild(cardMinMax)

                        nextXdays.innerHTML = "Next " + i + " days"
                    }   
                }
            }
                // Register event listener
                mediaQueryTablet.addListener(handleTabletChange)
                    
                // Initial check
                handleTabletChange(mediaQueryTablet)

              // Register event listener
              mediaQueryDesktop.addListener(handleDesktopChange)
              
              // Initial check
              handleDesktopChange(mediaQueryDesktop)


              



        }    
            
    }
}



get_data("Budapest", "forecast")