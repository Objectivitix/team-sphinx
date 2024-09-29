import { useNavigate } from "react-router";
import { useAppStateContext } from "./AppStateContext";

export default function JoinPage() {
  const { join, setOurName } = useAppStateContext();
  const navigate = useNavigate();

  return (
    <form
      style={{
        width: "100%",
        height: "100vh",
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
        style={{ width: "60vw", marginTop: "6vw", marginBottom: "4vw" }}
      />
      <input
        name="username"
        placeholder="Username"
        style={{
          width: "20vw",
          height: "10vh",
          borderRadius: "10px",
          marginBottom: "2vw",
          textAlign: "center",
          fontSize: "calc(0.08 * 100vh)",
          fontFamily: "Itim, sans-serif",
        }}
      ></input>
      <button
        style={{
          width: "20vw",
          height: "10vh",
          borderRadius: "10px",
          cursor: "pointer",
          fontSize: "calc(0.08 * 100vh)",
          padding: "0px 0px 5% 0px",
          fontFamily: "Itim, sans-serif",
        }}
      >
        Submit
      </button>
    </form>
  );
}
