import { IoMdClose } from 'react-icons/io';
import { FiUploadCloud } from 'react-icons/fi';
import css from './ModalEditUser.module.css';
import Title from '../Title/Title';
import { userUpdateSchema } from '../../validationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectorsAuth';
import { updateUser } from '../../redux/auth/operationsAuth';
import { UserPhoto } from '../UserPhoto/UserPhoto';

export const ModalEditUser = ({ handleUploadPhoto, closeModal }) => {
  const [isHovered, setIsHovered] = useState(false);
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userUpdateSchema),
    defaultValues: {
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      avatar: user.avatar || '',
    },
  });

  // const isFormFilled = Object.values(watch()).some(value => value?.trim() !== '');

  const onSubmit = data => {
    dispatch(updateUser(data));
    closeModal();
    // console.log(data);
  };

  return (
    <div className={css.contUpdateUser}>
      <button type="button" className={css.closeButton} onClick={closeModal} aria-label="Close">
        <IoMdClose style={{ width: '24px', height: '24px' }} />
      </button>
      <Title className={css.titleUpdateUser}>Edit information</Title>
      <UserPhoto />
      {/* {avatarPreview ? (
        <img src={avatarPreview} alt="Avatar Preview" className={css.avatarImage} />
      ) : user.avatar ? (
        <img src={user.avatar} alt="User Avatar" className={css.avatarImage} />
      ) : (
        <div className={css.photo}>
          <svg className={css.userSvgPhoto}>
            <use href="/symbol-defs-mob.svg#icon-user-02"></use>
          </svg>
        </div>
      )} */}

      <form onSubmit={handleSubmit(onSubmit)} className={css.formContainer}>
        <div className={css.contUrlAvatarPhoto}>
          <div className={css.inputElem}>
            <input {...register('avatar')} placeholder="Avatar URL" className={css.inputUrl} />
            {errors.avatar && <p className={css.textError}>{errors.avatar.message}</p>}
          </div>
          <button
            type="button"
            className={css.btnUploadPhoto}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleUploadPhoto}
          >
            <span className={css.uploadPhotoSpan}>Upload photo</span>
            <FiUploadCloud
              className={css.uploadSvgPhoto}
              style={{ stroke: isHovered ? '#fff' : '#f6b83d' }}
            />
          </button>
        </div>

        <div className={css.inputElem}>
          <input {...register('name')} placeholder="Name" className={css.input} />
          {errors.name && <p className={css.textError}>{errors.name.message}</p>}
        </div>

        <div className={css.inputElem}>
          <input {...register('email')} placeholder="Email" className={css.input} />
          {errors.email && <p className={css.textError}>{errors.email.message}</p>}
        </div>

        <div className={css.inputLastElem}>
          <input {...register('phone')} placeholder="Phone (+38XXXXXXXXXX)" className={css.input} />
          {errors.phone && <p className={css.textError}>{errors.phone.message}</p>}
        </div>

        <button
          type="submit"
          className={css.btnUpdateProfile}
          // disabled={!isFormFilled}
          // onClick={closeModal}
        >
          Go to profile
        </button>
      </form>
    </div>
  );
};
