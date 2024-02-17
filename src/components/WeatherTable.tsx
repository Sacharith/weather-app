import React, { useState, useEffect } from 'react';
import WeatherForecastItem from './WeatherForecastItem';

interface ForecastData {
  list: {
    dt_txt: string;
    main: {
      temp: number;
    };
    weather: {
      description: string;
    }[];
  }[];
}

const WeatherTable: React.FC = () => {
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const apiKey = '15bc8736c78997092a40ecc35dc6b0fb';
  const city = 'New York';
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then((data: ForecastData) => {
        setForecastData(data);
      })
      .catch(error => {
        console.error('Error fetching forecast:', error);
      });
  }, []);

  if (!forecastData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>5-Day Weather Forecast for {city}</h2>
      <div className="forecast-container">
        {forecastData.list.map((item, index) => (
          <WeatherForecastItem key={index} forecast={item} />
        ))}
      </div>
    </div>
  );
};

export default WeatherTable;