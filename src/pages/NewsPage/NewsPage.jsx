import css from './NewsPage.module.css';
import Title from '../../components/Title/Title';
import { LuSearch } from 'react-icons/lu';

export const NewsPage = () => {
  return (
    <div className={css.contNews}>
      <Title className={css.titleNews}>News</Title>
      <form className={css.contForm}>
        <div className={css.contSearch}>
          <input className={css.input} type="text" name="query" placeholder="Search" />
          <button className={css.btnSearch} type="submit">
            <LuSearch className={css.iconSearch} />
          </button>
        </div>
      </form>
    </div>
  );
};
