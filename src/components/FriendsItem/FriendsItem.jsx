import { useSelector } from 'react-redux';
import css from './FriendsItem.module.css';
import { selectFriendById } from '../../redux/friends/selectorFriends';

export const FriendsItem = ({ id }) => {
  const friend = useSelector(selectFriendById(id));

  if (!friend) {
    return <p>Friend not found</p>;
  }

  const { address, email, phone, title, imageUrl, addressUrl } = friend;

  let from, to;
  let workDaysText = 'Day and night';

  if (Array.isArray(friend.workDays)) {
    for (let i = 0; i < friend.workDays.length; i++) {
      if (friend.workDays[i].from === '') {
        continue;
      } else {
        from = friend.workDays[i].from;
      }
      if (friend.workDays[i].to === '') {
        continue;
      } else {
        to = friend.workDays[i].to;
      }
    }
  }

  if (from && to) {
    workDaysText = `${from} - ${to}`;
  }

  return (
    <div className={css.contFriend}>
      <div className={css.workDays}>{workDaysText}</div>
      <img src={imageUrl} alt={`${title}'s photo`} className={css.logoFriend} />

      <div>
        <h2 className={css.title}>{title}</h2>

        <address>
          <ul className={css.menuAddress}>
            <li className={css.menuEmail}>
              <p className={css.menuText}>Email: </p>
              <a className={css.linkText} href={`mailto:${' '}${email}`}>
                {email ? ` ${email}` : 'Website only'}
              </a>
            </li>
            <li className={css.menuAddressItem}>
              <p className={css.menuText}>Address: </p>
              <a
                className={css.linkText}
                href={addressUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {address
                  ? address.length > 19
                    ? `${address.slice(0, 19)}...`
                    : address
                  : 'Website only'}{' '}
              </a>
            </li>
            <li className={css.menuPhone}>
              <p className={css.menuText}>Phone: </p>
              <a className={css.linkText} href={`tel:${phone}`}>
                {phone ? ` ${phone}` : 'Email only'}
              </a>
            </li>
          </ul>
        </address>
      </div>
    </div>
  );
};
