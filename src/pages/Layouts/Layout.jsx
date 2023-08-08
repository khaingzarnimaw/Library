import React from 'react'
import { Outlet } from 'react-router'
const Layout = () => {
  return (
    <div>
      <nav>
        <ul>
            <li>Home</li>
            <li>Create</li>
        </ul>
      </nav>

     {/* dynamic route changes content */}
     <Outlet/>
    </div>
  )
}

export default Layout
