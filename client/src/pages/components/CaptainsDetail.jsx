import React from 'react'
import { CiClock2 } from "react-icons/ci";
import { IoSpeedometerOutline } from "react-icons/io5";
import { IoWalletOutline } from "react-icons/io5";

function CaptainsDetail({captain}) {
    return (
        <div className="fixed bottom-0 left-0 h-1/2 w-full py-3 px-2 bg-white">
            <div className="captainDetails flex flex-row justify-between items-center px-3 py-1">
                <img className='w-[35%]' src="./car.png" alt="" />
                <div className="details flex items-left flex-col justify-between">
                    <h2 className='text-md w-full text-right'>{captain.firstName} {captain.lastName}</h2>
                    {captain.vehicle && <p className='font-semibold text-xl w-full text-right'>{captain.vehicle.plateNumber}</p>}
                    {captain.vehicle && <p className='w-full text-right capitalize'>{captain.vehicle.vehicleType}</p>}
                </div>
            </div>
            <div className="ride-details bg-[#be9d39] h-1/2 mt-2 w-full rounded-lg flex flex-row overflow-hidden">
                <div className="time-statics w-1/3 py-3 h-full flex flex-col items-center justify-center">
                    <CiClock2 className='text-4xl' />
                    <h1 className='font-semibold text-lg'>15h</h1>
                    <p className='text-sm'>Total Time</p>
                </div>
                <div className="speed-statics w-1/3 py-3 h-full flex flex-col items-center justify-center">
                    <IoSpeedometerOutline className='text-4xl' />
                    <h1 className='font-semibold text-lg'>200km</h1>
                    <p className='text-sm'>Total distance</p>
                </div>
                <div className="payment-statics w-1/3 py-3 h-full flex flex-col items-center justify-center">
                    <IoWalletOutline className='text-4xl' />
                    <h1 className='font-semibold text-lg'>Rs. 2000</h1>
                    <p className='text-sm'>Total Earning</p>
                </div>
            </div>
        </div>
    )
}

export default CaptainsDetail