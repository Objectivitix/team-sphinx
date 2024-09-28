import { DefaultEventsMap, Server } from "socket.io";

const pres_time = 2;

export class Game {
  host: string | null = null;
  pitcher: string | null = null;
  players: {
    name: string,
    score: number,
    id: string,
  }[] = [];
  pitch_order: string[] = [];
  state: "joining" | "preping" | "pitching" | "ending" = "joining";
  socket: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
  countdown: number = 0;

  constructor(socket: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
    this.socket = socket;
  }

  join(name: string, id: string) {
    if (this.players.some(player => player.name === name)) return;

    if (this.players.length === 0) {
      this.host = name;
    }

    this.players.push({ name, score: 0, id });
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
    this.countdown = pres_time * 60;
    this.state = "pitching"
    this.pitcher = this.pitch_order.pop() ?? null;
  }

  loop(dt: number) {
    this.socket.volatile.emit("info", {
      host: this.host, 
      players: this.players.map((player) => ({name: player.name})),
      state: this.state,
      pitcher: this.pitcher,
      countdown: this.countdown,
    })

    if (this.state === "joining") {
      return;
    }

    this.countdown = Math.max(this.countdown - dt, 0);
    
    if (this.pitch_order.length === 0) {
      this.state = "ending";
      this.socket.emit("scoreboard", [this.players.map((player) => ({name: player.name, score: player.score}))]);
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
