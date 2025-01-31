import { useSelector } from 'react-redux';
import Title from '../../components/Title/Title';
import css from './Home.module.css';
import { selectIsLoggedIn, selectToken, selectUser } from '../../redux/auth/selectorsAuth';

export const Home = () => {
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = useSelector(selectToken);

  console.log('user: ', user);
  console.log('isLoggedIn: ', isLoggedIn);
  console.log('token: ', token);
  console.log('\n');

  return (
    <div className={css.contHome}>
      <div className={css.homeDescription}>
        <Title className={css.titleHome}>
          Take good <span className={css.titleSpan}>care</span> of your small pets
        </Title>

        <p className={css.text}>
          Choosing a pet for your home is a choice that is meant to enrich your life with
          immeasurable joy and tenderness.
        </p>
      </div>
      <div className={css.imgHome}></div>
    </div>
  );
};
