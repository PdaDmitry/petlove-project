import { useDispatch, useSelector } from 'react-redux';
import {
  selectAvatarUload,
  selectDeletedUserPhoto,
  selectUser,
} from '../../redux/auth/selectorsAuth';
import css from './UserCard.module.css';
import { LogoutUser } from '../LogoutUser/LogoutUser';
import { useEffect, useRef, useState } from 'react';
import ModalWindow from '../ModalWindow/ModalWindow';
import { ModalEditUser } from '../ModalEditUser/ModalEditUser';
import { UserPhoto } from '../UserPhoto/UserPhoto';
import { removeUserPhoto, resetUploadedPhoto, setAvatarUpload } from '../../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { AddPetsList } from '../AddPetsList/AddPetsList';
import { FiPlus } from 'react-icons/fi';

export const UserCard = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [modalEditUserOpen, setModalEditUserOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredAddBtn, setIsHoveredAddBtn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const user = useSelector(selectUser);
  const avatarUload = useSelector(selectAvatarUload);

  const deleteUserPhoto = useSelector(selectDeletedUserPhoto);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleFileChange = event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        dispatch(setAvatarUpload(base64Image));
        if (!modalEditUserOpen) dispatch(resetUploadedPhoto());
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
    if (!modalEditUserOpen) dispatch(resetUploadedPhoto());

    dispatch(removeUserPhoto(true));
  };

  const handleClickAddPet = () => {
    navigate('/add-pet');
  };

  return (
    <div className={css.contProfile}>
      <div
        className={`${css.contUserUdateBtns} ${
          !avatarUload && deleteUserPhoto ? '' : css.mgBottom
        }`}
      >
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
      {/* ==============================contPhoto================================= */}
      <div
        className={`${css.contPhoto} ${!avatarUload && deleteUserPhoto ? '' : css.uploadedPhoto}`}
      >
        <UserPhoto />

        <button
          type="button"
          className={!avatarUload && deleteUserPhoto ? css.btnUploadPhoto : css.notVisible}
          onClick={handleUploadPhoto}
        >
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
      {/* ====================================================================== */}
      <div className={css.contMyInf}>
        <h2 className={css.titleInf}>My information</h2>
        <div className={css.contNameEmail}>
          <div className={css.userName}>{user.name}</div>
          <div className={css.userEmail}>{user.email}</div>
        </div>

        <div className={css.userNumber} style={user.phone ? { border: '1px solid #f6b83d' } : {}}>
          {user.phone ? user.phone : '+380'}
        </div>
      </div>
      {/* =============================PetsBlock================================== */}
      {/* <div className={css.petsBlock}> */}
      <div className={css.contTitleAndBtn}>
        <h2 className={css.titleMyPets}>My pets</h2>
        <button
          type="button"
          className={css.btnAddPets}
          onClick={handleClickAddPet}
          onMouseEnter={() => setIsHoveredAddBtn(true)}
          onMouseLeave={() => setIsHoveredAddBtn(false)}
        >
          <span className={css.addBtnText}>Add pet</span>
          {isHoveredAddBtn ? (
            <svg className={css.addPlusSvg}>
              <use href="/symbol-defs-mob.svg#icon-plus"></use>
            </svg>
          ) : (
            <FiPlus color="#f6b83d" className={css.svgPlus} />
          )}
        </button>
      </div>
      {/* </div> */}

      <AddPetsList />

      <LogoutUser
        customStyle={{
          width: windowWidth < 768 ? '114px' : '136px',
          height: windowWidth < 768 ? '42px' : '50px',
        }}
      />

      <ModalWindow isOpen={modalEditUserOpen} onClose={closeModalEditUser}>
        <ModalEditUser closeModal={closeModalEditUser} handleUploadPhoto={handleUploadPhoto} />
      </ModalWindow>
    </div>
  );
};
