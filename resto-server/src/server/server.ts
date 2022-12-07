import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
const app = express();
const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on("new message", (data) => {
    socket.emit("write message", data);
  })
});
server.listen(3000, () => {});

// server-side
io.on("connection", (socket) => {
  console.log(socket.id);
});



