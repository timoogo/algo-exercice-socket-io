import { Restaurant } from './../Models/Restaurant';
import { ConvertStringToHTMLAchor} from './utils/ConvertStringToHTMLAchor';
export function renderRestaurantsComponents(restaurants: Restaurant[]){
    const restaurantsDiv = document.createElement("div");
    document.body.appendChild(restaurantsDiv);
    restaurantsDiv.classList.add("restaurants");
    restaurantsDiv.innerHTML = "<h2>Restaurants</h2>";
    restaurants.forEach((restaurant) => {
        const restaurantDiv = document.createElement("div");
        restaurantsDiv.appendChild(restaurantDiv);
        restaurantDiv.classList.add("restaurant");
        restaurantDiv.innerHTML = `
            <h2>${restaurant.name}</h2>
            <p>${restaurant.address}</p>
            <p>lat: ${restaurant.position.lat}, lng: ${restaurant.position.lng}</p>
        `;
    }
        
        


    
    )
}
