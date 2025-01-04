import React from 'react'
import { BsPeopleFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

function VehiclePanel(props) {

    const vehicles = [
        {
            name: "car",
            distance: "2 km",
            img: "./car.png",
            time: "15:24",
            price: props.allFare.fare.car
        },
        {
            name: "bike",
            distance: "2 km",
            img: "./bike.png",
            time: "15:24",
            price: props.allFare.fare.bike
        },
        {
            name: "auto",
            distance: "2 km",
            img: "./auto.png",
            time: "15:24",
            price: props.allFare.fare.auto
        }
    ]
    const submitHandler = (idx) => {
        props.setVehicleType(vehicles[idx].name)
        props.setFare(vehicles[idx].price)
        props.setVehiclePanel(false);
        props.setConfirmRide(true);
    }
    return (
        <div className="output-section h-[70vh] transition-all linear duration-1000 z-40 fixed bottom-0 left-0 w-full bg-white py-4 px-1">
            <IoIosArrowDown onClick={() => { props.setVehiclePanel(false); props.setShowLocationPanel(true) }} className='inline-block text-2xl font-semibold absolute top-5 left-1 rotate-90' />
            <h1 className='top-0 left-8 w-full relative text-2xl inline-block'>Select Vehicle</h1>
            <hr />
            {vehicles.map((vehicle, index) => (
                <div onClick={() => submitHandler(index)} key={index} className="drives flex flex-row gap-1 w-[95%] h-[13vh] border-2 border-solid border-grey-500 rounded-md mb-1 mt-1 mx-auto">
                    <img src={vehicle.img} alt="Car Image" className='w-[22%] h-[100%]' />
                    <div className="info flex flex-col w-[60%]">
                        <h1 className='text-2xl font-semibold'>{vehicle.name} <span className='text-sm text-gray-500 inline-block vertical-align-top - mt-1 ml-1'><BsPeopleFill className='text-sm inline-block mr-1' />4</span></h1>
                        <h2 className='text-sm text-black'>{vehicle.distance} away: {vehicle.time}</h2>
                        <h3 className='text-sm text-gray-800'>Affordable,comfortable,safe</h3>
                    </div>
                    <div className="price whitespace-nowrap h-full p-1 mr-2">
                        <h1 className='text-[18px] font-semibold'>Rs. {vehicle.price}</h1>
                    </div>
                </div>))}
        </div>)
}

export default VehiclePanel