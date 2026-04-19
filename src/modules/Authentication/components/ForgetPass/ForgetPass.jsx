import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { EmailValidation } from '../../../../constants/Validations';
import { toast } from 'react-toastify';

export default function ForgetPass() {

    let { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate()
    const onSubmit = async (data) => {
        console.log(data);
        try {
            const response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request', data)
            console.log(response);
            navigate('/reset-password')
            toast.success("Your request is being processed, please check your email");
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <>
            {/* Title */}
            <div className="auth-title mb-5">
                <h3 className='h4 fw-bold'>Forgot Your Password?</h3>
                <span className='text-muted '>No worries! Please enter your email and we will send a password reset link </span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email  */}
                <div className="custom-input-group rounded-2 mb-1 p-1  d-flex align-items-center  ">
                    <span className="input-icon  ">
                        <i className="fa-solid fa-mobile-screen"></i>
                    </span>
                    <div className="input-line my-1"></div>
                    <input {...register("email", EmailValidation)} type="email" placeholder='Enter your Email' className="form-control p-2" aria-describedby="emailHelpBlock" />
                </div>
                {/* validation error */}
                {errors.email && <span className='text-danger'>{errors.email.message}</span>}
                {/* Button */}
                <button className=' btn btn-success mt-5  w-100 fw-bold'>Submit</button>
            </form>

        </>
    )
}
