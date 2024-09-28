import { useNavigate } from 'react-router'
import Countdown from './Countdown'
import { useAppStateContext } from './AppStateContext'

function Scoring() {
  const { state, players } = useAppStateContext()

  const navigate = useNavigate()

  if (state !== "voting") {
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
              <input type="text" id={player.name} />
            </div>
          )
        })}
      </div>
      <p>Scoring ends in <Countdown /></p>
    </>
  )
}

export default Scoring
