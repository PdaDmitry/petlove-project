import { useSelector } from 'react-redux';
import { selectNoticesViewed } from '../../redux/auth/selectorsAuth';
import css from './Viewed.module.css';
import { NoticesItem } from '../NoticesItem/NoticesItem';

export const Viewed = () => {
  const noticesViewed = useSelector(selectNoticesViewed);
  console.log('noticesViewed: ', noticesViewed);

  if (!noticesViewed || noticesViewed.length === 0) {
    return <p className={css.text}>You don't have any animals viewed yet...</p>;
  }

  return (
    <div className={css.contPetsList}>
      <ul className={css.listPets}>
        {noticesViewed.map(pet => (
          <li key={pet._id} className={css.itemLi}>
            <NoticesItem id={pet._id} page="viewed" />
          </li>
        ))}
      </ul>
    </div>
  );
};
