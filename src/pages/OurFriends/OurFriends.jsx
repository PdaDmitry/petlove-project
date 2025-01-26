import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFriendsThunk } from '../../redux/friends/operationsFriends';
import Title from '../../components/Title/Title';
import css from './OurFriends.module.css';
import { selectFriends } from '../../redux/friends/selectorFriends';
import { FriendsList } from '../../components/FriendsList/FriendsList';

export const OurFriends = () => {
  const friends = useSelector(selectFriends);
  console.log(friends);
  const dispatch = useDispatch();

  useEffect(() => {
    // if (friends.length === 0)
    dispatch(fetchFriendsThunk());
  }, [dispatch]);

  return (
    <div className={css.contFriends}>
      <Title className={css.titleFriends}>Our friends</Title>
      <FriendsList />
    </div>
  );
};
