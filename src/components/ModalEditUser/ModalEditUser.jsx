import { IoMdClose } from 'react-icons/io';
import css from './ModalEditUser.module.css';
import Title from '../Title/Title';
import { userUpdateSchema } from '../../validationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export const ModalEditUser = ({ closeModal }) => {
  const [avatarPreview, setAvatarPreview] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userUpdateSchema),
  });

  const handleFileChange = event => {
    const file = event.target.files[0];
    if (file) {
      // Создаём URL для превью изображения
      const fileUrl = URL.createObjectURL(file);
      setAvatarPreview(fileUrl);

      // Устанавливаем URL в поле инпута с помощью setValue
      setValue('avatar', fileUrl);
    }
  };

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <div className={css.contUpdateUser}>
      <button type="button" className={css.closeButton} onClick={closeModal} aria-label="Close">
        <IoMdClose style={{ width: '24px', height: '24px' }} />
      </button>
      <Title className={css.titleUpdateUser}>Edit information</Title>
      <form onSubmit={handleSubmit(onSubmit)} className={css.formContainer}>
        <div>
          <input {...register('avatar')} placeholder="Avatar URL" className="input" />
          {errors.avatar && <p className="textError">{errors.avatar.message}</p>}
        </div>

        {/* Кнопка для выбора файла */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          //   hidden
          style={{ marginBottom: '10px' }}
        />
        {avatarPreview && (
          <div>
            <img src={avatarPreview} alt="Avatar Preview" width="100" />
          </div>
        )}
        {/* <div>
          <div className={css.inputElem}>
            <input {...register('avatar')} placeholder="Avatar URL" className={css.input} />
            {errors.avatar && <p className={css.textError}>{errors.avatar.message}</p>}
          </div>
          <button></button>
        </div> */}

        <div className={css.inputElem}>
          <input {...register('name')} placeholder="Name" className={css.input} />
          {errors.name && <p className={css.textError}>{errors.name.message}</p>}
        </div>

        <div className={css.inputElem}>
          <input {...register('email')} placeholder="Email" className={css.input} />
          {errors.email && <p className={css.textError}>{errors.email.message}</p>}
        </div>

        <div className={css.inputElem}>
          <input {...register('phone')} placeholder="Phone (+38XXXXXXXXXX)" className={css.input} />
          {errors.phone && <p className={css.textError}>{errors.phone.message}</p>}
        </div>

        <button type="submit" className={css.btnSubmit}>
          Go to profile
        </button>
      </form>
    </div>
  );
};
