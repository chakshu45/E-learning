import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './globals.css'
import { AuthProvider } from './context/AuthContext'
import GoogleProviderWrapper from './components/GoogleProviderWrapper'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleProviderWrapper>
        <AuthProvider>
          <App />
        </AuthProvider>
      </GoogleProviderWrapper>
    </BrowserRouter>
  </React.StrictMode>,
)
