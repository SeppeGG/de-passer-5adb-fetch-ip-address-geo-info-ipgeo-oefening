"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    document.querySelector('#ButtonRefresh').addEventListener('click', refresh);
}

async function fetchIp() {
    try{
        let data = await fetch("https://api.ipify.org/?format=json");
        let ip = await data.json();
        displayIp(ip);
    }
    catch(error){
        console.log("Fout bij het ophalen van de api ",error);
    }
}

function displayIp(ip){
    const container = document.querySelector("#IpContainer");
    container.innerHTML =' IP : ' + ip.ip;
}

async function fetchGeoIp(){
    try {
        let response = await fetch("https://ipinfo.io/195.130.157.67/geo");
        let data = await response.json();
        displayCity(data);
        displayRegion(data);
        displayCountry(data);
        displayLoc(data);
    }
    catch(error){
        console.log("Fout bij het ophalen van de api ",error);
    }
}

function displayCity(data){
    const container = document.querySelector("#CityContainer");
    container.innerHTML =' City : ' + data.city;
}
function displayRegion(data){
    const container = document.querySelector("#RegionContainer");
    container.innerHTML =' Region : ' +  data.region;
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
    fetchIp();
    fetchGeoIp();
}
