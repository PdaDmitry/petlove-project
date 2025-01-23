import css from './App.module.css';
import { MainPage } from '../../pages/MainPage/MainPage';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../../pages/Home/Home';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { RegistrationPage } from '../../pages/RegistrationPage/RegistrationPage';
import { Toaster } from 'react-hot-toast';
import { ProfilePage } from '../../pages/ProfilePage/ProfilePage';
import { NotFound } from '../../pages/NotFound/NotFound';

function App() {
  return (
    <div className={css.contApp}>
      <Toaster />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/news" element={<p>News</p>} />
        <Route path="/notices" element={<p>Find pet</p>} />
        <Route path="/friends" element={<p>Our friends</p>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
