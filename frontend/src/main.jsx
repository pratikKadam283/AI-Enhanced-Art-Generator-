import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ArtProvider from './context/artContext.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <ArtProvider>
    <App />

  </ArtProvider>

  // </StrictMode>,
)
