import { createContext, MutableRefObject, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

type Pitch = { name: string, pitch: string, modifiers: string[] };

type AppStateType = {
  host: string | null;
  pitch: Pitch | null;
  myPitch: Pitch | null;
  players: {
    name: string,
  }[];
  state: "joining" | "preping" | "pitching" | "voting" | "ending";
  countdown: number;
  ourName: string | null;
  setOurName: (name: string) => void;
  join: (name: string) => void;
  socket: MutableRefObject<Socket | undefined>;
  scores: {name: string, score: number}[];
}

const AppStateContext = createContext<AppStateType>({} as AppStateType);

export const useAppStateContext = () => useContext(AppStateContext)

export default function AppStateProvider(props: {children: React.ReactNode}) {
  const [host, setHost] = useState<AppStateType["host"]>(null)
  const [pitch, setPitch] = useState<AppStateType["pitch"]>(null)
  const [myPitch, mySetPitch] = useState<AppStateType["myPitch"]>(null)
  const [players, setPlayers] = useState<AppStateType["players"]>([])
  const [state, setState] = useState<AppStateType["state"]>("joining")
  const [countdown, setCountDown] = useState<AppStateType["countdown"]>(60)
  const [ourName, setOurName] = useState<string | null>(null)
  const [scores, setScores] = useState<{
    name: string,
    score: number,
  }[]>([])

  const socketRef = useRef<Socket | undefined>(undefined);

  useEffect(() => {
    if (!socketRef.current) {
      const socket = io("http://localhost:4000", {
        withCredentials: true,
      });
      socketRef.current = socket;
    }
    
    socketRef.current.on("pitch", (info) => {
      mySetPitch(info)
    })

    socketRef.current.on("info", (info) => {
      setPlayers(info.players)
      setHost(info.host)
      setPitch(info.pitch)
      setState(info.state)
      setCountDown(info.countdown)
    })
    
    socketRef.current.on("scoreboard", (info) => {
      setScores(info)
    })
  }, [])

  return (
    <AppStateContext.Provider
      value={{
        scores,
        socket: socketRef,
        join: (name: string) => {
          socketRef.current?.emit("join", { username: name })
        },
        host,
        players,
        pitch,
        myPitch,
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
