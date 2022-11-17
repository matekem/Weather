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
const favIcon = document.getElementById('fav-icon')
const docBody = document.getElementsByTagName('body')[0]
const searchBtn = document.getElementById('search-button');
const searchBar = document.getElementById('city-search')

const fByHour = document.getElementById('forecast-by-hour');

function cardData(day,image,tHigh,tLow, imageText){
    this.day = day;
    this.image = image;
    this.tHigh = tHigh;
    this.tLow = tLow;
    this.imageText = imageText;
    
}

function createCardElement(cardObject){
   
    //Creating the card body
    const cardBody = document.createElement('div')
    cardBody.id = "forecast-card"
    cardSection.appendChild(cardBody)

    //Creating card date span
    const cardDay = document.createElement('div')
    cardDay.id = "day-of-card"
    var currentDate = cardObject.day;
    
    cardDay.innerHTML = getDayName(currentDate, "en-EN")
    cardBody.appendChild(cardDay)
    
    //Creating card image
    const cardImg = document.createElement('img')
    cardImg.id = 'card-image'
    cardImg.src = cardObject.image;
    cardImg.alt = cardObject.imageText;
    cardBody.appendChild(cardImg)

     //Creating card min-max element
    const cardMinMax = document.createElement('div')
    const cardMax = document.createElement('span')
    const cardMin = document.createElement('span')
    cardMinMax.id = "min-to-max"      
    cardBody.appendChild(cardMinMax)
    
    cardMax.id = "card-max"
    cardMin.id = "card-min"

    cardMinMax.appendChild(cardMax)
    cardMinMax.appendChild(cardMin)

    cardMax.innerHTML = "High: " + cardObject.tHigh + " °C"
    cardMin.innerHTML = "Low: " + cardObject.tLow + " °C"

    
}

function hourlyData(objHour,image,temp,wind,rain,imageText){
    this.objHour = objHour;
    this.image = image;
    this.temp = temp;
    this.wind = wind;
    this.rain = rain;
    this.imageText = imageText;
}

function createHourlyElement(hourlyObject){
 //Create forecast by hour section
                    var hourlyContainer = document.createElement('div')
                    var hour = document.createElement('div')
                    var hourImg = document.createElement('img')
                    var tempData = document.createElement('span')
                    var tempDataSubtext = document.createElement('span')
                    var windContainer = document.createElement('div')
                    var windDataDay = document.createElement('span')
                    var windSubtext = document.createElement('span')
                    var rainContainer = document.createElement('div')
                    var rainData = document.createElement('span')
                    var rainSubtext = document.createElement('span')
                 
                        hourlyContainer.id = 'hourly-container'
                        fByHour.appendChild(hourlyContainer);

                       //Create hour element
                        
                       hour.id = 'hour'
                       hourlyContainer.appendChild(hour)

                       var d=new Date(hourlyObject.objHour);
                       if(d.getHours() > 12){
                           hour.innerHTML =d.getHours()  + " pm"
                          
                       }
                       else{
                           hour.innerHTML = d.getHours() + " am"
                       }
                        //Create IMG element

                        
                        hourImg.id = 'hour-img'
                        hourlyContainer.appendChild(hourImg)
                        hourImg.src = hourlyObject.image
                        hourImg.alt = hourlyObject.imageText

                        //Temp data

                        
                        tempData.id = 'hour-temp'
                        tempData.innerHTML = hourlyObject.temp + " °C"
                        hourlyContainer.appendChild(tempData)

                         //Create wind container

                         
                         windContainer.id="wind-container"
                         hourlyContainer.appendChild(windContainer)

                         //Wind data

                        
                        windDataDay.id = 'wind-data'
                        windContainer.appendChild(windDataDay)
                        windDataDay.innerHTML = hourlyObject.wind + "km/h"

                        //Wind text

                        
                        windSubtext.id="hourly-subtext"
                        windSubtext.innerHTML = "Wind"
                        windContainer.appendChild(windSubtext)

                          //Create rain container

                        
                        rainContainer.id="rain-container"
                        hourlyContainer.appendChild(rainContainer)

                        //Create rain data

                        
                        rainData.id="rain-data"
                        rainContainer.appendChild(rainData)
                        rainData.innerHTML = hourlyObject.rain + "%"

                        //Rain text

                        
                        rainSubtext.id="hourly-subtext"
                        rainSubtext.innerHTML = "Rain"
                        rainContainer.appendChild(rainSubtext)

                        
                        

                        

                    }  


function getDayName(dateStr, locale)
{
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });        
}

