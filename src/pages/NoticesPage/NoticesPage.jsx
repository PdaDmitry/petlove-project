import { useDispatch } from 'react-redux';
import { NoticesList } from '../../components/NoticesList/NoticesList';
import { Pagination } from '../../components/Pagination/Pagination';
import Title from '../../components/Title/Title';
import css from './NoticesPage.module.css';
import { useEffect, useMemo, useState } from 'react';
import { fetchPetsThunk } from '../../redux/pets/operationsPets';
import { SearchField } from '../../components/SearchField/SearchField';
import { NoticesFilters } from '../../components/NoticesFilters/NoticesFilters';

export const NoticesPage = () => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [logOutFilters, setLogOutFilters] = useState({
    category: '',
    byGender: '',
    byType: '',
    popularity: '',
    price: '',
  });
  const dispatch = useDispatch();

  const query = useMemo(
    () => ({
      page,
      keyword,
      category: logOutFilters.category,
      byGender: logOutFilters.byGender,
      byType: logOutFilters.byType,
    }),
    [page, keyword, logOutFilters]
  );

  const searchPet = async newKeyword => {
    setKeyword(newKeyword);
    setPage(1);
  };

  useEffect(() => {
    dispatch(fetchPetsThunk(query));
  }, [dispatch, query]);

  return (
    <div className={css.contNotices}>
      <Title className={css.titleNotices}>Find your favorite pet</Title>
      <div className={css.contFilters}>
        <SearchField
          onSubmit={searchPet}
          className={css.searchPet}
          inputClassName={css.inputPets}
        />
        <NoticesFilters logOutFilters={logOutFilters} setLogOutFilters={setLogOutFilters} />
      </div>
      <NoticesList />
      <Pagination setPage={setPage} />
    </div>
  );
};
