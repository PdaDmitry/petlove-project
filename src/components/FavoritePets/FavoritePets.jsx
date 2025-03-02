import { useSelector } from 'react-redux';

import css from './FavoritePets.module.css';
import { NoticesItem } from '../NoticesItem/NoticesItem';
import { selectPetsForFavorite } from '../../redux/auth/selectorsAuth';

export const FavoritePets = () => {
  const petsForFavorite = useSelector(selectPetsForFavorite);

  if (!petsForFavorite || petsForFavorite.length === 0) {
    return (
      <p className={css.text}>
        Oops, <span className={css.textSpan}>looks like there aren't any furries</span> on our
        adorable page yet. Do not worry! View your pets on the "find your favorite pet" page and add
        them to
        <br /> your favorites.
      </p>
    );
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
