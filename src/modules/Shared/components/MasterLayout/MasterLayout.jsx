import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar'
import Sidbar from '../Sidbar/Sidbar'

export default function MasterLayout() {
  return (
    <div className='d-flex'>
      <Sidbar />
      <div className="w-100">
        <Navbar />
        <Header />
        <Outlet />
      </div>
    </div>
  )
}
