import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ChangPasswrodApi } from '../../../../api/modules/auth'
import logo from "../../../../assets/images/auth-logo.png"
import { PasswordValidation } from '../../../../constants/Validations'

export default function ChangePasswordModal({ show, onClose }) {

  const [showOldPass, setShowOldPass] = useState(false)
  const [showNewPass, setShowNewPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm()

  const onSubmit = async (data) => {
    try {

      await ChangPasswrodApi(data)
      toast.success("Password changed successfully")
      reset()
      onClose()
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong"
      )
    }
  }

  return (
    <Modal  show={show} onHide={onClose} centered>

      <div className="p-4">
        <div className="logo-container text-center mb-3">
          <img src={logo} alt="auth background" className='w-75' />
        </div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="auth-title mb-4">
            <h3 className='h4 fw-bold'>Change Your Password</h3>
            <span className='text-muted'>Enter your details below</span>
          </div>

        </div>

        <form onSubmit={handleSubmit(onSubmit)}>

          {/* old password */}

          <div className="custom-input-group rounded-2 p-1 d-flex align-items-center mb-3">

            <span className="input-icon">
              <i className="fa-solid fa-lock"></i>
            </span>

            <div className="input-line my-1"></div>

            <input
              type={showOldPass ? "text" : "password"}
              placeholder="Old Password"
              className="form-control p-2"
              {...register("oldPassword", PasswordValidation, {
                required: "Old password is required"
              })}
            />

            <button
              type="button"
              className="aye-icon"
              onClick={() => setShowOldPass(!showOldPass)}
            >
              <i className={`fa ${showOldPass ? "fa-eye-slash" : "fa-eye"}`} />
            </button>

          </div>

          {errors.oldPassword &&
            <span className="text-danger">
              {errors.oldPassword.message}
            </span>
          }

          {/* new password */}

          <div className="custom-input-group rounded-2 p-1 d-flex align-items-center mt-3 mb-3">

            <span className="input-icon">
              <i className="fa-solid fa-lock"></i>
            </span>

            <div className="input-line my-1"></div>

            <input
              type={showNewPass ? "text" : "password"}
              placeholder="New Password"
              className="form-control p-2"
              {...register("newPassword", PasswordValidation, {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters"
                }
              })}
            />

            <button
              type="button"
              className="aye-icon"
              onClick={() => setShowNewPass(!showNewPass)}
            >
              <i className={`fa ${showNewPass ? "fa-eye-slash" : "fa-eye"}`} />
            </button>

          </div>

          {errors.newPassword &&
            <span className="text-danger">
              {errors.newPassword.message}
            </span>
          }

          {/* confirm password */}

          <div className="custom-input-group rounded-2 p-1 d-flex align-items-center mt-3 mb-3">

            <span className="input-icon">
              <i className="fa-solid fa-lock"></i>
            </span>

            <div className="input-line my-1"></div>

            <input
              type={showConfirmPass ? "text" : "password"}
              placeholder="Confirm New Password"
              className="form-control p-2"
              {...register("confirmNewPassword", PasswordValidation, {
                required: "Confirm password is required",
                validate: (value) =>
                  value === watch("newPassword")
                  || "Passwords do not match"
              })}
            />

            <button
              type="button"
              className="aye-icon"
              onClick={() => setShowConfirmPass(!showConfirmPass)}
            >
              <i className={`fa ${showConfirmPass ? "fa-eye-slash" : "fa-eye"}`} />
            </button>

          </div>

          {errors.confirmNewPassword &&
            <span className="text-danger">
              {errors.confirmNewPassword.message}
            </span>
          }

          {/* submit */}

          <button
            className="btn btn-success w-100 fw-bold mt-4"
            disabled={isSubmitting}
          >

            {isSubmitting
              ?
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Loading...
              </>
              :
              "Change Password"
            }

          </button>

        </form>

      </div>

    </Modal>
  )
}