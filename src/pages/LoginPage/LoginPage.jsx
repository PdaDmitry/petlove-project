import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSchema } from '../../validationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import css from './LoginPage.module.css';
import { loginUser, refreshUser } from '../../redux/auth/operationsAuth';
import { useNavigate } from 'react-router-dom';
import Title from '../../components/Title/Title';
import { IoMdClose } from 'react-icons/io';
import { BsCheck2 } from 'react-icons/bs';
import { PetBlock } from '../../components/PetBlock/PetBlock';

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    }
  };

  const handleClearEmail = () => {
    setValue('email', '');
    clearErrors('email');
  };

  const getImageSrc = () => {
    if (windowWidth >= 1280) {
      return '/images/dog-login/login-dog-desk-2x.jpg';
    } else if (windowWidth >= 768) {
      return '/images/dog-login/login-dog-tab-2x.jpg';
    }
    return '/images/dog-login/login-dog-mob-2x.jpg';
  };

  return (
    <div className={css.contLogin}>
      <PetBlock src={getImageSrc()} alt="Dog" />

      {windowWidth >= 1280 && (
        <img
          className={css.imageRich}
          src={'/images/dog-login/img-Rich-desk-2x.jpg'}
          alt={'Description of the dog'}
        />
      )}

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
                  fill: '#ef2447',
                }}
              />
            )}
            {!errors.email && email && (
              <BsCheck2
                className={css.btnShapeEmail}
                style={{
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
