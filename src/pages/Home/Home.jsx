import Title from '../../components/Title/Title';
import css from './Home.module.css';

export const Home = () => {
  return (
    <div className={css.contHome}>
      <div className={css.homeDescription}>
        <Title>
          <div className={css.title}>
            Take good <span className={css.titleSpan}>care</span> of your small pets
          </div>
        </Title>
        {/* <h1 className={css.title}>
          Take good <span className={css.titleSpan}>care</span> of your small pets
        </h1> */}
        <p className={css.text}>
          Choosing a pet for your home is a choice that is meant to enrich your life with
          immeasurable joy and tenderness.
        </p>
      </div>
      <div className={css.imgHome}></div>
    </div>
  );
};
