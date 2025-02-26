import { IoMdClose } from 'react-icons/io';
import css from './CongratsModalWindow.module.css';

export const CongratsModalWindow = ({ closeModal }) => {
  return (
    <div className={css.contLogoutModal}>
      <button type="button" className={css.closeButton} onClick={closeModal} aria-label="Close">
        <IoMdClose style={{ width: '24px', height: '24px' }} />
      </button>
      <div className={css.backgrImeg}>
        <img src="/🐈.png" alt="Cat" className={css.imageCat} />
      </div>
      <h2 className={css.title}>Congrats</h2>
      <p className={css.text}>
        The first fluff in the favorites! May your friendship be the happiest and filled with fun.
      </p>

      <button type="button" className={css.btnGoToProfile} onClick={closeModal}>
        Go to profile
      </button>
    </div>
  );
};
