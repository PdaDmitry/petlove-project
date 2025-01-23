import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/auth/operationsAuth';
import css from './LogoutUser.module.css';

export const LogoutUser = ({ closeBurgerMenu }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    closeBurgerMenu();
  };

  return (
    <button type="button" className={css.btnLogout} onClick={handleLogout}>
      LOG OUT
    </button>
  );
};
