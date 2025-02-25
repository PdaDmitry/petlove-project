import Title from '../../components/Title/Title';
import { useForm } from 'react-hook-form';
import { addPetSchema } from '../../validationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { FiUploadCloud } from 'react-icons/fi';
import Select from 'react-select';
import css from './AddPetPage.module.css';

import { FaMars, FaVenus, FaGenderless } from 'react-icons/fa';
import { byTypeOptions } from '../../options';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPet } from '../../redux/auth/operationsAuth';

export const AddPetPage = () => {
  const [species, setSpecies] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    // getValues,
  } = useForm({
    resolver: yupResolver(addPetSchema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoBack = () => {
    navigate('/profile');
  };

  const onSubmit = petData => {
    // console.log(petData);
    dispatch(addPet(petData));
    reset();
    setSpecies('');
    navigate('/profile');
  };

  return (
    <div className={css.contAddPet}>
      <div className={css.imgDogAddPet}></div>
      <div className={css.contTitleForm}>
        <div className={css.contTitleSubtitle}>
          <Title className={css.title}>Add my pet /</Title>
          <p className={css.subtitle}>Personal details</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={css.formContainer}>
          {/* =========================radio button sex============================== */}
          <div className={css.inputLastElem}>
            <label className={css.radioLabel}>
              <input type="radio" value="female" {...register('sex')} className={css.radioInput} />
              <FaVenus className={css.radioIcon} /> Female
            </label>

            <label className={css.radioLabel}>
              <input type="radio" value="male" {...register('sex')} className={css.radioInput} />
              <FaMars className={css.radioIcon} /> Male
            </label>

            <label className={css.radioLabel}>
              <input type="radio" value="unknown" {...register('sex')} className={css.radioInput} />
              <FaGenderless className={css.radioIcon} /> Unknown
            </label>

            {errors.sex && <p className={css.textError}>{errors.sex.message}</p>}
          </div>
          {/* ======================================================================= */}

          <div className={css.contUrlAvatarPhoto}>
            <div className={css.inputElem}>
              <input {...register('imgURL')} placeholder="Enter URL" className={css.inputUrl} />
              {errors.imgURL && <p className={css.textError}>{errors.imgURL.message}</p>}
            </div>
            <button
              type="button"
              className={css.btnUploadPhoto}
              // onMouseEnter={() => setIsHovered(true)}
              // onMouseLeave={() => setIsHovered(false)}
              // onClick={handleClick}
            >
              <span className={css.uploadPhotoSpan}>Upload photo</span>
              <FiUploadCloud
                className={css.uploadSvgPhoto}
                // style={{ stroke: isHovered ? '#fff' : '#f6b83d' }}
              />
            </button>
          </div>

          <div className={css.inputElem}>
            <input {...register('title')} placeholder="Title" className={css.input} />
            {errors.title && <p className={css.textError}>{errors.title.message}</p>}
          </div>

          <div className={css.inputElem}>
            <input {...register('name')} placeholder="Pet's Name" className={css.input} />
            {errors.name && <p className={css.textError}>{errors.name.message}</p>}
          </div>

          <div className={css.inputElem}>
            <Select
              value={species}
              options={byTypeOptions.filter(option => option.value !== 'show all')}
              placeholder="Type of pet"
              onChange={selectedOption => {
                setSpecies(selectedOption);
                setValue('species', selectedOption?.value);
              }}
              className={css.typeField}
              isSearchable={false}
            />
            {errors.species && <p className={css.textError}>{errors.species.message}</p>}
          </div>

          <div className={css.inputElem}>
            <input {...register('birthday')} type="date" className={css.input} />
            {errors.birthday && <p className={css.textError}>{errors.birthday.message}</p>}
          </div>

          <div>
            <button type="button" className={css.btnUpdateProfile} onClick={handleGoBack}>
              Back
            </button>
            <button type="submit" className={css.btnUpdateProfile}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
