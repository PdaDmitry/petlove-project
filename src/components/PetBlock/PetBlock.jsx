import PropTypes from 'prop-types';
import css from './PetBlock.module.css';

export const PetBlock = ({ src, alt, className = '' }) => {
  return (
    <div className={`${css.imageContainer} ${className ? className : ''}`}>
      <img className={css.image} src={src} alt={alt} />
    </div>
  );
};

PetBlock.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
