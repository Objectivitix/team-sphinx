import { useAppStateContext } from "./AppStateContext"

function Countdown() {
  const { countdown } = useAppStateContext()
  return countdown
}

export default Countdown
