import * as yup from "yup";
export const registerSchema = yup
  .object({
    PhoneNumber: yup
      .string()
      .required("Phone number is required")
      .matches(/^\d+$/, "Phone number must contain numbers only"),
    fullName: yup
      .string()
      .required("First Name is required"),
    address: yup
      .string()
      .required("First Name is required"),
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[^a-zA-Z0-9]/, "Password must contain at least one special character")
      .test(
        "three-different-characters",
        "Password must use at least 3 different characters.",
        value => new Set(value).size >= 3
      ),
    reEnterPassword: yup
      .string()
      .required("Passwords must match")
      .oneOf([yup.ref("password")], "Passwords must match"),
  })
  .required();

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
});

export const branchSchema = yup.object({
  address: yup
    .string()
    .required("Address is required"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d+$/, "Phone number must contain numbers only"),
  description: yup
    .string()
    .required("Description is required")
});
export const passwordChangeSchema = yup.object({
  currentPassword: yup.string().required('Current password is required'),
  newPassword: yup
    .string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one special character')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .test(
      'three-different-characters',
      'Password must use at least 3 different characters',
      value => new Set(value).size >= 3
    ),
  confirmNewPassword: yup
    .string()
    .required('Please confirm your new password')
    .oneOf([yup.ref('newPassword')], 'Passwords must match'),
});
