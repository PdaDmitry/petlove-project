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

export const userUpdateSchema = Yup.object({
  name: Yup.string(),

  email: Yup.string().matches(
    /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
    'Invalid email format'
  ),

  avatar: Yup.string().matches(
    /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/,
    'Invalid avatar URL'
  ),

  phone: Yup.string().matches(/^\+38\d{10}$/, 'Phone must be in format +380XXXXXXXXX'),
});

export const addPetSchema = Yup.object({
  title: Yup.string().required('Title is required'),

  name: Yup.string().required('Name is required'),

  imgURL: Yup.string()
    .matches(/^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/, 'Invalid image URL')
    .required('Image URL is required'),

  species: Yup.string().required('Species is required'),

  birthday: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Birthday must be in format YYYY-MM-DD')
    .required('Birthday is required'),

  sex: Yup.string().required('Sex is required'),
});

// export const userUpdateSchema = Yup.object({
//   name: Yup.string()
//     .test('empty-or-name', 'Name is required', value => !value || value.trim() !== '')
//     // .required('Name is required'),
//     .notRequired(),

//   email: Yup.string()
//     .test('empty-or-email', 'Invalid email format', value => {
//       return !value || /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
//     })
//     .notRequired(),

//   avatar: Yup.string()
//     .test('empty-or-url', 'Invalid avatar URL', value => {
//       return !value || /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/.test(value);
//     })
//     .notRequired(),

//   phone: Yup.string()
//     .test('empty-or-phone', 'Phone must be in format +380XXXXXXXXX', value => {
//       return !value || /^\+38\d{10}$/.test(value);
//     })
//     .notRequired(),
// });
