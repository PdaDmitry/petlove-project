import { useSelector } from 'react-redux';
import { selectAddedPets } from '../../redux/auth/selectorsAuth';
import { AddPetsItem } from '../AddPetsItem/AddPetsItem';
import css from './AddPetsList.module.css';

export const AddPetsList = () => {
  const addedPets = useSelector(selectAddedPets);

  if (!addedPets) {
    return <p>Loading...</p>;
  }

  return (
    <div className={css.contAddPetsList}>
      <ul className={css.listAddPets}>
        {addedPets.map(pet => (
          <li key={pet._id} className={css.itemLi}>
            <AddPetsItem id={pet._id} />
          </li>
        ))}
      </ul>
    </div>
  );
};
