import { useNavigate } from 'react-router-dom';
import css from './MainPage.module.css';

export const MainPage = ({ setView }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/home');
    // setView(true);
  };

  return (
    <div className={css.mainCont} onClick={handleClick}>
      <div className={css.contLogo}>
        <p className={css.logoText}>petl</p>
        <svg className={css.logoSvg}>
          <use href="/symbol-defs-mob.svg#icon-heart-circle"></use>
        </svg>
        <p className={css.logoText}>ve</p>
      </div>
    </div>
  );
};
