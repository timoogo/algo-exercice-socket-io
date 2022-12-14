import { Restaurant } from "../Models/Restaurant";
import {createRestaurantMarker, socket, myself} from "../main";

function dropdownListener(select: HTMLSelectElement) {
    let restaurantDiv = document.createElement("div");
    document.querySelector('#restaos')!.appendChild(restaurantDiv);
    restaurantDiv.classList.add("restaurant");
    select.addEventListener("change", (event: any) => {
        console.log("b4 if");
        
        if (select.value == "Choose a restaurant") {
            console.log("Choose a restaurant");
            restaurantDiv.innerHTML = select.value;
        } else {
            console.log("else");
            let restaurantName = select.options[select.selectedIndex].text;
            myself.myChoice = event.target.value;
            // my choice
            myself.myChoice = {
                name: restaurantName,
                address: restaurantName,
                position: {
                    lat: Number(event.target.value.split(";")[0]),
                    lng: Number(event.target.value.split(";")[1])
                }
            }

            createRestaurantMarker(event.target.value, myself.myChoice.name, socket.id, myself.name);
            socket.emit("new restaurant", {position: event.target.value, name: restaurantName, id: socket.id, username: myself.name, room: myself.room});
            console.log("myself.name", myself.myChoice.name);
            
        }
    })
}

export function renderDropdownComponent(elements: Restaurant[] ) : HTMLSelectElement{
    // make a dropdown menu with the list of restaurants
    let select = document.createElement("select");
    dropdownListener(select);
    document.querySelector('#restaos')!.appendChild(select);
    select.classList.add("select");
    select.innerHTML = "<option>Choose a restaurant</option>";
     // forEAch element (typeOf HTMLElement) in elements
        elements.forEach((element) => {
            // create an option
            let option = document.createElement("option");
            // add the option to the select
            select.appendChild(option);
            // set the option value to the element name
            option.innerHTML = element.name + ': ' + element.address;
            option.value = `${element.position.lat};${element.position.lng}`;
            console.log(option.value);
            // if the option is selected,     dropdownListener(select);

            
        })
        return select;
}

