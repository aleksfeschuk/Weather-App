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
const humidity = document.querySelector('humidity') as HTMLElement;
const humidityStatus = document.querySelector('.humidity-status') as HTMLElement;
const airQuality = document.querySelector('.air-quality') as HTMLElement;
const airQualityStatus = document.querySelector('.air-quality-status') as HTMLElement;
const visibility = document.querySelector('.visibility') as HTMLElement;
const visibilityStatus = document.querySelector('.visibility-status') as HTMLElement;

let current = "";
let currentUnit: "C" | "F" = "C";
let hourlyorWeek: "Hourly" | "Week" = "Week";
