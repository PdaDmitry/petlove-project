import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/auth/operationsAuth';
import css from './LogoutUser.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { LogoutModal } from '../LogoutModal/LogoutModal';
import ModalWindow from '../ModalWindow/ModalWindow';

export const LogoutUser = ({ isHome, closeBurgerMenu }) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  return (
    <div>
      <button
        type="button"
        className={isHome ? css.btnLogoutHome : css.btnLogout}
        onClick={openLogoutModal}
      >
        LOG OUT
      </button>

      <ModalWindow isOpen={isLogoutModalOpen} onClose={closeLogoutModal}>
        <LogoutModal closeModal={closeLogoutModal} closeBurgerMenu={closeBurgerMenu} />
      </ModalWindow>
    </div>
  );
};
