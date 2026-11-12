console.log("Shaaz Weather is working");
let cityInput = document.getElementById("cityInput");

let searchBtn = document.getElementById("searchBtn");

let cityName = document.getElementById("cityName");

let temperature = document.getElementById("temperature")

let wind  = document.getElementById("wind")

let description = document.getElementById("description")

let weatherIcon = document.getElementById("weatherIcon")

let humidity = document.getElementById("humidity")

searchBtn.addEventListener("click" , function(){
    let city = cityInput.value.trim();

    console.log(city);
if (city ==="") {
    alert("please enter a city name!");

   } else{
     console.log(city);



fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`)
.then(response => response.json())

.then(data => {
    if (!data.results) {
        console.log("City not found");
    } else {
        let latitude = data.results[0].latitude;
        let longitude = data.results[0].longitude;

        console.log(latitude);
        console.log(longitude);


fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`)
.then(response => response.json())
.then(weather => {
    console.log(weather.current);

    let weatherCode = weather.current.weather_code;
    console.log(weatherCode);

    let weatherDescription;
    

    let icon;

    if (weatherCode === 0) {
    icon = "☀️";
    } else if (weatherCode === 1 || weatherCode === 2) {
    icon = "🌤️";
    } else if (weatherCode === 3) {
    icon = "☁️";
    } else if (weatherCode >= 45 && weatherCode <= 48) {
    icon = "🌫️";
    } else if (weatherCode >= 51 && weatherCode <= 67) {
    icon = "🌧️";
    } else if (weatherCode >= 71 && weatherCode <= 86) {
    icon = "❄️";
    } else if (weatherCode >= 80 && weatherCode <= 82) {
    icon = "🌦️";
    } else if (weatherCode >= 95) {
    icon = "⛈️";
    } else {
    icon = "🌡️";
}

    if (weatherCode === 0) {
    weatherDescription = "Clear sky";
    } else if (weatherCode === 1) {
    weatherDescription = "Mainly clear";
    } else if (weatherCode === 2) {
    weatherDescription = "Partly cloudy";
    } else if (weatherCode === 3) {
    weatherDescription = "Overcast";
    } else if (weatherCode === 45 || weatherCode === 48) {
    weatherDescription = "Foggy";
    } else if (weatherCode >= 51 && weatherCode <= 67) {
    weatherDescription = "Rainy";
    } else if (weatherCode >= 71 && weatherCode <= 77) {
    weatherDescription = "Snowy";
    } else if (weatherCode >= 80 && weatherCode <= 82) {
    weatherDescription = "Rain showers";
    } else if (weatherCode >= 95 && weatherCode <= 99) {
    weatherDescription = "Thunderstorm";
    } else {
    weatherDescription = "Unknown weather";

}
    

    temperature.textContent = weather.current.temperature_2m +"°C";
    humidity.textContent = "Humidity:" +
weather.current.relative_humidity_2m + "%";
   
    wind.textContent = "wind speed:" +
weather . current.wind_speed_10m + "km/h";

    cityName.textContent = city;
    description.textContent = weatherDescription
    weatherIcon.textContent = icon;
});  
    }
});




}   
});