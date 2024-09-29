import { useNavigate } from 'react-router'
import Countdown from './Countdown'
import { useAppStateContext } from './AppStateContext'
import { useState, useEffect } from 'react'

function Scoring() {
  const { state, players, socket, ourName } = useAppStateContext()

  const navigate = useNavigate()
  const [voted, setVoted] = useState<string | null>(null);

  useEffect(() => {
    if (state === "ending") {
      socket.current?.emit("vote", voted)
      setTimeout(() => navigate("/ending"), 300);
    }
  }, [state])

  return (
    <>
      <h1>Scoring time</h1>
      <div>
        {players.map((player) => {
          return (
            <div key={player.name}>
              <label htmlFor={player.name}>{player.name}</label>
              <input type="radio" name='rating' onClick={() => {
                setVoted(player.name)
              }} id={player.name} />
            </div>
          )
        })}
      </div>
      <p>Scoring ends in <Countdown /></p>
    </>
  )
}

export default Scoring
