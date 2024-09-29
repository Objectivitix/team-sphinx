import { useAppStateContext } from "./AppStateContext"

function Countdown() {
  const { countdown } = useAppStateContext()
  return `${countdown.toFixed(1)} s`
}

export default Countdown
