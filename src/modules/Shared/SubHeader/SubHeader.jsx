import React from 'react'
import { Link } from 'react-router-dom'

export default function SubHeader({ subTitle, subDescription, btnText, btnUrl }) {
    return (
        <div className="container-fluid">
            <div className="row bg-dash  rounded rounded-4 mt-2 px-5 py-4 justify-content-center align-items-center">
                <div className="col-12 col-md-7 mb-4 mb-md-0">
                    <h3>{subTitle}<span className='text-success'> Recipes</span> !</h3>
                    <p className='mt-2 header-desc'> {subDescription}</p>
                </div>
                <div className="col-12 col-md-5  text-center text-md-end">

                    <div className=" d-flex justify-content-center justify-content-md-end">
                        <Link to={btnUrl} className=' bg-success rounded rounded-3  px-4 py-2 d-flex justify-content-center gap-2 text-decoration-none text-white align-items-center'>
                            <span>{btnText}</span>
                            <i className="fa-solid  fa-arrow-right"></i>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    )
}
