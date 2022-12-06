import { Restaurant } from "../Models/Restaurant";

function dropdownListener(select: HTMLSelectElement) {
    let restaurantDiv = document.createElement("div");
    document.body.appendChild(restaurantDiv);
    restaurantDiv.classList.add("restaurant");
    select.addEventListener("change", (event: any) => {
       console.log("b4 if");
        
        if (select.value == "Choose a restaurant") {
            console.log("Choose a restaurant");
            
            restaurantDiv.innerHTML = select.value;
        } else {
            console.log("else");
              restaurantDiv.innerHTML += "restao" + event.target.value;
              let test = select.options[select.selectedIndex].text;
                console.log(test);

        }
    })
}

export function renderDropdownComponent(elements: Restaurant[] ) : HTMLSelectElement{
    // make a dropdown menu with the list of restaurants
    let select = document.createElement("select");
    dropdownListener(select);
     document.body.appendChild(select);
     select.classList.add("select");
     select.innerHTML = "<option>Choose a restaurant</option>";
     // forEAch element (typeOf HTMLElement) in elements
        elements.forEach((element) => {
            // create an option
            let option = document.createElement("option");
            // add the option to the select
            select.appendChild(option);
            // set the option value to the element name
            option.innerHTML = element.name;
            option.value = `${element.position.lat};${element.position.lng}`;
            console.log(option.value);
            // if the option is selected,     dropdownListener(select);

            
        }
     )
        return select;

}

