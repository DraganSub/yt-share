const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  },
});
const PORT = 3001;


io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);

  socket.on('playVideo', (data) => {
    io.to(data.room).emit('playVideo', data);
  });

  socket.on('pauseVideo', (data) => {
    io.to(data.room).emit('pauseVideo', data);
  });

  socket.on('seekVideo', (data) => {
    io.to(data.room).emit('seekVideo', data);
  });
});
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});