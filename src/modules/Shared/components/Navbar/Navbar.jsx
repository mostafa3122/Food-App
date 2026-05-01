import React from 'react'
import avatar from '../../../../assets/images/avatar.png'
export default function Navbar({ loginData }) {
  return (

    <>
      <nav className="navbar navbar-expand-lg bg-light rounded rounded-4 mb-2">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">FoodApp</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav align-items-center ms-auto gap-3 mb-2 mb-lg-0">
              <li className="nav-item d-flex justify-content-center gap-3 align-items-center">
                <img className='avatar' src={avatar} alt="avatar-photo" />
                <a className="nav-link active" aria-current="page" href="#">{loginData?.userName}</a>
                <a className="nav-link active" aria-current="page" href="#"><i className='fa-solid fa-angle-down'></i></a>
              </li>
              <li className="nav-item">
                <a className="position-relative nav-link active" aria-current="page" href="#">
                  <i className="fa-solid fa-bell fs-4"> <span
                  className="position-absolute top-0 translate-middle-x p-1 bg-danger border border-4 border-white rounded-circle"
                ></span> </i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      


    </>
  )
}
