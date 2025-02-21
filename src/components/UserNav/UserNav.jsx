import { useNavigate } from 'react-router-dom';
import { LogoutUser } from '../LogoutUser/LogoutUser';
import css from './UserNav.module.css';
import { useState } from 'react';
import { UserPhoto } from '../UserPhoto/UserPhoto';

export const UserNav = ({ isHome, closeBurgerMenu }) => {
  // const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    closeBurgerMenu();
    navigate('/profile');
  };
  return (
    <div className={css.contUserNav}>
      <div className={css.contUserPhoto}>
        <UserPhoto
          className={css.customAvatar}
          contSize={css.customPhoto}
          svgClassName={css.customUserSvg}
          isHome={isHome}
          handleClick={handleClick}
          variant="burgerMenu"
        />
      </div>

      <LogoutUser isHome={isHome} closeBurgerMenu={closeBurgerMenu} />
    </div>
  );
};
