import React from 'react'
import noData from '../../../../assets/images/no-data.png'
export default function NoData() {
  return (
    <div className=' text-center d-flex flex-column gap-2 justify-content-center align-items-center '>
      <img src={noData} alt="no data" />
      <h4 className='fw-bold '>No Data !</h4>
      <p>There is no data </p>
    </div>
  )
}
