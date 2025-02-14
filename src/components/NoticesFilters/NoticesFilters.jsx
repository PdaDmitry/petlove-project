import { useEffect, useState } from 'react';
import css from './NoticesFilters.module.css';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectorsAuth';
import {
  byGenderOptions,
  byTypeOptions,
  categoryOptions,
  // customStyles,
  getCustomStyles,
} from '../../options';
import { IoMdClose } from 'react-icons/io';
import { LocationSelect } from '../LocationSelect/LocationSelect';

// import { fetchCategoriesThunk } from '../../redux/pets/operationsPets';
// import { selectCategories } from '../../redux/pets/selectorsPets';

export const NoticesFilters = ({
  logInFilters,
  setLogInFilters,
  logOutFilters,
  setLogOutFilters,
  setResetInput,
}) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  // const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCity, setSelectedCity] = useState(() => {
    try {
      const savedCity = localStorage.getItem('selectedCity');
      return savedCity ? JSON.parse(savedCity) : null;
    } catch (error) {
      console.error('Error reading from localStorage', error);
      return null;
    }
  });

  useEffect(() => {
    if (selectedCity) {
      try {
        localStorage.setItem('selectedCity', JSON.stringify(selectedCity));
      } catch (error) {
        console.error('Error saving to localStorage', error);
      }
    } else {
      // Add localStorage cleaning if the selected city is remote
      localStorage.removeItem('selectedCity');
    }
  }, [selectedCity]);

  // const dispatch = useDispatch();

  const resetFilters = () => {
    if (isLoggedIn) {
      setLogInFilters({
        category: '',
        byGender: '',
        byType: '',
        location: '',
        popularity: '',
        price: '',
      });
    } else {
      setLogOutFilters({
        category: '',
        byGender: '',
        byType: '',
        location: '',
        popularity: '',
        price: '',
      });
    }
    setResetInput(true);
    setSelectedCity(null);
    localStorage.removeItem('selectedCity');
  };

  // useEffect(() => {
  //   // dispatch(fetchCategoriesThunk());
  //
  // }, [dispatch, category]);

  return (
    <form className={css.contFilter}>
      <div className={css.contCategoryGender}>
        <div className={css.contCategory}>
          <Select
            options={categoryOptions}
            value={
              isLoggedIn
                ? categoryOptions.find(option => option.value === logInFilters.category) || {
                    value: '',
                    label: 'Category',
                  }
                : categoryOptions.find(option => option.value === logOutFilters.category) || {
                    value: '',
                    label: 'Category',
                  }
            }
            onChange={option => {
              if (isLoggedIn) {
                setLogInFilters(prev => ({ ...prev, category: option?.value || '' }));
              } else {
                setLogOutFilters(prev => ({ ...prev, category: option?.value || '' }));
              }
            }}
            styles={getCustomStyles('143px')}
            className={css.categoryField}
            isSearchable={false}
            placeholder="Category"
          />
        </div>
        {/* ================================================================================ */}
        <div className={css.contGender}>
          <Select
            options={byGenderOptions}
            value={
              isLoggedIn
                ? byGenderOptions.find(option => option.value === logInFilters.byGender) || {
                    value: '',
                    label: 'By gender',
                  }
                : byGenderOptions.find(option => option.value === logOutFilters.byGender) || {
                    value: '',
                    label: 'By gender',
                  }
            }
            onChange={option => {
              if (isLoggedIn) {
                setLogInFilters(prev => ({ ...prev, byGender: option?.value || '' }));
              } else {
                setLogOutFilters(prev => ({ ...prev, byGender: option?.value || '' }));
              }
            }}
            styles={getCustomStyles('143px')}
            className={css.genderField}
            isSearchable={false}
          />
        </div>
      </div>

      {/* ================================================================================ */}
      <div className={css.contType}>
        <Select
          options={byTypeOptions}
          value={
            isLoggedIn
              ? byTypeOptions.find(option => option.value === logInFilters.byType) || {
                  value: '',
                  label: 'By type',
                }
              : byTypeOptions.find(option => option.value === logOutFilters.byType) || {
                  value: '',
                  label: 'By type',
                }
          }
          onChange={option => {
            setResetInput(true); ////////////
            if (isLoggedIn) {
              setLogInFilters(prev => ({ ...prev, byType: option?.value || '' }));
            } else {
              setLogOutFilters(prev => ({ ...prev, byType: option?.value || '' }));
            }
          }}
          styles={getCustomStyles()}
          className={css.typeField}
          isSearchable={false}
        />
      </div>
      {/* =======================================Location========================================= */}

      <LocationSelect
        setLogInFilters={setLogInFilters}
        setLogOutFilters={setLogOutFilters}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />

      <svg className={css.lineSvg}>
        <use href="/symbol-defs.svg#icon-Vector-mob"></use>
      </svg>

      {/* =====================================RadioButtons=========================================== */}

      <div className={css.sortOptions}>
        <div className={css.radioGroupPopular}>
          <div
            className={`${css.radioButton} ${
              (isLoggedIn ? logInFilters.popularity : logOutFilters.popularity) === false
                ? css.active
                : ''
            }`}
            onClick={() => {
              if (isLoggedIn) {
                setLogInFilters(prev => ({ ...prev, popularity: false, price: '' }));
              } else {
                setLogOutFilters(prev => ({ ...prev, popularity: false, price: '' }));
              }
            }}
          >
            <p>Popular</p>

            {(isLoggedIn ? logInFilters.popularity : logOutFilters.popularity) === false && (
              <button
                type="button"
                className={css.closeButton}
                onClick={e => {
                  e.stopPropagation();
                  if (isLoggedIn) {
                    setLogInFilters(prev => ({ ...prev, popularity: '' }));
                  } else {
                    setLogOutFilters(prev => ({ ...prev, popularity: '' }));
                  }
                }}
              >
                <IoMdClose
                  style={{
                    width: '18px',
                    height: '18px',
                    fill: '#fff',
                  }}
                />
              </button>
            )}
          </div>

          <div
            className={`${css.radioButton} ${
              (isLoggedIn ? logInFilters.popularity : logOutFilters.popularity) === true
                ? css.active
                : ''
            }`}
            onClick={() => {
              if (isLoggedIn) {
                setLogInFilters(prev => ({ ...prev, popularity: true, price: '' }));
              } else {
                setLogOutFilters(prev => ({ ...prev, popularity: true, price: '' }));
              }
            }}
          >
            <p>Unpopular</p>

            {(isLoggedIn ? logInFilters.popularity : logOutFilters.popularity) === true && (
              <button
                type="button"
                className={css.closeButton}
                onClick={e => {
                  e.stopPropagation();
                  if (isLoggedIn) {
                    setLogInFilters(prev => ({ ...prev, popularity: '' }));
                  } else {
                    setLogOutFilters(prev => ({ ...prev, popularity: '' }));
                  }
                }}
              >
                <IoMdClose
                  style={{
                    width: '18px',
                    height: '18px',
                    fill: '#fff',
                  }}
                />
              </button>
            )}
          </div>

          <div
            className={`${css.radioButton} ${
              (isLoggedIn ? logInFilters.price : logOutFilters.price) === true ? css.active : ''
            }`}
            onClick={() => {
              if (isLoggedIn) {
                setLogInFilters(prev => ({ ...prev, price: true, popularity: '' }));
              } else {
                setLogOutFilters(prev => ({ ...prev, price: true, popularity: '' }));
              }
            }}
          >
            <p>Cheap</p>

            {(isLoggedIn ? logInFilters.price : logOutFilters.price) === true && (
              <button
                type="button"
                className={css.closeButton}
                onClick={e => {
                  e.stopPropagation();
                  if (isLoggedIn) {
                    setLogInFilters(prev => ({ ...prev, price: '' }));
                  } else {
                    setLogOutFilters(prev => ({ ...prev, price: '' }));
                  }
                }}
              >
                <IoMdClose
                  style={{
                    width: '18px',
                    height: '18px',
                    fill: '#fff',
                  }}
                />
              </button>
            )}
          </div>
        </div>

        <div className={css.radioGroupPrice}>
          <div
            className={`${css.radioButton} ${
              (isLoggedIn ? logInFilters.price : logOutFilters.price) === false ? css.active : ''
            }`}
            onClick={() => {
              if (isLoggedIn) {
                setLogInFilters(prev => ({ ...prev, price: false, popularity: '' }));
              } else {
                setLogOutFilters(prev => ({ ...prev, price: false, popularity: '' }));
              }
            }}
          >
            <p>Expensive</p>

            {(isLoggedIn ? logInFilters.price : logOutFilters.price) === false && (
              <button
                type="button"
                className={css.closeButton}
                onClick={e => {
                  e.stopPropagation();
                  if (isLoggedIn) {
                    setLogInFilters(prev => ({ ...prev, price: '' }));
                  } else {
                    setLogOutFilters(prev => ({ ...prev, price: '' }));
                  }
                }}
              >
                <IoMdClose
                  style={{
                    width: '18px',
                    height: '18px',
                    fill: '#fff',
                  }}
                />
              </button>
            )}
          </div>
          <button type="button" className={css.resetButton} onClick={resetFilters}>
            Reset
          </button>
        </div>
      </div>
    </form>
  );
};
