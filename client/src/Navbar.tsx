import Logo from "../public/logo.webp"

export default function Navbar() { 
  return (
    <div style={{
      width: "100%",
      boxSizing: "border-box",
      padding: "0.5rem",
      display: "flex",
      overflow: "hidden",
      justifyContent: "center"
    }}>
      <a href="/">
        <img style={{
          width: "24rem",
          height: "7rem",
          textAlign: "center",
        }} src={Logo} />
      </a>
    </div>
  )
}
