import { useSelector } from 'react-redux';
import { selectAddPetById } from '../../redux/auth/selectorsAuth';
import css from './AddPetsItem.module.css';
import { format } from 'date-fns';

export const AddPetsItem = ({ id }) => {
  const addPet = useSelector(selectAddPetById(id));
  //   console.log('addPet: ', addPet);

  const { imgURL, title, name, birthday, sex, species } = addPet;
  const formattedDate = format(new Date(birthday), 'dd.MM.yyyy');
  const capitalizeFirstLetter = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  if (!addPet) {
    return <p>Pet not found</p>;
  }

  return (
    <div className={css.contAddPet}>
      <button type="button" className={css.deletePetBtn}>
        <svg className={css.trashSvg}>
          <use href={'/symbol-defs-mob.svg#icon-trash-2'}></use>
        </svg>
      </button>
      <img src={imgURL} alt={`${title}'s photo`} className={css.petImg} />
      <div>
        <h2 className={css.title}>{title.length > 19 ? title.slice(0, 19) + '...' : title}</h2>
        <ul className={css.petInfo}>
          <li className={css.infoItem}>
            <span className={css.categoryName}>Name</span>
            <span className={css.categoryValue}>{name}</span>
          </li>
          <li className={css.infoItem}>
            <span className={css.categoryName}>Birthday</span>
            <span className={css.categoryValue}>{formattedDate}</span>
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
      </div>
    </div>
  );
};
