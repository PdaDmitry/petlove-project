import css from './App.module.css';
import { MainPage } from '../../pages/MainPage/MainPage';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Home } from '../../pages/Home/Home';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { RegistrationPage } from '../../pages/RegistrationPage/RegistrationPage';
import { Toaster } from 'react-hot-toast';
import { ProfilePage } from '../../pages/ProfilePage/ProfilePage';
import { NotFound } from '../../pages/NotFound/NotFound';
import { Header } from '../Header/Header';
import { OurFriends } from '../../pages/OurFriends/OurFriends';
import { NewsPage } from '../../pages/NewsPage/NewsPage';
import { NoticesPage } from '../../pages/NoticesPage/NoticesPage';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from '../../redux/auth/operationsAuth';
import { useEffect } from 'react';
import { AddPetPage } from '../../pages/AddPetPage/AddPetPage';
import { CircularLoader } from '../CircularLoader/CircularLoader';
import { selectError, selectLoader } from '../../redux/pets/selectorsPets';
import { selectNewsLoader } from '../../redux/news/selectorsNews';

function App() {
  const location = useLocation();
  const isMainPage = location.pathname === '/';
  const isHomePage = location.pathname === '/home';

  const error = useSelector(selectError);
  // const loader = useSelector(selectLoader);
  const loader = true;
  const loaderNews = useSelector(selectNewsLoader);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    !error && (
      <div className={css.contApp}>
        {!isMainPage && !loader && !loaderNews && <Header isHome={isHomePage} />}

        <Toaster />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/notices" element={<NoticesPage />} />
          <Route path="/friends" element={<OurFriends />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/add-pet" element={<AddPetPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    )
  );
}

export default App;
