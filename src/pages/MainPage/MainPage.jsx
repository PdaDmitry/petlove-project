import { useNavigate } from 'react-router-dom';
import css from './MainPage.module.css';

export const MainPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/home');
  };

  return (
    <div className={css.mainCont}>
      <div className={css.contLogo} onClick={handleClick}>
        <p className={css.logoText}>petl</p>
        <svg className={css.logoSvg}>
          <use href="/symbol-defs-mob.svg#icon-heart-circle"></use>
        </svg>
        <p className={css.logoText}>ve</p>
      </div>
    </div>
  );
};
