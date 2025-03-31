import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useEffect, useState } from 'react';
import css from './CircularLoader.module.css';

export const CircularLoader = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 1;
      });
    }, 35);

    return () => clearInterval(interval);
  }, []);

  const getImageSrc = () => {
    if (windowWidth >= 1280) {
      return '/images/main-image-desk-2x.jpg';
    } else if (windowWidth >= 768) {
      return '/images/main-image-tab-2x.jpg';
    }
    return '/images/main-image-mob-2x.jpg';
  };

  return (
    <div className={css.loaderWrapper}>
      <img className={css.mainImage} src={getImageSrc()} alt={'Main photo and Logo'} />
      {/* <div className={css.progress}> */}
      <CircularProgressbar
        value={progress}
        text={`${progress}%`}
        className={css.progress}
        styles={{
          trail: {
            stroke: '#fff',
            strokeWidth: 1,
            circleRatio: 0.5,
          },
          path: {
            stroke: 'rgb(130, 130, 130, 0.9)',
            strokeWidth: 1,
          },
          text: {
            fill: '#fff',
            fontSize: '15px',
          },
        }}
      />
      {/* </div> */}
    </div>
  );
};

//style={{ width: 310, height: 310, margin: 'auto' }}
