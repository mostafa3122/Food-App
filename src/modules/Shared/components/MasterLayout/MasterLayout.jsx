import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Sidbar from '../Sidbar/Sidbar'

export default function MasterLayout() {

  return (
    <div className='d-flex vh-100 overflow-hidden'>

      {/* Sidebar */}
      <div className="">
        <Sidbar  />
      </div>

      {/* Main Content */}
      <div className="w-100 h-100 overflow-auto pt-3 mx-3">
        <Navbar  />
        <Outlet />
      </div>

    </div>
  )
}