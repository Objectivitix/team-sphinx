import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export default function JoinPage() {
  const socketRef = useRef<Socket | undefined>(undefined);

  useEffect(() => {
    if (!socketRef.current) {
      const socket = io("http://localhost:3000");
      socketRef.current = socket;
    }
  }, [])

  return (
    <form style={{
      width: "100%",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    }} onSubmit={(e) => {
      const formData = new FormData(e.currentTarget)

      let info: Record<string, string> = {};

      for (const [key, value] of formData) {
        if (value instanceof File) {
          continue;
        }

        info[key] = value;
      }

      if ("username" in info && info.username && info.username.length > 0) {
        socketRef.current?.emit("join", { username: info.username })
      }

      e.preventDefault();
    }}>
      <h1>Pitchionary</h1>
      <input name="username" placeholder="username"></input>
      <button>submit</button>
    </form>
  )
}
