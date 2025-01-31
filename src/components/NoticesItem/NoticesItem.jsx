import { useSelector } from 'react-redux';
import { selectPetById } from '../../redux/pets/selectorsPets';
import { GoStarFill } from 'react-icons/go';
import { format } from 'date-fns';
import css from './NoticesItem.module.css';
import { selectIsLoggedIn } from '../../redux/auth/selectorsAuth';
import ModalWindow from '../ModalWindow/ModalWindow';
import { ModalAttention } from '../ModalAttention/ModalAttention';
import { useState } from 'react';
import { ModalNotice } from '../ModalNotice/ModalNotice';

export const NoticesItem = ({ id }) => {
  const [attentionModalOpen, setAttentionModalOpen] = useState(false);
  const [noticeModalOpen, setNoticeModalOpen] = useState(false);
  const pet = useSelector(selectPetById(id));
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const openAttentionModal = () => setAttentionModalOpen(true);
  const closeAttentionModal = () => setAttentionModalOpen(false);
  const openNoticeModal = () => setNoticeModalOpen(true);
  const closeNoticeModal = () => setNoticeModalOpen(false);

  if (!pet) {
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
  } = pet;

  const cost = price ? price : 'Uncertain';
  const formattedDate = format(new Date(birthday), 'dd.MM.yyyy');
  const born = birthday ? formattedDate : 'Unknown';

  const capitalizeFirstLetter = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleModalOpen = () => {
    isLoggedIn ? openNoticeModal() : openAttentionModal();
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
        <div className={css.btnHeart} onClick={handleModalOpen}>
          <svg className={css.iconHeart}>
            <use href="/symbol-defs-mob.svg#icon-heart-2"></use>
          </svg>
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
