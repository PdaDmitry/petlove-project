import { NavLink, useNavigate } from 'react-router-dom';
import css from './Home.module.css';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectorsAuth';

export const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  console.log('user Home: ', user);

  const handleClick = () => {
    navigate('/home');
  };

  const openBurgerMenu = () => {
    setMenuOpen(true);
  };

  const closeBurgerMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className={css.contHome}>
      <div className={css.homeDescription}>
        <div className={css.contHeader}>
          <div className={css.contLogo} onClick={handleClick}>
            <p className={css.logoText}>petl</p>
            <svg className={css.logoSvg}>
              <use href="/symbol-defs-mob.svg#icon-heart-circle-1"></use>
            </svg>
            <p className={css.logoText}>ve</p>
          </div>
          <svg className={css.burgerMenuSvg} onClick={openBurgerMenu}>
            <use href="/symbol-defs-mob.svg#icon-menu-01-1"></use>
          </svg>
        </div>
        <h1 className={css.title}>
          Take good <span className={css.titleSpan}>care</span> of your small pets
        </h1>
        <p className={css.text}>
          Choosing a pet for your home is a choice that is meant to enrich your life with
          immeasurable joy and tenderness.
        </p>
      </div>
      <div className={css.imgHome}></div>

      <nav className={`${css.burgerMenu} ${menuOpen ? css.open : ''}`}>
        <button type="button" className={css.closeButton} onClick={closeBurgerMenu}>
          <IoMdClose style={{ width: '32px', height: '32px' }} />
        </button>

        <ul className={css.burgerMenuUl}>
          <li className={css.liItem}>
            <NavLink to="/news" onClick={closeBurgerMenu}>
              <div className={css.burgerNavHome}>
                <p className={css.link}>News</p>
              </div>
            </NavLink>
          </li>
          <li className={css.liItem}>
            <NavLink to="/notices" onClick={closeBurgerMenu}>
              <div className={css.burgerNavHome}>
                <p className={css.link}>Find pet</p>
              </div>
            </NavLink>
          </li>
          <li className={css.liItemLast}>
            <NavLink to="/friends" onClick={closeBurgerMenu}>
              <div className={css.burgerNavHomeLast}>
                <p className={css.link}>Our friends</p>
              </div>
            </NavLink>
          </li>
        </ul>
        <ul className={css.authNavBurger}>
          <li className={css.liItemLog}>
            <NavLink to="/login" onClick={closeBurgerMenu}>
              <div className={css.burgerLiNavlog}>
                <p className={css.linkAuth}>LOG IN</p>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/register" onClick={closeBurgerMenu}>
              <div className={css.burgerLiNav}>
                <p className={css.linkAuth}>REGISTRATION</p>
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
