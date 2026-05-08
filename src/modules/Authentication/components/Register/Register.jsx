import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthApi } from '../../../../api';
import { ConfirmPasswordValidation, CountryValidation, EmailValidation, PasswordValidation, PhoneValidation, UsernameValidation } from '../../../../constants/Validations';

export default function Register() {
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    let { register, watch, formState: { errors, isSubmitting, isValid }, handleSubmit } = useForm();
    const navigate = useNavigate()
    const onSubmit = async (data) => {
        try {
            const response = await AuthApi.RegisterApi(data)
            localStorage.setItem('token', response?.data?.token)
            navigate('/verify-account')
            toast.success("Registered successful");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }
    return (
        <>
            {/* Title */}
            <div className="auth-title mb-4">
                <h3 className='h4 fw-bold'>Register</h3>
                <span className='text-muted'>Welcome Back! Please enter your details</span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row ">
                    {/* UserName  */}
                    <div className="col-md-6 mb-3">
                        <div className="custom-input-group rounded-2 p-1 d-flex align-items-center  ">
                            <span className="input-icon  ">
                                <i className="fa-solid fa-mobile-screen"></i>
                            </span>
                            <div className="input-line my-1"></div>
                            <input {...register("userName", UsernameValidation)} type="text" placeholder='UserName ' className="form-control p-2" aria-describedby="userNameHelpBlock" />
                        </div>
                        {/* validation error */}
                        {errors?.userName && <span className='text-danger'>{errors?.userName?.message}</span>}

                    </div>
                    {/* Email  */}
                    <div className="col-md-6 mb-3">
                        <div className="custom-input-group rounded-2 p-1 d-flex align-items-center  ">
                            <span className="input-icon  ">
                                <i className="fa-solid fa-envelope"></i>
                            </span>
                            <div className="input-line my-1"></div>
                            <input {...register("email", EmailValidation)} type="email" placeholder='Enter your Email' className="form-control p-2" aria-describedby="emailHelpBlock" />
                        </div>
                        {/* validation error */}
                        {errors?.email && <span className='text-danger'>{errors?.email?.message}</span>}

                    </div>
                    {/* Country  */}
                    <div className="col-md-6 mb-3">
                        <div className="custom-input-group rounded-2 p-1 d-flex align-items-center  ">
                            <span className="input-icon  ">
                                <i className="fa-solid fa-earth"></i>
                            </span>
                            <div className="input-line my-1"></div>
                            <input {...register("country", CountryValidation)} type="text" placeholder='Country ' className="form-control p-2" aria-describedby="ContryHelpBlock" />
                        </div>
                        {/* validation error */}
                        {errors?.country && <span className='text-danger'>{errors?.country?.message}</span>}

                    </div>
                    {/* Phone   */}
                    <div className="col-md-6 mb-3">
                        <div className="custom-input-group rounded-2 p-1 d-flex align-items-center  ">
                            <span className="input-icon  ">
                                <i className="fa-solid fa-phone"></i>
                            </span>
                            <div className="input-line my-1"></div>
                            <input {...register("phoneNumber", PhoneValidation)} type="tel" placeholder='Phone Number ' className="form-control p-2" aria-describedby="phoneNumberHelpBlock" />
                        </div>
                        {/* validation error */}
                        {errors?.phoneNumber && <span className='text-danger'>{errors?.phoneNumber?.message}</span>}

                    </div>
                    {/* Password */}
                    <div className="col-md-6 mb-3">
                        <div className="custom-input-group rounded-2 p-1 d-flex align-items-center  mb-1 ">
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
                        {errors?.password && <span className='text-danger'>{errors?.password?.message}</span>}

                    </div>
                    {/* Confirm Password */}
                    <div className="col-md-6 mb-3">
                        <div className="custom-input-group rounded-2 p-1 d-flex align-items-center  mb-1 ">
                            <span className="input-icon  ">
                                <i className="fa-solid fa-lock"></i>
                            </span>
                            <div className="input-line my-1"></div>
                            <input {...register("confirmPassword", ConfirmPasswordValidation(watch))} type={showConfirmPass ? "text" : "password"} placeholder='Confirm New Password' className="form-control p-2" aria-describedby="confirmVewPasswordHelpBlock" />
                            <button className="aye-icon" type="button" onClick={() => setShowConfirmPass(!showConfirmPass)}>
                                <i className={`fa ${showConfirmPass ? " fa-eye-slash" : "fa-eye"}`} />
                            </button>
                        </div>
                        {/* validation error */}
                        {errors?.confirmPassword && <span className='text-danger'>{errors?.confirmPassword.message}</span>}
                    </div>
                </div>
                {/* Links */}
                <div className="links d-flex align-items-center justify-content-end  fw-medium mb-4">
                    <Link to='/login' className=' text-semibold text-success text-decoration-none '>Login Now?</Link>
                </div>
                {/* Button */}
                <button className=' btn btn-success  w-100 fw-bold' disabled={!isValid} >{isSubmitting ? (
                    <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Loading...
                    </>
                ) : (
                    "Register"
                )}</button>
            </form>

        </>
    )
}
