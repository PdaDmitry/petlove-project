import { useDispatch, useSelector } from 'react-redux';
import { selectPetById } from '../../redux/pets/selectorsPets';
import { GoStarFill } from 'react-icons/go';
import { format } from 'date-fns';
import css from './NoticesItem.module.css';
import {
  selectIsLoggedIn,
  selectNoticesViewedById,
  selectPetsForFavoriteById,
} from '../../redux/auth/selectorsAuth';
import ModalWindow from '../ModalWindow/ModalWindow';
import { ModalAttention } from '../ModalAttention/ModalAttention';
import { useState } from 'react';
import { ModalNotice } from '../ModalNotice/ModalNotice';
import {
  addFavoritesThunk,
  fetchPetByIdThunk,
  fetchPetForViewed,
  removeFavoriteThunk,
} from '../../redux/pets/operationsPets';
import { FiHeart } from 'react-icons/fi';

export const NoticesItem = ({ id, page }) => {
  const [attentionModalOpen, setAttentionModalOpen] = useState(false);
  const [noticeModalOpen, setNoticeModalOpen] = useState(false);
  const [petContacts, setPetContacts] = useState(null);

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const pet = useSelector(selectPetById(id));
  const petForFavorite = useSelector(selectPetsForFavoriteById(id));
  const viewedPets = useSelector(selectNoticesViewedById(id));

  const openAttentionModal = () => setAttentionModalOpen(true);
  const closeAttentionModal = () => setAttentionModalOpen(false);
  const openNoticeModal = () => setNoticeModalOpen(true);
  const closeNoticeModal = () => setNoticeModalOpen(false);

  let elem;

  if (page === 'profile') {
    elem = petForFavorite;
  } else if (page === 'viewed') {
    elem = viewedPets;
  } else {
    elem = pet;
  }

  const { imgURL, title, name, birthday, sex, species, category, comment, popularity, price } =
    elem;

  const cost = price ? price : 'Uncertain';
  const formattedDate = format(new Date(birthday), 'dd.MM.yyyy');
  const born = birthday ? formattedDate : 'Unknown';

  const capitalizeFirstLetter = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleModalOpen = async () => {
    try {
      const data = await dispatch(fetchPetForViewed(id)).unwrap();
      setPetContacts(data.user);
      // console.log(data.user);
    } catch (error) {
      console.error('Failed to fetch pet:', error);
    }

    isLoggedIn ? openNoticeModal() : openAttentionModal();
  };

  const handleAddFavoritePet = () => {
    dispatch(addFavoritesThunk(id));
    dispatch(fetchPetByIdThunk(id));
  };

  const handleRemoveFavoritePet = () => {
    dispatch(removeFavoriteThunk(id));
    dispatch(fetchPetByIdThunk(id));
  };

  const handleOpenContact = () => {
    const { phone, email } = petContacts;
    // console.log(phone, email);

    if (email) {
      window.location.href = `mailto:${email}`;
    } else if (phone) {
      window.location.href = `tel:${phone}`;
    } else {
      alert('Contact information is not available.');
    }
  };

  if (!elem) {
    return <p>Pet not found</p>;
  }

  return (
    <div className={css.contPet}>
      <img src={imgURL} alt={`${title}'s photo`} className={css.petImg} />
      <div className={css.contTitleStar}>
        <h2 className={css.title}>{title}</h2>
        <div className={css.contStar}>
          <GoStarFill className={css.iconStarYellow} />
          <p className={css.popularity}>{popularity}</p>
        </div>
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
        <li className={css.infoItem}>
          <span className={css.categoryName}>Category</span>
          <span className={css.categoryValue}>{capitalizeFirstLetter(category)}</span>
        </li>
      </ul>
      <p className={css.text}>{comment}</p>
      <p className={css.price}>$ {cost}</p>
      <div className={css.contBtns}>
        <button className={css.btnLearn} type="button" onClick={handleModalOpen}>
          Learn more
        </button>
        <button
          className={page === 'viewed' ? css.btnHeartNotVisible : css.btnHeart}
          onClick={page === 'profile' ? handleRemoveFavoritePet : handleAddFavoritePet}
          disabled={page !== 'profile' && petForFavorite}
        >
          {page === 'profile' ? (
            <svg className={css.iconHeart}>
              <use href="/symbol-defs-mob.svg#icon-trash-2"></use>
            </svg>
          ) : petForFavorite ? (
            <FiHeart style={{ width: '18px', height: '18px', color: '#f6b83d', fill: '#f6b83d' }} />
          ) : (
            <svg className={css.iconHeart}>
              <use href="/symbol-defs-mob.svg#icon-heart-2"></use>
            </svg>
          )}
        </button>
      </div>

      <ModalWindow isOpen={attentionModalOpen} onClose={closeAttentionModal}>
        <ModalAttention closeModal={closeAttentionModal} />
      </ModalWindow>

      <ModalWindow isOpen={noticeModalOpen} onClose={closeNoticeModal}>
        <ModalNotice
          closeModal={closeNoticeModal}
          id={id}
          page={page}
          handleOpenContact={handleOpenContact}
        />
      </ModalWindow>
    </div>
  );
};
