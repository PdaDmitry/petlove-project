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

function App() {
  const location = useLocation();
  const isMainPage = location.pathname === '/';
  const isHomePage = location.pathname === '/home';

  return (
    <div className={css.contApp}>
      {!isMainPage && <Header isHome={isHomePage} />}
      <Toaster />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/notices" element={<p>Find pet</p>} />
        <Route path="/friends" element={<OurFriends />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
