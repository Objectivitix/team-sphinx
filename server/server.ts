import express from 'express'
import { Server } from 'socket.io'
import http from 'http'
import { Game } from './game';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  allowEIO3: true,
  cors: {
    methods: ['GET', 'POST'],
    origin: "http://localhost:5173",
    credentials: true,
  }
});

const game = new Game(io);

io.on('connection', (socket) => {
  console.log("a user connected")

  socket.on("join", (player) => {
    game.join(player.username)
  })
})

server.listen(4000, () => {
  console.log("listening on port 4000")
})
