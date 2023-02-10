//Its a backend, start this and then open the html
const { Server } = require("socket.io");

//Node server which will hanlde socket.io
const io= require("socket.io")(8000, { //import socket.io
    cors: {
      origin: '*',
    }
  });

const users= {}; //make an object in which list of users will be contained

io.on("connection", socket=> { //this is to connect all user to one socket
    
    socket.on("new-user-joined", name=> { //this is the actions on new-user-joined
        users[socket.id]= name; //add user name to object
        socket.broadcast.emit("user-joined", name); //after join the some1 recieves message of joining
    });

    socket.on("send", message=> { //this is the actions on send
        socket.broadcast.emit("recieve", {message: message, name: users[socket.id]}); //after send then some1 recieves the message
    });

    socket.on("disconnect", message=> { //this is the actions on disconnect
        socket.broadcast.emit("leave", users[socket.id]); //after leaving some1 recieves the message of leaving
        delete users[socket.id]; //delete name from object as user leaves
    });
});

