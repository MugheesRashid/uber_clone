import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { MdLocationOn } from "react-icons/md";
import axios from 'axios'

function LocationPanel(props) {
  const [locations, setLocations] = useState([])
  const [activeField, setActiveField] = useState('pickup')

  const sanitizeLocation = (location) => {
    return location.replace(/\s*,\s*/g, ", ").trim().split(",").join("").toLowerCase();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    props.setHeight('100vh');

    try {
      const sanitizedPickup = sanitizeLocation(props.pickup);
      const sanitizedDestination = sanitizeLocation(props.destination);

      if (!sanitizedPickup || !sanitizedDestination) {
        throw new Error("Invalid input. Please provide valid pickup and destination addresses.");
      }
      const response = await axios.post(
        `http://localhost:4000/ride/get-fare`,
        { pickup: sanitizedPickup, destination: sanitizedDestination },
        {
          headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` },
        }
      );

      props.setAllFare(response.data)
      props.setShowLocationPanel(false);
      props.setVehiclePanel(true);
    } catch (error) {
      console.error("Error while fetching fare:", error.message);

      alert(error.message || "An error occurred while processing your request.");
    }
  };

  const suggestLocation = async (input) => {
    const response = await axios.get(`http://localhost:4000/map/get-suggestions?input=${input}`, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
    const locations = response.data.suggestions.map(suggestion => suggestion.description)
    setLocations(locations)
  }

  const setLocation = (location) => {
    if (activeField === 'pickup') {
      props.setPickup(location)
    } else {
      props.setDestination(location)
    }
  }

  return (
    <div style={{ height: props.height }} className={`trip transition-all linear duration-1000 w-full overflow-hidden absolute bottom-0 left-0 bg-white`}>
      <div className="input-section w-full p-3 h-[32vh]">
        <h1 className='text-2xl mb-3'>Find a Trip</h1>
        <h2 onClick={() => props.setHeight('33vh')} className='text-2xl absolute top-4 right-4'><IoIosArrowDown className='text-2xl' /></h2>
        <form className='flex flex-col justify-between gap-3 relative'>
          <div className="line w-1 h-[13vh] bg-black absolute top-0 left-[3%]"></div>
          <input onClick={() => { props.setHeight('100vh'); setActiveField('pickup') }} onInput={(e) => { setLocation(e.target.value); suggestLocation(e.target.value) }} value={props.pickup} className='p-2 ml-5 bg-zinc-200 rounded-md w-[85%] outline-none border-none focus:border-yellow-600 focus:border-2 focus:border-solid' type="text" placeholder='Enter your location' />
          <input onClick={() => { props.setHeight('100vh'); setActiveField('destination') }} onInput={(e) => { setLocation(e.target.value); suggestLocation(e.target.value) }} value={props.destination} className='p-2 ml-5 bg-zinc-200 rounded-md w-[85%] outline-none border-none focus:border-yellow-600 focus:border-2 focus:border-solid' type="text" placeholder='Enter your destination' />
          <button onClick={handleSubmit} className='p-2 rounded-md bg-blue-500 text-white' type='submit'>Search</button>
        </form>
      </div>
      <div className="output-section h-[68vh] w-full relative bg-white z-30">
        {locations.map((location, index) => (
          <div key={index} onClick={() => { setLocation(location) }} className="locations flex flex-row h-[auto] w-[100%] bg-zinc-100 my-2 px-3 py-2">
            <div className="icon w-[10%] h-full">
              <MdLocationOn className='h-full w-full' />
            </div>
            <div className="location-name w-[85%] h-full px-4 ">
              <h1>{location}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LocationPanel