import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MdLogout } from "react-icons/md";
import CaptainsDetail from './components/CaptainsDetail';
import OrderPopup from './components/OrderPopup';
import ConfirmRidePopup from './components/ConfirmRidePopup';
import { captainDataContext } from '../assets/context/CaptainContext';
import { useSocket } from '../assets/context/SocketContext';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const CaptainHome = () => {
  const [ridePopup, setRidePopup] = useState(false)
  const [confirmRidePopup, setConfirmRidePopup] = useState(false)
  const [ride, setRide] = useState(null)

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  const { captain } = useContext(captainDataContext)
  const { sendMessage, receiveMessage } = useSocket()

  useEffect(() => {
    sendMessage('join', {userType: "captain", userId: captain._id})
    receiveMessage('newRide', (ride) => {
      setRidePopup(true)
      setRide(ride)
    })

  // setInterval(() => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     console.log(position)
  //     sendMessage('updateCaptainLocation', {userId: captain._id, location: position.coords})
  //   })
  // }, 3000)
  }, [captain, ridePopup])

  const confirmRideHandler =async () => {

    const response = await axios.post("http://localhost:4000/ride/confirm-ride",{
      rideId: ride._id,
      captainId: captain._id,},{
      headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` },
    })
    if(response.status == 200){
      setRidePopup(false)
      setConfirmRidePopup(true)
    }
    else{
      console.log("Nahi hui Confirm")
    }
  }

  const startRideHandler = async (otp) => {
    const response = await axios.post("http://localhost:4000/ride/start-ride",{
      otp: otp,
      rideId: ride._id
    },{
      headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` },
    })

    if(response.status == 200){
      navigate("/captains-riding")
    }
    else{
      console.log("Nahi hui Start")
    }
  }

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
        {ridePopup && <OrderPopup setRidePopup={setRidePopup} setConfirmRidePopup={setConfirmRidePopup} ride={ride} confirmRideHandler={confirmRideHandler} />}
        {confirmRidePopup && <ConfirmRidePopup setRidePopup={setRidePopup} setConfirmRidePopup={setConfirmRidePopup} ride={ride} startRideHandler={startRideHandler} />}
      </div>
    </>
  )
}

export default CaptainHome