import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { HiLocationMarker } from "react-icons/hi";
import { HiHomeModern } from "react-icons/hi2";
import { FaWallet } from "react-icons/fa";

function ConfirmRidePopup(props) {
    const [otp, setOtp] = useState("")

    const submitHander = (e) => {
        e.preventDefault()
    }

    return (
        <div className="w-screen h-[90vh] fixed left-0 bottom-0 bg-white">
            <h1 className='text-2xl font-bold px-3'>Confirm Your Ride!</h1>

            {/* User Details */}
            <div className="w-full h-[15%] flex flex-row items-center justify-between px-2">
                <div className="profile w-2/3 flex flex-row items-center gap-2 px-2">
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
            <div className='mt-6 w-[90%] m-auto'>
                    <form onSubmit={submitHander}>
                        <input value={otp} onChange={(e) => setOtp(e.target.value)} type="text" className='bg-[#eee] px-6 py-2 font-mono text-lg rounded-lg w-full mt-3' placeholder='Enter OTP' />

                        <Link to={"/captains-riding"} className='w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-2 rounded-lg'>Confirm</Link>
                        <button onClick={
                            ()=>{props.setRidePopup(false); props.setConfirmRidePopup(false);}
                        } className='w-full mt-2 bg-red-600 text-lg text-white font-semibold p-2 rounded-lg'>Cancel</button>

                    </form>
                </div>
        </div>
    )
}

export default ConfirmRidePopup