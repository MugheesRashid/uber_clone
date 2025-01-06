import React, { useState, useEffect } from 'react'
import { HiLocationMarker } from "react-icons/hi";
import { FaWallet } from "react-icons/fa";
import { IoIosArrowDown } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom'
import { useSocket } from '../assets/context/SocketContext'


function Riding() {
    const location = useLocation()
    const ride = location.state.ride || {}
    const [height, setHeight] = useState('0')
    const { sendMessage, receiveMessage } = useSocket()
    const navigate = useNavigate()

    useEffect(() => {
        receiveMessage('rideCompleted', (data) => {
            console.log(data)
            navigate("/home")
        })
    }, [])

    const handleHeight = () =>{
       height === "0" ? setHeight("-28%") : setHeight("0")
    }
    return (
        <div className='w-screen h-screen'>
            <div className='logo flex flex-row justify-between p-2 absolute top-0 left-0 w-full'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="Logo" className='w-25 h-10 mix-blend-multiply' />
            </div>
            <div className="map h-screen w-screen bg-red-500">

            </div>
            <div style={{bottom: height}} className="fixed transition-all linear duration-1000 left-0 w-screen h-[50%] bg-white flex flex-col items-center justify-between py-2">
                <IoIosArrowDown onClick={()=>{
                    handleHeight()
                }} className='text-3xl text-gray-500 py-1' />
                <div className="profile flex flex-row justify-between w-full h-[30%] px-10 items-center mb-1">
                    <img src="./car.png" alt="Profile" className="w-[40%] object-cover mb-1" />
                    <div className="profile-detail flex flex-col items-end">
                        <h1 className="text-lg text-zinc-600 font-semibold">{ride.captain.firstName} {ride.captain.lastName}</h1>
                        <h1 className="text-xl text-zinc-900 font-semibold">{ride.vehicleNumber}</h1>
                        <h1 className="text-lg text-zinc-600 font-semibold">{ride.vehicleType}</h1>
                    </div>
                </div>

                {/* Location Details Section */}
                <div className="flex items-center justify-between w-full h-[15%] border-b-2 px-4">
                    <HiLocationMarker className="text-2xl text-gray-500" />
                    <div className="flex flex-col w-full pl-4">
                        <h1 className="text-md font-semibold text-zinc-600">{ride.pickup}</h1>
                    </div>
                </div>              

                {/* Price Details Section */}
                <div className="flex items-center justify-between w-full h-[15%] border-b-2 px-4">
                    <FaWallet className="text-2xl text-gray-500" />
                    <div className="flex flex-col w-full pl-4">
                        <h1 className="text-lg font-semibold">Rs. {ride.fare}</h1>
                        <p className="text-sm text-gray-600">Affordable, Cheap</p>
                    </div>
                </div>

                <button className='btn bg-green-500 text-white w-[90%] rounded-md mx-auto p-2'>Give Payment</button>
            </div>
        </div>
    )
}

export default Riding