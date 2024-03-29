"use client";

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Navbar from '@/components/Navbar';
import axios from 'axios';
import Image from 'next/image';
import 'tailwindcss/tailwind.css';

import { FaThermometerHalf, FaWind, FaSun  } from 'react-icons/fa';
import { FaDroplet, FaGauge } from "react-icons/fa6";
import { TbSunset2 } from "react-icons/tb";


type WeatherData = {
  coord: {
    lon: number;
    lat: number;
    // Add other properties you want to display
  };
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;

    // Add other properties you want to display
  };
  weather: {
    description: string;
    icon: string;
    id: number;
    main: string;
    // Add other properties you want to display
  }[];
  wind: {
    speed: number;
    // Add other properties you want to display
  
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
};

export default function searchPage({}: WeatherData) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { city } = router.query;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${process.env.NEXT_PUBLIC_WEATHER_KEY}`

  const getWeather = async () => {
    try {
      setLoading(true);
      const res = await axios.get<WeatherData>(url);
      setWeather(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  // useEffect(() => {
  //   // Your function to execute after navigating to this page
  //   console.log('Function executed after navigating to NewPage');
  //   console.log(router.query);
  //   console.log(city);
  //   getWeather();

  // }, [router.query]);

  useEffect(() => {
    if (city) {
      getWeather();
    }
  }, [city]);

  const formatUnixTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString();
  }

  return (
    <div className='h-lvh bg-gradient-to-br from-teal-600 to-blue-700'>
      <Navbar />
      <div className='px-20'>
        
        {weather && (
          <div>
              <div className='flex'>
                <h2 className='text-white font-bold text-7xl mr-10'>{city}</h2>
                <div className='flex flex-col items-center justify-end'>
                  <Image src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="weather icon" width={25} height={25} />
                  <p className='text-white text-light text-md'>{weather.weather[0].description}</p>
                </div>
              </div>
              <div className='flex pt-10'>
                <div>
                  <p className='text-white font-bold text-8xl'>{weather.main.temp.toFixed()}°C</p>
                </div>
                <div className='ml-10'>
                  <p className='flex items-center text-white font-light text-md leading-10'><FaThermometerHalf className='mr-2' />Feels Like: <span className='font-semibold'>{'\xa0'}{weather.main.feels_like.toFixed()}°C</span></p>
                  <p className='flex items-center text-white font-light text-md leading-10'><FaDroplet className='mr-2' /> Humidity:<span className='font-semibold'>{'\xa0'}{weather.main.humidity}%</span></p>
                  <p className='flex items-center text-white font-light text-md leading-10'><FaWind className='mr-2' />Wind Speed:<span className='font-semibold'>{'\xa0'}{weather.wind.speed}m/s</span></p>
                  <p className='flex items-center text-white font-light text-md leading-10'><FaGauge  className='mr-2' /> Pressure:<span className='font-semibold'>{'\xa0'}{weather.main.pressure}hPa</span></p>
                </div>
                <div className='ml-10'>
                  <p className='flex items-center text-white font-light text-md leading-10'><FaSun className='mr-2' /> High:<span className='font-semibold'>{'\xa0'}{weather.main.temp_max}°C</span></p>
                  <p className='flex items-center text-white font-light text-md leading-10'><FaSun className='mr-2' /> Low:<span className='font-semibold'>{'\xa0'} {weather.main.temp_min}°C</span></p>
                </div>
                <div className='mt-2 ml-10'>
                  <p className='flex text-white items-center pb-5'><FaSun className='mr-2'/> Rise:<span className='font-semibold'>{'\xa0'} {formatUnixTime(weather.sys.sunrise)}</span></p>
                  <p className='flex text-white items-center'><TbSunset2 className='mr-2'/> Set:<span className='font-semibold'>{'\xa0'}{formatUnixTime(weather.sys.sunset)}</span></p>
                </div>
              </div>              
          </div>
          )} 
      </div>
    </div>
  )
}

              // <p>Description: {weather.weather[0].description}</p>
              // <p>Longitude: {weather.coord.lon}</p>
              // <p>Latitude: {weather.coord.lat}</p>