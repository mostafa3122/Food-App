import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { EmailValidation, PasswordValidation } from '../../../../constants/Validations';

export default function Login() {
    const [showPass, setShowPass] = useState(false);
    let { register, formState: { errors ,isSubmitting}, handleSubmit } = useForm();
    const navigate = useNavigate()
    const onSubmit = async (data) => {
        console.log(data);
        try {
            const response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Login', data)
            console.log(response);
            navigate('/dashboard')
            localStorage.setItem('token', response.data.token)
            toast.success("Login successful");
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <>
            {/* Title */}
            <div className="auth-title mb-4">
                <h3 className='h4 fw-bold'>Log In</h3>
                <span className='text-muted'>Welcome Back! Please enter your details</span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email  */}
                <div className="custom-input-group rounded-2 p-1 d-flex align-items-center  ">
                    <span className="input-icon  ">
                        <i className="fa-solid fa-mobile-screen"></i>
                    </span>
                    <div className="input-line my-1"></div>
                    <input {...register("email", EmailValidation)} type="email" placeholder='Enter your Email' className="form-control p-2" aria-describedby="emailHelpBlock" />
                </div>
                {/* validation error */}
                {errors.email && <span className='text-danger'>{errors.email.message}</span>}
                {/* Password */}
                <div className="custom-input-group rounded-2 p-1 d-flex align-items-center mt-4 mb-1 ">
                    <span className="input-icon  ">
                        <i className="fa-solid fa-lock"></i>
                    </span>
                    <div className="input-line my-1"></div>
                    <input {...register("password", PasswordValidation)} type={showPass ? "text" : "password"} placeholder='Password' className="form-control p-2" aria-describedby="passwordHelpBlock" />
                    <button className="aye-icon" type="button" onClick={() => setShowPass(!showPass)}>
                        <i className={`fa ${showPass ? " fa-eye-slash" : "fa-eye"}`} />
                    </button>
                </div>
                {/* validation error */}
                {errors.password && <span className='text-danger'>{errors.password.message}</span>}
                {/* Links */}
                <div className="links d-flex justify-content-between fw-medium mb-4">
                    <Link to='/register' className='text-dark  text-decoration-none '>Register Now?</Link>
                    <Link to='/forget-password' className='text-semibold text-success text-decoration-none '>Forget Password?</Link>
                </div>
                {/* Button */}
                <button className=' btn btn-success  w-100 fw-bold'>{isSubmitting ? (
                    <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Loading...
                    </>
                ) : (
                    "Login"
                )}</button>
            </form>

        </>
    )
}
