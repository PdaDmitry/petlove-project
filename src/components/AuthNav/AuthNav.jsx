import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css';

export const AuthNav = ({ closeBurgerMenu }) => {
  return (
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
  );
};
