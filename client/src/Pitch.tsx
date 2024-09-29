import { useNavigate } from 'react-router';
import { useAppStateContext } from './AppStateContext'
import Countdown from './Countdown'
import Draw from './Draw'
import { useEffect } from 'react';
import Navbar from './Navbar';

function Pitch() {
  const {pitch, ourName, state} = useAppStateContext()

  const isPitching = pitch?.name === ourName;
  const pitchingPlayer = pitch?.name ?? null;

  const navigate = useNavigate()

  useEffect(() => {
    if (state === "voting") {
      navigate("/scoring")
    }
  }, [state])

  return (
    <>
      <div style={{
        position: "absolute",
        scale: 1.5,
        opacity: 0.6,
        zIndex: "-1",
        top: "calc(50% + 3.5rem)",
        left: "50%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none"
      }}>
        <Navbar></Navbar>
      </div>
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "calc(100vh)"
      }}>
        <h1 style={{
          marginBottom: "0.75rem",
          fontSize: "3rem"
        }}>{isPitching ? "PITCH IT!" : `${pitchingPlayer}'s pitch`}</h1>
        <div style={{
          marginBottom: "0.25rem"
        }}><Countdown /> remaining</div>
        <p style={{fontSize: "1.5rem"}}>{pitch?.pitch}</p>
        <p style={{
          marginTop: "-0.25rem",
          marginBottom: "0.75rem"
        }}>{pitch?.modifiers.map((modifiers, i) => <>{modifiers} {(i < modifiers.length+1) ? " · " : ""}</>)}</p>
        <Draw isPitching={isPitching} />
      </div>
    </>
  )
}

export default Pitch
