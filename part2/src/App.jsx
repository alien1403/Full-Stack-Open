import { useState, useEffect } from 'react'
import Person from '../components/Person'
import axios from 'axios'

const Filter = (props) => {
  return(
    <div>
      filter shown with <input value={props.searchInput} onChange={props.handleSearchChange}/>
    </div>
  )
}

const PersonForm = ({addPerson, newName, handleNameChange, newPhone, handlePhoneChange}) => {
  return(
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        number: <input value={newPhone} onChange={handlePhoneChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({persons, searchInput}) =>{
  return(
    <ul>
      {persons
        .filter(person => person.name.toLowerCase().includes(searchInput.toLowerCase()))
        .map(person =>(
          <Person key={person.name} name={person.name} phone={person.phone}/>
        )
      )}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchInput, setSearchInput] = useState('')

  useEffect(()=>{
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  } ,[])

  const addPerson = (event) => {
    event.preventDefault()

    let ok = true
    persons.forEach(person =>{
      if(person.name === newName)
        ok = false
    })

    if(ok === false){
      alert(`${newName} is already added to phonebook`)
      setNewName('')
    }else{
      const personObject = {
        name: newName,
        phone: newPhone
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewPhone('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchInput={searchInput} handleSearchChange={handleSearchChange}/>
      
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newPhone={newPhone} handlePhoneChange={handlePhoneChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons} searchInput={searchInput}
      />
    </div>
  )
}

export default App