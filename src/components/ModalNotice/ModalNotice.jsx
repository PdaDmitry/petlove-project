import { IoMdClose } from 'react-icons/io';
import css from './ModalNotice.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectPetById } from '../../redux/pets/selectorsPets';
import { GoStarFill } from 'react-icons/go';
import { format } from 'date-fns';
import { addFavoritesThunk, fetchPetByIdThunk } from '../../redux/pets/operationsPets';
import { selectPetsForFavoriteById } from '../../redux/auth/selectorsAuth';

export const ModalNotice = ({ closeModal, id }) => {
  const pet = useSelector(selectPetById(id));
  const {
    imgURL,
    title,
    name,
    birthday,
    sex,
    species,
    category,
    comment,
    location,
    popularity,
    price,
  } = pet;
  const page = 'modalNotice';
  const petForFavorite = useSelector(selectPetsForFavoriteById(id));
  const dispatch = useDispatch();

  const cost = price ? price : 'Uncertain';
  const formattedDate = format(new Date(birthday), 'dd.MM.yyyy');
  const born = birthday ? formattedDate : 'Unknown';

  const capitalizeFirstLetter = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleAddFavoritePet = () => {
    dispatch(addFavoritesThunk(id));
    dispatch(fetchPetByIdThunk(id));
    closeModal();
  };

  return (
    <div className={css.contModalNotice}>
      <button type="button" className={css.closeButton} onClick={closeModal} aria-label="Close">
        <IoMdClose style={{ width: '24px', height: '24px' }} />
      </button>
      <div className={css.contImg}>
        <span className={css.spanCategory}>{capitalizeFirstLetter(category)}</span>
        <img src={imgURL} alt={`${title}'s photo`} className={css.petImg} />
      </div>
      <h3 className={css.title}>{title}</h3>
      <div className={css.contReting}>
        <div className={css.ratingStar}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={css.star}>
              <GoStarFill
                style={{
                  width: '16px',
                  height: '16px',
                }}
                className={i < popularity ? css.iconStarYellow : css.iconStarGray}
              />
            </div>
          ))}
        </div>
        <p className={css.popularity}>{popularity}</p>
      </div>
      <ul className={css.petInfo}>
        <li className={css.infoItem}>
          <span className={css.categoryName}>Name</span>
          <span className={css.categoryValue}>{name}</span>
        </li>
        <li className={css.infoItem}>
          <span className={css.categoryName}>Birthday</span>
          <span className={css.categoryValue}>{born}</span>
        </li>
        <li className={css.infoItem}>
          <span className={css.categoryName}>Sex</span>
          <span className={css.categoryValue}>{capitalizeFirstLetter(sex)}</span>
        </li>
        <li className={css.infoItem}>
          <span className={css.categoryName}>Species</span>
          <span className={css.categoryValue}>{capitalizeFirstLetter(species)}</span>
        </li>
      </ul>
      <p className={css.text}>{comment}</p>
      <p className={css.price}>$ {cost}</p>
      <div className={css.conButtons}>
        <button
          type="button"
          className={petForFavorite ? css.btnAddNoVisible : css.btnAdd}
          onClick={handleAddFavoritePet}
          disabled={page !== 'profile' && petForFavorite}
        >
          <p className={css.textAdd}>Add to</p>
          <svg className={css.iconHeart}>
            <use href="/symbol-defs-mob.svg#icon-heart-2"></use>
          </svg>
          <svg className={css.iconHeartHover}>
            <use href="/symbol-defs-mob.svg#icon-heart-1"></use>
          </svg>
        </button>
        <button type="button" className={css.btnContact}>
          Contact
        </button>
      </div>
    </div>
  );
};
