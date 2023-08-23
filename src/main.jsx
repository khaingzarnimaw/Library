import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router'//need for router
import router from './router'//need
import { ThemeContextProvider } from './contexts/ThemeContext'
// import { ThemeContextprovider } from './contexts/ThemeContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeContextProvider>
    <RouterProvider router={router}/>
  </ThemeContextProvider>
    

 
 
)
