import React from 'react'
import Header from '../../../Shared/components/Header/Header'
import headerMan from '../../../../assets/images/header-man.png'

export default function UserList() {
    return (
        <div>
            <Header title={<>Users <span>List</span></>}
                description={"You can now add your items that any user can order it from the Application and you can edit"} imgUrl={headerMan}
                imgClassName={""} />
        </div>
    )
}
