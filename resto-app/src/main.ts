import { PositionComponent } from "./Components/PositionComponent";
import { renderRestaurantsComponents } from "./Components/ListOfRestaurantsComponent";
import { mockRestaurants } from "./mocks/mock-restaurants";
// const position = new PositionComponent(1.9, 2.19);
// const positionDiv = document.createElement("div");
// document.body.appendChild(positionDiv);
// positionDiv.classList.add("position");
// positionDiv.innerHTML = `lat: ${position.lat}, lng: ${position.lng}`;


document.addEventListener("DOMContentLoaded", () => {
    
    renderRestaurantsComponents(mockRestaurants);
});


import * as L from 'leaflet';

let lat : number = 51
    let long : number = 1

let lat2 = 51
let long2 = 0

let map = L.map('map').setView([lat, long], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let marker = L.marker([lat, long]).addTo(map);

let goal = L.marker([lat+0.1, long+0.1]).addTo(map);

let circle = L.circle([lat, 2.32], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);

marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");

let popup = L.popup()
    .setLatLng([lat, 2.34])
    .setContent("I am a standalone popup.")
    .openOn(map);


function distance(lat1: number, lon1: number, lat2: number, lon2: number) : number {
    let p = Math.PI / 180;
    const cos = Math.cos;
    const arcCos = Math.acos;
    const sin = Math.sin;

    return 6371 * arcCos(sin(lat1 * p) * sin(lat2 * p) + cos(lat1 * p) * cos(lat2 * p) * cos(p * (lon2 - lon1)));
}

console.log(distance(lat, long, lat2, long2))

export {}