import { User } from './../Models/User';
import {socket} from "../main";

export function showPopin(user: User){
    const popin = document.querySelector("#popin") as HTMLElement;
    popin.style.display = "block";
    // when page is loaded, show popin
    createForm(user);
}

function createForm(user: User){
    const form = document.createElement("form");
    form.setAttribute("id", "userForm");
    const inputName = document.createElement("input");
    const inputRoomId = document.createElement("input");
    inputRoomId.setAttribute("type", "number");
    // step="1" min="0" max="100"
    inputRoomId.setAttribute("step", "1");
    inputRoomId.setAttribute("min", "0");
    inputRoomId.setAttribute("max", "100");
    inputRoomId.setAttribute("placeholder", "Enter room id");
    inputName.setAttribute("type", "text");
    inputName.setAttribute("placeholder", "Enter your name");
    inputName.setAttribute("value", user.name ? user.name : "");

    const saveUserButton = document.createElement("button");
    saveUserButton.setAttribute("type", "button");
    saveUserButton.setAttribute("id", "saveUser");
    saveUserButton.innerText = "Save";
    
    

    form.appendChild(inputName);
    form.appendChild(inputRoomId);
    form.appendChild(saveUserButton);
    // append form to popin
    appendFormToPopin(form);
    // add event listener to save saveUserButton
    saveUserButton.addEventListener("click", () => {
        saveUser(user);
    });
    return form;
}
function appendFormToPopin(form: HTMLFormElement){
    document.querySelector("#popin")?.prepend(form);
    
}
export function closePopin(){
    const popin = document.querySelector("#popin") as HTMLElement;
    popin.style.display = "none";
}
export function saveUser(user: User){
    const form = document.querySelector("#userForm") as HTMLFormElement;
    const inputName = form.querySelector("input[type=text]") as HTMLInputElement;
    const inputRoomId = form.querySelector("input[type=number]") as HTMLInputElement;
    const message = document.createElement("p");
    
    user.name = inputName.value;
    user.room = inputRoomId.value;
    user.id = socket.id;
    if (user.name && user.room){
        user.inRoom = true;
        message.innerText = "User saved";
        form.appendChild(message);
        socket.emit("new user", user);
        setTimeout(() => {
            closePopin();
        }, 1500);
  
    } else {
        message.innerText = "Please enter a name and a room id";
        form.appendChild(message);
    }
    console.log(user);
    // 
    return user;
    

}
