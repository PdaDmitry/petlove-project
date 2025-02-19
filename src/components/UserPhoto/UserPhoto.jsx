import { useSelector } from 'react-redux';
import css from './UserPhoto.module.css';
import { selectToken, selectUser } from '../../redux/auth/selectorsAuth';
import { useEffect, useState } from 'react';

export const UserPhoto = ({ fileInputRef, className = '' }) => {
  const [avatarPreview, setAvatarPreview] = useState('');

  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  useEffect(() => {
    const savedAvatar = localStorage.getItem(token);
    if (savedAvatar) {
      setAvatarPreview(savedAvatar);
    }
  }, [token]);

  const handleFileChange = event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setAvatarPreview(base64Image);
        localStorage.setItem(token, base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

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
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};
