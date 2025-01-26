import { useSelector } from 'react-redux';
import css from './FriendsItem.module.css';
import { selectFriendById, selectFriends } from '../../redux/friends/selectorFriends';

export const FriendsItem = ({ id }) => {
  const friend = useSelector(selectFriendById(id));

  if (!friend) {
    return <p>Friend not found</p>;
  }

  const { address, email, phone, title, imageUrl } = friend;

  return (
    <div className={css.contFriend}>
      <div className={css.workDays}></div>
      <img src={imageUrl} alt={`${title}'s photo`} className={css.logoFriend} />

      <div>
        <h2 className={css.title}>{title}</h2>
        <p>Email: {email}</p>
        <p>Address: {address}</p>
        <p>Phone: {phone}</p>
        {/* <p>Work Days: {workDays}</p> */}
        {/* <img src={imageUrl} alt={`${title}'s photo`} /> */}
        {/* <a href={addressUrl} target="_blank" rel="noopener noreferrer">
        Visit profile
      </a> */}
      </div>
    </div>
  );
};
