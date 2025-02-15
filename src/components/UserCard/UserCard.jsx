import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectorsAuth';
import css from './UserCard.module.css';

export const UserCard = () => {
  const user = useSelector(selectUser);

  return (
    <div className={css.contProfile}>
      <div className={css.contUserUdateBtns}>
        <button type="button" className={css.btnUser}>
          <span className={css.spanBtnUser}>User</span>
          <svg className={css.userSvg}>
            <use href="/symbol-defs-mob.svg#icon-user-02-1"></use>
          </svg>
        </button>
        <button type="button" className={css.btnUpdateUser}>
          <svg className={css.editSvg}>
            <use href="/symbol-defs-mob.svg#icon-edit-2"></use>
          </svg>
        </button>
      </div>
      {/* =============================================================== */}
      <div className={css.contPhoto}>
        <div className={css.photo}>
          <svg className={css.userSvgPhoto}>
            <use href="/symbol-defs-mob.svg#icon-user-02"></use>
          </svg>
        </div>
        <p className={css.text}>Upload photo</p>
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
    </div>
  );
};
