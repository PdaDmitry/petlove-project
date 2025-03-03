import { useSelector } from 'react-redux';
import { selectPets } from '../../redux/pets/selectorsPets';
import css from './NoticesList.module.css';
import { NoticesItem } from '../NoticesItem/NoticesItem';

export const NoticesList = () => {
  const pets = useSelector(selectPets);

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
