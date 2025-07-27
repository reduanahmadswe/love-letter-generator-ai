import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ValentineContextProvider } from './Context/ValentineContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ValentineContextProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </ValentineContextProvider>
  </StrictMode>
)
