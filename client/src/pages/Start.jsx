import React from 'react'
import { Link } from 'react-router-dom'

function Start() {
  return (
    <div className='h-screen w-full flex flex-col'>
        <div className="upper h-[80%] w-full flex items-center justify-center">
            <img src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' className='absolute top-[5%] left-[10%] w-[80px]'></img>
             <img className='h-full' src="https://images.unsplash.com/photo-1557404763-69708cd8b9ce?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </div>
        <div className="btn-section flex flex-col items-center justify-center gap-[5px] h-[20%]">
         <h2 className='text-[20px] font-semibold text-center'>Get Started With Uber</h2>
         <Link to='/users-login' className='text-center bg-black text-white w-3/4 py-2 rounded-md text-[18px] margin-auto'>Continue</Link>
        </div>
    </div>
  )
}

export default Start