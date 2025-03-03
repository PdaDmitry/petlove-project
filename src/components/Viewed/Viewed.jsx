import { useDispatch, useSelector } from 'react-redux';
import { selectNoticesViewed } from '../../redux/auth/selectorsAuth';
import css from './Viewed.module.css';
import { NoticesItem } from '../NoticesItem/NoticesItem';
import { useEffect } from 'react';
import { refreshUser } from '../../redux/auth/operationsAuth';

export const Viewed = () => {
  const dispatch = useDispatch();
  const noticesViewed = useSelector(selectNoticesViewed);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       await dispatch(refreshUser()).unwrap();
  //     } catch (error) {
  //       console.error('Failed to refresh user:', error);
  //     }
  //   };

  //   fetchUser();
  // }, [dispatch]);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (!noticesViewed || noticesViewed.length === 0) {
    return <p className={css.text}>You don&#39;t have any animals viewed yet...</p>;
  }

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
