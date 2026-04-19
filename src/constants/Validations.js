export const EmailValidation = {
  required: "Email is required",
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Email is not valid",
  },
};
export const PasswordValidation = {
  required: "Password is required",
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
    message: "Password is not valid",
  },
};
export const OtpValidation = {
  required: "OTP is required",
 
};
