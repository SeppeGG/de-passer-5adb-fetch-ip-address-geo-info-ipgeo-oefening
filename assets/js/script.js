"use strict";

document.addEventListener("DOMContentLoaded", init);
let city = "";
let region ="";
function init() {
    document.querySelector('#ButtonRefresh').addEventListener('click', refresh);
}


function displayIp(data){
    const container = document.querySelector("#IpContainer");
    container.innerHTML =' IP : ' + data.ip;
}

async function fetchGeoIp(){
    try {
        let response = await fetch("https://ipinfo.io//geo");
        let data = await response.json();
        displayIp(data);
        displayCity(data);
        displayRegion(data);
        displayCountry(data);
        displayLoc(data);
        fetchLtude(data.city, data.region);
    }
    catch(error){
        console.log("Fout bij het ophalen van de api ",error);
    }
}

function displayCity(data){
    const container = document.querySelector("#CityContainer");
    container.innerHTML =' City : ' + data.city;
    city = data.city;
}
function displayRegion(data){
    const container = document.querySelector("#RegionContainer");
    container.innerHTML =' Region : ' +  data.region;
    region = data.region;
}
function displayCountry(data){
    const container = document.querySelector("#CountryContainer");
    container.innerHTML =' Country : ' +   data.country;
}

function displayLoc(data){
    const container = document.querySelector("#LocContainer");
    container.innerHTML =' Coordinates : ' +   data.loc;
}

function refresh() {
    fetchGeoIp();

}

async function fetchLtude(city, region){
    try {
        let response = await fetch(`https://nominatim.openstreetmap.org/search?q={${city},${region}}&format=json`);
        let data = await response.json();
        displayLatitude(data[0]);
        displayLongitude(data[0]);
        fetchWheather(data[0].latitude, data[0].longitude);
    }
    catch(error){
        console.log("Fout bij het ophalen van de api ",error);
    }

}
function displayLatitude(data){
    const container = document.querySelector("#LatitudeContainer");
    container.innerHTML =' Latitude : ' + data.lat;
}
function displayLongitude(data){
    const container = document.querySelector("#LongitudeContainer");
    container.innerHTML =' Longitude : ' + data.lon;
}

async function fetchWheather(latitude, longitude){
    let response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,rain&forecast_days=1`);
    let data = await response.json();
    displaytemperature(data);
    displayWindSpeed(data);
    displayRain(data);

}

function displaytemperature(data){
    const container = document.querySelector("#TemperatureContainer");
    container.innerHTML = 'Temperature : ' + data.current.temperature_2m;
}