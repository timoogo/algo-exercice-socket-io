import express from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';
import {User} from "../Models/User";

const app = express();
const server = createServer(app);
const io = new Server(server);
const usersByRoom: { [roomId: string]: User[] } = {};

io.on('connection', (socket) => {
    socket.on("new user", (user: User) => {
        if (usersByRoom[user.room]) {
            usersByRoom[user.room].push(user);
        } else {
            usersByRoom[user.room] = [user];
        }
        socket.join(user.room);

        io.to(user.room).emit("new user joined", usersByRoom[user.room]);
    })

    socket.on("new message", (data) => {
        io.to(data.room).emit("write message", data);
    })

    socket.on('new restaurant', (data) => {
        io.to(data.room).emit('send restaurant', data);
    })

    socket.on('goal changed', (data) => {
        io.to(data.room).emit('move goal', data.latlng);
    })

    socket.on('user moved', (data) => {
        if (!usersByRoom[data.room]) return;
        usersByRoom[data.room].forEach((user) => {
            if (user.id === data.id) {
                user.position.lat = data.latlng.lat;
                user.position.lng = data.latlng.lng;
            }
        })
        io.to(data.room).emit('move user', usersByRoom[data.room]);
    })

    socket.on('disconnecting', () => {
        console.log("disconnecting")
        const room = Array.from(socket.rooms)[1]
        if (!room) return false
        const userIndex = usersByRoom[room]?.findIndex((obj) => obj.id === socket.id)
        console.log("user Index", userIndex)
        if (!userIndex) return false
        usersByRoom[room].splice(userIndex, 1)
        console.log("eeh")
        io.emit("user disconnected", {users: usersByRoom[room],  removedId: socket.id})
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
});
server.listen(3000, () => {
});