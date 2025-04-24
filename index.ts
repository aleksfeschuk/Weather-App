const temp = document.getElementById('temp') as HTMLElement;
const date = document.getElementById("date-time") as HTMLElement;
const currentLocation = document.querySelector(".location-text .location") as HTMLElement;
const condition = document.getElementById('condition') as HTMLElement;
const rain = document.getElementById('rain') as HTMLElement;
const mainIcon = document.getElementById('icon') as HTMLImageElement;

const uvIndex = document.querySelector('.uv-index') as HTMLElement;
const uvText = document.querySelector('.uv-text') as HTMLElement;
const winSpeed = document.querySelector('.wind-speed') as HTMLElement;
const sunSet = document.querySelector('.sun-set') as HTMLElement;
const humidity = document.querySelector('.humidity') as HTMLElement;
const humidityStatus = document.querySelector('.humidity-status') as HTMLElement;
const airQuality = document.querySelector('.air-quality') as HTMLElement;
const airQualityStatus = document.querySelector('.air-quality-status') as HTMLElement;
const visibility = document.querySelector('.visibility') as HTMLElement;
const visibilityStatus = document.querySelector('.visibility-status') as HTMLElement;

let current = "";
let currentUnit: "C" | "F" = "C";
let hourlyorWeek: "Hourly" | "Week" = "Week";


function getDateTime():string {
    const now = new Date();
    let hour: number | string = now.getHours();
    let minute: number | string = now.getMinutes();

    const days = [
        "Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"
    ];

    hour = hour % 12 || 12;
    if (hour < 10) hour = "0" + hour;
    if (minute < 10) minute = "0" + minute;

    const dayString = days[now.getDay()];
    return `${dayString}, ${hour}:${minute}`;
};

date.innerHTML = getDateTime();

setInterval(() => {
    date.innerText = getDateTime();
}, 1000); 

function getPublicIp(): void {
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

function getWeatherData(city: string, unit: "C" | "F", period: "Hourly" | "Week"): void {
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

function celciusToFahrenheit(temp: number): number {
    return +(temp * 9 / 5 + 32).toFixed(1);
}