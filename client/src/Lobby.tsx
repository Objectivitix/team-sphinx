import { useEffect, useState } from 'react'

function Lobby() {
  const [host, setHost] = useState<string | undefined>(undefined)
  const [players, setPlayers] = useState<{
    name: string,
    score: number,
  }[]>([])

  useEffect(() => {
     
  }, [])

  return (
    <>
      <h1>{host ? "You're host!" : ""} The other players are</h1>
      <ul>
        {players.map((player) => {
          return <li key={player.name}>{player.name} {player.name === host ? "👑" : ""}</li>;
        })}
      </ul>
      {host
      ? <button>Start Game</button>
      : <p>Waiting for host to start game...</p>}
    </>
  )
}

export default Lobby
