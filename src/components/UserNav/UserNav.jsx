import { useNavigate } from 'react-router-dom';
import { LogoutUser } from '../LogoutUser/LogoutUser';
import css from './UserNav.module.css';
import { useState } from 'react';

export const UserNav = ({ isHome, closeBurgerMenu }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/profile');
  };
  return (
    <div className={css.contUserNav}>
      <div
        className={isHome ? css.backgrSvgHome : css.backgrSvg}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <svg className={css.userSvg}>
          <use
            href={
              isHovered
                ? '/symbol-defs-mob.svg#icon-user-02-1'
                : '/symbol-defs-mob.svg#icon-user-02'
            }
          ></use>
        </svg>
      </div>

      <LogoutUser isHome={isHome} closeBurgerMenu={closeBurgerMenu} />
    </div>
  );
};
