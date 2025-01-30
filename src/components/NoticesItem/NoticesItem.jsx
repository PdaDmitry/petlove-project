import { useSelector } from 'react-redux';
import { selectPetById } from '../../redux/pets/selectorsPets';
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

  return (
    <div className={css.contPet}>
      <img src={imgURL} alt={`${title}'s photo`} className={css.petImg} />
    </div>
  );
};
