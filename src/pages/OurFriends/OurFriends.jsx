import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFriendsThunk } from '../../redux/friends/operationsFriends';
import Title from '../../components/Title/Title';
import css from './OurFriends.module.css';
import {
  selectFriends,
  selectFriendsError,
  selectFriendsLoader,
} from '../../redux/friends/selectorFriends';
import { FriendsList } from '../../components/FriendsList/FriendsList';
import { useNavigate } from 'react-router-dom';

export const OurFriends = () => {
  const friends = useSelector(selectFriends);

  const loaderFriends = useSelector(selectFriendsLoader);
  const errorFriends = useSelector(selectFriendsError);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (errorFriends) {
      navigate('/*');
    }
  }, [navigate, errorFriends]);

  useEffect(() => {
    if (friends.length === 0) {
      dispatch(fetchFriendsThunk());
    }
  }, [dispatch, friends]);

  if (loaderFriends) {
    return <p>Please wait...</p>;
  }

  return (
    !errorFriends && (
      <div className={css.cont}>
        <div className={css.contFriends}>
          <Title className={css.titleFriends}>Our friends</Title>
          <FriendsList />
        </div>
      </div>
    )
  );
};
