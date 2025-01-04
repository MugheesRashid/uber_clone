import React from 'react'
import { HiLocationMarker } from "react-icons/hi";
import { HiHomeModern } from "react-icons/hi2";
import { FaWallet } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";


function ConfirmRide(props) {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-[65vh] py-2 bg-white flex flex-col items-center justify-center px-4">
      <IoIosArrowDown onClick={() => { props.setConfirmRide(false); props.setVehiclePanel(true) }} className='inline-block text-2xl font-semibold absolute top-5 left-1 rotate-90' />
      <h1 className='text-2xl font-bold'>Confirm Your Ride</h1>
      <img
        className="w-1/2 h-[19%] my-5 mx-auto object-contain"
        src="./carSearch.png"
        alt="Car Search"
      />

      {/* Location Details Section */}
      <div className="flex items-center justify-between w-full h-[18%] border-b-2 px-4">
        <HiLocationMarker className="text-2xl text-gray-500" />
        <div className="flex flex-col w-full pl-4">
          <h1 className="text-lg font-semibold">{props.pickup}</h1>
        </div>
      </div>

      {/* Ride Location Section */}
      <div className="flex items-center justify-between w-full h-[18%] border-b-2 px-4">
        <HiHomeModern className="text-2xl text-gray-500" />
        <div className="flex flex-col w-full pl-4">
          <h1 className="text-lg font-semibold">{props.destination}</h1>
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
      <button onClick={() => { props.setWaitingForRide(true); props.setConfirmRide(false); props.createRide() }} className='bg-green-500 text-white p-2 rounded-md mt-2 w-full'>Confirm Ride</button>
    </div>
  )
}

export default ConfirmRide