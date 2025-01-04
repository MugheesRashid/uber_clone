import React, { createContext, useState, useEffect } from 'react'

export const UserDataContext = createContext()

function UserContext({children}) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    try {
      return savedUser ? JSON.parse(savedUser) : null
    } catch (error) {
      console.error("Error parsing user data from localStorage", error)
      return null
    }
  })

  const value = {
    user,
    setUser
  }

  return (
    <div>
      <UserDataContext.Provider value={value}>
        { children }
      </UserDataContext.Provider>
    </div>
  )
}

export default UserContext