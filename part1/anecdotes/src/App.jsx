import { useState } from 'react'

const MostVotes = (props) => {
  let maxValue = -1
  let position = -1
  for(let i = 0;i<props.anecdotes.length;i++){
    if(props.votes[i] > maxValue)
    {
      maxValue = props.votes[i]
      position = i
    }
  }
  if(maxValue === 0){
    return(
      <p>
        Vote at least one anecdote
      </p>
    )
  }
  return(
    <>
      <p>
        {props.anecdotes[position]}
      </p>
      <p>
        has {props.votes[position]} votes
      </p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  const handleSelected = () => {
    let value = selected
    if(value === anecdotes.length - 1){
      value = 0
    }else{
      value += 1
    }
    setSelected(value)
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>Votes: {votes[selected]}</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleSelected}>
        next anecdote
      </button>
      <h1>Anecdote with most votes</h1>
      <MostVotes votes={votes} anecdotes={anecdotes}/>
    </div>
  )
}

export default App