import { count } from "console";
import { DefaultEventsMap, Server } from "socket.io";

export class Game {
  host: string | null = null;
  pitcher: string | null = null;
  players: {
    name: string,
    score: number,
  }[] = [];
  pitch_order: string[] = [];
  state: "joining" | "preping" | "pitching" | "ending" = "joining";
  socket: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
  countdown: number = 0;

  constructor(socket: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
    this.socket = socket;
  }

  join(name: string) {
    if (this.players.some(player => player.name === name)) return;

    if (this.players.length === 0) {
      this.host = name;
    }

    this.players.push({name, score: 0});
  }

  vote(voter: string, votee: string) {
    if (voter !== votee) {
      let found = this.players.find((player) => player.name === votee)

      if (found) {
        found.score += 1
      }
    }
  }

  next_pitch() {
    this.state = "pitching"
    this.pitcher = this.pitch_order.pop() ?? null;
  }

  loop(dt: number) {
    this.socket.volatile.emit("info", {
      host: this.host, 
      players: this.players,
      state: this.state,
      pitcher: this.pitcher,
    })

    if (this.state === "joining") {
      return;
    }

    this.countdown -= dt;
    if (this.countdown < 0) this.countdown = 0;
    
    if (this.pitch_order.length === 0) {
      this.state = "ending"; // broadcast end screen
    }

    if (this.countdown == 0) {
      if (this.state === "preping") {
        this.next_pitch()
      }
      
      if (this.state === "pitching") {
        this.next_pitch()
      }
    }
  }

  start() {
    let last_time = Date.now();

    setInterval(() => {
      const time = Date.now();
      const dt = time - last_time;
      last_time = time;

      this.loop(dt);
    }, 1000/30)
  }
}
