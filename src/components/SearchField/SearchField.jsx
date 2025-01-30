import css from './SearchField.module.css';
import { LuSearch } from 'react-icons/lu';

export const SearchField = ({ onSubmit, className = '' }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const entryField = e.target.elements.query.value.trim();

    onSubmit(entryField);
    e.target.reset();
  };

  return (
    <form className={`${css.contForm} ${className}`} onSubmit={handleSubmit}>
      <div className={css.contSearch}>
        <input className={css.input} type="text" name="query" placeholder="Search" />
        <button className={css.btnSearch} type="submit">
          <LuSearch className={css.iconSearch} />
        </button>
      </div>
    </form>
  );
};
