import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContext from './assets/context/userContext.jsx'
import { CaptainContext } from './assets/context/CaptainContext.jsx'
import { SocketContextProvider } from './assets/context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
    <CaptainContext>
      <UserContext>
        <BrowserRouter>
          <SocketContextProvider>
            <App />
          </SocketContextProvider>
        </BrowserRouter>
      </UserContext>
    </CaptainContext>
)
