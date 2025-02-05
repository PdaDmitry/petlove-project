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
  const [resetInput, setResetInput] = useState(false);
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
    setResetInput(false);
    if (newKeyword) {
      setLogOutFilters(prevFilters => ({
        ...prevFilters,
        byType: '',
      }));
    }
  };

  useEffect(() => {
    if (logOutFilters.byType) {
      setKeyword('');
    }
  }, [logOutFilters.byType]);

  useEffect(() => {
    setPage(1);
  }, [logOutFilters, keyword]);

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
          resetInput={resetInput}
        />
        <NoticesFilters
          logOutFilters={logOutFilters}
          setLogOutFilters={setLogOutFilters}
          setResetInput={setResetInput}
          setKeyword={setKeyword}
        />
      </div>
      <NoticesList />
      <Pagination setPage={setPage} />
    </div>
  );
};
