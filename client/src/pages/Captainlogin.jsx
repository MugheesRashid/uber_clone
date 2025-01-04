import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { captainDataContext } from '../assets/context/CaptainContext'

import axios from 'axios'

function Captainlogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [captainData, setCaptainData] = useState({})
    const {setCaptain} = useContext(captainDataContext)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setCaptainData({email, password})
        console.log(captainData)
        const response = await axios.post('http://localhost:4000/captains/login', captainData)
        const user = response.data.user
        setCaptain(user)
        if(response.data.token){
            localStorage.setItem('token', response.data.token)
            navigate('/captains-home')
        }
        setEmail('')
        setPassword('')
    }

  return (
    <div className='h-screen w-full flex flex-col justify-start mt-[30%]'>
    <img src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' className='absolute top-[5%] left-[10%] w-[80px]'></img>
    <div className="w-full">
        <form className='w-full flex flex-col items-center' action="" onSubmit={handleSubmit}>
            <h1 className='text-[20px] font-semibold mb-1'>What's your email?</h1>
            <input type='email' placeholder='Email' className='w-3/4 mb-2 py-2 px-2 bg-[#eeeeee] rounded-md border border-gray-300' value={email} onInput={(e) => setEmail(e.target.value)} />
            <h1 className='text-[20px] font-semibold mb-1'>Enter your password</h1>
            <input type='password' placeholder='Password' className='w-3/4 mb-2 py-2 px-2 bg-[#eeeeee] rounded-md border border-gray-300' value={password} onInput={(e) => setPassword(e.target.value)} />
            <button type='submit' className='text-center mt-3 bg-black text-white w-3/4 py-2 text-[18px] margin-auto'>Login</button>
        </form>
        <div className="extras w-full flex flex-col items-center">
            <p className='text-[18px] mt-3'>Or</p>
            <Link to={"/captains-login"} className='text-[18px] w-3/4 text-center bg-black text-white py-2 capitalize'>Login as user</Link>
        </div>
        <div className='flex w-full flex-col items-center absolute bottom-3'>
            <p className='text-[18px] mt-3'>Dont had any account?</p>
            <Link to={"/captains-signup"} className='text-[14px] mt-3 font-semibold w-3/4 text-center bg-green-300 text-white py-2 capitalize'>Sign up as captain</Link>
        </div>
    </div>
</div> 
 )
}

export default Captainlogin