import './App.css'
import Countdown from './Countdown'

function Scoring(props: {players: string[]}) {
  return (
    <>
      <h1>Scoring time</h1>
      <div>
        {props.players.map((player) => {
          return (
            <div>
              <label htmlFor={player}>{player}</label>
              <input type="text" id={player} />
            </div>
          )
        })}
      </div>
      <p>Scoring ends in <Countdown /></p>
    </>
  )
}

export default Scoring
