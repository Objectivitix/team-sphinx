import { useNavigate } from 'react-router';
import { useAppStateContext } from './AppStateContext'
import Countdown from './Countdown'
import Draw from './Draw'
import { useEffect } from 'react';
import Navbar from './Navbar';

function Pitch() {
  const {pitcher, ourName, state} = useAppStateContext()

  const isPitching = pitcher === ourName;
  const pitchingPlayer = pitcher;

  const navigate = useNavigate()

  useEffect(() => {
    if (state === "voting") {
      navigate("/scoring")
    }
  }, [state])

  return (
    <>
      <Navbar></Navbar>
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}>
        <h1 style={{
          marginBottom: "0.25rem"
        }}>{isPitching ? "PITCH IT!" : `${pitchingPlayer}'s pitch`}</h1>
        <div style={{
          marginBottom: "0.75rem"
        }}><Countdown /> remaining</div>
        <Draw isPitching={isPitching} />
      </div>
    </>
  )
}

export default Pitch
