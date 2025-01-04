import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../assets/context/UserContext'

function UserProtectedWrapper({children}) {
    const token = localStorage.getItem('userToken')
    const navigate = useNavigate()
    const { setUser } = useContext(UserDataContext)

    useEffect(() => {
        if (!token) {
            navigate('/users-login')
        } else {
            const fetchUserProfile = async () => {
                try {
                    const response = await axios.get('http://localhost:4000/users/profile', {
                        headers: { authorization: `Bearer ${token}` }
                    })
                    if (response.status === 200) {
                        setUser(response.data)
                    }
                } catch (error) {
                    console.error(error)
                    navigate('/users-login')
                }
            }
            fetchUserProfile()
        }
    }, [token, navigate, setUser])

    return (
        <>
            {children}
        </>
    )
}

export default UserProtectedWrapper