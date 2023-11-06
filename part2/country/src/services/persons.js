import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
  }
  
  const create = newObject => {
    return axios.post(baseUrl, newObject)
  }
  
  const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
  }
const deletePerson = (id) =>{
    const url = `${baseUrl}/${id}`
    return axios.delete(url)
}
const addPerson = (newPerson) => {
    return axios.post(baseUrl, newPerson);
  };
  
  const updatePerson = (id, updatedPerson) => {
    return axios.put(`${baseUrl}/${id}`, updatedPerson);
  };
  
  export default { 
    getAll: getAll, 
    create: create, 
    update: update,
    deletePerson: deletePerson,
    addPerson,
    updatePerson
  }