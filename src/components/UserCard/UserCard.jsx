import { useDispatch, useSelector } from 'react-redux';
import { selectToken, selectUser } from '../../redux/auth/selectorsAuth';
import css from './UserCard.module.css';
import { LogoutUser } from '../LogoutUser/LogoutUser';
import { useEffect, useRef, useState } from 'react';
import ModalWindow from '../ModalWindow/ModalWindow';
import { ModalEditUser } from '../ModalEditUser/ModalEditUser';
import { UserPhoto } from '../UserPhoto/UserPhoto';
import { setAvatarUpload } from '../../redux/auth/authSlice';

export const UserCard = () => {
  const [modalEditUserOpen, setModalEditUserOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  // const [avatarPreview, setAvatarPreview] = useState(null);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  const handleFileChange = event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        // setAvatarPreview(base64Image);
        dispatch(setAvatarUpload(base64Image)); // Сохраняем аватар в Redux
      };
      reader.readAsDataURL(file);
    }
  };

  const openModalEditUser = () => setModalEditUserOpen(true);
  const closeModalEditUser = () => setModalEditUserOpen(false);

  const handleUploadPhoto = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarUploadReset = () => {
    dispatch(setAvatarUpload(null));
  };

  return (
    <div className={css.contProfile}>
      <div className={css.contUserUdateBtns}>
        <button
          type="button"
          className={css.btnUser}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleAvatarUploadReset}
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
        <UserPhoto />

        <button type="button" className={css.btnUploadPhoto} onClick={handleUploadPhoto}>
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
        <ModalEditUser closeModal={closeModalEditUser} handleUploadPhoto={handleUploadPhoto} />
      </ModalWindow>
    </div>
  );
};
