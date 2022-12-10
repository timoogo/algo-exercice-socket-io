import { User } from './Models/User';
import { renderRestaurantsComponents } from "./Components/ListOfRestaurantsComponent";
import { mockRestaurants } from "./mocks/mock-restaurants";
import { renderDropdownComponent } from "./Components/DropDownComponent";
import * as L from 'leaflet';
import {LatLng} from "leaflet";
import { io, Socket } from "socket.io-client";
import { showPopin } from "./Components/Popin";

let socket: Socket;
socket = io()

let myself: User = {
    name: undefined,
    position: {
        lat: 0,
        lng: 0,
    },
    inRoom: false,
    room: "",
    id: ""
}

let allUsers: User[] = [];

// SOCKETS STUFF


document.addEventListener("DOMContentLoaded", () => {
   
    renderRestaurantsComponents(mockRestaurants);
    renderDropdownComponent(mockRestaurants);
    showPopin(myself);

});
document.addEventListener("click", () => {
// client-side
    socket.on("connect", () => {
        console.log(socket.id);
    });

    socket.on("disconnect", () => {
        console.log(socket.id);
    });
});

document.querySelector('#form')!.addEventListener("submit", (event) => {
    event.preventDefault()
    let input = document.querySelector('#input') as HTMLInputElement;
    if (input.value) {
        socket.emit("new message", {message: input.value, id: socket.id, room: myself.room});
        input.value = "";
    }
})

socket.on("write message", (data) => {
    let chatDiv = document.createElement("li");
    chatDiv.className = "chat";
    let userSpan = document.createElement("span");
    userSpan.className = "user";
    userSpan.innerHTML = data.id;
    let message = document.createElement("p");
    message.className = "message";
    message.innerHTML = data.message;
    chatDiv.appendChild(userSpan);
    chatDiv.appendChild(message);
    let messages : HTMLUListElement = document.querySelector("#messages")!;
    messages.appendChild(chatDiv);
    messages.scrollTop = messages.scrollHeight;
})

socket.on("new user joined", (users: User[]) => {
    console.log("new user joined", myself)
    allUsers = users;
    console.log("my id", myself.id)
    generateUsersList(allUsers)
    usersMarkers[myself.id] = startMarker
    console.log(users);
})

socket.on("user disconnected", (data) => {
    console.log("disco")
    allUsers = data.users
    delete usersMarkers[data.removedId]
    placeAllMarkers(allUsers)
    generateUsersList(allUsers)
    console.log("user disconnected")
})

//END OF SOCKETS STUFF


// MAP STUFF

let map = L.map('map').locate({setView: true, maxZoom: 16});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// const usersMarkers : {[key: string]: L.Marker} = {};

let goal = L.marker([48.8263658,2.3690903], {
    draggable: true,
    title: "Draggable Goal",
    icon: L.icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    })
}).addTo(map);


let startMarker = L.marker([myself.position.lat!, myself.position.lng!]).addTo(map).bindPopup("This is your position");

map.locate({setView: true, maxZoom: 16});

setInterval(() => {
    map.locate();
}, 10000); // calcul toutes les 10 secs

map.on('locationfound', (e) => {
    myself.position.lat = e.latlng.lat;
    myself.position.lng = e.latlng.lng;
    startMarker.setLatLng([myself.position.lat, myself.position.lng]);

    createOrUpdateUserMarker(myself.position.lat, myself.position.lng, myself.id);

    if (goal) {
        calculateRoute(e.latlng, goal.getLatLng());
    }
})

goal.on('dragend', (e) => {
    calculateRoute(startMarker.getLatLng(), e.target.getLatLng());
    socket.emit("goal changed", {room: myself.room, latlng: e.target.getLatLng()});
    console.log("Goal moved to: " + e.target.getLatLng());
    console.log("Distance to goal: " + distance(startMarker.getLatLng(), e.target.getLatLng()));
    console.log("Travel time to goal: " + travelTime(distance(startMarker.getLatLng(), e.target.getLatLng()), 5));
})

socket.on("move goal", (data) => {
    goal.setLatLng(data);
    calculateRoute(startMarker.getLatLng(), data);
})

console.log(goal.getLatLng())

goal.bindPopup("Meetup point");

// let popup = L.popup()
//     .setLatLng([lat, 2.34])
//     .setContent("I am a standalone popup.")
//     .openOn(map);

const usersRestaurants: {[id: string]: L.Marker} = {};
const usersMarkers : {[id: string]: L.Marker} = {};

usersMarkers[myself.id] = startMarker
function createRestaurantMarker(pos: string, name:string, id: string) {
    let lat = parseFloat(pos.split(";")[0]);
    let long = parseFloat(pos.split(";")[1]);
    if (usersRestaurants[id]) {
        usersRestaurants[id].setLatLng([lat, long]);
    }else{
        //green marker or yellow marker
        usersRestaurants[id] = L.marker([lat, long], {
            icon: L.icon({
                iconUrl: id === socket.id ? 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png' : 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png',
            })
        }).bindPopup(`${name} <br> From : ${socket.id}`).addTo(map);
    }
}

function createOrUpdateUserMarker(lat: number, lng: number, id: string) {
    if (usersMarkers[id]) {
        usersMarkers[id].setLatLng([lat, lng]);
    }else{
        usersMarkers[id] = L.marker([lat, lng]).addTo(map);
    }
    socket.emit("user moved", {room: myself.room, latlng: {lat, lng}, id});
}

socket.on('move user', (data: User[]) => {
    allUsers = data
    console.log("move user", data)
    console.log("myslef", myself)
    placeAllMarkers(allUsers)
})

socket.on("send restaurant", (data) => {
    createRestaurantMarker(data.position, data.name, data.id);
})

function distance(pointA : LatLng, pointB : LatLng) : number {
    let p = Math.PI / 180;
    const cos = Math.cos;
    const arcCos = Math.acos;
    const sin = Math.sin;

    return 6371 * arcCos((sin(pointA.lat * p) * sin(pointB.lat * p)) + (cos(pointA.lat * p) * cos(pointB.lat * p) * cos(p * pointB.lng - p * pointA.lng)));
}

function calculateRoute(start : LatLng, goal : LatLng) : number {
    let distanceToGoal = distance(start, goal);
    let travelTimeToGoal = travelTime(distanceToGoal, 5);
    console.log("Distance to goal: " + distanceToGoal + "km");
    console.log("Travel time to goal: " + travelTimeToGoal + "hours");
    return travelTimeToGoal;
}

function placeAllMarkers(usersList: User[]) {
    usersList.forEach((user) => {
        if (usersMarkers[user.id]) {
            usersMarkers[user.id].setLatLng([user.position.lat, user.position.lng]);
        }else{
            usersMarkers[user.id] = L.marker([user.position.lat, user.position.lng]).addTo(map);
        }
    })
}

function travelTime(distance : number, speed: number) : number {
    return distance / speed;
}

function generateUsersList(users: User[]) {
    document.querySelector("#usersList")!.innerHTML = "";
    users.forEach((user) => {
        document.querySelector("#usersList")!.innerHTML += `<li>${user.name}</li>`;
    })
}
//END OF MAP STUFF

export { createRestaurantMarker, socket };