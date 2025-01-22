import { NavLink, useNavigate } from 'react-router-dom';
import css from './Home.module.css';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';

export const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

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
          <li className={css.burgerLiHome}>
            <NavLink to="/news" className={css.link} onClick={closeBurgerMenu}>
              News
            </NavLink>
          </li>
          <li className={css.burgerLiHome}>
            <NavLink to="/notices" className={css.link} onClick={closeBurgerMenu}>
              Find pet
            </NavLink>
          </li>
          <li className={css.burgerLiHomeLast}>
            <NavLink to="/friends" className={css.link} onClick={closeBurgerMenu}>
              Our friends
            </NavLink>
          </li>
        </ul>
        <ul className={css.authNavBurger}>
          <li className={css.burgerLiNavlog}>
            <NavLink to="/login" className={css.linkAuth} onClick={closeBurgerMenu}>
              LOG IN
            </NavLink>
          </li>
          <li className={css.burgerLiNav}>
            <NavLink to="/register" className={css.linkAuth} onClick={closeBurgerMenu}>
              REGISTRATION
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
