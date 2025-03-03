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
import { useNavigate } from 'react-router-dom';
import { selectError, selectLoader } from '../../redux/pets/selectorsPets';
import { CircularLoader } from '../../components/CircularLoader/CircularLoader';

export const NoticesPage = () => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [resetInput, setResetInput] = useState(false);
  const [logInFilters, setLogInFilters] = useState({
    category: '',
    byGender: '',
    byType: '',
    location: '',
    popularity: '',
    price: '',
  });
  const [logOutFilters, setLogOutFilters] = useState({
    category: '',
    byGender: '',
    byType: '',
    location: '',
    popularity: '',
    price: '',
  });

  // console.log('logOutFilters: ', logOutFilters);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const error = useSelector(selectError);
  const loader = useSelector(selectLoader);

  const query = useMemo(
    () => ({
      page,
      keyword,
      category: isLoggedIn ? logInFilters.category : logOutFilters.category,
      byGender: isLoggedIn ? logInFilters.byGender : logOutFilters.byGender,
      byType: isLoggedIn ? logInFilters.byType : logOutFilters.byType,
      locationId: isLoggedIn ? logInFilters.location : logOutFilters.location,
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
      // setResetInput(false); /////////////////////////
    }
  }, [logOutFilters.byType, logInFilters.byType]);

  useEffect(() => {
    setPage(1);
  }, [logOutFilters, keyword]);

  useEffect(() => {
    if (error) {
      navigate('/*');
    }
  }, [navigate, error]);

  useEffect(() => {
    dispatch(fetchPetsThunk(query));
  }, [dispatch, query]);

  if (loader) {
    return <CircularLoader />;
  }

  return (
    !error && (
      <div className={css.conteiner}>
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
      </div>
    )
  );
};
