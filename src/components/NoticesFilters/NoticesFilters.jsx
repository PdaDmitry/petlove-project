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

export const NoticesFilters = () => {
  const [logOutFilters, setLogOutFilters] = useState({ category: '', byGender: '', byType: '' });
  const [category, setCategory] = useState('');
  const [byGender, setByGender] = useState('');
  const [byType, setByType] = useState('');

  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <form className={css.contFilter}>
      <div className={css.contCategoryGender}>
        <div className={css.contCategory}>
          {/* <label htmlFor="category" className={css.filterTitle}>
          Category
        </label> */}

          <Select
            options={categoryOptions}
            value={
              isLoggedIn
                ? { value: category, label: category || 'Category' }
                : {
                    value: logOutFilters.category || '',
                    label: logOutFilters.category || 'Category',
                  }
            }
            // onChange={option => handleFilterChange('category', option?.value || '')}
            styles={getCustomStyles('143px')}
            className={css.categoryField}
            isSearchable={false}
          />
        </div>
        {/* ================================================================================ */}
        <div className={css.contGender}>
          {/* <label htmlFor="category" className={css.filterTitle}>
          Category
        </label> */}

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
        {/* <label htmlFor="category" className={css.filterTitle}>
          Category
        </label> */}

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
      {/* ================================================================================ */}

      {/* Поле для выбора города */}
      <div className={css.contLocation}>
        <Select
          placeholder="Location"
          isClearable
          // isLoading={loading}
          // options={locationOptions}
          // onInputChange={fetchLocations}
          styles={getCustomStyles()}
          className={css.locationField}
        />
      </div>
    </form>
  );
};
