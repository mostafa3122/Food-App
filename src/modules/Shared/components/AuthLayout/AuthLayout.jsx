import React from 'react'
import logo from "../../../../assets/images/auth-logo.png"
import { Outlet } from 'react-router-dom'
export default function AuthLayout() {
  return (
    <div className='auth-container'>
      <div className="container-fluid bg-overlay ">
        <div className="row px-5  vh-100  justify-content-center align-items-center">
          <div className=" col-lg-5 col-md-6   rounded rounded-2 px-5 py-4 bg-white">
            <div className="logo-container text-center mb-3">
              <img src={logo} alt="auth background" className='w-75' />
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
