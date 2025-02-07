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

  const [category, setCategory] = useState('');
  const [byGender, setByGender] = useState('');
  const [byType, setByType] = useState('');

  const [popularity, setPopularity] = useState('');
  const [price, setPrice] = useState('');

  const [resetInput, setResetInput] = useState(false);
  const [logOutFilters, setLogOutFilters] = useState({
    category: '',
    byGender: '',
    byType: '',
    popularity: '',
    price: '',
  });
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const query = useMemo(
    () => ({
      page,
      keyword,
      category: isLoggedIn ? category : logOutFilters.category,
      byGender: isLoggedIn ? byGender : logOutFilters.byGender,
      byType: isLoggedIn ? byType : logOutFilters.byType,
      popularity: isLoggedIn ? popularity : logOutFilters.popularity,
      price: isLoggedIn ? price : logOutFilters.price,
    }),
    [page, keyword, isLoggedIn, category, byGender, byType, popularity, price, logOutFilters]
  );

  const searchPet = async newKeyword => {
    setKeyword(newKeyword);
    setResetInput(false);
    if (newKeyword) {
      if (isLoggedIn) {
        setByType('');
      } else {
        setLogOutFilters(prevFilters => ({
          ...prevFilters,
          byType: '',
        }));
      }
    }
  };

  useEffect(() => {
    if (logOutFilters.byType || byType) {
      setKeyword('');
    }
  }, [logOutFilters.byType, byType]);

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
          category={category}
          setCategory={setCategory}
          byGender={byGender}
          setByGender={setByGender}
          byType={byType}
          setByType={setByType}
          popularity={popularity}
          setPopularity={setPopularity}
          price={price}
          setPrice={setPrice}
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
