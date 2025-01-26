import { useSelector } from 'react-redux';
import { selectFriends } from '../../redux/friends/selectorFriends';
import css from './FriendsList.module.css';
import { FriendsItem } from '../FriendsItem/FriendsItem';

export const FriendsList = () => {
  const friends = useSelector(selectFriends);

  return (
    <div>
      <ul className={css.listFriends}>
        {friends.map(friend => (
          <li key={friend._id} className={css.itemLi}>
            <FriendsItem id={friend._id} />
          </li>
        ))}
      </ul>
    </div>
  );
};
