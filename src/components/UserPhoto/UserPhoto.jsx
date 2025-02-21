import { useSelector } from 'react-redux';
import css from './UserPhoto.module.css';
import {
  selectAvatarUload,
  selectDeletedUserPhoto,
  selectUser,
} from '../../redux/auth/selectorsAuth';
import { useState } from 'react';

export const UserPhoto = ({
  isHome,
  handleClick,
  variant = '',
  className = '',
  contSize = '',
  svgClassName = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const user = useSelector(selectUser);
  const avatarUload = useSelector(selectAvatarUload);
  const deleteUserPhoto = useSelector(selectDeletedUserPhoto);
  // console.log('deleteUserPhoto: ', deleteUserPhoto);

  return (
    <>
      {avatarUload ? (
        <img
          src={avatarUload}
          alt="Avatar Preview"
          className={`${css.avatarImage} ${className} ${
            variant === 'burgerMenu' ? css.mgBurgerMenu : ''
          }`}
          onClick={variant === 'burgerMenu' ? handleClick : undefined}
        />
      ) : !deleteUserPhoto && user.avatar ? (
        <img
          src={user.avatar}
          alt="User Avatar"
          className={`${css.avatarImage} ${className} ${
            variant === 'burgerMenu' ? css.mgBurgerMenu : ''
          }`}
          onClick={variant === 'burgerMenu' ? handleClick : undefined}
        />
      ) : variant === 'header' || variant === 'burgerMenu' ? (
        <div
          className={isHome ? css.backgrSvgHome : css.backgrSvg}
          onClick={variant === 'burgerMenu' ? handleClick : undefined}
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
      ) : (
        <div className={`${css.photo} ${contSize}`}>
          <svg className={`${css.userSvgPhoto} ${svgClassName}`}>
            <use href="/symbol-defs-mob.svg#icon-user-02"></use>
          </svg>
        </div>
      )}
    </>
  );
};