function get_data(city, request_type){

    var forecastRequest = new XMLHttpRequest;
    var method = 'GET'
    var url = "https://api.weatherapi.com/v1/" + request_type + ".json?key=82f2666503f34d3d9f7140754221011&q=" + city +"&days=11&aqi=no&alerts=no";
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
            currentWeatherImage.alt = fObj.current.condition.text
            favIcon.href = currentWeatherImage.src
            windData.innerHTML = fObj.current.wind_kph + "km/h"
            minTemp.innerHTML = Math.round(fObj.forecast.forecastday[0].day.mintemp_c)  + " °C"
            maxTemp.innerHTML = Math.round(fObj.forecast.forecastday[0].day.maxtemp_c) + " °C"
            dateData.innerHTML = fObj.forecast.forecastday[0].date 
            sunriseData.innerHTML = fObj.forecast.forecastday[0].astro.sunrise
            rainChance.innerHTML = fObj.forecast.forecastday[0].day.daily_chance_of_rain + "%"
            sunsetData.innerHTML = fObj.forecast.forecastday[0].astro.sunset
            
            
            

            // Create a condition that targets viewports at least 768px wide
            const mediaQueryTablet = window.matchMedia('(min-width: 768px)')
            const mediaQueryDesktop = window.matchMedia('(min-width: 1140px)')
           
             //Creating the next X days forecast cards
            function handleTabletChange(e) {
                // Check if the media query is true
                
                if (e.matches) {
                    cardSection.innerHTML = '';
                    fByHour.innerHTML = ''
                   
                    for(let i = 1; i <= 7; i++){

                        let cardDate = fObj.forecast.forecastday[i].date;
                        let cardIcon = fObj.forecast.forecastday[i].day.condition.icon
                        let cardMaxTemp = Math.round(fObj.forecast.forecastday[i].day.maxtemp_c)
                        let cardMinTemp = Math.round(fObj.forecast.forecastday[i].day.mintemp_c)
                        let imageAlt = fObj.forecast.forecastday[i].day.condition.text

                        let createdCard = new cardData(cardDate,cardIcon,cardMaxTemp,cardMinTemp,imageAlt)
                        createCardElement(createdCard)
                        
                        
                        nextXdays.innerHTML = "Next " + i + " days"
                    } 
                    
                    for(let i = 0; i < 24; i+=3){
                        var objHour = fObj.forecast.forecastday[0].hour[i].time;
                        var image = fObj.forecast.forecastday[0].hour[i].condition.icon;
                        var temp = Math.round(fObj.forecast.forecastday[0].hour[i].temp_c);
                        var wind = fObj.forecast.forecastday[0].hour[i].gust_kph;
                        var rain = fObj.forecast.forecastday[0].hour[i].chance_of_rain;
                        var altText = fObj.forecast.forecastday[0].hour[i].condition.text;
            
                        let hourlyObject = new hourlyData(objHour,image,temp,wind,rain,altText)
                        createHourlyElement(hourlyObject)
                    }  

                    
                    
                
                }else{
                    cardSection.innerHTML = '';
                    fByHour.innerHTML = ''

                    //MOBILE VIEW

            for(let i = 1; i <= 4; i++){

                
                let cardDate = fObj.forecast.forecastday[i].date;
                let cardIcon = fObj.forecast.forecastday[i].day.condition.icon
                let cardMaxTemp = Math.round(fObj.forecast.forecastday[i].day.maxtemp_c)
                let cardMinTemp = Math.round(fObj.forecast.forecastday[i].day.mintemp_c)
                let imageAlt = fObj.forecast.forecastday[i].day.condition.text

                let createdCard = new cardData(cardDate,cardIcon,cardMaxTemp,cardMinTemp,imageAlt)
                createCardElement(createdCard)
                nextXdays.innerHTML = "Next " + i + " days"
            }
            //Create forecast by hour section
           
            for(let i = 0; i < 24; i+=3){
            var objHour = fObj.forecast.forecastday[0].hour[i].time;
            var image = fObj.forecast.forecastday[0].hour[i].condition.icon;
            var temp = Math.round(fObj.forecast.forecastday[0].hour[i].temp_c);
            var wind = fObj.forecast.forecastday[0].hour[i].gust_kph;
            var rain = fObj.forecast.forecastday[0].hour[i].chance_of_rain;
            var altText = fObj.forecast.forecastday[0].hour[i].condition.text;
            
            let hourlyObject = new hourlyData(objHour,image,temp,wind,rain,altText)
            createHourlyElement(hourlyObject)

            }  

            

                }
              }

              function handleDesktopChange(e) {
                // Check if the media query is true
                if (e.matches) {
                    fByHour.innerHTML = ''
                    cardSection.innerHTML = '';
                    for(let i = 1; i <= 10; i++){


                        
                        let cardDate = fObj.forecast.forecastday[i].date;
                        let cardIcon = fObj.forecast.forecastday[i].day.condition.icon
                        let cardMaxTemp = Math.round(fObj.forecast.forecastday[i].day.maxtemp_c)
                        let cardMinTemp = Math.round(fObj.forecast.forecastday[i].day.mintemp_c)
                        let imageAlt = fObj.forecast.forecastday[i].day.condition.text

                        let createdCard = new cardData(cardDate,cardIcon,cardMaxTemp,cardMinTemp,imageAlt)
                        createCardElement(createdCard)
                        nextXdays.innerHTML = "Next " + i + " days"
                        
                    }
                    for(let i = 0; i < 24; i+=3){
                        var objHour = fObj.forecast.forecastday[0].hour[i].time;
                        var image = fObj.forecast.forecastday[0].hour[i].condition.icon;
                        var temp = Math.round(fObj.forecast.forecastday[0].hour[i].temp_c);
                        var wind = fObj.forecast.forecastday[0].hour[i].gust_kph;
                        var rain = fObj.forecast.forecastday[0].hour[i].chance_of_rain;
                        var altText = fObj.forecast.forecastday[0].hour[i].condition.text;
            
                        let hourlyObject = new hourlyData(objHour,image,temp,wind,rain,altText)
                        createHourlyElement(hourlyObject)
                    }  
   
                }else{
                    handleTabletChange(mediaQueryTablet)
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
        else if(forecastRequest.status === 400){
            window.alert("City not found!")
            get_data("Budapest","forecast")
        }    
            
    }
}
let searchBarValue;
searchBtn.addEventListener("click", ()=> {
   searchBarValue = searchBar.value



   get_data(searchBarValue,"forecast")
})


get_data("Budapest", "forecast")
