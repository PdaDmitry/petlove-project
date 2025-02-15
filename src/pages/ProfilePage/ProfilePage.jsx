import Title from '../../components/Title/Title';
import css from './ProfilePage.module.css';

export const ProfilePage = () => {
  return (
    <div className={css.conteiner}>
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
          <h2></h2>
        </div>
      </div>
    </div>
  );
};
