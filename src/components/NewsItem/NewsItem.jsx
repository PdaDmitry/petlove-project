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
  let newTitle = title;

  if (typeof title === 'string' && title.length < 40) {
    let insertPosition = 25;

    if (title[insertPosition] !== ' ') {
      let nearestSpace = title.lastIndexOf(' ', insertPosition);
      if (nearestSpace !== -1) {
        insertPosition = nearestSpace;
      }
    }

    newTitle = title.slice(0, insertPosition) + '\n' + title.slice(insertPosition + 1);
  } else if (typeof title === 'string' && title.length > 70) {
    newTitle = title.slice(0, 60) + '...';
  }

  let newText = text;
  if (typeof text === 'string' && text.length > 240) {
    newText = text.slice(0, 225) + '...';
  }
  return (
    <div className={css.contNewItem}>
      <div className={css.contImgTitleText}>
        <img src={imgUrl} alt={`${title}'s photo`} className={css.newImg} />
        <h2 className={css.titleNew}>{newTitle}</h2>
        <p className={css.text}>{newText}</p>
      </div>
      <div className={css.contDateRead}>
        <p className={css.date}>{formattedDate}</p>
        <a className={css.btnLink} href={url} target="_blank" rel="noopener noreferrer">
          Read more
        </a>
      </div>
    </div>
  );
};
