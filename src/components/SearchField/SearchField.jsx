import css from './SearchField.module.css';
import { LuSearch } from 'react-icons/lu';
import { IoMdClose } from 'react-icons/io';
import { useEffect, useRef, useState } from 'react';

export const SearchField = ({ onSubmit, className = '', inputClassName = '', resetInput }) => {
  const inputRef = useRef(null);
  const [hasText, setHasText] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    const entryField = e.target.elements.query.value.trim();

    onSubmit(entryField);
  };

  const handleResetAndSubmit = () => {
    // e.preventDefault();
    if (inputRef.current) {
      inputRef.current.value = '';
      setHasText(false);
    }

    onSubmit('');
  };

  useEffect(() => {
    if (resetInput) {
      handleResetAndSubmit();
    }
  }, [resetInput]);

  const handleChange = () => {
    setHasText(inputRef.current?.value.length > 0);
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
          onChange={handleChange}
        />
        {hasText && (
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
