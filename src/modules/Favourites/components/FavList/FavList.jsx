import React from 'react'
import headerMan from '../../../../assets/images/header-man.png'
import Header from '../../../Shared/components/Header/Header'

export default function FavList() {
  return (
    <>
      <Header
        title={<>Recipes <span>Items</span></>}
        description={"You can now add your items that any user can order it from the Application and you can edit"}
        imgUrl={headerMan}
      />
    </>
  )
}
