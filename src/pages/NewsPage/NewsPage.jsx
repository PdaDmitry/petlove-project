import css from './NewsPage.module.css';
import Title from '../../components/Title/Title';
import { LuSearch } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchNewsThunk } from '../../redux/news/operationsNews';
import { selectPerPage, selectTotalPages } from '../../redux/news/selectorsNews';

export const NewsPage = () => {
  const dispatch = useDispatch();
  const perPage = useSelector(selectPerPage);
  const totalPages = useSelector(selectTotalPages);
  // console.log(perPage, totalPages);

  useEffect(() => {
    dispatch(fetchNewsThunk());
  }, [dispatch]);

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
