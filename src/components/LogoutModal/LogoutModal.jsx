import { useDispatch } from 'react-redux';
import css from './LogoutModal.module.css';
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../redux/auth/operationsAuth';

export const LogoutModal = ({ closeModal, closeBurgerMenu }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    closeBurgerMenu();
    navigate('/home');
  };

  return (
    <div className={css.contLogoutModal}>
      <button type="button" className={css.closeButton} onClick={closeModal} aria-label="Close">
        <IoMdClose style={{ width: '24px', height: '24px' }} />
      </button>
      <div className={css.backgrImeg}>
        <img src="/🐈.png" alt="Cat" className={css.imageCat} />
      </div>
      <p className={css.text}>Already leaving?</p>
      <div className={css.conButtons}>
        <button type="button" className={css.btnYes} onClick={handleLogout}>
          Yes
        </button>
        <button type="button" className={css.btnCancel} onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};
