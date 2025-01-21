import css from './App.module.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectorsAuth';
import { MainPage } from '../../pages/MainPage/MainPage';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../../pages/Home/Home';
// import { useState } from 'react';

function App() {
  // const [view, setView] = useState(false);
  const user = useSelector(selectUser);
  // console.log('user: ', user);

  return (
    <div className={css.contApp}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
