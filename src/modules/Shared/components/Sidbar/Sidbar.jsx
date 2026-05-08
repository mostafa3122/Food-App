import React, { useContext, useEffect, useState } from 'react';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../../../assets/images/3.png";
import { AuthContext } from '../../../../context/AuthContext';
import ChangePasswordModal from '../../../Authentication/components/ChangePassword/ChangePasswordModal';

const isSmallScreen = () => window.innerWidth < 768;
export default function Sidbar() {
  const { loginData, setLoginData } = useContext(AuthContext)
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false)
  useEffect(() => {
    const handleResize = () => {
      if (isSmallScreen()) {
        setIsCollapsed(true);   // in small screens side bar is collapsed >> closed
      } else {
        setIsCollapsed(false);  // in big screens side bar is not collapsed >> opend
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleCollapse = () => {
    if (!isSmallScreen()) {
      setIsCollapsed(prev => !prev);
    }
  };


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
        <div onClick={toggleCollapse} className="sidebar-logo my-5">
          <img src={logo} alt="logo" className='img-fluid' />
        </div>
        <Menu>
          {loginData?.userGroup === "SuperAdmin"
            ?
            <>
              <MenuItem component={<Link to="/dashboard" />} icon={<i className='fa-solid fa-home'></i>}> Home </MenuItem>
              <MenuItem component={<Link to="/dashboard/users" />} icon={<i className='fa-solid fa-user-group'></i>}> Users </MenuItem>
              <MenuItem component={<Link to="/dashboard/recipes" />} icon={<i className='fa-solid fa-kitchen-set'></i>}> Recipes </MenuItem>
              <MenuItem component={<Link to="/dashboard/categories" />} icon={<i className='fa-regular fa-calendar-days'></i>}> Categories </MenuItem>
              <MenuItem  onClick={() => setShowChangePass(true)}  icon={<i className='fa-solid fa-unlock'></i>}> Change Password </MenuItem>
              <MenuItem onClick={() => logout()} component={<Link to="/login" />} icon={<i className="fa-solid fa-sign-out"></i>}>
                LogOut
              </MenuItem>
            </>

            :
            <>
              <MenuItem component={<Link to="/dashboard" />} icon={<i className='fa-solid fa-home'></i>}> Home </MenuItem>
              <MenuItem component={<Link to="/dashboard/recipes" />} icon={<i className='fa-solid fa-kitchen-set'></i>}> Recipes </MenuItem>
              <MenuItem component={<Link to="/dashboard/favourites" />} icon={<i className='fa-regular fa-heart'></i>}> Favourits </MenuItem>
              <MenuItem  onClick={() => setShowChangePass(true)}  icon={<i className='fa-solid fa-unlock'></i>}> Change Password </MenuItem>
              <MenuItem onClick={ logout} icon={<i className="fa-solid fa-sign-out"></i>}>
                LogOut
              </MenuItem>
            </>
          }

        </Menu>
      </Sidebar>
      <ChangePasswordModal
        show={showChangePass}
        onClose={() => setShowChangePass(false)}
      />
    </div>

  )
}