import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSchema } from '../../validationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import css from './LoginPage.module.css';
import { loginUser, refreshUser } from '../../redux/auth/operationsAuth';
import { selectUser } from '../../redux/auth/selectorsAuth';
import { useNavigate } from 'react-router-dom';
import Title from '../../components/Title/Title';
import { IoMdClose } from 'react-icons/io';
import { BsCheck2 } from 'react-icons/bs';

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
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
    setValue,
    clearErrors,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const email = watch('email');
  const password = watch('password');

  useEffect(() => {
    if (password && password.length >= 7 && !errors.password) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  }, [password, errors.password]);

  const onSubmit = async data => {
    try {
      const resultAction = await dispatch(loginUser(data)).unwrap();
      await dispatch(refreshUser()).unwrap();
      navigate('/profile');
      reset();
    } catch (error) {
      return;
      // console.error('Error logging in:', error);
    }
  };

  const handleClearEmail = () => {
    setValue('email', '');
    clearErrors('email');
  };

  return (
    <div className={css.contLogin}>
      <div className={css.imgDog}></div>
      <div className={css.contForm}>
        <Title className={css.title}>Log in</Title>
        <p className={css.text}>Welcome! Please enter your credentials to login to the platform:</p>
        <form onSubmit={handleSubmit(onSubmit)} className={css.contLoginForm}>
          <div className={css.inputElem}>
            <input
              {...register('email')}
              placeholder="Email"
              className={`${css.input} ${errors.email ? css.inputError : ''} ${
                !errors.email && email ? css.inputSuccess : ''
              }`}
            />
            {errors.email && <p className={css.textError}>{errors.email.message}</p>}
            {errors.email && (
              <IoMdClose
                onClick={handleClearEmail}
                className={css.btnRedEmail}
                style={{
                  width: '18px',
                  height: '18px',
                  fill: '#ef2447',
                }}
              />
            )}
            {!errors.email && email && (
              <BsCheck2
                className={css.btnShapeEmail}
                style={{
                  width: '22px',
                  height: '22px',
                  fill: '#08aa83',
                }}
              />
            )}
          </div>

          <div className={css.inputLastElem}>
            <div className={css.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                placeholder="Password"
                className={`${css.input} ${errors.password ? css.inputError : ''} ${
                  !errors.password && isPasswordValid ? css.inputSuccess : ''
                }`}
              />
              <button
                type="button"
                className={css.passwordToggle}
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <svg className={css.eyeSvg}>
                  <use
                    href={
                      showPassword
                        ? '/symbol-defs-mob.svg#icon-eye'
                        : '/symbol-defs-mob.svg#icon-eye-off'
                    }
                  ></use>
                </svg>
              </button>
            </div>
            {errors.password && <p className={css.textError}>{errors.password.message}</p>}
            {isPasswordValid && !errors.password && (
              <p className={css.textSuccess}>Password is secure</p>
            )}
            {!errors.password && isPasswordValid && (
              <BsCheck2
                className={css.btnShapePwd}
                style={{
                  width: '22px',
                  height: '22px',
                  fill: '#08aa83',
                }}
              />
            )}
          </div>

          <button type="submit" className={css.btnLoginForm}>
            LOGIN
          </button>
        </form>
        <p className={css.lastText}>
          Don't have an account?{' '}
          <span
            className={css.lastTexSpan}
            onClick={() => {
              navigate('/register');
            }}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};
