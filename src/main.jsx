import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router'//need for router
import router from './router'//need
import { ThemeContextProvider } from './contexts/ThemeContext'
// import { ThemeContextprovider } from './contexts/ThemeContext'
import AuthContextProvider from './contexts/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <ThemeContextProvider>
      <RouterProvider router={router}/>
    </ThemeContextProvider>
  </AuthContextProvider>

 
 
)
