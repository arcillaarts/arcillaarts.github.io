import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import 'bootstrap/dist/css/bootstrap-utilities.min.css'
import './index.css'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster 
      position="bottom-right"
      toastOptions={{
        style: {
          background: 'var(--color-dark)',
          color: 'var(--color-cream)',
          fontFamily: "'Inter', sans-serif"
        },
      }}
    />
  </React.StrictMode>,
)
