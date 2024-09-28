export class Game {
  host: string | null = null;
  players: {
    name: string,
    score: number,
  }[] = [];
  state: "joining" | "preping" | "pitching" = "joining";

  join(name: string) {
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
}
