import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from '../components/Country'

const Filter = (props) => {
  return(
    <div>
      find countries <input value={props.searchInput} onChange={props.handleSearchChange}/>
    </div>
  );
}

const Countries = ({countries, searchInput, setSelectedCountry}) => {

  if(searchInput !== ''){
    const data = countries.filter(country => country.name.common.toLowerCase().includes(searchInput.toLowerCase())).length
    if(data <= 10 && data >= 2){
      return(
        <ul style={{listStyleType: 'none'}}>
          {
            countries
              .filter(country => country.name.common.toLowerCase().includes(searchInput.toLowerCase()))
              .map(country => (
                <div key={country.name.common}>
                  {country.name.common + " "}
                  <button onClick={() => setSelectedCountry(country.name.common)}>View</button>
                </div>
              )
          )}
        </ul>
      )
    }
    
    if(data == 1){
      const country = countries.filter(country => country.name.common.toLowerCase().includes(searchInput.toLowerCase()))
      const data = country[0]
      return(
        <Country data={data}/>
      )
    }
    return(
      <p>
        Too many matches, specify another filter
      </p>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchInput, setSearchInput] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data);
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value)
    setSelectedCountry(null);
  }
  let data = '';
  if(selectedCountry){
    const country = countries.filter(country => country.name.common.toLowerCase().includes(selectedCountry.toLowerCase()))
    data = country[0]
    console.log(data)
  }
  return(
    <div>
      <Filter searchInput={searchInput} handleSearchChange={handleSearchChange}/>
      {selectedCountry ? (
        <Country data={data}/>
      ) : (
        <Countries countries={countries} searchInput={searchInput} setSelectedCountry={setSelectedCountry}/>
      )}
    </div>
  );
}

export default App