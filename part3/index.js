const cors = require('cors')
const express = require('express')
const app = express()

app.use(cors())


let persons = [
  { name: 'Arto Hellas', number: '040-123456', id: 1 },
  { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {

  const n = persons.length
  const currentDate = new Date().toString()
  res.send(`
    <p>Phonebook has info for ${n} people</p>
    <p>${currentDate}</p>
  `)
})

app.get('/api/persons/:id', (req, res) => {
  const id = parseInt(req.params.id)

  const person = persons.filter(person => person.id === id)
  if(!person){
    res.status(402).json({error:'Error'})
  }

  res.status(200).json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

app.use(express.json());

app.post('/api/persons', (req, res) => {
  const body = req.body
  const name = body.name
  const number = body.number
  const findName = persons.find(person => person.name === name)
  console.log(findName)
  console.log(name)
  if(!name || !number){
    return res.status(400).json({ error: 'Name or number is missing' });
  }

  if(findName){
    return res.status(400).json({ error: 'Name already exists in the list' });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: parseInt(Math.random() * 1000)
  }

  persons = persons.concat(person)
  res.json(person)

})

const PORT = process.env.PORT || 3001
app.listen(PORT, () =>{
  console.log(`Server running on port: ${PORT}`)
})