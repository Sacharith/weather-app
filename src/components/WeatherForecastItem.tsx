import React from 'react';

interface ForecastItemProps {
  forecast: {
    dt_txt: string;
    main: {
      temp: number;
    };
    weather: {
      description: string;
    }[];
  };
}

const WeatherForecastItem: React.FC<ForecastItemProps> = ({ forecast }) => {
  const date = new Date(forecast.dt_txt);
  const temperature = Math.round(forecast.main.temp - 273.15); // Converting from Kelvin to Celsius
  const weatherDescription = forecast.weather[0].description;

  return (
    <div className="forecast-item">
      <p>Date and Time: {date.toLocaleString()}</p>
      <p>Temperature: {temperature} °C</p>
      <p>Weather: {weatherDescription}</p>
    </div>
  );
};

export default WeatherForecastItem;