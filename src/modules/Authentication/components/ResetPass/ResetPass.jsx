import React, { useState } from 'react'
import { ConfirmPasswordValidation, EmailValidation, OtpValidation, PasswordValidation } from '../../../../constants/Validations'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function ResetPass() {
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    let {watch, register, formState: { errors, isSubmitting,isValid }, handleSubmit } = useForm();
    const navigate = useNavigate()
    const onSubmit = async (data) => {
        console.log(data);
        try {
            const response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset', data)
            console.log(response);
            navigate('/login')
            toast.success(response.data.message);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <>
            {/* Title */}
            <div className="auth-title mb-4">
                <h3 className='h4 fw-bold'> Reset  Password</h3>
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
                    <input {...register("seed", OtpValidation)} type="text" placeholder='OTP' className="form-control p-2" aria-describedby="OTPHelpBlock" />
                </div>
                {/* validation error */}
                {errors.seed && <span className='text-danger'>{errors.seed.message}</span>}
                {/* Password */}
                <div className="custom-input-group rounded-2 p-1 d-flex align-items-center mt-4 mb-1 ">
                    <span className="input-icon  ">
                        <i className="fa-solid fa-lock"></i>
                    </span>
                    <div className="input-line my-1"></div>
                    <input {...register("password", PasswordValidation)} type={showPass ? "text" : "password"} placeholder='New Password' className="form-control p-2" aria-describedby="newPasswordHelpBlock" />
                    <button className="aye-icon" type="button" onClick={() => setShowPass(!showPass)}>
                        <i className={`fa ${showPass ? " fa-eye-slash" : "fa-eye"}`} />
                    </button>
                </div>
                {/* validation error */}
                {errors.password && <span className='text-danger'>{errors.password.message}</span>}
                {/* Confirm Password */}
                <div className="custom-input-group rounded-2 p-1 d-flex align-items-center mt-4 mb-1 ">
                    <span className="input-icon  ">
                        <i className="fa-solid fa-lock"></i>
                    </span>
                    <div className="input-line my-1"></div>
                    <input {...register("confirmPassword",ConfirmPasswordValidation(watch))} type={showConfirmPass ? "text" : "password"} placeholder='Confirm New Password' className="form-control p-2" aria-describedby="confirmVewPasswordHelpBlock" />
                    <button className="aye-icon" type="button" onClick={() => setShowConfirmPass(!showConfirmPass)}>
                        <i className={`fa ${showConfirmPass ? " fa-eye-slash" : "fa-eye"}`} />
                    </button>
                </div>
                {/* validation error */}
                {errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword.message}</span>}

                {/* Button */}
                <button className=' btn btn-success mt-4 w-100 fw-bold' disabled={!isValid} >{isSubmitting ? (
                    <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Loading...
                    </>
                ) : (
                    "Reset Password"
                )}</button>
            </form>

        </>
    )
}
