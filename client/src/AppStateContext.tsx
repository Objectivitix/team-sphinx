import { createContext, MutableRefObject, RefObject, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

type AppStateType = {
  host: string | null;
  pitcher: string | null;
  players: {
    name: string,
    score: number,
  }[];
  state: "joining" | "preping" | "pitching" | "ending";
  countdown: number;
  ourName: string | null;
  setOurName: (name: string) => void;
  join: (name: string) => void;
  socket: MutableRefObject<Socket | undefined>;
}

const AppStateContext = createContext<AppStateType>({} as AppStateType);

export const useAppStateContext = () => useContext(AppStateContext)

export default function AppStateProvider(props: {children: React.ReactNode}) {
  const [host, setHost] = useState<AppStateType["host"]>(null)
  const [pitcher, setPitcher] = useState<AppStateType["pitcher"]>(null)
  const [players, setPlayers] = useState<AppStateType["players"]>([])
  const [state, setState] = useState<AppStateType["state"]>("joining")
  const [countdown, setCountDown] = useState<AppStateType["countdown"]>(60)
  const [ourName, setOurName] = useState<string | null>(null)

  const socketRef = useRef<Socket | undefined>(undefined);

  useEffect(() => {
    if (!socketRef.current) {
      const socket = io("http://localhost:4000", {
        withCredentials: true,
      });
      socketRef.current = socket;
    }

    socketRef.current.on("info", (info) => {
      setPlayers(info.players)
      setHost(info.host)
      setPitcher(info.pitcher)
      setState(info.state)
      setCountDown(info.countdown)
    })
  }, [])

  return (
    <AppStateContext.Provider
      value={{
        socket: socketRef,
        join: (name: string) => {
          socketRef.current?.emit("join", { username: name })
        },
        host,
        players,
        pitcher,
        countdown,
        state,
        setOurName,
        ourName
      }}
    >
    {props.children}
    </AppStateContext.Provider>
  )
}
