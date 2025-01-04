import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Start from './pages/Start'
import Home from './pages/Home'
import UserLogin from './pages/Userlogin'
import UserSignup from './pages/Usersignup'
import CaptainSignup from './pages/Captainsignup'
import CaptainLogin from './pages/Captainlogin'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainLogout from './pages/CaptainLogout'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'
import CaptainRiding from './pages/CaptainRiding'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/users-login' element={<UserLogin />} />
        <Route path='/users-signup' element={<UserSignup />} />
        <Route path='/captains-login' element={<CaptainLogin />} />
        <Route path='/captains-signup' element={<CaptainSignup />} />
        <Route path='/captains-riding' element={<CaptainRiding />} />
        <Route path='/home' element={
          <UserProtectedWrapper>
            <Home />
          </UserProtectedWrapper>
        }></Route>
        <Route path='/users-logout' element={
          <UserProtectedWrapper>
            <UserLogout />
          </UserProtectedWrapper>
        } />
        <Route path='/captains-home' element={
          <CaptainProtectedWrapper>
            <CaptainHome />
          </CaptainProtectedWrapper>
        } />
        <Route path='/captains-logout' element={
          <CaptainProtectedWrapper>
            <CaptainLogout />
          </CaptainProtectedWrapper>
        } />
      </Routes>
    </>
  )
}

export default App
