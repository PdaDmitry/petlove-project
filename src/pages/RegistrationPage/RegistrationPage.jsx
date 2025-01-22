import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { userSchema } from '../../validationSchemas';
import css from './RegistrationPage.module.css';
import { registerUser } from '../../redux/auth/operationsAuth';
import toast from 'react-hot-toast';

export const RegistrationPage = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prevState => !prevState);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const onSubmit = async data => {
    console.log(data);

    try {
      const resultAction = await dispatch(registerUser(data)).unwrap();
      console.log('resultAction: ', resultAction);
      reset();
      toast.success(`User ${data.name} successfully registered!`, {
        duration: 5000,
        position: 'top-center',
        style: { background: 'green', color: 'white' },
      });
    } catch (error) {
      toast.error(`Email '${data.email}' is already in use`, {
        duration: 4000,
        position: 'bottom-center',
        style: { background: 'orange', color: 'black' },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.contRegistrationForm}>
      <div className={css.inputElem}>
        <input {...register('name')} placeholder="Name" className={css.input} />
        {errors.name && <p className={css.textError}>{errors.name.message}</p>}
      </div>
      <div className={css.inputElem}>
        <input {...register('email')} placeholder="Email" className={css.input} />
        {errors.email && <p className={css.textError}>{errors.email.message}</p>}
      </div>
      <div className={css.inputLastElem}>
        <div className={css.passwordWrapper}>
          <input
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            placeholder="Password"
            className={css.input}
          />
          <button
            type="button"
            className={css.passwordToggle}
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {/* Добавить иконки глаза для показа/скрытия пароля */}
          </button>
        </div>
        {errors.password && <p className={css.textError}>{errors.password.message}</p>}
      </div>
      <div className={css.inputLastElem}>
        <div className={css.passwordWrapper}>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            {...register('confirmPassword')}
            placeholder="Confirm Password"
            className={css.input}
          />
          <button
            type="button"
            className={css.passwordToggle}
            onClick={toggleConfirmPasswordVisibility}
            aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
          >
            {/* Добавить иконки глаза для показа/скрытия пароля */}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className={css.textError}>{errors.confirmPassword.message}</p>
        )}
      </div>
      <button type="submit" className={css.btnRegistrationForm}>
        REGISTRATION
      </button>
    </form>
  );
};
