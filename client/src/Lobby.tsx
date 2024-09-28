import { useNavigate } from 'react-router';
import { useAppStateContext } from './AppStateContext';
import { useEffect } from 'react';

function Lobby() {
  const { players, host, ourName, socket, state } = useAppStateContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (state !== "joining") {
      navigate("/prep")
    }
  }, [state])

  if (players.length === 0) {
    return <>No Players</>
  }

  return (
    <>
      <h1>Welcome To The Lobby</h1>
      <ul>
        {players.map((player) => {
          return <li style={{
            fontWeight: player.name == ourName ? "bold" : "regular",
          }} key={player.name}>{player.name} {player.name === host ? "👑" : ""}</li>;
        })}
      </ul>
      {host === ourName
      ? <button onClick={() => {
        socket.current?.emit("start")
      }}>Start Game</button>
      : <p>Waiting for host to start game...</p>}
    </>
  )
}

export default Lobby
