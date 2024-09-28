import './App.css'
import Countdown from './Countdown'
import Draw from './Draw'

function Pitch(props: {isPitching: boolean, pitchingPlayer: string}) {
  return (
    <>
      <h1>{props.isPitching ? "PITCH IT!" : `${props.pitchingPlayer}'s pitch`}</h1>
      <Draw isPitching={props.isPitching} />
      <div><Countdown /> remaining</div>
    </>
  )
}

export default Pitch
