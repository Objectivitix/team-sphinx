import { useNavigate } from 'react-router'
import { useAppStateContext } from './AppStateContext'
import Countdown from './Countdown'
import { useEffect } from 'react'

function Prep() {
  const { state, myPitch } = useAppStateContext()
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
        <p style={{fontSize: "1.5rem"}}>{myPitch?.pitch}</p>
        <p style={{
          marginTop: "-0.25rem",
          marginBottom: "0.75rem"
        }}>{myPitch?.modifiers.map((modifiers, i) => <>{modifiers} {(i < modifiers.length+1) ? " · " : ""}</>)}</p>
      </div>
    </>
  )
}

export default Prep
