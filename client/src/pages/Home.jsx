import React, { useContext, useState, useEffect } from 'react'
import { UserDataContext } from '../assets/context/UserContext'
import { Link, useNavigate } from 'react-router-dom'
import LocationPanel from './components/LocationPanel'
import VehiclePanel from './components/VehiclePanel'
import ConfirmRide from './components/ConfirmRide'
import WaitingForRide from './components/WaitingForRide';
import axios from 'axios'
import { useSocket } from '../assets/context/SocketContext'
import UserRideConfirmed from './components/UserRideConfirmed'
import LiveTracking from './components/LiveTracking'

function Home() {
  const { user, setUser } = useContext(UserDataContext)
  const navigate = useNavigate()
  const [height, setHeight] = useState("33vh")
  const [showLocationPanel, setShowLocationPanel] = useState(true)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRide, setConfirmRide] = useState(false)
  const [waitingForRide, setWaitingForRide] = useState(false)
  const [userRideConfirmed, setUserRideConfirmed] = useState(false)


  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [fare, setFare] = useState("")
  const [allFare, setAllFare] = useState({})
  const [vehicleType, setVehicleType] = useState("car")
  const [ride, setRide] = useState(null)

  const { sendMessage, receiveMessage } = useSocket()

  useEffect(() => {
    if (user && user._id) {
      sendMessage('join', { userType: "user", userId: user._id })
    }
    receiveMessage('rideAccepted', (data) => {
      setUserRideConfirmed(true)
      setWaitingForRide(false)
      setRide(data)
    })

    receiveMessage('rideStarted', (data) => {
      setUserRideConfirmed(false)
      navigate('/riding', { state: { ride: data } })
    })
  }, [user, ride, setRide])


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

        <div className="map w-full h-screen relative z-[0]">
          <LiveTracking />
        </div>
        {showLocationPanel && <LocationPanel setShowLocationPanel={setShowLocationPanel} setVehiclePanel={setVehiclePanel} height={height} setHeight={setHeight} pickup={pickup} destination={destination} setPickup={setPickup} setDestination={setDestination} setAllFare={setAllFare} />}
        {vehiclePanel && <VehiclePanel setShowLocationPanel={setShowLocationPanel} vehiclePanel={vehiclePanel} setVehiclePanel={setVehiclePanel} setConfirmRide={setConfirmRide} setFare={setFare} allFare={allFare} setVehicleType={setVehicleType} />}
        {confirmRide && <ConfirmRide createRide={createRide} setConfirmRide={setConfirmRide} setVehiclePanel={setVehiclePanel} setWaitingForRide={setWaitingForRide} vehicleType={vehicleType} fare={fare} pickup={pickup} destination={destination} />}
        {waitingForRide && <WaitingForRide vehicleType={vehicleType} fare={fare} user={user} pickup={pickup} destination={destination} />}
        {userRideConfirmed && <UserRideConfirmed ride={ride} />}
      </div>
    </>
  )
}


export default Home