import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSchema } from '../../validationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import css from './LoginPage.module.css';
import { loginUser, logoutUser } from '../../redux/auth/operationsAuth';
import { selectUser } from '../../redux/auth/selectorsAuth';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  // console.log('user befor: ', user);

  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async data => {
    try {
      const resultAction = await dispatch(loginUser(data)).unwrap();
      navigate('/home');
      reset();
    } catch (error) {
      return;
      // console.error('Error logging in:', error);
    }
  };
  // const user = useSelector(selectUser);
  // console.log('user after: ', user);
  // ==========================================
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={css.contLoginForm}>
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
              {/* Добавить иконку глаза для показа/скрытия пароля */}
            </button>
          </div>
          {errors.password && <p className={css.textError}>{errors.password.message}</p>}
        </div>
        <button type="submit" className={css.btnLoginForm}>
          LOGIN
        </button>
      </form>
      <button type="button" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
};
