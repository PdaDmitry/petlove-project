import { useSelector } from 'react-redux';
import { selectPetById } from '../../redux/pets/selectorsPets';
import { GoStarFill } from 'react-icons/go';
import css from './NoticesItem.module.css';

export const NoticesItem = ({ id }) => {
  const pet = useSelector(selectPetById(id));

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

  const capitalizeFirstLetter = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className={css.contPet}>
      <img src={imgURL} alt={`${title}'s photo`} className={css.petImg} />
      <div className={css.contTitleStar}>
        <h2 className={css.title}>{title}</h2>
        <GoStarFill className={css.iconStarYellow} />
      </div>
      <ul className={css.petInfo}>
        <li className={css.infoItem}>
          <span className={css.categoryName}>Name</span>
          <span className={css.categoryValue}>{name}</span>
        </li>
        <li className={css.infoItem}>
          <span className={css.categoryName}>Birthday</span>
          <span className={css.categoryValue}>{birthday}</span>
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
        <button className={css.btnLearn} type="button">
          Learn more
        </button>
        <div className={css.btnHeart}>
          <svg className={css.iconHeart}>
            <use href="/symbol-defs-mob.svg#icon-heart-2"></use>
          </svg>
        </div>
      </div>
    </div>
  );
};
