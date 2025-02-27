import { useDispatch, useSelector } from 'react-redux';
import {
  selectNoticesFavoriteById,
  selectPetById,
  selectPetsForFavoriteById,
} from '../../redux/pets/selectorsPets';
import { GoStarFill } from 'react-icons/go';
import { format } from 'date-fns';
import css from './NoticesItem.module.css';
import { selectIsLoggedIn } from '../../redux/auth/selectorsAuth';
import ModalWindow from '../ModalWindow/ModalWindow';
import { ModalAttention } from '../ModalAttention/ModalAttention';
import { useMemo, useState } from 'react';
import { ModalNotice } from '../ModalNotice/ModalNotice';
import {
  addFavoritesThunk,
  fetchPetByIdThunk,
  removeFavoriteThunk,
} from '../../redux/pets/operationsPets';
import { FiHeart } from 'react-icons/fi';

export const NoticesItem = ({ id, page }) => {
  const [attentionModalOpen, setAttentionModalOpen] = useState(false);
  const [noticeModalOpen, setNoticeModalOpen] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  // const selectCurrentPetById = useMemo(() => selectPetById(id), [id]);
  // const selectCurrentPetForFavoriteById = useMemo(() => selectPetsForFavoriteById(id), [id]);

  // const pet = useSelector(selectCurrentPetById);
  // const petForFavorite = useSelector(selectCurrentPetForFavoriteById);

  // const petsForFavorite = useSelector(selectPetsForFavorite);
  // console.log('petsForFavorite: ', petsForFavorite);

  const pet = useSelector(selectPetById(id));
  const petForFavorite = useSelector(selectPetsForFavoriteById(id));
  const noticesFavoriteById = useSelector(selectNoticesFavoriteById(id));

  const openAttentionModal = () => setAttentionModalOpen(true);
  const closeAttentionModal = () => setAttentionModalOpen(false);
  const openNoticeModal = () => setNoticeModalOpen(true);
  const closeNoticeModal = () => setNoticeModalOpen(false);

  // const elem = page === 'profile' ? petForFavorite : pet;
  // console.log('petForFavorite: ', petForFavorite);

  let elem;

  if (page !== 'profile') {
    elem = pet;
  } else {
    petForFavorite ? (elem = petForFavorite) : (elem = noticesFavoriteById);
  }

  if (!elem) {
    return <p>Pet not found</p>;
  }

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
  } = elem;

  const cost = price ? price : 'Uncertain';
  const formattedDate = format(new Date(birthday), 'dd.MM.yyyy');
  const born = birthday ? formattedDate : 'Unknown';

  const capitalizeFirstLetter = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleModalOpen = () => {
    isLoggedIn ? openNoticeModal() : openAttentionModal();
  };

  const handleToggleFavorite = () => {
    if (petForFavorite || noticesFavoriteById) {
      dispatch(removeFavoriteThunk(id));
      dispatch(fetchPetByIdThunk(id));
    } else {
      dispatch(addFavoritesThunk(id));
      dispatch(fetchPetByIdThunk(id));
    }
  };

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
        <div className={css.btnHeart} onClick={handleToggleFavorite}>
          {page === 'profile' ? (
            <svg className={css.iconHeart}>
              <use href="/symbol-defs-mob.svg#icon-trash-2"></use>
            </svg>
          ) : petForFavorite || noticesFavoriteById ? (
            <FiHeart style={{ width: '18px', height: '18px', color: '#f6b83d', fill: '#f6b83d' }} />
          ) : (
            <svg className={css.iconHeart}>
              <use href="/symbol-defs-mob.svg#icon-heart-2"></use>
            </svg>
          )}
        </div>
      </div>

      <ModalWindow isOpen={attentionModalOpen} onClose={closeAttentionModal}>
        <ModalAttention closeModal={closeAttentionModal} />
      </ModalWindow>

      <ModalWindow isOpen={noticeModalOpen} onClose={closeNoticeModal}>
        <ModalNotice closeModal={closeNoticeModal} id={id} />
      </ModalWindow>
    </div>
  );
};
