import React, { useEffect, useState } from "react";
import axios from "axios";

const WeatherIcon = ({ iconCode }) => {
    const [iconURL, setIconURL] = useState(null)

    useEffect(() => {
        axios
            .get(`https://openweathermap.org/img/wn/${iconCode}@2x.png`)
            .then((response) => {
                setIconURL(response.config.url);
            })
            .catch((error) => {
                console.log('Failed to fetch weather icon: ', error)
            })
    }, [iconCode])
    
    return iconURL ? (
        <img src={iconURL} alt="Weather icon"/>
    ) : (
        <div>Loading icon...</div>
    )
}

export default WeatherIcon;