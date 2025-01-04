import React, { useContext, useState, useEffect } from 'react'
import { UserDataContext } from '../assets/context/UserContext'
import { Link } from 'react-router-dom'
import LocationPanel from './components/LocationPanel'
import VehiclePanel from './components/VehiclePanel'
import ConfirmRide from './components/ConfirmRide'
import WaitingForRide from './components/WaitingForRide';
import axios from 'axios'
import { useSocket } from '../assets/context/SocketContext'

function Home() {
  const { user, setUser } = useContext(UserDataContext)
  const [height, setHeight] = useState("33vh")
  const [showLocationPanel, setShowLocationPanel] = useState(true)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRide, setConfirmRide] = useState(false)
  const [waitingForRide, setWaitingForRide] = useState(false)


  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [fare, setFare] = useState("")
  const [allFare, setAllFare] = useState({})
  const [vehicleType, setVehicleType] = useState("car")

  const { sendMessage, receiveMessage } = useSocket()

  useEffect(() => {
    if (user && user._id) {
      sendMessage('join', {userType: "user", userId: user._id})
    }
  }, [user])
 const createRide = async () => {
  try {
    const response = await axios.post(`http://localhost:4000/ride/create-ride`, {
      pickup,
      destination,
      vehicleType,
    }, {
        headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` },
      }
    )
    console.log(response.data)
  } catch (error) {
    console.log(error)
  }
}

  return (
    <>
      <div className="h-screen w-screen">
        <div className="logo flex flex-row justify-between p-2 absolute top-0 left-0 w-full">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="Logo" className='w-25 h-10 mix-blend-multiply' />
          <Link to='/users-logout' className='btn bg-red-500 text-white p-2'>Logout</Link>
        </div>

        <div className="map w-full h-screen">
          <img className='w-full h-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2_EHQBIbIu8wvGNMyDSozqbNNAkOhdLHW5Q&s" alt="" />
        </div>
        {showLocationPanel && <LocationPanel setShowLocationPanel={setShowLocationPanel} setVehiclePanel={setVehiclePanel} height={height} setHeight={setHeight} pickup={pickup} destination={destination} setPickup={setPickup} setDestination={setDestination} setAllFare={setAllFare} />}
        {vehiclePanel && <VehiclePanel setShowLocationPanel={setShowLocationPanel} vehiclePanel={vehiclePanel} setVehiclePanel={setVehiclePanel} setConfirmRide={setConfirmRide} setFare={setFare} allFare={allFare} setVehicleType={setVehicleType} />}
        {confirmRide && <ConfirmRide createRide={createRide} setConfirmRide={setConfirmRide} setVehiclePanel={setVehiclePanel} setWaitingForRide={setWaitingForRide} vehicleType={vehicleType} fare={fare} pickup={pickup} destination={destination} />}
        {waitingForRide && <WaitingForRide vehicleType={vehicleType} fare={fare} pickup={pickup} destination={destination} />}
      </div>
    </>
  )
}


export default Home