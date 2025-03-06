import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import css from './ModalPhotoFormat.module.css';

export const ModalPhotoFormat = ({ closeModal }) => {
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate('/add-pet');
  };

  return (
    <div className={css.contModalAttention}>
      <button type="button" className={css.closeButton} onClick={closeModal} aria-label="Close">
        <IoMdClose style={{ width: '24px', height: '24px' }} />
      </button>

      <h3 className={css.title}>Attention</h3>
      <p className={css.text}>
        The avatar must be a link to an image in the following formats: png, jpg, jpeg, gif, bmp or
        webp, starting with http:// or https://.
      </p>

      <button type="button" className={css.btnLogIn} onClick={handleClickBack}>
        Log In
      </button>
    </div>
  );
};
