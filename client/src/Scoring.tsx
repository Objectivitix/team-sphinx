import { useNavigate } from 'react-router'
import Countdown from './Countdown'
import { useAppStateContext } from './AppStateContext'
import { useState, useEffect, useRef } from 'react'

function Scoring() {
  const { state, players, socket, countdown } = useAppStateContext()

  const navigate = useNavigate()
  const [voted, setVoted] = useState<string | null>(null);
  const savedRef = useRef(false);

  useEffect(() => {
    if (state !== "ending" && countdown < 0.1 && !savedRef.current) {
      socket.current?.emit("vote", voted)
      savedRef.current = true;
    }

    if (state === "ending") {
      navigate("/ending")
    }
  })

  return (
    <div style={{
      width: "100%",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    }}>
      <div style={{
        width: "20rem",
        border: "0.125rem solid black",
        padding: "1rem",
        borderRadius: "0.5rem"
      }}>
        <h1 style={{
          fontSize: "3rem",
        }}>Scoring time</h1>
        <p style={{ fontSize: "1.25rem", marginBottom: "0.75rem", marginTop: "-0.125rem" }}>Scoring ends in <Countdown /></p>
        <div style={{
          display: "flex"
        }}>
          {players.map((player) => {
            return (
              <div style={{
                border: "0.125rem solid black",
                padding: "0.5rem",
                borderRadius: "0.5rem",
                textAlign: "center",
              }} key={player.name}>
                <label htmlFor={player.name}>{player.name}</label>
                <input type="radio" name='rating' onClick={() => {
                  setVoted(player.name)
                }} id={player.name} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Scoring
