import './App.css'

function Lobby(props: {host: boolean, players: string[]}) {
  return (
    <>
      <h1>{props.host ? "You're host!" : ""} The other players are</h1>
      <ul>
        {props.players.map((player) => {
          return <li key={player}>{player}</li>;
        })}
      </ul>
      {props.host
      ? <button>Start Game</button>
      : <p>Waiting for host to start game...</p>}
    </>
  )
}

export default Lobby
