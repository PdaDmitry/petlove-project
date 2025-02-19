import { useSelector } from 'react-redux';
import css from './UserPhoto.module.css';
import { selectAvatarUload, selectToken, selectUser } from '../../redux/auth/selectorsAuth';

export const UserPhoto = ({ className = '' }) => {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const avatarPreview = useSelector(selectAvatarUload);

  return (
    <div>
      {avatarPreview ? (
        <img src={avatarPreview} alt="Avatar Preview" className={css.avatarImage} />
      ) : user.avatar ? (
        <img src={user.avatar} alt="User Avatar" className={css.avatarImage} />
      ) : (
        <div className={css.photo}>
          <svg className={css.userSvgPhoto}>
            <use href="/symbol-defs-mob.svg#icon-user-02"></use>
          </svg>
        </div>
      )}
    </div>
  );
};
