import { useNavigate } from 'react-router-dom';
import css from './MainPage.module.css';
import { useEffect, useState } from 'react';

export const MainPage = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = () => {
    navigate('/home');
  };

  const getImageSrc = () => {
    if (windowWidth >= 1280) {
      return '/images/main-image-desk-2x.jpg';
    } else if (windowWidth >= 768) {
      return '/images/main-image-tab-2x.jpg';
    }
    return '/images/main-image-mob-2x.jpg';
  };

  return (
    <div className={css.mainCont}>
      <img className={css.mainImage} src={getImageSrc()} alt={'Main photo and Logo'} />
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
