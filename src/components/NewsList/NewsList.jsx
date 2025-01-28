import { useSelector } from 'react-redux';
import { selectNews } from '../../redux/news/selectorsNews';
import { NewsItem } from '../NewsItem/NewsItem';
import css from './NewsList.module.css';

export const NewsList = () => {
  const news = useSelector(selectNews);
  // console.log(news);

  return (
    <div className={css.contNewsList}>
      <ul className={css.listNews}>
        {news.map(newItem => (
          <li key={newItem._id} className={css.itemLi}>
            <NewsItem id={newItem._id} />
          </li>
        ))}
      </ul>
    </div>
  );
};
