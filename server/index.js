const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIO(server);
const PORT = 3001;
io.origins('*:*');

io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);

  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`Client ${socket.id} joined room ${room}`);
  });

  socket.on('playVideo', (data) => {
    io.to(data.room).emit('playVideo', data);
  });

  socket.on('pauseVideo', (data) => {
    io.to(data.room).emit('pauseVideo', data);
  });

  socket.on('seekVideo', (data) => {
    io.to(data.room).emit('seekVideo', data);
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});