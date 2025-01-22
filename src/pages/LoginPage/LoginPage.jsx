import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSchema } from '../../validationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import css from './LoginPage.module.css';
import { loginUser, logoutUser } from '../../redux/auth/operationsAuth';
import { selectUser } from '../../redux/auth/selectorsAuth';

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const user = useSelector(selectUser);
  console.log('user befor: ', user);

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
    // console.log(data);

    try {
      const resultAction = await dispatch(loginUser(data)).unwrap();
      console.log('resultAction: ', resultAction);
      reset();
      console.log('user true: ', user);
      toast.success(`Welcome back, ${data.email}!`, {
        duration: 5000,
        position: 'top-center',
        style: { background: 'green', color: 'white' },
      });
    } catch (error) {
      console.log('user error: ', user);
      toast.error(`Invalid credentials, please try again.`, {
        duration: 4000,
        position: 'bottom-center',
        style: { background: 'red', color: 'white' },
      });
    }
  };

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
