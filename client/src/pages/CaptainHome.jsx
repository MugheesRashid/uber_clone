import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MdLogout } from "react-icons/md";
import CaptainsDetail from './components/CaptainsDetail';
import OrderPopup from './components/OrderPopup';
import ConfirmRidePopup from './components/ConfirmRidePopup';
import { captainDataContext } from '../assets/context/CaptainContext';
import { useSocket } from '../assets/context/SocketContext';

const CaptainHome = () => {
  const [ridePopup, setRidePopup] = useState(true)
  const [confirmRidePopup, setConfirmRidePopup] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  const { captain } = useContext(captainDataContext)
  const { sendMessage } = useSocket()

  useEffect(() => {
    sendMessage('join', {userType: "captain", userId: captain._id})
  }, [captain])

  return (
    <>
      <div className="h-screen w-screen relative">
        <div className="logo flex flex-row justify-between p-2 absolute top-0 left-0 w-full">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="Logo" className='w-25 h-10 mix-blend-multiply' />
          <Link to='/captains-logout' className='btn bg-zinc-300 rounded-full text-white p-2'><MdLogout className='text-2xl' /></Link>
        </div>

        <div className="map w-full h-screen">
          <img className='w-full h-full' src="" alt="" />
        </div>
        <CaptainsDetail captain={captain} />
        {ridePopup && <OrderPopup setRidePopup={setRidePopup} setConfirmRidePopup={setConfirmRidePopup} />}
        {confirmRidePopup && <ConfirmRidePopup setRidePopup={setRidePopup} setConfirmRidePopup={setConfirmRidePopup}  />}
      </div>
    </>
  )
}

export default CaptainHome