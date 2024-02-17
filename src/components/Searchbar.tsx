"use client";

import { useState } from 'react'
import React from 'react'
import axios from 'axios'
import { IoSearchOutline } from "react-icons/io5";

import Link from 'next/link';

type Props = {}

const Searchbar = (props: Props) => {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);

  // const url = `https://pro.openweathermap.org/data/2.5/forecast/climate?q=London&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
  // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.NEXT_PUBLIC_WEATHER_KEY}`

  // const getWeather = (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   axios.get(url).then((res) => {
  //     setWeather(res.data);
  //     console.log(res.data);
  //   })
  //   setCity('')
  //   setLoading(false)
  // }

  // const getWeather = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await axios.get(url);
  //     setWeather(res.data);
  //     console.log(res.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   setCity('');
  //   setLoading(false);
  // }
  return (
      <div className='flex items-center border-2 border-white rounded-full mt-60'>
        <div className=''>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="bg-transparent h-10 px-5 pr-16 placeholder-white text-white text-sm focus:outline-none" placeholder="Search city" />
        </div>
        <div className='flex justify-end w-full'>
          <Link href={`/searchPage?city=${city}`}>
            <div className="hover:text-gray-200 text-white text-xl p-2 mr-2 "><IoSearchOutline /></div>
          </Link>
        </div>
          {/* <Link legacyBehavior href={`/searchPage?city=${city}`}>
            <a className="hover:text-gray-200 text-white font-bold py-2 px-4 rounded"><IoSearchOutline /></a>
          </Link> */}
          {/* <button onClick={getWeather} className="hover:text-gray-200 text-white font-bold py-2 px-4 rounded"><IoSearchOutline /></button> */}
      {loading ? <h1>Loading...</h1> : <h1></h1>}
    </div>
  )
}

export default Searchbar