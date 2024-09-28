import './App.css'

type Ranking = {username: string, score: number}[]

function Rank(props: {host: boolean, ranking: Ranking}) {
  return (
    <>
      <h1>Final ranking</h1>
      <ol>
        {props.ranking.map(({username, score}) => {
          return (
            <li key={username}>{username} at {score} points</li>
          )
        })}
      </ol>
      {props.host ? <button>Play Again</button> : ""}
    </>
  )
}

export default Rank
