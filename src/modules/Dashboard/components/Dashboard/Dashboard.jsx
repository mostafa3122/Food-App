import React, { useContext } from 'react'
import Header from '../../../Shared/components/Header/Header'
import headerGirl from '../../../../assets/images/header-girl.png'
import { Link } from 'react-router-dom'
import SubHeader from '../../../Shared/SubHeader/SubHeader'
import { AuthContext } from '../../../../context/AuthContext'

export default function Dashboard() {
  const { loginData } = useContext(AuthContext)

  return (
    <div className='position-relative'>
      <Header
        title={<>Welcome <span>{loginData?.userName}!</span> </>}
        description={<>This is a welcoming screen for the entry of the application ,<br />  you can now see the options</>}
        imgUrl={headerGirl}
      />
      <SubHeader
        subTitle={"Fill The"}
        subDescription={<>you can now fill the meals easily using the table and form ,<br /> click here and sill it with the table !</>}
        btnText={"Fill Recipes"}
        btnUrl={"/dashboard/Recipes"}
      />
    </div>
  )
}
