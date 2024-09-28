import { useNavigate } from "react-router";
import { useAppStateContext } from "./AppStateContext";

export default function JoinPage() {
  const { join, setOurName } = useAppStateContext();
  const navigate = useNavigate();

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
        join(info.username)
        setOurName(info.username) 
        navigate("/lobby")
      }

      e.preventDefault();
    }}>
      <h1>Pitchionary</h1>
      <input name="username" placeholder="username"></input>
      <button>submit</button>
    </form>
  )
}
