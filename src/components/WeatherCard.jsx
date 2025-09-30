import React from 'react';

const WeatherCard = ({ weather, onOk }) => {
  if (!weather) return null;

  const { name, main, weather: weatherInfo } = weather;

  return (
    <div className="weather-card">
      <h2>{name}</h2>
      <p>{weatherInfo[0].main} - {weatherInfo[0].description}</p>
      <p>Temperature: {main.temp} °C</p>
      <p>Humidity: {main.humidity} %</p>
      <p>Pressure: {main.pressure} hPa</p>
      <button onClick={onOk}>OK</button>
    </div>
  );
};

export default WeatherCard;
