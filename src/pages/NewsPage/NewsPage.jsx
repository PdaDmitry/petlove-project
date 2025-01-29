import css from './NewsPage.module.css';
import Title from '../../components/Title/Title';
import { LuSearch } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchNewsThunk } from '../../redux/news/operationsNews';
import { selectPage } from '../../redux/news/selectorsNews';
import { NewsList } from '../../components/NewsList/NewsList';
import { Pagination } from '../../components/Pagination/Pagination';

export const NewsPage = () => {
  // const page = useSelector(selectPage);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNewsThunk({ page }));
  }, [dispatch, page]);

  console.log('page; ', page);

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
      <NewsList />
      <Pagination setPage={setPage} />
    </div>
  );
};
