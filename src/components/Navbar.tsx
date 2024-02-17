import React from 'react'
import { TiWeatherCloudy  } from "react-icons/ti";


type Props = {}

const Navbar = (props: Props) => {
  return (
    <div className="flex items-center sticky w-full text-white py-10 px-20">
      <TiWeatherCloudy className='text-5xl'/>
      <h1 className="pl-6 font-light ">Weather</h1>
    </div>
  )
}

export default Navbar