import { useNavigate } from 'react-router'
import { useAppStateContext } from './AppStateContext'

function Rank() {
  const { host, state, scores, ourName } = useAppStateContext()
 
  const isHost = host === ourName
  const navigate = useNavigate()

  if (state !== "ending") {
    navigate("/lobby")
  }

  return (
    <>
      <h1>Final ranking</h1>
      <ol>
        {scores.map(({name, score}) => {
          return (
            <li key={name}>{name} at {score} points</li>
          )
        })}
      </ol>
      {isHost ? <button>Play Again</button> : ""}
    </>
  )
}

export default Rank
