import { useNavigate } from 'react-router';
import { useAppStateContext } from './AppStateContext';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

function Lobby() {
  const { players, host, ourName, socket, state } = useAppStateContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (state === "preping") {
      navigate("/prep")
    }
  }, [state])

  if (players.length === 0) {
    return <>No Players</>
  }

  return (
    <>
      <Navbar></Navbar>
      <div style={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "24rem 1fr",
        gap: "1rem",
        boxSizing: "border-box",
        padding: "1rem",
        overflow: "hidden"
      }}>
        <div style={{
          background: "rgb(230, 230, 230)",
          borderRadius: "16px",
          height: "24rem",
          boxSizing: "border-box",
          padding: "1rem",
        }}>
          <h1 style={{
            marginBottom: ".75rem",
          }}>Welcome To The Lobby</h1>
          <div>
            {players.map((player) => {
              return <div style={{
                backgroundColor: "white",
                borderRadius: "0.5rem",
                padding: "0.5rem",
                boxSizing: "border-box",
                fontWeight: player.name == ourName ? "bold" : "regular",
              }} key={player.name}>{player.name} {player.name === host ? "👑" : ""}</div>;
            })}
          </div>
          {host === ourName
          ? <motion.button  
            whileHover={{
              backgroundColor: "rgb(40, 240, 160)"
            }}
            style={{
              marginTop: ".75rem",
              borderRadius: "0.5rem",
              padding: "0.5rem",
              border: "0",
              backgroundColor: "rgb(30, 230, 150)"
            }} onClick={() => {
              socket.current?.emit("start")
          }}>Start Game</motion.button>
          : <p>Waiting for host to start game...</p>}
        </div>
        <div style={{
          background: "rgb(230, 230, 230)",
          borderRadius: "16px",
          height: "24rem",
          boxSizing: "border-box",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.0rem",
        }}>
          {[
            { name: "prep time", value: "60" },
            { name: "pres time", value: "120" },
            { name: "vote time", value: "20" },
          ].map(({name, value}) => {
            return <div
            style={{
              display: "flex",
              gap: "0.5rem",
              alignItems: "center"
            }}>
              <p style={{
                flexGrow: "1",
                fontSize: "1.5rem",
                margin: 0,
              }}>{name}:</p>
              <input key={name} defaultValue={value} style={{
                border: "0.125rem solid black",
                textAlign: "center",
                fontSize: "1rem",
                flexGrow: "1",
                height: "2rem",
                borderRadius: ".5rem"
              }} type="number"></input>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default Lobby
