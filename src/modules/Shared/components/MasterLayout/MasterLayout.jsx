import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Sidbar from '../Sidbar/Sidbar'

export default function MasterLayout({ loginData, setLoginData }) {
  return (
    <div className='d-flex'>
      <Sidbar setLoginData={setLoginData} />
      <div className=" w-100 pt-3 mx-3">
        <Navbar loginData={loginData} />
        <Outlet />
      </div>
    </div>
  )
}
