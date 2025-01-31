import css from './NewsPage.module.css';
import Title from '../../components/Title/Title';
import { useDispatch } from 'react-redux';
import { useEffect, useMemo, useRef, useState } from 'react';
import { fetchNewsThunk } from '../../redux/news/operationsNews';
import { NewsList } from '../../components/NewsList/NewsList';
import { Pagination } from '../../components/Pagination/Pagination';
import { SearchField } from '../../components/SearchField/SearchField';

export const NewsPage = () => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();

  const query = useMemo(() => ({ page, keyword }), [page, keyword]);

  const searchWord = async newKeyword => {
    setKeyword(newKeyword);
    setPage(1);
  };

  useEffect(() => {
    dispatch(fetchNewsThunk(query));
  }, [dispatch, query]);

  return (
    <div className={css.contNews}>
      <Title className={css.titleNews}>News</Title>
      <SearchField onSubmit={searchWord} className={css.customForm} />
      <NewsList />
      <Pagination setPage={setPage} />
    </div>
  );
};
