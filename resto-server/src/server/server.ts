import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
const app = express();
const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected');
  console.log(socket.rooms)
  socket.emit("login")

  socket.on("new message", (data) => {
    io.emit("write message", data);
  })

  socket.on('new restaurant', (data) => {
    io.emit('send restaurant', data);
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
});
server.listen(3000, () => {});