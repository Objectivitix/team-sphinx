import { useNavigate } from "react-router";
import { useAppStateContext } from "./AppStateContext";

export default function JoinPage() {
  const { join, setOurName } = useAppStateContext();
  const navigate = useNavigate();

  return (
    <form
      style={{
        width: "100vw",
        height: "100vh",
        margin: "0",
        padding: "0",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
      }}
      onSubmit={(e) => {
        const formData = new FormData(e.currentTarget);

        let info: Record<string, string> = {};

        for (const [key, value] of formData) {
          if (value instanceof File) {
            continue;
          }

          info[key] = value;
        }

        if ("username" in info && info.username && info.username.length > 0) {
          join(info.username);
          setOurName(info.username);
          navigate("/lobby");
        }

        e.preventDefault();
      }}
    >
      {" "}
      <link
        href="https://fonts.googleapis.com/css?family=Itim"
        rel="stylesheet"
      ></link>
      <img
        src="public/icons/logo.png"
        alt="Pitchionary"
        style={{ width: "60vw", marginTop: "13vh", marginBottom: "9vh" }}
      />
      <input
        name="username"
        placeholder="Username"
        style={{
          width: "20vw",
          height: "10vh",
          border: "0.125rem solid black",
          borderRadius: "10px",
          marginBottom: "1.5rem",
          textAlign: "center",
          fontSize: "min(4vw, 6vh)",
          boxSizing: "border-box",
          fontFamily: "Itim, sans-serif",
        }}
      ></input>
      <button
        style={{
          width: "20vw",
          height: "10vh",
          borderRadius: "10px",
          border: "0.125rem solid black",
          textAlign: "center",
          padding: "0",
          fontSize: "min(4.5vw, 6vh)",
          cursor: "pointer",
          lineHeight: "1vh",
          boxSizing: "border-box",
          fontFamily: "Itim, sans-serif",
        }}
      >
        Start
      </button>
    </form>
  );
}
