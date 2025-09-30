import React, { useState } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import "./App.css";
import clearVideo from "./components/Weather_video/clear cloud.mp4";
import rainVideo from "./components/Weather_video/Rain.mp4";
import snowVideo from "./components/Weather_video/Snow.mp4";
import cloudsVideo from "./components/Weather_video/Clouds.mp4";
import thunderVideo from "./components/Weather_video/Thunderstorm.mp4";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    if (!city) return;

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (err) {
      alert("City not found!");
      setWeather(null);
    }
  };

  const handleOk = () => {
    setCity("");
    setWeather(null);
  };

  const getVideoSrcAndKey = () => {
    const main = weather?.weather?.[0]?.main;
    const desc = weather?.weather?.[0]?.description;

    if (main === "Clouds") {
      switch (desc) {
        case "few clouds":
          return { src: snowVideo, key: "clouds" };
        case "clear sky":
          return { src: clearVideo, key: "clouds" };
        case "scattered clouds":
          return { src: cloudsVideo, key: "clouds" };
        case "broken clouds":
          return { src: rainVideo, key: "clouds" }; // Looks more dramatic
        case "overcast clouds":
          return { src: rainVideo, key: "clouds" }; // Usually indicates gloomy/rainy feel
        default:
          return { src: cloudsVideo, key: "clouds" };
      }
    }

    if (main === "Rain") return { src: rainVideo, key: "rain" };
    if (main === "Snow") return { src: snowVideo, key: "snow" };
    if (main === "Thunderstorm") return { src: thunderVideo, key: "thunder" };
    if (main === "Clear") return { src: clearVideo, key: "clear" };

    return { src: clearVideo, key: "clear" };
  };

  const { src: videoSrc, key: videoKey } = getVideoSrcAndKey();

  return (
    <div className="app-container">
      <video key={videoKey} autoPlay muted loop className="video-bg">
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="content">
        <h1>Weather App 🌦️</h1>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Get Weather</button>
        <div className="weather-container">
          {weather ? (
            <WeatherCard weather={weather} onOk={handleOk} />
          ) : (
            <p>Please enter a city to get the weather.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
