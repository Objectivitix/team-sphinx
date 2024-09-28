import express from 'express'
import { Server } from 'socket.io'
import http from 'http'
import { Game } from './game';
import cors from "cors";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  }
});

const game = new Game();

io.on('connection', (socket) => {
  console.log("a user connected")

  socket.on("join", (name) => {
    console.log(name, "joined")
    game.join(name)
  })
})

app.listen(3000, () => {
  console.log("hi")
})
