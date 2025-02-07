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
import { LuSearch } from 'react-icons/lu';
import { components } from 'react-select';
import { fetchCategoriesThunk } from '../../redux/pets/operationsPets';
// import { selectCategories } from '../../redux/pets/selectorsPets';

export const NoticesFilters = ({
  category,
  setCategory,
  byGender,
  setByGender,
  byType,
  setByType,
  popularity,
  setPopularity,
  price,
  setPrice,
  logOutFilters,
  setLogOutFilters,
  setResetInput,
}) => {
  // const [category, setCategory] = useState('');
  // const [byGender, setByGender] = useState('');
  // const [byType, setByType] = useState('');

  // const [popularity, setPopularity] = useState('');
  // const [price, setPrice] = useState('');

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const dispatch = useDispatch();

  const resetFilters = () => {
    setPopularity('');
    setPrice('');
    setCategory('');
    setByGender('');
    setByType('');
    setLogOutFilters({ category: '', byGender: '', byType: '', popularity: '', price: '' });
    setResetInput(true);
  };

  const customComponents = {
    DropdownIndicator: props => (
      <components.DropdownIndicator {...props}>
        <LuSearch style={{ width: '18px', height: '18px', stroke: '#262626' }} />
      </components.DropdownIndicator>
    ),
  };

  useEffect(() => {
    dispatch(fetchCategoriesThunk());
  }, [category, dispatch]);

  return (
    <form className={css.contFilter}>
      <div className={css.contCategoryGender}>
        <div className={css.contCategory}>
          <Select
            options={categoryOptions}
            value={
              isLoggedIn
                ? categoryOptions.find(option => option.value === category) || {
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
                setCategory(option?.value || '');
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
                ? byGenderOptions.find(option => option.value === byGender) || {
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
                setByGender(option?.value || '');
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
              ? byTypeOptions.find(option => option.value === byType) || {
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
              setByType(option?.value || '');
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

      <div className={css.contLocation}>
        <Select
          placeholder="Location"
          isClearable
          // isLoading={loading}
          // options={locationOptions}
          // onInputChange={fetchLocations}
          components={customComponents}
          styles={getCustomStyles()}
          className={css.locationField}
        />
      </div>

      <svg className={css.lineSvg}>
        <use href="/symbol-defs.svg#icon-Vector-mob"></use>
      </svg>

      {/* =====================================RadioButtons=========================================== */}

      <div className={css.sortOptions}>
        <div className={css.radioGroupPopular}>
          <div
            className={`${css.radioButton} ${
              (isLoggedIn ? popularity : logOutFilters.popularity) === 'popular' ? css.active : ''
            }`}
            onClick={() => {
              if (isLoggedIn) {
                setPopularity('popular');
              } else {
                setLogOutFilters(prev => ({ ...prev, popularity: 'popular' }));
              }
            }}
          >
            <p>Popular</p>
            {(isLoggedIn ? popularity : logOutFilters.popularity) === 'popular' && (
              <button
                type="button"
                className={css.closeButton}
                onClick={e => {
                  e.stopPropagation();
                  if (isLoggedIn) {
                    setPopularity('');
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
              (isLoggedIn ? popularity : logOutFilters.popularity) === 'unpopular' ? css.active : ''
            }`}
            onClick={() => {
              if (isLoggedIn) {
                setPopularity('unpopular');
              } else {
                setLogOutFilters(prev => ({ ...prev, popularity: 'unpopular' }));
              }
            }}
          >
            <p>Unpopular</p>
            {(isLoggedIn ? popularity : logOutFilters.popularity) === 'unpopular' && (
              <button
                type="button"
                className={css.closeButton}
                onClick={e => {
                  e.stopPropagation();
                  if (isLoggedIn) {
                    setPopularity('');
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
              (isLoggedIn ? price : logOutFilters.price) === 'cheap' ? css.active : ''
            }`}
            // onClick={() => setPrice('cheap')}
            onClick={() => {
              if (isLoggedIn) {
                setPrice('cheap');
              } else {
                setLogOutFilters(prev => ({ ...prev, price: 'cheap' }));
              }
            }}
          >
            <p>Cheap</p>
            {(isLoggedIn ? price : logOutFilters.price) === 'cheap' && (
              <button
                type="button"
                className={css.closeButton}
                onClick={e => {
                  e.stopPropagation();
                  if (isLoggedIn) {
                    setPrice('');
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
              (isLoggedIn ? price : logOutFilters.price) === 'expensive' ? css.active : ''
            }`}
            onClick={() => {
              if (isLoggedIn) {
                setPrice('expensive');
              } else {
                setLogOutFilters(prev => ({ ...prev, price: 'expensive' }));
              }
            }}
          >
            <p>Expensive</p>
            {(isLoggedIn ? price : logOutFilters.price) === 'expensive' && (
              <button
                type="button"
                className={css.closeButton}
                onClick={e => {
                  e.stopPropagation();
                  if (isLoggedIn) {
                    setPrice('');
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
