import { useNavigate } from 'react-router'
import Countdown from './Countdown'
import { useAppStateContext } from './AppStateContext'
import { useState } from 'react'

function Scoring() {
  const { state, players, socket } = useAppStateContext()

  const navigate = useNavigate()
  const [voted, setVoted] = useState<string | null>(null);

  if (state === "ending") {
    socket.current?.emit("vote", voted)
    navigate("/ending")
  }

  return (
    <>
      <h1>Scoring time</h1>
      <div>
        {players.map((player) => {
          return (
            <div>
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
