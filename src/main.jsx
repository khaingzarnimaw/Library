import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router'//need for router
import router from './router'//need

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <RouterProvider router={router} />
 
)
