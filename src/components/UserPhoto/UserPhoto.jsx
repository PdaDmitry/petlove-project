import { useSelector } from 'react-redux';
import css from './UserPhoto.module.css';
import {
  selectAvatarUload,
  selectDeletedUserPhoto,
  selectUser,
} from '../../redux/auth/selectorsAuth';

export const UserPhoto = ({ className = '', contSize = '', svgClassName = '' }) => {
  const user = useSelector(selectUser);
  const avatarUload = useSelector(selectAvatarUload);
  const deleteUserPhoto = useSelector(selectDeletedUserPhoto);
  // console.log('deleteUserPhoto: ', deleteUserPhoto);

  return (
    <>
      {avatarUload ? (
        <img src={avatarUload} alt="Avatar Preview" className={`${css.avatarImage} ${className}`} />
      ) : !deleteUserPhoto && user.avatar ? (
        <img src={user.avatar} alt="User Avatar" className={`${css.avatarImage} ${className}`} />
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
