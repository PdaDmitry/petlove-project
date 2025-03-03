import css from './NewsPage.module.css';
import Title from '../../components/Title/Title';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { fetchNewsThunk } from '../../redux/news/operationsNews';
import { NewsList } from '../../components/NewsList/NewsList';
import { Pagination } from '../../components/Pagination/Pagination';
import { SearchField } from '../../components/SearchField/SearchField';
import { selectNewsError, selectNewsLoader } from '../../redux/news/selectorsNews';
import { useNavigate } from 'react-router-dom';

export const NewsPage = () => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorNews = useSelector(selectNewsError);
  const loaderNews = useSelector(selectNewsLoader);

  const query = useMemo(() => ({ page, keyword }), [page, keyword]);

  const searchWord = async newKeyword => {
    setKeyword(newKeyword);
    setPage(1);
  };

  useEffect(() => {
    if (errorNews) {
      navigate('/*');
    }
  }, [navigate, errorNews]);

  useEffect(() => {
    dispatch(fetchNewsThunk(query));
  }, [dispatch, query]);

  // if (loaderNews) {
  //   return <p>Please wait...</p>;
  // }

  return (
    !errorNews && (
      <div className={css.conteiner}>
        <div className={css.contNews}>
          <Title className={css.titleNews}>News</Title>
          <SearchField onSubmit={searchWord} className={css.customForm} />
          <NewsList />
          <Pagination setPage={setPage} />
        </div>
      </div>
    )
  );
};
