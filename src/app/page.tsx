"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Searchbar from "@/components/Searchbar";
import axios from "axios";
import { FaLocationCrosshairs } from "react-icons/fa6";
import Image from "next/image";
import WeatherTable from "@/components/WeatherTable";

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
  name: string;
};


export default function Home() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  const [greeting, setGreeting] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const getCurrentTime = () => {
      const currentHour = new Date().getHours()

      if (currentHour < 12) {
        setGreeting("Good Morning")
      } else if (currentHour < 18) {
        setGreeting("Good Afternoon")
      } else {
        setGreeting("Good Evening")
      }
    }
    getCurrentTime()
  }, [])


  // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`

  // const url2 = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`

  // https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      getWeather();
      console.log('weather', weather);
    }
  }, [latitude, longitude]);


  return (
    <div id="main-container" className="h-lvh bg-gradient-to-br from-sky-500 via-blue-500 to-blue-800">
      <Navbar />
      <div className="flex px-20">
        <div id="left-pane" className=" w-1/3">
          <h1 className="text-white font-bold text-7xl">{greeting}</h1>
          <p className="text-white font-light text-sm pt-10">Hello, Hope you are having a good day.</p>
          {/* {error && <p>Error: {error}</p>} */}
          {latitude !== null && longitude !== null && (
          <p className="text-white font-light text-sm pt-10 leading-10">
            Latitude: {latitude} <br /> Longitude: {longitude}
          </p>
          )}
        </div>
        <div id="middle-pane" className="w-1/3">
          <Searchbar  />
        </div>
        <div id="right-pane" className="flex justify-end w-1/3">
          <div className="flex flex-col items-end">
            <span className="text-white font-bold text-8xl">{weather?.main.temp.toFixed()}°C</span>
              <h3 className="flex items-center text-white font-light text-sm pt-10 "> <FaLocationCrosshairs className="mr-2 opacity-75"/> {weather?.name}</h3>
              <p className="text-white font-light text-sm pt-5">{weather?.weather[0].description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
