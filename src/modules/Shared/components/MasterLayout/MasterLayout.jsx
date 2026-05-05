import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Sidbar from '../Sidbar/Sidbar'

export default function MasterLayout({ loginData, setLoginData }) {
  return (
    <div className='d-flex vh-100 overflow-hidden'>

      {/* Sidebar */}
      <div className="h-100 position-sticky top-0 flex-shrink-0">
        <Sidbar setLoginData={setLoginData} />
      </div>

      {/* Main Content */}
      <div className="w-100 h-100 overflow-auto pt-3 mx-3">
        <Navbar loginData={loginData} />
        <Outlet />
      </div>

    </div>
  )
}