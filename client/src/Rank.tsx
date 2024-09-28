import { useNavigate } from 'react-router'
import { useAppStateContext } from './AppStateContext'
import { useEffect } from 'react'

function Rank() {
  const { host, state, scores, ourName } = useAppStateContext()
 
  const isHost = host === ourName
  const navigate = useNavigate()

  useEffect(() => {
    if (state !== "ending") {
      navigate("/lobby")
    }
  }, [])

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
      {isHost ? <button onClick={() => {
        navigate("/lobby")
      }}>Play Again</button> : ""}
    </>
  )
}

export default Rank
