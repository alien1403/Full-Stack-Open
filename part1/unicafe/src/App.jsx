import { useState } from 'react'


const StatisticLine = (props) =>{
  if(props.text === "positive"){
    return(
      <tr>
        <td>
          {props.text}
        </td>
        <td>
          {props.value} %
        </td>
      </tr>
    )   
  }
  return(
    <tr>
      <td>
        {props.text} 
      </td>
      <td>
        {props.value}
      </td>
    </tr>
  )
}

const Statistics = (props) => {
  if(props.good === 0 && props.neutral === 0 && props.bad === 0){
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return(
    <div>
      <table>
        <tbody>
          <StatisticLine text='good' value={props.good}/>
          <StatisticLine text='neutral' value={props.neutral}/>
          <StatisticLine text='bad' value={props.bad}/>
          <StatisticLine text='all' value={props.all}/>
          <StatisticLine text='average' value={(props.good - props.bad) / props.all}/>
          <StatisticLine text='positive' value={props.good / props.all * 100}/>
        </tbody>
      </table>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGoodEvent = () =>{
    const newGood = good + 1
    setGood(newGood)
    setAll(newGood + neutral + bad)
  }

  const handleNeutralEvent = () =>{
    const newNeutral = neutral + 1
    setNeutral(newNeutral)
    setAll(good + newNeutral + bad)
  }

  const handleBadEvent = () =>{
    const newBad = bad + 1
    setBad(newBad)
    setAll(good + neutral + newBad)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodEvent} text='good'/>
      <Button handleClick={handleNeutralEvent} text='neutral'/>
      <Button handleClick={handleBadEvent} text='bad'/>
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} all={all}/>
    </div>
  )
}

export default App