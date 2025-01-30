import css from './NewsPage.module.css';
import Title from '../../components/Title/Title';
import { useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { fetchNewsThunk } from '../../redux/news/operationsNews';
import { NewsList } from '../../components/NewsList/NewsList';
import { Pagination } from '../../components/Pagination/Pagination';
import { SearchField } from '../../components/SearchField/SearchField';

export const NewsPage = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const prevQueryRef = useRef('');

  const searchWord = async newQuery => {
    setQuery(newQuery);
  };

  useEffect(() => {
    if (query !== prevQueryRef.current) {
      dispatch(fetchNewsThunk({ page, query }));
      prevQueryRef.current = query;
    } else {
      dispatch(fetchNewsThunk({ page, query: '' }));
    }
  }, [dispatch, page, query]);

  return (
    <div className={css.contNews}>
      <Title className={css.titleNews}>News</Title>
      <SearchField onSubmit={searchWord} className={css.customForm} />
      <NewsList />
      <Pagination setPage={setPage} />
    </div>
  );
};
