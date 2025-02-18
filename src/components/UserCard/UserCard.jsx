import { useSelector } from 'react-redux';
import { selectToken, selectUser } from '../../redux/auth/selectorsAuth';
import css from './UserCard.module.css';
import { LogoutUser } from '../LogoutUser/LogoutUser';
import { useEffect, useRef, useState } from 'react';
import ModalWindow from '../ModalWindow/ModalWindow';
import { ModalEditUser } from '../ModalEditUser/ModalEditUser';

export const UserCard = () => {
  const [modalEditUserOpen, setModalEditUserOpen] = useState(false);

  const [avatarPreview, setAvatarPreview] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const fileInputRef = useRef(null);

  const openModalEditUser = () => setModalEditUserOpen(true);
  const closeModalEditUser = () => setModalEditUserOpen(false);

  const token = useSelector(selectToken);
  const user = useSelector(selectUser);

  useEffect(() => {
    const savedAvatar = localStorage.getItem(token);
    if (savedAvatar) {
      setAvatarPreview(savedAvatar);
    }
  }, [token]);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

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
    <div className={css.contProfile}>
      <div className={css.contUserUdateBtns}>
        <button
          type="button"
          className={css.btnUser}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            localStorage.removeItem(token);
            setAvatarPreview('');
          }}
        >
          <span className={css.spanBtnUser}>User</span>
          <svg className={css.userSvg}>
            <use
              href={
                isHovered
                  ? '/symbol-defs-mob.svg#icon-user-02-1'
                  : '/symbol-defs-mob.svg#icon-user-02'
              }
            ></use>
          </svg>
        </button>
        <button type="button" className={css.btnUpdateUser} onClick={openModalEditUser}>
          <svg className={css.editSvg}>
            <use href="/symbol-defs-mob.svg#icon-edit-2"></use>
          </svg>
        </button>
      </div>
      {/* =============================================================== */}
      <div className={css.contPhoto}>
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

        <button type="button" onClick={handleUploadClick} className={css.btnUploadPhoto}>
          Upload photo
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      {/* =============================================================== */}
      <div className={css.contMyInf}>
        <h2 className={css.titleInf}>My information</h2>
        <div className={css.userName}>{user.name}</div>
        <div className={css.userEmail}>{user.email}</div>
        <div className={css.userNumber} style={user.phone ? { border: '1px solid #f6b83d' } : {}}>
          {user.phone ? user.phone : '+380'}
        </div>
      </div>
      {/* =============================PetsBlock================================== */}
      <div className={css.petsBlock}>
        <div className={css.contTitleAndBtn}>
          <h2 className={css.titleMePets}>My pets</h2>
          <button type="button" className={css.btnAddPets}>
            <span className={css.addBtnTexy}>Add pet</span>
            <svg className={css.addPlusSvg}>
              <use href="/symbol-defs-mob.svg#icon-plus"></use>
            </svg>
          </button>
        </div>
      </div>
      <LogoutUser customStyle={{ width: '114px' }} />

      <ModalWindow isOpen={modalEditUserOpen} onClose={closeModalEditUser}>
        <ModalEditUser
          handleUploadClick={handleUploadClick}
          avatarPreview={avatarPreview}
          setAvatarPreview={setAvatarPreview}
          closeModal={closeModalEditUser}
        />
      </ModalWindow>
    </div>
  );
};
