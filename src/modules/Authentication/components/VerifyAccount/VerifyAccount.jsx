import React from 'react'
import { EmailValidation, OtpValidation } from '../../../../constants/Validations'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AuthApi } from '../../../../api';

export default function VerifyAccount() {
  let { register, formState: { errors, isSubmitting, isValid }, handleSubmit } = useForm();
  const navigate = useNavigate()
  const onSubmit = async (data) => {
    try {
      const response = await AuthApi.VerifyApi(data)
      navigate('/login')
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  }

  return (
    <div>
      {/* Title */}
      <div className="auth-title mb-4">
        <h3 className='h4 fw-bold'>  Verify Account</h3>
        <span className='text-muted'>Please Enter Your Otp  or Check Your Inbox</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email  */}
        <div className="custom-input-group rounded-2 p-1 d-flex align-items-center  ">
          <span className="input-icon  ">
            <i className="fa-solid fa-envelope"></i>
          </span>
          <div className="input-line my-1"></div>
          <input {...register("email", EmailValidation)} type="email" placeholder='Email' className="form-control p-2" aria-describedby="emailHelpBlock" />
        </div>
        {/* validation error */}
        {errors.email && <span className='text-danger'>{errors.email.message}</span>}
        {/* OTP  */}
        <div className="custom-input-group rounded-2 mt-4 p-1 d-flex align-items-center  ">
          <span className="input-icon  ">
            <i className="fa-solid fa-lock"></i>
          </span>
          <div className="input-line my-1"></div>
          <input {...register("code", OtpValidation)} type="text" placeholder='OTP' className="form-control p-2" aria-describedby="OTPCodeHelpBlock" />
        </div>
        {/* validation error */}
        {errors.code && <span className='text-danger'>{errors.code.message}</span>}
        {/* Button */}
        <button className=' btn btn-success mt-4 w-100 fw-bold' disabled={!isValid} >{isSubmitting ? (
          <>
            <span className="spinner-border spinner-border-sm me-2"></span>
            Loading...
          </>
        ) : (
          "Send"
        )}</button>
      </form>
    </div>

  )
}
