import { createContext, useState } from "react";

type AppStateType = {
  players: {
    name: string,
    score: number,
  }[],
  host: string | undefined,
}

const AppState = createContext<AppStateType>({} as AppStateType);

export default function AppStateProvider() {
  const [host, setHost] = useState<AppStateType["host"]>(undefined)
  const [players, setPlayers] = useState<AppStateType["players"]>([])

  return (
    <AppState.Provider
      value={{
        host,
        players
      }}
    ></AppState.Provider>
  )
}
