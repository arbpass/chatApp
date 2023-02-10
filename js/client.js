const socket= io("http://localhost:8000"); //connect variable socket with server

const form= document.getElementById("send-container");
const messageInput= document.getElementById("messageInp");
const messageConatiner= document.querySelector(".container");
const messageConatiner2= document.querySelector(".container2");


const name= prompt("Enter your name to join: ");

const append= (message, position)=> { //append is a function to add the new elements on the screen, call it with 2 arguments
    const messageElement= document.createElement("div"); //create a div and then we will add this div to messageContainer
    messageElement.innerText= message;
    messageElement.classList.add("message"); //add message class to it, so it can get style from css
    messageElement.classList.add(position);  //add left/right class to it, so it can get style from css
    messageConatiner.append(messageElement); //add this to container
}
const logs= (message)=> { //logs is a function to add new elements in container2
    const messageElement= document.createElement("div"); 
    messageElement.innerText= message + "\n---";
    messageElement.classList.add("logsMessage"); //add message class to it, so it can get style from css
    messageConatiner2.append(messageElement); //add this to container
}

form.addEventListener("submit", (e)=> {
    e.preventDefault(); //when u hit send button then it wont reload
    const message= messageInput.value; //text inside the bar 
    append(`${message}`, "right"); //call append with message, position to add it on screen
    socket.emit("send", message); //this will auto connect with socket.on("send"), now pass the arguments
    messageInput.value= ""; //after hitting send button, text bar should become empty
});

socket.emit("new-user-joined", name); //this will auto connect with socket.on("new-user-joined"), now pass the arguments

socket.on("user-joined", name=> {     //this will auto connect with socket.emit("user-joined"), now pass the arguments
    append(`${name} joined the chat`, "right"); //when u called user-joined then perform these actions
    logs(`${name} JOINED`);
});

socket.on("recieve", data=> {         //this will auto connect with socket.emit("recieve"), now pass the arguments
    append(`${data.name}: ${data.message}`, "left"); //perform these actions upon calling recieve
});

socket.on("leave", name=> {           //this will auto connect with socket.emit("leave"), now pass the arguments
    append(`${name} left the chat`, "left");
    logs(`${name} LEFT`);
});