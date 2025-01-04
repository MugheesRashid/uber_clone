import React from 'react'
import { HiLocationMarker } from "react-icons/hi";
import { HiHomeModern } from "react-icons/hi2";
import { FaWallet } from "react-icons/fa";

function OrderPopup(props) {
    return (
        <div className="fixed bottom-0 left-0 z-50 w-full h-[65vh] py-2 flex flex-col bg-white items-center justify-around px-4">
            <h1 className='text-2xl font-bold'>New Ride Available!</h1>

            {/* User Details */}
            <div className="w-full h-[15%] flex flex-row items-center justify-between">
                <div className="profile w-2/3 flex flex-row items-center gap-2">
                    <img className='w-14 h-14 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRly7XndllZIqMpisn8XLQA0d1EK37LjoYdVA&s" alt="" />
                    <div className="name flex flex-col items-center justify-center">
                        <h1 className="text-xl font-semibold">John Doe</h1>
                        <p className="text-sm text-gray-600">+92 333 444 5555</p>
                    </div>
                </div>
                <p className="text-xl text-gray-600 w-1/3 text-right">2.2 KM</p>
            </div>

            {/* Location Details Section */}
            <div className="flex items-center justify-between w-full h-[15%] border-b-2 px-4">
                <HiLocationMarker className="text-2xl text-gray-500" />
                <div className="flex flex-col w-full pl-4">
                    <h1 className="text-lg font-semibold">92B/CR</h1>
                    <p className="text-sm text-gray-600">Attock, Punjab, Pakistan</p>
                </div>
            </div>

            {/* Ride Location Section */}
            <div className="flex items-center justify-between w-full h-[15%] border-b-2 px-4">
                <HiHomeModern className="text-2xl text-gray-500" />
                <div className="flex flex-col w-full pl-4">
                    <h1 className="text-lg font-semibold">92B/CR</h1>
                    <p className="text-sm text-gray-600">Attock, Punjab, Pakistan</p>
                </div>
            </div>

            {/* Price Details Section */}
            <div className="flex items-center justify-between w-full h-[15%] border-b-2 px-4">
                <FaWallet className="text-2xl text-gray-500" />
                <div className="flex flex-col w-full pl-4">
                    <h1 className="text-lg font-semibold">Rs. 1000</h1>
                    <p className="text-sm text-gray-600">Affordable, Cheap</p>
                </div>
            </div>
            <button onClick={() => {
                props.setRidePopup(false)
                props.setConfirmRidePopup(true)
            }} className='bg-green-500 text-white p-2 rounded-md mt-2 w-full'>Accept</button>
            <button onClick={() => {
                props.setRidePopup(false)
            }} className='bg-zinc-500 text-white p-2 rounded-md mt-2 w-full'>Ignore</button>
        </div>
    )
}

export default OrderPopup