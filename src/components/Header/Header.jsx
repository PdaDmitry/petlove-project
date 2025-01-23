import { useNavigate } from 'react-router-dom';
import css from './Header.module.css';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectorsAuth';
import { useState } from 'react';
import { IoMenu } from 'react-icons/io5';

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const openBurgerMenu = () => {
    setMenuOpen(true);
  };

  const handleClick = () => {
    navigate('/home');
  };

  const handleUserClick = () => {
    navigate('/profile');
  };

  return (
    <div className={css.contHeader}>
      <div className={css.contLogo} onClick={handleClick}>
        <p className={css.logoText}>petl</p>
        <svg className={css.logoSvg}>
          <use href="/symbol-defs-mob.svg#icon-heart-circle"></use>
        </svg>
        <p className={css.logoText}>ve</p>
      </div>

      <div className={`${css.backgrSvg} ${isLoggedIn ? '' : css.hidden}`} onClick={handleUserClick}>
        <svg className={css.userSvg}>
          <use href="/symbol-defs-mob.svg#icon-user-02"></use>
        </svg>
      </div>

      {/* <IoMenu className={css.burgerMenuSvg} /> */}
      <svg className={css.burgerMenuSvg} onClick={openBurgerMenu}>
        <use href="/symbol-defs-mob.svg#icon-menu-01-1"></use>
      </svg>
    </div>
  );
};
