import React, { useState } from 'react'
import { IoIosArrowUp } from "react-icons/io";
import { Link } from 'react-router-dom'
import { MdLogout } from "react-icons/md";
import FinishRide from './components/FinishRide';

function CaptainRiding() {
    const [finishRide, setFinishRide] = useState(false)
    return (
        <div className="h-screen w-screen relative">
            <div className="logo flex flex-row justify-between p-2 absolute top-0 left-0 w-full">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="Logo" className='w-25 h-10 mix-blend-multiply' />
                <Link to='/captains-logout' className='btn bg-zinc-300 rounded-full text-white p-2'><MdLogout className='text-2xl' /></Link>
            </div>

            <div className="map w-full h-screen bg-red-500">
                <img className='w-full h-full' src="" alt="" />
            </div>

            <div className="fixed bottom-0 left-0 bg-yellow-400 w-full h-1/5 flex flex-col justify-center items-center p-4 shadow-lg">
            <IoIosArrowUp onClick={()=> setFinishRide(true)} className='text-2xl text-zinc-500' />
                <h1 className="text-xl font-bold mb-2">2km away</h1>
                <button onClick={()=> setFinishRide(true)} className="bg-green-500 w-full text-white py-2 px-4 rounded-full hover:bg-green-600 transition duration-300">Complete Ride</button>
            </div>
          {finishRide && <FinishRide setFinishRide={setFinishRide} />}
        </div>)
}

export default CaptainRiding