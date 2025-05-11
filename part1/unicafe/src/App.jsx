import { useState } from 'react'
const Statistics = ({good, neutral, bad}) => {

  const tot = good + neutral + bad
  const average= (good+(bad*-1))/tot
  if (tot==0){
    return <><p>No feedback given</p></>
  }
  return(
    <>
    <h2>statistics</h2>
    <p>Good: {good}</p>
    <p>Neutral: {neutral}</p>
    <p>Bad: {bad}</p>
    <p>all: {tot}</p>
    <p>average {average}</p>
    <p>positve {(good/tot)*100} %</p>
    </>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const tot = good + neutral + bad
  const average= (good+(bad*-1))/tot
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good+1)}>Good</button>
      <button onClick={() => setNeutral(neutral+1)}>neutral</button>
      <button onClick={() => setBad(bad+1)}>bad</button>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App