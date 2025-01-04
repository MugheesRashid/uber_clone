import React from 'react'
import { HiLocationMarker } from "react-icons/hi";
import { HiHomeModern } from "react-icons/hi2";
import { FaWallet } from "react-icons/fa";


function WaitingForRide(props) {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-[65vh] py-2 bg-white flex flex-col items-center justify-center px-4">
    <h1 className='text-2xl font-bold mb-4'>Waiting For Ride...</h1>
    <div className="profile flex flex-row justify-between w-full px-10 items-center mb-6">
      <img src="./carSearch.png" alt="Profile" className="w-[40%] object-cover mb-2" />
      <div className="profile-detail">
      <h1 className="text-xl font-semibold">John Doe</h1>
      <p className="text-sm text-gray-600">Car Name</p>
      <p className='text-sm text-gray-600'>Car Number</p>
      </div>
    </div>

    {/* Location Details Section */}
    <div className="flex items-center justify-between w-full h-[18%] border-b-2 px-4">
      <HiLocationMarker className="text-2xl text-gray-500" />
      <div className="flex flex-col w-full pl-4">
        <h1 className="text-md font-semibold text-zinc-600">{props.pickup}</h1>
      </div>
    </div>

    {/* Ride Location Section */}
    <div className="flex items-center justify-between w-full h-[18%] border-b-2 px-4">
      <HiHomeModern className="text-2xl text-gray-500" />
      <div className="flex flex-col w-full pl-4">
        <p className="text-sm font-semibold text-zinc-600">{props.destination}</p>
      </div>
    </div>

    {/* Price Details Section */}
    <div className="flex items-center justify-between w-full h-[18%] border-b-2 px-4">
      <FaWallet className="text-2xl text-gray-500" />
      <div className="flex flex-col w-full pl-4">
        <h1 className="text-lg font-semibold">Rs. {props.fare}</h1>
        <p className="text-sm text-gray-600">Affordable, Cheap</p>
      </div>
    </div>
  </div>
  )
}


export default WaitingForRide