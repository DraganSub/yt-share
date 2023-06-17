const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: 'https://yt-share.vercel.app/',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('playVideo', (data) => {
    io.emit('playVideo', data);
  });

  socket.on('pauseVideo', (data) => {
    io.emit('pauseVideo', data);
  });

  socket.on('seekVideo', (data) => {
    io.emit('seekVideo', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start the server
server.listen(process.env.PORT || 3001, () => {
  console.log('Server is running on port', server.address().port);
});