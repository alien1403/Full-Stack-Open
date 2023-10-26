import { useState, useEffect } from 'react'
import Person from '../components/Person'
import axios from 'axios'
import personService from './services/persons'

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

const Persons = ({persons, searchInput, handleDelete}) =>{
  return(
    <ul>
      {persons
        .filter(person => person.name.toLowerCase().includes(searchInput.toLowerCase()))
        .map(person =>(
          <div key={person.name}>
            <Person key={person.name} name={person.name} phone={person.number}/>
            <button onClick={() => handleDelete(person.id)}>delete</button>
          </div>
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

  const handleDelete = (id) => {
    if(window.confirm('Do you really want to delete this contact?')){
      personService
       .deletePerson(id)
       .then(() =>{
        setPersons(persons.filter((person) => person.id !== id))
       })
       .catch((error) => {
        console.log("Error deleting contact:", error)
       })
    }
  }

  useEffect(()=>{
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
        console.log(response.data)
      })
  } ,[])

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);
  
    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already in the phonebook. Do you want to update their number?`
      );
  
      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newPhone };
        personService
          .updatePerson(existingPerson.id, updatedPerson)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id === existingPerson.id ? response.data : person
              )
            );
            setNewName('');
            setNewPhone('');
          })
          .catch((error) => {
            console.error("Error updating contact:", error);
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newPhone,
      };
      personService
        .addPerson(personObject)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setNewName('');
          setNewPhone('');
        })
        .catch((error) => {
          console.error("Error adding contact:", error);
        });
    }
  };

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
        persons={persons} searchInput={searchInput} handleDelete={handleDelete}
      />
    </div>
  )
}

export default App