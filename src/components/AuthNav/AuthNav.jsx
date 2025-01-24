import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css';

export const AuthNav = ({ isHome, closeBurgerMenu }) => {
  return (
    <ul className={css.authNavBurger}>
      <li className={css.liItemLog}>
        <NavLink to="/login" onClick={closeBurgerMenu}>
          <div className={isHome ? css.burgerLiNavlogHome : css.burgerLiNavlog}>
            <p className={css.linkAuth}>LOG IN</p>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink to="/register" onClick={closeBurgerMenu}>
          <div className={isHome ? css.burgerLiNavHome : css.burgerLiNav}>
            <p className={css.linkAuth}>REGISTRATION</p>
          </div>
        </NavLink>
      </li>
    </ul>
  );
};
