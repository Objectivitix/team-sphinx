import { useNavigate } from 'react-router'
import { useAppStateContext } from './AppStateContext'
import Countdown from './Countdown'
import { useEffect } from 'react'

function Prep() {
  const { state } = useAppStateContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (state === "pitching") {
      navigate('/pitch')
    }
  }, [state])

  return (
    <>
      <div style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}>
        <h1>PREP - YOUR - PITCH!</h1>
        <p><Countdown /> remaining</p>
      </div>
    </>
  )
}

export default Prep
