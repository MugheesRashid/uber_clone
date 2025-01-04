import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function UserLogout() {
    
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.removeItem('userToken')
        navigate('/users-login')
    }, [])
}

export default UserLogout