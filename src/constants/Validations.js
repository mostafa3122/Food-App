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
export const ConfirmPasswordValidation = (watch) => ({
    required: "Confirm Password is required",
    validate: (value) =>
        value === watch("password") || "Passwords do not match",
});
export const OtpValidation = {
  required: "OTP is required",
 
};
export const UsernameValidation = {
  required: "Username is required",
  minLength: {
    value: 3,
    message: "Minimum 3 characters",
  },
  maxLength: {
    value: 20,
    message: "Maximum 20 characters",
  },
  pattern: {
    value: /^[a-zA-Z]+[0-9]+$/,
    message:
      "The userName must contain characters and end with numbers without spaces.",
  },
};

export const CountryValidation = {
  required: "Country is required",
  pattern: {
    value: /^[a-zA-Z\s]+$/,
    message: "Only letters allowed",
  },
};
export const PhoneValidation = {
  required: "Phone number is required",
  pattern: {
    value: /^01[0125][0-9]{8}$/,
    message: "Enter a valid Egyptian phone number",
  },
};