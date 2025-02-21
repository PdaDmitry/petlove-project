import css from './LogoutUser.module.css';
import { useState } from 'react';
import { LogoutModal } from '../LogoutModal/LogoutModal';
import ModalWindow from '../ModalWindow/ModalWindow';

export const LogoutUser = ({ isHome, closeBurgerMenu, customStyle = {} }) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  return (
    <div className={css.conteiner}>
      <button
        type="button"
        className={isHome ? css.btnLogoutHome : css.btnLogout}
        style={customStyle}
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
