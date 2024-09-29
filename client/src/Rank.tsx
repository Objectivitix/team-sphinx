import { useNavigate } from "react-router";
import { useAppStateContext } from "./AppStateContext";
import { useEffect } from "react";
import Navbar from "./Navbar";

function Rank() {
  const { host, state, scores, ourName } = useAppStateContext();

  const isHost = host === ourName;
  const navigate = useNavigate();

  useEffect(() => {
    if (state !== "ending") {
      navigate("/lobby");
    }
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        margin: "0",
        padding: "0",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css?family=Itim"
        rel="stylesheet"
      ></link>
      <Navbar></Navbar>
      <div
        style={{
          width: "100vw",
          margin: "0",
          padding: "5px 0px 6px 0px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexDirection: "row",
          backgroundColor: "grey",
        }}
      >
        <h1
          style={{
            width: "20vw",
            textAlign: "center",
            fontSize: "min(4vw, 6vh)",
            boxSizing: "border-box",
            textDecorationLine: "underline",
            textWrap: "nowrap",
            fontFamily: "Itim, sans-serif",
          }}
        >
          Final ranking
        </h1>
        <h1
          style={{
            width: "20vw",
            textAlign: "center",
            fontSize: "min(4vw, 6vh)",
            textDecorationLine: "underline",
            boxSizing: "border-box",
            fontFamily: "Itim, sans-serif",
          }}
        >
          Scores
        </h1>
      </div>
      {scores.map(({ name, score }, index) => {
        return (
          <div
            key={name}
            style={{
              backgroundColor: index % 2 === 1 ? "grey" : "",
              width: "100vw",
              margin: "0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexDirection: "row",
            }}
          >
            <h1
              style={{
                width: "20vw",
                textAlign: "center",
                fontSize: "min(4vw, 6vh)",
                boxSizing: "border-box",
                textWrap: "nowrap",
                fontFamily: "Itim, sans-serif",
              }}
            >
              {name}
            </h1>
            <h1
              style={{
                width: "20vw",
                textAlign: "center",
                fontSize: "min(4vw, 6vh)",
                boxSizing: "border-box",
                fontFamily: "Itim, sans-serif",
              }}
            >
              {score}
            </h1>
          </div>
        );
      })}
      {isHost ? (
        <button
          style={{
            width: "25vw",
            height: "10vh",
            borderRadius: "10px",
            textAlign: "center",
            marginTop: "10vh",
            fontSize: "min(4.5vw, 7vh)",
            cursor: "pointer",
            boxSizing: "border-box",
            fontFamily: "Itim, sans-serif",
          }}
          onClick={() => {
            navigate("/lobby");
          }}
        >
          Play Again
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default Rank;
