import css from './NewsPage.module.css';
import Title from '../../components/Title/Title';
import { LuSearch } from 'react-icons/lu';
import { useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { fetchNewsThunk } from '../../redux/news/operationsNews';

import { NewsList } from '../../components/NewsList/NewsList';
import { Pagination } from '../../components/Pagination/Pagination';

export const NewsPage = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const formRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNewsThunk({ page, query }));
  }, [dispatch, page, query]);

  const handleSearch = event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    setQuery(formData.get('query').trim());
    // setPage(1);
    formRef.current.reset();
  };

  console.log('page; ', page);

  return (
    <div className={css.contNews}>
      <Title className={css.titleNews}>News</Title>
      <form className={css.contForm} onSubmit={handleSearch} ref={formRef}>
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
