import React from 'react'
import Header from '../../../Shared/components/Header/Header'
import headerGirl from '../../../../assets/images/header-girl.png'
import { Link } from 'react-router-dom'

export default function Dashboard({ loginData }) {
  return (
    <div className='position-relative'>
      <Header
        title={<>Welcome <span>{loginData?.userName}!</span> </>}
        description={'This is a welcoming screen for the entry of the application ,  you can now see the options'}
        imgUrl={headerGirl}
      />
      <div className="container-fluid">
        <div className="row bg-dash  rounded rounded-4 mt-2 px-5 py-4 justify-content-center align-items-center">
          <div className="col-md-6">
            <h3>Fill <span className='text-success'>the Recipes</span> !</h3>
            <p className='mt-2 header-desc'> you can now fill the meals easily using the table and form , <br />
              click here and sill it with the table !</p>
          </div>
          <div className="col-md-6">

            <div className=" d-flex justify-content-end">
              <Link to='/dashboard/recipes' className=' bg-success rounded rounded-3  px-4 py-2 d-flex justify-content-center gap-2 text-decoration-none text-white align-items-center'>
                <span>Fill Recipes</span>
                <i className="fa-solid  fa-arrow-right"></i>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
