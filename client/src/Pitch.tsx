import { useNavigate } from 'react-router';
import { useAppStateContext } from './AppStateContext'
import Countdown from './Countdown'
import Draw from './Draw'

function Pitch() {
  const {pitcher, ourName, state} = useAppStateContext()

  const isPitching = pitcher === ourName;
  const pitchingPlayer = pitcher;

  const navigate = useNavigate()

  if (state !== "pitching") {
    navigate("/scoring")
  }

  return (
    <>
      <h1>{isPitching ? "PITCH IT!" : `${pitchingPlayer}'s pitch`}</h1>
      <Draw isPitching={isPitching} />
      <div><Countdown /> remaining</div>
    </>
  )
}

export default Pitch
