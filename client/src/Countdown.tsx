import { useAppStateContext } from "./AppStateContext"

function Countdown() {
  const { countdown } = useAppStateContext()
  return Math.floor(countdown * 1000) / 1000
}

export default Countdown
