const api_key = import.meta.env.VITE_WEATHER_KEY
import { useState, useEffect } from "react";
import axios from "axios";
import WeatherIcon from "./WeatherIcon";

const Country = ({data}) => {
    const [weather, setWeather] = useState(null) 
    useEffect(() => {
        if (data.capital && api_key) {
          axios
            .get(
              `https://api.openweathermap.org/data/2.5/weather?q=${data.capital}&appid=${api_key}`
            )
            .then((response) => {
              setWeather(response.data);
            })
            .catch((error) => {
              console.error('Failed to fetch weather data:', error);
            });
        }
      }, [data.capital]);
    return(
        <div>
            <h1>{data.name.common}</h1>
            <p>capital: {data.capital}</p>
            <p>area: {data.area}</p>
            <h3>languages:</h3>
            <ul>
                {
                Object.entries(data.languages).map(([code, name]) => (
                    <li key={code}>
                    {name}
                    </li>
                ))
                }
            </ul>
            <img src={data.flags.png} alt={data.flags.alt}/>
            <h2>Weather in {data.capital}</h2>
            {weather ? (
                <div>
                    <p>temperature: {weather.main.temp - 273.15}</p>
                    <WeatherIcon iconCode={weather.weather[0].icon}/>
                    <p>wind: {weather.wind.speed}</p>
                </div>
            ) : (
                <p>Weather information not available</p>
            )}
            
        </div>
    )
}

export default Country;