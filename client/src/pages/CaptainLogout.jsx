import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function CaptainLogout() {
    const navigate = useNavigate()
    useEffect(() => {
        localStorage.removeItem('token')
        navigate('/captains-login')
    }, [])
}

export default CaptainLogout