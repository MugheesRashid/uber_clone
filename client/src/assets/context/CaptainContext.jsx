import React, { createContext, useState } from 'react'

export const captainDataContext = createContext()

export const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const value = {
        captain,
        loading,
        error,
        setCaptain,
        setLoading,
        setError
    }

    return <captainDataContext.Provider value={value}>{children}</captainDataContext.Provider>
}