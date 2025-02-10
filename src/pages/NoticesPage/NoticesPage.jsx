import { useDispatch, useSelector } from 'react-redux';
import { NoticesList } from '../../components/NoticesList/NoticesList';
import { Pagination } from '../../components/Pagination/Pagination';
import Title from '../../components/Title/Title';
import css from './NoticesPage.module.css';
import { useEffect, useMemo, useState } from 'react';
import { fetchPetsThunk } from '../../redux/pets/operationsPets';
import { SearchField } from '../../components/SearchField/SearchField';
import { NoticesFilters } from '../../components/NoticesFilters/NoticesFilters';
import { selectIsLoggedIn } from '../../redux/auth/selectorsAuth';

export const NoticesPage = () => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [resetInput, setResetInput] = useState(false);
  const [logInFilters, setLogInFilters] = useState({
    category: '',
    byGender: '',
    byType: '',
    popularity: '',
    price: '',
  });
  const [logOutFilters, setLogOutFilters] = useState({
    category: '',
    byGender: '',
    byType: '',
    popularity: '',
    price: '',
  });

  console.log('logOutFilters: ', logOutFilters);

  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const query = useMemo(
    () => ({
      page,
      keyword,
      category: isLoggedIn ? logInFilters.category : logOutFilters.category,
      byGender: isLoggedIn ? logInFilters.byGender : logOutFilters.byGender,
      byType: isLoggedIn ? logInFilters.byType : logOutFilters.byType,

      byPopularity: isLoggedIn ? logInFilters.popularity : logOutFilters.popularity,
      byPrice: isLoggedIn ? logInFilters.price : logOutFilters.price,
    }),
    [page, keyword, isLoggedIn, logInFilters, logOutFilters]
  );

  const searchPet = async newKeyword => {
    setKeyword(newKeyword);
    setResetInput(false);
    if (newKeyword) {
      if (isLoggedIn) {
        setLogInFilters(prevFilters => ({
          ...prevFilters,
          byType: '',
        }));
      } else {
        setLogOutFilters(prevFilters => ({
          ...prevFilters,
          byType: '',
        }));
      }
    }
  };

  useEffect(() => {
    if (logOutFilters.byType || logInFilters.byType) {
      setKeyword('');
    }
  }, [logOutFilters.byType, logInFilters.byType]);

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
          logInFilters={logInFilters}
          setLogInFilters={setLogInFilters}
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
