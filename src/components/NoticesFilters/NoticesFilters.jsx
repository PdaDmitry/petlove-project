import { useState } from 'react';
import css from './NoticesFilters.module.css';
// import Select from 'react-select/dist/declarations/src/Select';
import Select from 'react-select';
import { useSelector } from 'react-redux';
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

export const NoticesFilters = () => {
  const [logOutFilters, setLogOutFilters] = useState({
    category: '',
    byGender: '',
    byType: '',
    popularity: '',
    price: '',
  });
  const [category, setCategory] = useState('');
  const [byGender, setByGender] = useState('');
  const [byType, setByType] = useState('');

  // console.log('logOutFilters.category: ', logOutFilters.category);
  // console.log('category: ', category);

  // Состояния для сортировки
  const [popularity, setPopularity] = useState('');
  const [price, setPrice] = useState('');

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const resetFilters = () => {
    setPopularity('');
    setPrice('');
    setCategory('');
    setByGender('');
    setByType('');
    setLogOutFilters({ category: '', byGender: '', byType: '' });
  };

  const customComponents = {
    DropdownIndicator: props => (
      <components.DropdownIndicator {...props}>
        <LuSearch style={{ width: '18px', height: '18px', stroke: '#262626' }} />
      </components.DropdownIndicator>
    ),
  };

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
                ? { value: byGender, label: byGender || ' By gender' }
                : {
                    value: logOutFilters.byGender || '',
                    label: logOutFilters.byGender || 'By gender',
                  }
            }
            // onChange={option => handleFilterChange('category', option?.value || '')}
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
              ? { value: byType, label: byType || ' By type' }
              : {
                  value: logOutFilters.byType || '',
                  label: logOutFilters.byType || 'By type',
                }
          }
          // onChange={option => handleFilterChange('category', option?.value || '')}
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
            className={`${css.radioButton} ${popularity === 'popular' ? css.active : ''}`}
            onClick={() => setPopularity('popular')}
          >
            <p>Popular</p>
            {popularity === 'popular' && (
              <button
                type="button"
                className={css.closeButton}
                onClick={e => {
                  e.stopPropagation();
                  setPopularity('');
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
            className={`${css.radioButton} ${popularity === 'unpopular' ? css.active : ''}`}
            onClick={() => setPopularity('unpopular')}
          >
            <p>Unpopular</p>
            {popularity === 'unpopular' && (
              <button
                type="button"
                className={css.closeButton}
                onClick={e => {
                  e.stopPropagation();
                  setPopularity('');
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
            className={`${css.radioButton} ${price === 'cheap' ? css.active : ''}`}
            onClick={() => setPrice('cheap')}
          >
            <p>Cheap</p>
            {price === 'cheap' && (
              <button
                type="button"
                className={css.closeButton}
                onClick={e => {
                  e.stopPropagation();
                  setPrice('');
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
            className={`${css.radioButton} ${price === 'expensive' ? css.active : ''}`}
            onClick={() => setPrice('expensive')}
          >
            <p>Expensive</p>
            {price === 'expensive' && (
              <button
                type="button"
                className={css.closeButton}
                onClick={e => {
                  e.stopPropagation();
                  setPrice('');
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
