import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useEffect, useState } from 'react';
import css from './CircularLoader.module.css';

export const CircularLoader = () => {
  const [progress, setProgress] = useState(0);

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

  return (
    <div className={css.loaderWrapper} style={{ width: 310, height: 310 }}>
      <CircularProgressbar
        value={progress}
        text={`${progress}%`}
        styles={{
          trail: {
            stroke: '#fff',
            strokeWidth: 1,
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
    </div>
  );
};
