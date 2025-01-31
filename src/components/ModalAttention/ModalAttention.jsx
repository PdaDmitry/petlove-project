import { IoMdClose } from 'react-icons/io';
import css from './ModalAttention.module.css';
import { useNavigate } from 'react-router-dom';

export const ModalAttention = ({ closeModal }) => {
  const navigate = useNavigate();

  const handleClickLogIn = () => {
    navigate('/login');
  };

  const handleClickRegister = () => {
    navigate('/register');
  };

  return (
    <div className={css.contModalAttention}>
      <button type="button" className={css.closeButton} onClick={closeModal} aria-label="Close">
        <IoMdClose style={{ width: '24px', height: '24px' }} />
      </button>
      <div className={css.backgrImeg}>
        <img src="/🐶.png" alt="Cat" className={css.imageDog} />
      </div>
      <h3 className={css.title}>Attention</h3>
      <p className={css.text}>
        We would like to remind you that certain functionality is available only to authorized
        users.If you have an account, please log in with your credentials. If you do not already
        have an account, you must register to access these features.
      </p>
      <div className={css.conButtons}>
        <button type="button" className={css.btnLogIn} onClick={handleClickLogIn}>
          Log In
        </button>
        <button type="button" className={css.btnRegister} onClick={handleClickRegister}>
          Registration
        </button>
      </div>
    </div>
  );
};
