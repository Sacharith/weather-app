import React from 'react'
import { TiWeatherCloudy  } from "react-icons/ti";
import Link from 'next/link';

type Props = {}

const Navbar = (props: Props) => {
  return (
    <div className="flex items-center justify-between sticky w-full text-white py-10 px-20">
      <Link href='/'>
        <TiWeatherCloudy className='text-5xl'/>
      </Link>
      <h1 className="pl-6 font-light ">Weather</h1>
      <button>
        C | F
      </button>
    </div>
  )
}

export default Navbar