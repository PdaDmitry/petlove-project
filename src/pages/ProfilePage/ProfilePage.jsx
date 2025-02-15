import { useSelector } from 'react-redux';
import css from './ProfilePage.module.css';
import { selectUser } from '../../redux/auth/selectorsAuth';
import { UserCard } from '../../components/UserCard/UserCard';

export const ProfilePage = () => {
  const user = useSelector(selectUser);

  return (
    <div className={css.conteiner}>
      <UserCard />
    </div>
  );
};
