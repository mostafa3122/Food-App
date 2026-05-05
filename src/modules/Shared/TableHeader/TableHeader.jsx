import React from 'react'
import { Link } from 'react-router-dom'

export default function TableHeader({ subHeaderTitle, subHeaderPath, onAddClick }) {
    return (
        <div className="container-fluid">
            <div className="row  justify-content-center align-items-center  text-md-start">
                <div className="col-12 col-md-7 mb-2 mb-md-0">
                    <h6 className='mb-0'>{subHeaderTitle} Table Details</h6>
                    <p>You can check all details</p>
                </div>
                <div className="col-12 col-md-5  text-center text-md-end">
                    <div className=" d-flex  justify-content-md-end">
                        <Link to={subHeaderPath} onClick={onAddClick} className=' bg-success rounded rounded-3  px-4 py-2 d-flex justify-content-center gap-2 text-decoration-none text-white align-items-center'>
                            <span>Add New Item</span>
                            <i className="fa-solid  fa-arrow-right"></i>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}
