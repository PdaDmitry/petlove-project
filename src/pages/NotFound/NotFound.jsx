import { useNavigate } from 'react-router-dom';
import css from './NotFound.module.css';
import { useEffect, useState } from 'react';

export const NotFound = () => {
  const [imageSrc, setImageSrc] = useState('');
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/home');
  };

  useEffect(() => {
    const updateImage = () => {
      if (window.innerWidth <= 480) {
        setImageSrc('/images/not-found/not-found-mob.png');
      } else if (window.innerWidth <= 1024) {
        setImageSrc('/images/not-found/not-found-tab.png');
      } else {
        setImageSrc('/images/not-found/not-found-desk.png');
      }
    };

    updateImage();
    window.addEventListener('resize', updateImage);

    return () => window.removeEventListener('resize', updateImage);
  }, []);

  return (
    <div className={css.conteiner}>
      <div className={css.contNotFound}>
        <div className={css.title}>
          <p className={css.numberFor}>4</p>
          <span className={css.notFoundSpan}>
            <img
              src={imageSrc}
              // src="../../../public/images/not-found/not-found-mob.png"
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
