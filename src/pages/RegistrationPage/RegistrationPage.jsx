import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { userSchema } from '../../validationSchemas';
import css from './RegistrationPage.module.css';
import { registerUser } from '../../redux/auth/operationsAuth';
import toast from 'react-hot-toast';
import Title from '../../components/Title/Title';
import { IoMdClose } from 'react-icons/io';
import { BsCheck2 } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export const RegistrationPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

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
    setValue,
    clearErrors,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const name = watch('name');
  const email = watch('email');
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  useEffect(() => {
    if (password && password.length >= 7 && !errors.password) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }

    if (confirmPassword && confirmPassword === password && !errors.confirmPassword) {
      setIsConfirmPasswordValid(true);
    } else {
      setIsConfirmPasswordValid(false);
    }
  }, [password, errors.password, confirmPassword, errors.confirmPassword]);

  const onSubmit = async data => {
    console.log(data);

    try {
      const resultAction = await dispatch(registerUser(data)).unwrap();
      // console.log('resultAction: ', resultAction);
      navigate('/profile');
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

  const handleClearEmail = () => {
    setValue('email', '');
    clearErrors('email');
  };

  return (
    <div className={css.contRegistration}>
      <div className={css.imgCat}></div>
      <div className={css.contForm}>
        <Title className={css.title}>Registration</Title>
        <p className={css.text}>Thank you for your interest in our platform.</p>
        <form onSubmit={handleSubmit(onSubmit)} className={css.contRegistrationForm}>
          <div className={css.inputElem}>
            <input
              {...register('name')}
              placeholder="Name"
              className={`${css.input} ${errors.name ? css.inputError : ''} ${
                !errors.name && name ? css.inputSuccess : ''
              }`}
            />
            {errors.name && <p className={css.textError}>{errors.name.message}</p>}
            {!errors.name && name && (
              <BsCheck2
                className={css.btnShapeName}
                style={{
                  width: '22px',
                  height: '22px',
                  fill: '#08aa83',
                }}
              />
            )}
          </div>

          {/* ============================================================================== */}
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

          {/* ================================================================================== */}
          <div className={css.inputElem}>
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

          <div className={css.inputLastElem}>
            <div className={css.passwordWrapper}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword')}
                placeholder="Confirm Password"
                className={`${css.input} ${errors.confirmPassword ? css.inputError : ''} ${
                  !errors.confirmPassword && isConfirmPasswordValid ? css.inputSuccess : ''
                }`}
              />
              <button
                type="button"
                className={css.passwordToggle}
                onClick={toggleConfirmPasswordVisibility}
                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              >
                <svg className={css.eyeSvg}>
                  <use
                    href={
                      showConfirmPassword
                        ? '/symbol-defs-mob.svg#icon-eye'
                        : '/symbol-defs-mob.svg#icon-eye-off'
                    }
                  ></use>
                </svg>
              </button>
            </div>
            {errors.confirmPassword && (
              <p className={css.textError}>{errors.confirmPassword.message}</p>
            )}
            {isConfirmPasswordValid && !errors.confirmPassword && (
              <p className={css.textSuccess}>Passwords match</p>
            )}
            {!errors.confirmPassword && isConfirmPasswordValid && (
              <BsCheck2
                className={css.btnShapeConfPwd}
                style={{
                  width: '22px',
                  height: '22px',
                  fill: '#08aa83',
                }}
              />
            )}
          </div>

          <button type="submit" className={css.btnRegistrationForm}>
            REGISTRATION
          </button>
        </form>
        <p className={css.lastText}>
          Already have an account?{' '}
          <span
            className={css.lastTexSpan}
            onClick={() => {
              navigate('/login');
            }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};
