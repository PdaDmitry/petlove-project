import { useSelector } from 'react-redux';
import css from './FriendsItem.module.css';
import { selectFriendById } from '../../redux/friends/selectorFriends';

export const FriendsItem = ({ id }) => {
  const friend = useSelector(selectFriendById(id));

  if (!friend) {
    return <p>Friend not found</p>;
  }

  const { address, email, phone, title, imageUrl, addressUrl } = friend;

  // let workDays;
  // let from;
  // let to;
  // if (friend.workDays == null) workDays = 'Day and night';
  // if (Array.isArray(friend.workDays)) {
  //   for (let i = 0; i < friend.workDays.length; i++) {
  //     if (friend.workDays[i].from === '') {
  //       continue;
  //     } else {
  //       from = friend.workDays[i].from;
  //     }
  //     if (friend.workDays[i].to === '') {
  //       continue;
  //     } else {
  //       to = friend.workDays[i].to;
  //     }
  //   }
  // }

  // let from, to;
  let workDaysText = 'Day and night'; // Значение по умолчанию

  // if (Array.isArray(friend.workDays) && friend.workDays.length > 0) {
  //   from = friend.workDays.find(day => day.from)?.from || '';

  //   to = friend.workDays.reverse().find(day => day.to)?.to || '';

  //   if (from && to) {
  //     workDaysText = `${from} - ${to}`;
  //   }
  // }

  return (
    <div className={css.contFriend}>
      <div className={css.workDays}>{workDaysText}</div>
      <img src={imageUrl} alt={`${title}'s photo`} className={css.logoFriend} />

      <div>
        <h2 className={css.title}>{title}</h2>

        <address>
          <ul className={css.menuAddress}>
            <li>
              <a href={`mailto:${email}`}>Email: {email ? ` ${email}` : 'Website only'}</a>
            </li>
            <li>
              <a href={addressUrl} target="_blank" rel="noopener noreferrer">
                Address:{' '}
                {address
                  ? address.length > 19
                    ? `${address.slice(0, 19)}...`
                    : address
                  : 'Website only'}
              </a>
            </li>
            <li>
              <a href={`tel:${phone}`}>Phone: {phone ? ` ${phone}` : 'Email only'}</a>
            </li>
          </ul>
        </address>
      </div>
    </div>
  );
};
