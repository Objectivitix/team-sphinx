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
  state: "joining" | "preping" | "pitching" | "voting" | "ending" = "joining";
  socket: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
  countdown: number = 60;

  constructor(socket: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
    this.socket = socket;
  }

  join(name: string, id: string) {
    if (this.players.some(player => player.name === name)) return;

    if (this.players.length === 0) {
      this.host = name;
    }

    this.players.push({ name, score: 0, id });

    console.log(this.players)
  }

  vote(voter: string, votee: string) {
    if (voter !== votee) {
      let found = this.players.find((player) => player.name === votee)

      if (found) {
        found.score += 1
      }
    }
  }

  update_counter(dt: number) {
    this.countdown = Math.max(this.countdown - (dt / 1000), 0);
    return this.countdown === 0;
  }

  reset(counter: number) {
    this.countdown = counter
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

    let complete = this.update_counter(dt)
     
    if (complete) {
      if (this.state === "voting") {
        this.state = "ending"
        this.socket.emit("scoreboard", this.players.map((player) => ({name: player.name, score: player.score})))
      }

      if (this.state === "preping" || this.state === "pitching") {
        const next_pitcher = this.pitch_order.pop();

        if (next_pitcher) {
          this.state = "pitching"
          this.reset(5)
          this.pitcher = next_pitcher
        } else {
          this.state = "voting"
          this.reset(10)
          this.pitcher = null
        }
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
