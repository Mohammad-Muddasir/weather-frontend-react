import React, { useState, useEffect } from "react";
import axios from "axios";
import "./weather.css";

const WeatherApp = () => {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        // Fetch the last searched city from localStorage when the component mounts
        const lastSearchedCity = localStorage.getItem("lastSearchedCity");
        if (lastSearchedCity) {
            setCity(lastSearchedCity);
            fetchWeatherData(lastSearchedCity);
        }
    }, []);

    const fetchWeatherData = (city) => {
        // Fetch weather data for the given city using the API
        axios
            .get(`http://localhost:3000/api/v2/weather?city=${city}`)
            .then((response) => {
                console.log("res weather is ===>", response.data);
                setWeatherData(response.data);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Fetch weather data for the entered city and store it in localStorage
        axios
            .get(`http://localhost:3000/api/v2/weather?city=${city}`)
            .then((response) => {
                console.log("res weather is ===>", response.data);
                setWeatherData(response.data);
                localStorage.setItem("lastSearchedCity", city);
            });
    };

    const handleShowDetails = () => {
        setShowDetails(true);
    };

    const handleHideDetails = () => {
        setShowDetails(false);
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        setCity(value);

        // Fetch suggestions for the entered city from the API
        axios
            .get(`http://localhost:3000/api/v2/search?searchTerm=${value}`)
            .then((response) => {
                setSuggestions(response.data.cities);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleSuggestionClick = (suggestion) => {
        setCity(suggestion);
        setSuggestions([]);
    };

    return (
        <div className="weather-app">
            <h1>Welcome to Weather App</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="city">Enter a city name:</label>
                <input type="text" placeholder="Enter City Here" id="city" value={city} onChange={handleInputChange} />
                <ul className="suggestions">
                    {suggestions.map((suggestion, index) => (
                        <li key={`${suggestion}-${index}`} onClick={() => handleSuggestionClick(suggestion)}>
                            {suggestion}
                        </li>
                    ))}
                </ul>
                <br />
                <button type="submit">Get Weather</button>
            </form>
            {weatherData && (
                <table>
                    <thead>
                        <tr>
                            <th>City</th>
                            <th>Temperature (°C)</th>
                            <th>Humidity (%)</th>
                            <th>Wind Speed (m/s)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{weatherData.city}</td>
                            <td>{weatherData.temperature}</td>
                            <td>{weatherData.humidity}</td>
                            <td>{weatherData.windSpeed}</td>
                        </tr>
                    </tbody>
                </table>
            )}
            {showDetails && weatherData && (
                <table>
                    <tbody>
                        <tr>
                            <td>Sunrise</td>
                            <td>{weatherData.sunrise}</td>
                        </tr>
                        <tr>
                            <td>Sunset</td>
                            <td>{weatherData.sunset}</td>
                        </tr>
                        <tr>
                            <td>Weather</td>
                            <td>{weatherData.weather}</td>
                        </tr>
                    </tbody>
                </table>
            )}
            {weatherData && (
                <>
                    {showDetails ? (
                        <button onClick={handleHideDetails}>Show Less</button>
                    ) : (
                        <button onClick={handleShowDetails}>Show More</button>
                    )}
                </>
            )}
        </div>
    );
};

export default WeatherApp;
