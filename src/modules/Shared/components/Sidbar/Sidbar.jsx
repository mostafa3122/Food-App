import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../../../../assets/images/3.png"
import avatar from "../../../../assets/images/avatar.png"
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';



export default function Sidbar({ setLoginData }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const navigate = useNavigate()
  const logout = () => {
    /*
    . remove token 
    .null loginData
    .navigate to login
    */
    localStorage.removeItem("token")
    setLoginData(null)
    navigate('/login')
  }
  return (

    <div className="sidebar-container">
      <Sidebar collapsed={isCollapsed} >
        <div onClick={() => toggleCollapse()} className="sidebar-logo  text-  my-5">
          <img src={logo} alt="logo" className='img-fluid' />
        </div>
        <Menu>
          <MenuItem component={<Link to="/dashboard" />} icon={<i className='fa-solid fa-home'></i>}> Home </MenuItem>
          <MenuItem component={<Link to="/dashboard/users" />} icon={<i className='fa-solid fa-user-group'></i>}> Users </MenuItem>
          <MenuItem component={<Link to="/dashboard/recipes" />} icon={<i className='fa-solid fa-kitchen-set'></i>}> Recipes </MenuItem>
          <MenuItem component={<Link to="/dashboard/categories" />} icon={<i className='fa-regular fa-calendar-days'></i>}> Categories </MenuItem>
          <MenuItem component={<Link to="/dashboard/chang-pass" />} icon={<i className='fa-solid fa-unlock'></i>}> Change Password </MenuItem>
          <MenuItem onClick={() => logout()} component={<Link to="/login" />} icon={<i className="fa-solid fa-sign-out"></i>}>
            LogOut
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>

  )
}

// import React from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import logo from "../../../../assets/images/3.png"
// export default function Sidbar({ setLoginData }) {
//   const navigate = useNavigate()
//   const logout = () => {
//     /*
//     . remove token
//     .null loginData
//     .navigate to login
//     */
//     localStorage.removeItem("token")
//     setLoginData(null)
//     navigate('/login')
//   }
//   return (
//     <div className=' sidbar d-flex flex-column vh-100'>
//       <div className="logo-container w-75  mb-3">
//         <img src={logo} alt="logo" className='w-100 ms-0' />
//       </div>
//       <ul className="  d-flex flex-column justify-content-center  text-white list-unstyled">
//         <li className='  py-3 px-4'>
//           <Link className='d-flex   align-items-center gap-2 text-decoration-none text-white' to="/dashboard">
//             <i className="fa-regular fa-house"></i>
//             Home</Link>
//         </li>
//         <li className='  py-3 px-4'>
//           <Link className='d-flex   align-items-center gap-2 text-decoration-none text-white' to="/dashboard/users">
//             <i className="fa-solid fa-user-group"></i>
//             Users</Link>
//         </li>
//         <li className='  py-3 px-4'>
//           <Link className='d-flex   align-items-center gap-2 text-decoration-none text-white' to="/dashboard/recipes" >
//             <i className="fa-solid fa-kitchen-set"></i>
//             Recipes</Link>
//         </li>
//         <li className='  py-3 px-4'>
//           <Link className='d-flex   align-items-center gap-2 text-decoration-none text-white' to="/dashboard/categories">
//             <i className="fa-regular fa-calendar-days"></i>
//             Categories</Link>
//         </li>
//       </ul>
//       <button className='d-flex text-white  align-items-center gap-2 py-3 px-4 btn btn-body' onClick={() => logout()}>
//         <i className="fa-solid fa-right-from-bracket"></i>
//         LogOut</button>
//     </div>
//   )
// }
