import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { UserDataContext } from '../assets/context/UserContext'

function Usersignup() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [userData, setUserData] = useState({})

    const navigate = useNavigate()

    const { user, setUser } = useContext(UserDataContext)


    const handleSubmit = async (e) => {
        if (password !== confirmPassword) {
            alert("Passwords do not match")
            e.preventDefault()
            return
        }
        e.preventDefault()
        const userData = {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        }
        setUserData(userData)
        console.log(user)

        const response = await axios.post(`http://localhost:4000/users/register`, userData)

        if (response.status === 200) {
            const data = response.data
            localStorage.setItem('userToken', data.token)
            navigate('/home')
        } else {
            const error = response.data.errors.msg
            alert(error)
        }

        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
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
                    <Link to="/captains-signup" 
                          className='w-3/4 py-3 text-center bg-green-500 text-white rounded-lg text-[16px] font-semibold hover:bg-green-600 transition-colors'>
                        Sign up as Captain instead
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Usersignup