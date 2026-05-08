import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../../../context/AuthContext'

export default function ProtectedRoute({ children, allowedRoles  }) {
  const { loginData, isLoading } = useContext(AuthContext)
  if (isLoading) return (

   <div className=' bg-danger p-5'>
      <span className="spinner-border spinner-border-sm me-2"></span>

   </div>
  )
  if (!localStorage.getItem('token') || !loginData) {
    return <Navigate to="/login" />
  }
  if (
    allowedRoles &&
    !allowedRoles.includes(loginData.userGroup)
  ) {
    return <Navigate to="/not-found" />
  }
  return children

}
