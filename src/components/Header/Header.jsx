import { NavLink, useNavigate } from 'react-router-dom';
import css from './Header.module.css';
import { useSelector } from 'react-redux';
import {
  selectDeletedUserPhoto,
  selectIsLoggedIn,
  selectUser,
} from '../../redux/auth/selectorsAuth';
import { useEffect, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { UserNav } from '../UserNav/UserNav';
import { AuthNav } from '../AuthNav/AuthNav';
import { UserPhoto } from '../UserPhoto/UserPhoto';
import { LogoutUser } from '../LogoutUser/LogoutUser';

export const Header = ({ isHome }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const user = useSelector(selectUser);
  const deleteUserPhoto = useSelector(selectDeletedUserPhoto);
  // console.log('user: ', user);

  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = () => {
    navigate('/home');
  };

  const handleUserClick = () => {
    navigate('/profile');
  };

  const openBurgerMenu = () => {
    setMenuOpen(true);
  };

  const closeBurgerMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className={css.conteiner}>
      <div className={`${css.conteinerHeader} ${isHome ? css.homeHeader : ''}`}>
        <div className={isHome ? css.contLogoHome : css.contLogo} onClick={handleClick}>
          <p className={css.logoText} style={isHome ? { color: '#fff' } : {}}>
            petl
          </p>
          <svg className={css.logoSvg}>
            <use
              href={
                isHome
                  ? '/symbol-defs-mob.svg#icon-heart-circle-1'
                  : '/symbol-defs-mob.svg#icon-heart-circle'
              }
            ></use>
          </svg>
          <p className={css.logoText} style={isHome ? { color: '#fff' } : {}}>
            ve
          </p>
        </div>

        <div className={css.contUserBrgMenu}>
          <div className={css.contUserIsRegisteredOrNot}>
            {windowWidth >= 768 &&
              (user.email ? (
                <>
                  {!isHome && (
                    <LogoutUser
                      customStyle={{
                        width: '136px',
                        height: '50px',
                      }}
                    />
                  )}
                  <div
                    className={`${css.backgrSvg} ${isLoggedIn ? '' : css.hidden}`}
                    onClick={handleUserClick}
                  >
                    <UserPhoto
                      className={css.customAvatar}
                      contSize={css.customPhoto}
                      svgClassName={css.customUserSvg}
                      variant="header"
                    />
                  </div>
                  <p className={isHome ? css.userNameHome : css.userName}>
                    {user.name.split(' ')[0]}
                  </p>
                </>
              ) : (
                <AuthNav />
              ))}
          </div>

          <FiMenu
            className={css.burgerMenuSvg}
            style={{
              color: isHome ? '#fff' : '',
            }}
            onClick={openBurgerMenu}
          />
        </div>
      </div>

      <nav
        className={`${css.burgerMenu}  ${menuOpen ? css.open : ''}`}
        style={isHome ? { background: '#fff' } : { background: '#f6b83d' }}
      >
        <button type="button" className={css.closeButton} onClick={closeBurgerMenu}>
          <IoMdClose
            style={{
              width: '32px',
              height: '32px',
              fill: isHome ? '' : '#fff',
            }}
          />
        </button>

        <ul className={css.burgerMenuUl}>
          <li className={css.liItem}>
            <NavLink to="/news" onClick={closeBurgerMenu}>
              <div className={isHome ? css.burgerNavHome : css.burgerNav}>
                <p className={isHome ? css.linkHome : css.link}>News</p>
              </div>
            </NavLink>
          </li>
          <li className={css.liItem}>
            <NavLink to="/notices" onClick={closeBurgerMenu}>
              <div className={isHome ? css.burgerNavHome : css.burgerNav}>
                <p className={isHome ? css.linkHome : css.link}>Find pet</p>
              </div>
            </NavLink>
          </li>
          <li className={css.liItemLast}>
            <NavLink to="/friends" onClick={closeBurgerMenu}>
              <div className={isHome ? css.burgerNavHomeLast : css.burgerNavLast}>
                <p className={isHome ? css.linkHome : css.link}>Our friends</p>
              </div>
            </NavLink>
          </li>
        </ul>

        {isLoggedIn ? (
          <UserNav isHome={isHome} closeBurgerMenu={closeBurgerMenu} />
        ) : (
          <AuthNav isHome={isHome} closeBurgerMenu={closeBurgerMenu} />
        )}
      </nav>
    </div>
  );
};
