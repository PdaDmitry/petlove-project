import { useSelector } from 'react-redux';
import { selectPets } from '../../redux/pets/selectorsPets';
import css from './NoticesList.module.css';
import { NoticesItem } from '../NoticesItem/NoticesItem';
import { selectPetsForFavorite } from '../../redux/auth/selectorsAuth';

export const NoticesList = () => {
  const pets = useSelector(selectPets);

  // const petsForFavorite = useSelector(selectPetsForFavorite);
  // console.log('petsForFavorite Notice: ', petsForFavorite);

  return (
    <div className={css.contPetsList}>
      <ul className={css.listPets}>
        {pets.map(pet => (
          <li key={pet._id} className={css.itemLi}>
            <NoticesItem id={pet._id} page="" />
          </li>
        ))}
      </ul>
    </div>
  );
};
