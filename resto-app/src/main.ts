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



export {}