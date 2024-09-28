import './App.css'

function Theme(props: {theme: string, constraints: string[]}) {
  return (
    <>
      <h1>Starting!</h1>
      <p>Theme: {props.theme}</p>
      <p>Constraints:</p>
      <ul>
        {props.constraints.map((constraint) => {
          return <li key={constraint}>{constraint}</li>;
        })}
      </ul>
    </>
  )
}

export default Theme
