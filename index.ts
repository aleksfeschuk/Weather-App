const temp: HTMLElement | null = document.getElementById('temp');
const date: HTMLElement | null = document.getElementById("date-time");
const currentLocation: HTMLElement | null = document.getElementById("location");
const condition: HTMLElement | null = document.getElementById("condition");
const rain: HTMLElement | null = document.getElementById("rain");
const mainIcon: HTMLImageElement | null = document.getElementById("icon") as HTMLImageElement;
const uvIndex: HTMLElement | null = document.querySelector('.uv-index');
const uvText: HTMLElement | null = document.querySelector('.uv-text');
const windSpeed: HTMLElement | null = document.querySelector('.wind-speed');
const sunRise: HTMLElement | null = document.querySelector('.sun-rise');
const sunSet: HTMLElement | null = document.querySelector('.sun-set');
const humidity: HTMLElement | null = document.querySelector('.humidity');
const visibility: HTMLElement | null = document.querySelector('.visibility');
const humidityStatus: HTMLElement | null = document.querySelector('.humidity-status');
const airQuality: HTMLElement | null = document.querySelector('.air-quality');
const airQualityStatus: HTMLElement | null = document.querySelector('.air-quality-status');
const visibilityStatus: HTMLElement | null = document.querySelector('.visibility-status');
const weatherCards: HTMLElement | null = document.querySelector(".weather-cards");
const celciusBtn: HTMLElement | null = document.querySelector(".celcius");
const fahrenheitBtn: HTMLElement | null = document.querySelector(".fahrenheit");
const hourlyBtn: HTMLElement | null = document.querySelector(".hourly");
const weekBtn: HTMLElement | null = document.querySelector(".week");
const tempUnit: NodeListOf<HTMLElement> = document.querySelectorAll(".temp-unit");
const searchForm: HTMLFormElement | null = document.querySelector("#search");
const search: HTMLInputElement | null = document.querySelector("#query");



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