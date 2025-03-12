import { useSelector } from 'react-redux';
import { selectNewById } from '../../redux/news/selectorsNews';
import { format } from 'date-fns';
import css from './NewsItem.module.css';

export const NewsItem = ({ id }) => {
  const newItem = useSelector(selectNewById(id));

  if (!newItem) {
    return <p>New not found</p>;
  }

  const { date, imgUrl, text, title, url } = newItem;
  const formattedDate = format(new Date(date), 'dd/MM/yyyy');
  console.log(title.length);

  return (
    <div className={css.contNewItem}>
      <img src={imgUrl} alt={`${title}'s photo`} className={css.newImg} />
      <h2 className={css.titleNew}>{title}</h2>
      <p className={css.text}>{text}</p>
      <div className={css.contDateRead}>
        <p className={css.date}>{formattedDate}</p>
        <a className={css.btnLink} href={url} target="_blank" rel="noopener noreferrer">
          Read more
        </a>
      </div>
    </div>
  );
};
