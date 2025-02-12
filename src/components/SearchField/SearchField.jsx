import css from './SearchField.module.css';
import { LuSearch } from 'react-icons/lu';
import { IoMdClose } from 'react-icons/io';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const SearchField = ({ onSubmit, className = '', inputClassName = '', resetInput }) => {
  const location = useLocation(); // Получаем текущий URL
  const SEARCH_KEY = location.pathname.includes('/notices')
    ? 'SEARCH_PET_KEY'
    : location.pathname.includes('/news')
    ? 'SEARCH_NEWS_KEY'
    : 'SEARCH_DEFAULT_KEY';

  const inputRef = useRef(null);
  const [query, setQuery] = useState(() => localStorage.getItem(SEARCH_KEY) || '');
  // const [hasText, setHasText] = useState(false);
  // console.log('hasText: ', hasText);
  // console.log('query: ', query);

  useEffect(() => {
    localStorage.setItem(SEARCH_KEY, query);
  }, [query]);

  const handleSubmit = e => {
    e.preventDefault();
    const entryField = e.target.elements.query.value.trim();

    onSubmit(entryField);
    // setHasText(true); /////////////////
  };

  const handleResetAndSubmit = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = '';
      // setHasText(false);
      setQuery('');
      localStorage.removeItem(SEARCH_KEY);
    }
    onSubmit('');
  }, [onSubmit]);

  useEffect(() => {
    if (resetInput) {
      handleResetAndSubmit();
    }
  }, [handleResetAndSubmit, resetInput]);

  // const handleChange = e => {
  //   setQuery(e.target.value); //////////////////////////////
  //   setHasText(inputRef.current?.value.length > 0);
  // };

  const handleChange = e => {
    const value = e.target.value;
    setQuery(value);
    // setHasText(value.length > 0);
    // setHasText(true);
  };

  return (
    <form className={`${css.contForm} ${className}`} onSubmit={handleSubmit}>
      <div className={css.contSearch}>
        <input
          ref={inputRef}
          className={`${css.input} ${inputClassName}`}
          type="text"
          name="query"
          placeholder="Search"
          value={query} ///////////////////////////
          onChange={handleChange}
        />
        {query && (
          <button className={css.closeBtn} type="button" onClick={handleResetAndSubmit}>
            <IoMdClose style={{ width: '22px', height: '22px' }} />
          </button>
        )}
        <button className={css.btnSearch} type="submit">
          <LuSearch className={css.iconSearch} />
        </button>
      </div>
    </form>
  );
};
