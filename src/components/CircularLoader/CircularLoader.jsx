import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useEffect, useState } from 'react';

export const CircularLoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 0; // чтобы заново крутился, можно просто оставить 100 если не нужно сбрасывать
        }
        return prev + 1; // скорость можно менять, например +2 для быстрого
      });
    }, 35); // скорость обновления, можно 100 мс, можно быстрее

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: 292, height: 292, margin: '100px auto' }}>
      <CircularProgressbar
        value={progress}
        text={`${progress}%`}
        styles={buildStyles({
          textColor: '#555',
          pathColor: '#ff6b08',
          trailColor: '#f0f0f0',
        })}
      />
    </div>
  );
};
