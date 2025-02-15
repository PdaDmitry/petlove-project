import { useNavigate } from 'react-router-dom';
import css from './NotFound.module.css';

export const NotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/home');
  };

  return (
    <div className={css.conteiner}>
      <div className={css.contNotFound}>
        <div className={css.title}>
          <p className={css.numberFor}>4</p>
          <span className={css.notFoundSpan}>
            <img
              src="../../../public/images/not-found/not-found-mob.png"
              alt="Not Found"
              className={css.image}
            />
          </span>
          <p className={css.numberFor}>4</p>
        </div>
        <p className={css.text}>Ooops! This page not found :(</p>
        <button type="button" className={css.btnGoHome} onClick={handleClick}>
          To home page
        </button>
      </div>
    </div>
  );
};
