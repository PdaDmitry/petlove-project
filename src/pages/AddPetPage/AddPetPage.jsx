import Title from '../../components/Title/Title';
import { useForm } from 'react-hook-form';
import { addPetSchema } from '../../validationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { FiUploadCloud } from 'react-icons/fi';
import Select from 'react-select';
import css from './AddPetPage.module.css';
import { TbGenderFemale } from 'react-icons/tb';
import { TbGenderMale } from 'react-icons/tb';

// import { FaMars, FaVenus, FaGenderless } from 'react-icons/fa';
import { byTypeOptions, getCustomStyles } from '../../options';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPet } from '../../redux/auth/operationsAuth';
import { PetBlock } from '../../components/PetBlock/PetBlock';

export const AddPetPage = () => {
  const [species, setSpecies] = useState('');
  const [selectedSex, setSelectedSex] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(addPetSchema),
    defaultValues: {
      sex: '', // Устанавливает пустое значение по умолчанию
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const imgURL = watch('imgURL');
  const title = watch('title');
  const name = watch('name');
  const date = watch('birthday');
  const type = watch('species');

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
      {/* <div className={css.imgDogAddPet}></div> */}
      <PetBlock
        src="/images/add-my-pet/add-pet-mob-1x.jpg"
        alt="dog with glasses"
        className={css.imgDogAddPet}
      />
      <div className={css.contTitleForm}>
        <div className={css.contTitleSubtitle}>
          <Title className={css.title}>Add my pet /</Title>
          <p className={css.subtitle}>Personal details</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={css.formContainer}>
          {/* =========================radio button sex============================== */}

          <ul className={css.contRadioBtn}>
            <li>
              <label>
                <input
                  type="radio"
                  className={`${css.radioInput} ${css.radioInputFemale}`}
                  value="female"
                  {...register('sex')}
                  onChange={() => {
                    setSelectedSex('female');
                    setValue('sex', 'female', { shouldValidate: true });
                  }}
                />
                <div className={`${css.radioContent} ${css.backGrFemale}`}>
                  <TbGenderFemale className={css.svgFemale} />
                </div>
              </label>
            </li>

            <li>
              <label>
                <input
                  type="radio"
                  className={`${css.radioInput} ${css.radioInputMale}`}
                  value="male"
                  {...register('sex')}
                  onChange={() => {
                    setSelectedSex('male');
                    setValue('sex', 'male', { shouldValidate: true });
                  }}
                />
                <div className={`${css.radioContent} ${css.backGrMale}`}>
                  <TbGenderMale className={css.svgMale} style={{ transform: 'rotate(-45deg)' }} />
                </div>
              </label>
            </li>

            <li>
              <label>
                <input
                  type="radio"
                  className={`${css.radioInput} ${css.radioInputUnknown}`}
                  value="unknown"
                  {...register('sex')}
                  onChange={() => {
                    setSelectedSex('unknown');
                    setValue('sex', 'unknown', { shouldValidate: true });
                  }}
                />
                <div className={`${css.radioContent} ${css.backGrUnknown}`}>
                  <svg className={css.svgUnknown}>
                    <use
                      href={
                        selectedSex === 'unknown'
                          ? '/symbol-defs-mob.svg#icon-healthicons_sexual-reproductive-health-1'
                          : '/symbol-defs-mob.svg#icon-healthicons_sexual-reproductive-health'
                      }
                    ></use>
                  </svg>
                </div>
              </label>
            </li>
          </ul>

          {errors.sex && <p className={css.textError}>{errors.sex.message}</p>}

          {/* ===============================petPhoto================================ */}

          <div className={css.petPhoto}>
            {imgURL ? (
              <img src={imgURL} alt="Pet Avatar" className={css.avatarImage} />
            ) : (
              <svg className={css.svgPaw}>
                <use href={'/symbol-defs-mob.svg#icon-icons8_cat-footprint'}></use>
              </svg>
            )}
          </div>

          {/* ======================================================================= */}

          <div className={css.contUrlAvatarPhoto}>
            <div className={css.inputElem}>
              <input
                {...register('imgURL')}
                placeholder="Enter URL"
                className={`${css.inputUrl} ${imgURL ? css.fieldIsFilled : ''}`}
              />
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
              <FiUploadCloud className={css.uploadSvgPhoto} />
            </button>
          </div>

          <div className={css.inputElem}>
            <input
              {...register('title')}
              placeholder="Title"
              className={`${css.input} ${title ? css.fieldIsFilled : ''}`}
            />
            {errors.title && <p className={css.textError}>{errors.title.message}</p>}
          </div>

          <div className={css.inputElem}>
            <input
              {...register('name')}
              placeholder="Pet's Name"
              className={`${css.input} ${name ? css.fieldIsFilled : ''}`}
            />
            {errors.name && <p className={css.textError}>{errors.name.message}</p>}
          </div>

          <div className={css.contDateType}>
            <div className={css.inputElem}>
              <input
                {...register('birthday')}
                type="date"
                placeholder="00.00.0000"
                // className={css.inputDate}
                className={`${css.inputDate} ${date ? css.fieldIsFilled : ''}`}
              />
              {errors.birthday && <p className={css.textError}>{errors.birthday.message}</p>}
            </div>

            <div className={css.contType}>
              <Select
                value={species}
                options={byTypeOptions.filter(option => option.value !== 'show all')}
                placeholder="Type of pet"
                onChange={selectedOption => {
                  setSpecies(selectedOption);
                  setValue('species', selectedOption?.value, { shouldValidate: true });
                }}
                styles={getCustomStyles('141px', '78px')}
                className={`${css.typeField} ${type ? css.fieldIsFilled : ''}`}
                isSearchable={false}
              />
              {errors.species && <p className={css.textError}>{errors.species.message}</p>}
            </div>
          </div>

          <div className={css.btnsBlock}>
            <button type="button" className={css.btnGoToProfile} onClick={handleGoBack}>
              Back
            </button>
            <button type="submit" className={css.btnSubmitPet}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
