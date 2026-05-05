import React from 'react'
export default function Header({ imgUrl, title, description, loginData }) {
  return (
    <div className='px-3 px-md-5 py-3 header-bg rounded-4 text-white '>
      <div className=" container-fluid">
        <div className="row  align-items-center  text-md-start">
          <div className="col-12 col-md-7 mb-4 mb-md-0">

            <h3 className='header-title'>{title} <span>{loginData}</span></h3>
            <p className='header-desc  '>{description}</p>

          </div>
          <div className="col-12 col-md-5  text-center text-md-end ">
            <img className="img-fluid " src={imgUrl} alt="header-Photo" />
          </div>
        </div>
      </div>
    </div>
  )
}