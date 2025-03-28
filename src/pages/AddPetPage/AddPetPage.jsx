import Title from '../../components/Title/Title';
import { useForm } from 'react-hook-form';
import { addPetSchema } from '../../validationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { FiUploadCloud } from 'react-icons/fi';
import Select from 'react-select';
import css from './AddPetPage.module.css';
import { TbGenderFemale } from 'react-icons/tb';
import { TbGenderMale } from 'react-icons/tb';
import { byTypeOptions, getCustomStyles } from '../../options';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPet } from '../../redux/auth/operationsAuth';
import { PetBlock } from '../../components/PetBlock/PetBlock';
import ModalWindow from '../../components/ModalWindow/ModalWindow';
import { ModalPhotoFormat } from '../../components/ModalPhotoFormat/ModalPhotoFormat';
import 'react-datepicker/dist/react-datepicker.css';
import { LuCalendar } from 'react-icons/lu';

import { CustomDatePicker } from '../../components/CustomDatePicker/CustomDatePicker';

export const AddPetPage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [species, setSpecies] = useState('');
  const [selectedSex, setSelectedSex] = useState('');
  const [modalFormatPhoto, setModalFormatPhoto] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openModalFormatPhoto = () => setModalFormatPhoto(true);
  const closeModalFormatPhoto = () => setModalFormatPhoto(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(addPetSchema),
    defaultValues: {
      sex: '',
      name: '',
      species: '',
      birthday: null,
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
    dispatch(addPet(petData));
    reset();
    setSpecies('');
    navigate('/profile');
  };

  const getImageSrc = () => {
    if (windowWidth >= 1280) {
      return '/images/add-my-pet/add-pet-desk-2x.jpg';
    } else if (windowWidth >= 768) {
      return '/images/add-my-pet/add-pet-tab-2x.jpg';
    }
    return '/images/add-my-pet/add-pet-mob-2x.jpg';
  };

  return (
    <div className={css.contAddPet}>
      <PetBlock src={getImageSrc()} alt="dog with glasses" className={css.imgDogAddPet} />
      <div className={css.contTitleForm}>
        <div className={css.contTitleSubtitle}>
          <Title className={css.title}>Add my pet /</Title>
          <p className={css.subtitle}>Personal details</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={css.formContainer}>
          {/* =========================radio button sex============================== */}
          <div className={`${css.contRadioBtnsAndError} ${errors.sex ? css.errorMg : ''} `}>
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
          </div>

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
            <div className={css.inputElemUrl}>
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
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={openModalFormatPhoto}
            >
              <span className={css.uploadPhotoSpan}>Upload photo</span>
              <FiUploadCloud
                className={css.uploadSvgPhoto}
                style={{ stroke: isHovered ? '#fff' : '#f6b83d' }}
              />
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
            {/* =======================================Date============================================= */}

            <div className={css.inputDateElem}>
              <input
                {...register('birthday')}
                type="date"
                max={new Date().toISOString().split('T')[0]}
                className={`${date ? css.inputDateAfter : css.inputDate}`}
                onClick={e => e.stopPropagation()}
              />

              {errors.birthday && <p className={css.textError}>{errors.birthday.message}</p>}
            </div>

            {/* ======================================================================================== */}

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
      <ModalWindow isOpen={modalFormatPhoto} onClose={closeModalFormatPhoto}>
        <ModalPhotoFormat closeModal={closeModalFormatPhoto} />
      </ModalWindow>
    </div>
  );
};
