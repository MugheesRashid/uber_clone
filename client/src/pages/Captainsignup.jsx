import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { captainDataContext } from '../assets/context/CaptainContext'
import axios from 'axios'

function Captainsignup() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [vehicleType, setVehicleType] = useState('')
    const [plateNumber, setPlateNumber] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [capacity, setCapacity] = useState('')
    const [captainData, setCaptainData] = useState({})

    const { captain, setCaptain } = useContext(captainDataContext)

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            alert("Passwords do not match")
            return
        }
        const captainData = {
            firstName,
            lastName,
            email,
            password,
            vehicleType,
            plateNumber,
            phoneNumber,
            capacity
        }
        setCaptain(captainData)
        
        const response = await axios.post('http://localhost:4000/captains/register', captainData)
        console.log(response)
        if(response.status === 201){
            localStorage.setItem('token', response.data.token)
            navigate('/captains-home')
        }

        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setVehicleType('')
        setPlateNumber('')
        setPhoneNumber('')
    }

    return (
        <div className='min-h-screen w-full flex flex-col justify-start pt-[100px] pb-[80px]'>
            <img src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'
                className='absolute top-[5%] left-[10%] w-[80px]'
                alt="Uber Logo" />
            <div className="w-full">
                <h2 className='text-center text-2xl font-bold mb-6'>Create your account</h2>
                <form className='w-full flex flex-col items-center' onSubmit={handleSubmit}>
                    <div className='w-3/4 space-y-4'>
                        <div>
                            <h1 className='text-[18px] font-semibold mb-1'>First Name</h1>
                            <input type='text'
                                placeholder='Enter your first name'
                                className='w-full py-3 px-4 bg-[#f8f8f8] rounded-lg border border-gray-300 focus:outline-none focus:border-black'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)} />
                        </div>

                        <div>
                            <h1 className='text-[18px] font-semibold mb-1'>Last Name</h1>
                            <input type='text'
                                placeholder='Enter your last name'
                                className='w-full py-3 px-4 bg-[#f8f8f8] rounded-lg border border-gray-300 focus:outline-none focus:border-black'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)} />
                        </div>

                        <div>
                            <h1 className='text-[18px] font-semibold mb-1'>Email</h1>
                            <input type='email'
                                placeholder='Enter your email'
                                className='w-full py-3 px-4 bg-[#f8f8f8] rounded-lg border border-gray-300 focus:outline-none focus:border-black'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div>
                            <h1 className='text-[18px] font-semibold mb-1'>Password</h1>
                            <input type='password'
                                placeholder='Create a password'
                                className='w-full py-3 px-4 bg-[#f8f8f8] rounded-lg border border-gray-300 focus:outline-none focus:border-black'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div>
                            <h1 className='text-[18px] font-semibold mb-1'>Confirm Password</h1>
                            <input type='password'
                                placeholder='Confirm your password'
                                className='w-full py-3 px-4 bg-[#f8f8f8] rounded-lg border border-gray-300 focus:outline-none focus:border-black'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>

                        <div>
                            <h1 className='text-[18px] font-semibold mb-1'>Vehicle Type</h1>
                            <select
                                className='w-full py-3 px-4 bg-[#f8f8f8] rounded-lg border border-gray-300 focus:outline-none focus:border-black'
                                value={vehicleType}
                                onChange={(e) => setVehicleType(e.target.value)}
                            >
                                <option value="">Select a vehicle type</option>
                                <option value="bike">Bike</option>
                                <option value="car">Car</option>
                                <option value="auto">Auto Rickshaw</option>
                            </select>
                        </div>

                        <div>
                            <h1 className='text-[18px] font-semibold mb-1'>Plate Number</h1>
                            <input type='text'
                                placeholder='Enter plate number'
                                className='w-full py-3 px-4 bg-[#f8f8f8] rounded-lg border border-gray-300 focus:outline-none focus:border-black'
                                value={plateNumber}
                                onChange={(e) => setPlateNumber(e.target.value)} />
                        </div>

                        <div>
                            <h1 className='text-[18px] font-semibold mb-1'>Capacity</h1>
                            <input type='number'
                                placeholder='Enter Capacity'
                                className='w-full py-3 px-4 bg-[#f8f8f8] rounded-lg border border-gray-300 focus:outline-none focus:border-black'
                                value={capacity}
                                onChange={(e) => setCapacity(e.target.value)} />
                        </div>

                        <div>
                            <h1 className='text-[18px] font-semibold mb-1'>Phone Number</h1>
                            <input type='tel'
                                placeholder='Enter phone number'
                                className='w-full py-3 px-4 bg-[#f8f8f8] rounded-lg border border-gray-300 focus:outline-none focus:border-black'
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)} />
                        </div>

                        <button type='submit'
                            className='w-full py-3 mt-6 bg-black text-white text-[18px] rounded-lg hover:bg-gray-800 transition-colors'>
                            Sign Up
                        </button>
                    </div>
                </form>

                <div className="w-full flex flex-col items-center mt-6">
                    <p className='text-[18px] text-gray-600'>Or</p>
                    <Link to="/users-login"
                        className='mt-4 w-3/4 py-3 text-center bg-white text-black border-2 border-black rounded-lg text-[18px] hover:bg-gray-100 transition-colors'>
                        Already have an account? Log in
                    </Link>
                </div>

                <div className='w-full flex flex-col items-center mt-8'>
                    <Link to="/users-signup"
                        className='w-3/4 py-3 text-center bg-green-500 text-white rounded-lg text-[16px] font-semibold hover:bg-green-600 transition-colors'>
                        Sign up as User instead
                    </Link>
                </div>
            </div>
        </div>)
}

export default Captainsignup