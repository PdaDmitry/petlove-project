import { useDispatch } from 'react-redux';
import { NoticesList } from '../../components/NoticesList/NoticesList';
import { Pagination } from '../../components/Pagination/Pagination';
import Title from '../../components/Title/Title';
import css from './NoticesPage.module.css';
import { useEffect, useState } from 'react';
import { fetchPetsThunk } from '../../redux/pets/operationsPets';

export const NoticesPage = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPetsThunk({ page }));
  }, [dispatch, page]);

  return (
    <div className={css.contNotices}>
      <Title className={css.titleNotices}>Find your favorite pet</Title>
      <div className={css.contFilters}></div>
      <NoticesList />
      <Pagination setPage={setPage} />
    </div>
  );
};
