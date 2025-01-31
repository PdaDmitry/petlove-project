import * as Yup from 'yup';

export const userSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(7, 'Password must be at least 7 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

export const loginSchema = Yup.object({
  email: Yup.string()
    .matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Invalid email format')
    .required('Email is required'),

  password: Yup.string()
    .min(7, 'Password must be at least 7 characters')
    .required('Password is required'),
});
