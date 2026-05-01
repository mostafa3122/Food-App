import React from 'react'
export default function Header({ imgUrl, title, description, loginData }) {
  return (
    <div className='px-5  header-bg rounded rounded-4  text-white '>
      <div className=" container-fluid">
        <div className="row  justify-content-between">
          <div className="col-md-6  d-flex align-items-center">
            <div className=" ">
              <h3 className='header-title'>{title} <span>{loginData}</span></h3>
              <p className='header-desc '>{description}</p>
            </div>
          </div>
          <div className="col-md-4  text-end ">
            <img className={`  img-fluid`}src={imgUrl} alt="header-Photo" />
          </div>
        </div>
      </div>
    </div>
  )
}