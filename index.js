"use strict";
const temp = document.getElementById('temp');
const date = document.getElementById("date-time");
const currentLocation = document.querySelector(".location-text .location");
const condition = document.getElementById('condition');
const rain = document.getElementById('rain');
const mainIcon = document.getElementById('icon');
const uvIndex = document.querySelector('.uv-index');
const uvText = document.querySelector('.uv-text');
const winSpeed = document.querySelector('.wind-speed');
const sunSet = document.querySelector('.sun-set');
const humidity = document.querySelector('.humidity');
const humidityStatus = document.querySelector('.humidity-status');
const airQuality = document.querySelector('.air-quality');
const airQualityStatus = document.querySelector('.air-quality-status');
const visibility = document.querySelector('.visibility');
const visibilityStatus = document.querySelector('.visibility-status');
let current = "";
let currentUnit = "C";
let hourlyorWeek = "Week";
function getDateTime() {
    const now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    const days = [
        "Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"
    ];
    hour = hour % 12 || 12;
    if (hour < 10)
        hour = "0" + hour;
    if (minute < 10)
        minute = "0" + minute;
    const dayString = days[now.getDay()];
    return `${dayString}, ${hour}:${minute}`;
}
;
date.innerHTML = getDateTime();
setInterval(() => {
    date.innerText = getDateTime();
}, 1000);
function getPublicIp() {
    fetch("https://geolocation-db.com/json/", {
        method: "GET"
    })
        .then((response) => response.json())
        .then((data) => {
        const city = data.city;
        getWeatherData(city, currentUnit, hourlyorWeek);
    })
        .catch(console.error);
}
getPublicIp();
function getWeatherData(city, unit, period) {
    const apiKey = "SS7ZZ2UZBEBEU7CTVYYQGQP4G";
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json`)
        .then((response) => response.json())
        .then((data) => {
        const today = data.currentConditions;
        const tempValue = unit === 'C'
            ? today.temp
            : celciusToFahrenheit(today.temp);
        temp.innerText = String(tempValue);
        currentLocation.innerText = data.resolvedAddress;
        condition.innerText = today.conditions;
        rain.innerText = "Perc - " + today.precip + "%";
        uvIndex.innerText = String(today.uvindex);
        winSpeed.innerText = String(today.windspeed);
        humidity.innerText = String(today.humidity) + "%";
        visibility.innerText = String(today.visibility);
        airQuality.innerText = String(today.winddir);
    })
        .catch(console.error);
}
function celciusToFahrenheit(temp) {
    return +(temp * 9 / 5 + 32).toFixed(1);
}
