
var today = new Date();
var citySearchEl = document.querySelector("#form");
var cityInputName = document.querySelector("#cityname");
var weatherFrame = document.querySelector("#weather-frame");
var weatherText = document.querySelector("#weather-text-header");
var actualweatherEl = document.querySelector("#actual-weather");
var fivedaysCard = document.querySelector("#fivedays-card");
var fivedaysCon = document.querySelector("#fivedays-content")
var searchTab = document.querySelector("#search");
var recentSearch = document.querySelector("#recent-history");
var recentSearchBtn = document.querySelector("#historyBtn");
var deletedEl = document.querySelector("#deleted");
var recentsArray = [];

var formSubmissionHandler = function (event) {
    event.preventDefault();

    var desiredCity =  cityInputName.value.trim();

    if (desiredCity) {
        recentsArray.push(desiredCity);
        localStorage.setItem("searchingWeather", JSON.stringify(recentsArray));
        var recents = document.createElement('button');
        recents.className = "searchBTN";
        recents.setAttribute("city-data", desiredCity)
        recents.innerHTML = desiredCity;
        recentSearchBtn.appendChild(recents);
        recentSearch.removeAttribute("style")
        forecastInfo(desiredCity);
        cityInputName.value = "";
    }
    else {
        alert("Name of the City")
    }

    var forecastInfo = function(desiredCity) {
        var cityAPI = "api.openweathermap.org/data/2.5/forecast?q=" + desiredCity + "&appid=edafc587d831fcb31d07e897e02975be";
        console.log(cityAPI)
        fetch(
            cityAPI
        )}
        .then(funtion (cityIndicators)) 
            return cityIndicators.JSON()//
        
        .then(function (cityIndicators) {
            var lat = cityIndicators.coord.lat;
            var lon = cityIndicators.coord.lon;

            var location = cityIndicators.name;
            var date = today.getMonth() +  '/' + (today.getDay() + 1) + '/' + today.getFullYear();
            var openweatherIcon = cityIndicators.weather[0].icon;
            var forecastData = cityIndicators.weather[0].data;
            var openweatherIconLink = "<img src='http://openweathermap.org/img/wn" + openweatherIcon + "@2x.pgn' alt='" + forecastData + "' title='" + forecastData + "' />" 

            actualweatherEl.textContent = "";
            fivedaysCon.textContent = "";

            weatherText.innerHTML = city + " (" + date + ") " + openweatherIconLink;
            
            weatherFrame.classList.remove("hidden");
            fivedaysCard.classList.remove("hidden");

            return fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=alerts,minutely,hourly&units=imperial&appid=edafc587d831fcb31d07e897e02975be');
            
        });  
};

// This code shows the weather parameters like humidity, wind speed, and temperature
var displayWeather = function (weather) {
    // check if api returned any weather data
    if (weather.length === 0) {
        weatherContainerEl.textContent = "No weather data found.";
        return;
    }
    // Create Temperature element
    var temperature = document.createElement('p');
    temperature.id = "temperature";
    temperature.innerHTML = "<strong>Temperature:</strong> " + weather.current.temp.toFixed(1) + "°F";
    currentWeatherEl.appendChild(temperature);

    // Create Humidity element
    var humidity = document.createElement('p');
    humidity.id = "humidity";
    humidity.innerHTML = "<strong>Humidity:</strong> " + weather.current.humidity + "%";
    currentWeatherEl.appendChild(humidity);

    // Create Wind Speed element
    var windSpeed = document.createElement('p');
    windSpeed.id = "wind-speed";
    windSpeed.innerHTML = "<strong>Wind Speed:</strong> " + weather.current.wind_speed.toFixed(1) + " MPH";
    currentWeatherEl.appendChild(windSpeed);

    var extendedForecastArray = weather.daily;

    for (let i = 0; i < extendedForecastArray.length - 3; i++) {
        var date = today.getMonth() +  '/' + (today.getDay() + i + 1) + '/' + today.getFullYear();
        var openweatherIcon = extendedForecastArray[i].weather[0].icon;
        var forecastData = extendedForecastArray[i].weather[0].data
        var openweatherIconLink = "<img src='http://openweathermap.org/img/wn" + openweatherIcon + "@2x.pgn' alt='" + forecastData + "' title='" + forecastData + "' />" 
        var aDayEl = document.createElement("div");
        aDayEl.className = "daily-forecast"
        aDayEl.innerHTML = "<p><strong>" + date + "</strong></p>" + "<p>" + openweatherIconLink + "</p>" + "<p><strong>Temp:</strong> " + extendedForecastArray[i].temp.day.toFixed(1) + "°F</p>" +
        "<p><strong>Humidity:</strong> " + extendedForecastArray[i].humidity + "%</p>"

        fivedaysCon.appendChild(aDayEl);

    }
}

    var previousSearch = function () {
        recentlySearchArray = JSON.parse(localStorage.getItem("ForecastRecord"));

        if (recentlySearchArray) {
            recentsArray = JSON.parse(localStorage.getItem("ForecastRecord"));
            for (let i = 0; i < recentlySearchArray.length; i++) {
                var Recents = document.createElement('button');
        Recents.className = "searchBTN";
        Recents.setAttribute("city-info", recentlySearchArray[i])
        Recents.innerHTML = recentlySearchArray[i]
        recentSearchBtn.appendChild(Recents);
        recentSearch.removeAttribute("style")
            }
        }
    }

    var clickEvent = function (event) {
        var desiredCity = event.target.getAttribute("city-info");
        if (desiredCity) {
            forecastInfo(desiredCity);
        }
    }

    var deleteRecents = function (event) {
        localStorage.removeItem("ForecastRecord");
        recentSearch.setAttribute("style", "display: none");
    }

    citySearchEl.addEventListener("submit", formSubmissionHandler);
    recentSearchBtn.addEventListener("click", clickEvent);
    deletedEl.addEventListener("click", deleteRecents);

    previousSearch();


