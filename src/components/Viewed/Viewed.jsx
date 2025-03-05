import { useDispatch, useSelector } from 'react-redux';
import { selectNoticesViewed } from '../../redux/auth/selectorsAuth';
import css from './Viewed.module.css';
import { NoticesItem } from '../NoticesItem/NoticesItem';
import { useEffect } from 'react';
import { refreshUser } from '../../redux/auth/operationsAuth';

export const Viewed = () => {
  const dispatch = useDispatch();
  const noticesViewed = useSelector(selectNoticesViewed);
  // console.log('first: ', noticesViewed[0]);
  // console.log('last: ', noticesViewed[noticesViewed.length - 1]);
  // console.log('noticesViewed: ', noticesViewed);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (!noticesViewed || noticesViewed.length === 0) {
    return <p className={css.text}>You don&#39;t have any animals viewed yet...</p>;
  }

  // const updatedNotices = [
  //   ...noticesViewed
  //     .reduce((accum, pet) => {
  //       if (!accum.has(pet._id)) {
  //         accum.set(pet._id, pet);
  //       }
  //       return accum;
  //     }, new Map())
  //     .values(),
  // ];
  // console.log('updatedNotices: ', updatedNotices);

  // const handleNewPet = newPet => {
  //   const petIndex = updatedNotices.findIndex(pet => pet._id === newPet._id);

  //   if (petIndex !== -1) {
  //     updatedNotices.splice(petIndex, 1);
  //   }

  //   updatedNotices.unshift(newPet);
  // };

  // if (noticesViewed.length > 0) {
  //   handleNewPet(noticesViewed[0]);
  // }

  // const firstSixNotices = updatedNotices.slice(0, 6);
  const firstSixNotices = noticesViewed.slice(0, 6);

  return (
    <div className={css.contPetsList}>
      <ul className={css.listPets}>
        {firstSixNotices.map(pet => (
          <li key={pet._id} className={css.itemLi}>
            <NoticesItem id={pet._id} page="viewed" />
          </li>
        ))}
      </ul>
    </div>
  );
};
