import { useSelector } from 'react-redux';
import { selectFavorites } from '../../redux/pets/selectorsPets';
import css from './FavoritePets.module.css';
import { NoticesItem } from '../NoticesItem/NoticesItem';

export const FavoritePets = () => {
  const favoritePets = useSelector(selectFavorites);

  console.log('favoritePets: ', favoritePets);
  return (
    <div className={css.contPetsList}>
      <ul className={css.listPets}>
        {favoritePets.map(pet => (
          <li key={pet._id} className={css.itemLi}>
            <NoticesItem id={pet._id} />
          </li>
        ))}
      </ul>
    </div>
  );
};
