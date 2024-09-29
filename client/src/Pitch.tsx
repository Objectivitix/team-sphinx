import { useNavigate } from 'react-router';
import { useAppStateContext } from './AppStateContext'
import Countdown from './Countdown'
import Draw from './Draw'
import { useEffect } from 'react';

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
      <h1>{isPitching ? "PITCH IT!" : `${pitchingPlayer}'s pitch`}</h1>
      <div><Countdown /> remaining</div>
      <Draw isPitching={isPitching} />
    </>
  )
}

export default Pitch
