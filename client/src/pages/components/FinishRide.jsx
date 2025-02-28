import React from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { HiLocationMarker } from "react-icons/hi";
import { HiHomeModern } from "react-icons/hi2";
import { FaWallet } from "react-icons/fa";
import { Link } from 'react-router-dom';

function FinishRide(props) {
  return (
    <div className="w-screen h-[65vh] fixed left-0 bottom-0 bg-white">
        <IoIosArrowDown onClick={()=> props.setFinishRide(false)} className='text-4xl relative left-1/2 py-1 -translate-x-1/2 text-zinc-500' />
            <h1 className='text-2xl font-bold px-3'>Confirm Your Ride!</h1>

            {/* User Details */}
            <div className="w-full h-[15%] flex flex-row items-center justify-between px-2">
                <div className="profile w-2/3 flex flex-row items-center gap-2 px-2">
                    <img className='w-14 h-14 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRly7XndllZIqMpisn8XLQA0d1EK37LjoYdVA&s" alt="" />
                    <div className="name flex flex-col items-center justify-center">
                        <h1 className="text-xl font-semibold">{props.ride.user.firstName} {props.ride.user.lastName}</h1>
                        <p className="text-sm text-gray-600">+92 333 444 5555</p>
                    </div>
                </div>
                <p className="text-xl text-gray-600 w-1/3 text-right">{props.ride.distance/1000} KM</p>
            </div>

            {/* Location Details Section */}
            <div className="flex items-center justify-between w-full h-[15%] border-b-2 px-4">
                <HiLocationMarker className="text-2xl text-gray-500" />
                <div className="flex flex-col w-full pl-4">
                    <h1 className="text-lg font-semibold">{props.ride.pickup}</h1>
                </div>
            </div>

            {/* Ride Location Section */}
            <div className="flex items-center justify-between w-full h-[15%] border-b-2 px-4">
                <HiHomeModern className="text-2xl text-gray-500" />
                <div className="flex flex-col w-full pl-4">
                    <h1 className="text-lg font-semibold">{props.ride.destination}</h1>
                </div>
            </div>

            {/* Price Details Section */}
            <div className="flex items-center justify-between w-full h-[15%] border-b-2 px-4">
                <FaWallet className="text-2xl text-gray-500" />
                <div className="flex flex-col w-full pl-4">
                    <h1 className="text-lg font-semibold">Rs. {props.ride.fare}</h1>
                    <p className="text-sm text-gray-600">Affordable, Cheap</p>
                </div>
            </div>
         <button onClick={()=> {props.finishRideHandler(); console.log("clicked")}} className='w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-2 rounded-lg'>Finish Ride</button>
       </div>
      )
}

export default FinishRide