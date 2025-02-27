import { useSelector } from 'react-redux';
import { selectNoticesFavorites, selectPetsForFavorite } from '../../redux/pets/selectorsPets';
import css from './FavoritePets.module.css';
import { NoticesItem } from '../NoticesItem/NoticesItem';

export const FavoritePets = () => {
  const petsForFavorite = useSelector(selectPetsForFavorite);
  const noticesFavorites = useSelector(selectNoticesFavorites);

  const arrFavoritPets = petsForFavorite ? petsForFavorite : noticesFavorites;

  if (arrFavoritPets.length === 0 || null) {
    return <p>No favorite pets selected!</p>;
  }

  return (
    <div className={css.contPetsList}>
      <ul className={css.listPets}>
        {arrFavoritPets.map(pet => (
          <li key={pet._id} className={css.itemLi}>
            <NoticesItem id={pet._id} page="profile" />
          </li>
        ))}
      </ul>
    </div>
  );
};
