import { useDispatch, useSelector } from 'react-redux';
import { selectCities } from '../../redux/pets/selectorsPets';
import { LuSearch } from 'react-icons/lu';
import { IoMdClose } from 'react-icons/io';
import { components } from 'react-select';
import { fetchCitiesThunk } from '../../redux/pets/operationsPets';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import css from './LocationSelect.module.css';
import { getCustomStyles } from '../../options';
import { selectIsLoggedIn } from '../../redux/auth/selectorsAuth';

export const LocationSelect = ({
  setLogInFilters,
  setLogOutFilters,
  selectedCity,
  setSelectedCity,
}) => {
  const [inputValue, setInputValue] = useState('');
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const cities = useSelector(selectCities);

  //   console.log('cities: ', cities);

  const dispatch = useDispatch();

  useEffect(() => {
    if (cities.length === 0) dispatch(fetchCitiesThunk());
  }, [dispatch, cities]);

  const locationOptions = cities
    .filter(city => city.cityEn.toLowerCase().includes(inputValue.toLowerCase()))
    .map(city => ({
      label: `${city.cityEn}, ${city.countyEn}, ${city.stateEn}`,
      value: city._id,
    }));

  const handleInputChange = newValue => {
    setInputValue(newValue);
  };

  const handleChange = selectedOption => {
    setSelectedCity(selectedOption);
    const selectedLocation = selectedOption ? selectedOption.value : '';
    if (isLoggedIn) {
      setLogInFilters(prev => ({ ...prev, location: selectedLocation }));
    } else {
      setLogOutFilters(prev => ({ ...prev, location: selectedLocation }));
    }
  };

  const customComponents = {
    DropdownIndicator: props => (
      <components.DropdownIndicator {...props}>
        <LuSearch style={{ width: '18px', height: '18px', stroke: '#262626' }} />
      </components.DropdownIndicator>
    ),
    ClearIndicator: props => (
      <components.ClearIndicator {...props}>
        <button className={css.closeBtn} type="button">
          <IoMdClose style={{ width: '22px', height: '22px' }} />
        </button>
      </components.ClearIndicator>
    ),
  };

  return (
    <div className={css.contLocation}>
      <Select
        options={locationOptions}
        isClearable
        value={selectedCity}
        onChange={handleChange}
        onInputChange={handleInputChange}
        components={customComponents}
        styles={getCustomStyles()}
        placeholder="Location"
      />
    </div>
  );
};
