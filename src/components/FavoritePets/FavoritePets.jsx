import { useSelector } from 'react-redux';

import css from './FavoritePets.module.css';
import { NoticesItem } from '../NoticesItem/NoticesItem';
import { selectPetsForFavorite } from '../../redux/auth/selectorsAuth';

export const FavoritePets = () => {
  const petsForFavorite = useSelector(selectPetsForFavorite);
  console.log('petsForFavorite: ', petsForFavorite);

  if (!petsForFavorite || petsForFavorite.length === 0) {
    return <p>No favorite pets selected!</p>;
  }

  return (
    <div className={css.contPetsList}>
      <ul className={css.listPets}>
        {petsForFavorite.map(pet => (
          <li key={pet._id} className={css.itemLi}>
            <NoticesItem id={pet._id} page="profile" />
          </li>
        ))}
      </ul>
    </div>
  );
};
