import { useSelector } from 'react-redux';

import css from './FavoritePets.module.css';
import { NoticesItem } from '../NoticesItem/NoticesItem';
import { selectPetsForFavorite } from '../../redux/auth/selectorsAuth';
import { useEffect, useState } from 'react';

export const FavoritePets = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const petsForFavorite = useSelector(selectPetsForFavorite);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!petsForFavorite || petsForFavorite.length === 0) {
    return (
      <div className={css.contText}>
        <p className={css.text}>
          Oops, <span className={css.textSpan}>looks like there aren't any furries</span> on our
          adorable page yet. Do not worry! View your pets on the "find your favorite pet" page and
          add them to
          {windowWidth < 768 && <br />} your favorites.
        </p>
      </div>
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
