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
const prep_time = 1;

io.on('connection', (socket) => {
  console.log("a user connected")

  socket.on("join", (player) => {
    if (game.state !== "joining") {
      return;
    }
    game.join(player.username, socket.id)
  })

  socket.on("start", () => {
    for (const player of game.players) {
      game.pitch_order.push(player.name)
    }

    game.reset(6);
    game.state = "preping";
  })

  socket.on("vote", (voted) => {
    const player = game.players.find(({name}) => name === voted)

    if (player) {
      player.score += 1;
    }
  })

  socket.on("disconnect", () => {
    const player = game.players.find((player) => player.id === socket.id)

    game.pitch_order = game.pitch_order.filter((name) => name !== player?.name)
    game.players = game.players.filter((player) => player.id !== socket.id)

    if (player?.name === game.host) {
      if (game.players.length > 0) {
        game.host = game.players[0].name
      } else {
        game.host = null
        game.state = "joining"
      }
    }
  })
})

server.listen(4000, () => {
  console.log("listening on port 4000")
})

game.start();
