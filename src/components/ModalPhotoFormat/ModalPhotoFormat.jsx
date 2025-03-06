import { IoMdClose } from 'react-icons/io';
import css from './ModalPhotoFormat.module.css';

export const ModalPhotoFormat = ({ closeModal }) => {
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
        Please enter the URL of the image for the avatar in the “Enter URL” field. The link must
        begin with http:// or https:// and point to an image in one of the following formats:
        <br /> PNG, JPG, JPEG, GIF, BMP or WEBP!
      </p>

      <button type="button" className={css.btnBack} onClick={closeModal}>
        Back
      </button>
    </div>
  );
};
