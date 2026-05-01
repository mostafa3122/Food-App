import React from 'react'
import logo from "../../../../assets/images/auth-logo.png"
import vector from "../../../../assets/images/vector.png"
import errorImg from "../../../../assets/images/error-404.png"
import gear from "../../../../assets/images/gear.png"
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="bg- position-relative vh-100">
      <div className="logo-container text-center  position-absolute top-0 start-0 w-25  mb-3">
        <img src={logo} alt="auth background" className='w-75' />
      </div>
      <div className="vector position-absolute  bottom-0  end-0">
        <img src={vector} alt="vector" className="  " />
      </div>
      <div className="vector position-absolute  bottom-0  end-0 z-3">
        <img src={errorImg} alt="404error" className="  " />
      </div>
      <div className="gear position-absolute  z-3">
        <img src={gear} alt="gear icon" className="w-100" />
      </div>
      <div className="content position-absolute ">
        <h3 >Oops.... <br />
          <span className='text-success'>Page not found</span>
        </h3>

        <p>This Page doesn’t exist or was removed! We suggest you back to home.</p>
        <Link to={'/dashboard'} className=' btn btn-success py-3 px-5'><i className='fa fa-solid fa-arrow-left me-1'></i> <span>Back To Home</span></Link>
      </div>
    </div>
  )
}
