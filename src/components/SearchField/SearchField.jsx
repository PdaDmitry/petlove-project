import css from './SearchField.module.css';
import { LuSearch } from 'react-icons/lu';

// export const SearchField = ({ onSubmit, resetForm, className }) => {
export const SearchField = () => {
  return (
    //   <form className={css.contForm} onSubmit={handleSearch} ref={formRef}>
    <form className={css.contForm}>
      <div className={css.contSearch}>
        <input className={css.input} type="text" name="query" placeholder="Search" />
        <button className={css.btnSearch} type="submit">
          <LuSearch className={css.iconSearch} />
        </button>
      </div>
    </form>
  );
};
