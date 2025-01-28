import { useSelector } from 'react-redux';
import { selectPage, selectPerPage, selectTotalPages } from '../../redux/news/selectorsNews';
import css from './Pagination.module.css';
import { useEffect, useState } from 'react';

export const Pagination = () => {
  const page = useSelector(selectPage);
  const [currentPage, setCurrentPage] = useState(page);
  const totalPages = useSelector(selectTotalPages);
  const perPage = useSelector(selectPerPage);
  const maxPage = Math.ceil(totalPages / perPage);

  const [paginationItems, setPaginationItems] = useState([]);
  const [ellipsis, setEllipsis] = useState('...');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Отслеживаем изменение ширины окна
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Логика обновления пагинации
  useEffect(() => {
    if (windowWidth < 768) {
      // Мобильная версия (до 767px)
      if (currentPage === 1) {
        setPaginationItems([1, 2]);
        setEllipsis('...');
      } else if (currentPage === maxPage) {
        setPaginationItems([maxPage - 1, maxPage]);
        setEllipsis('');
      } else {
        setPaginationItems([currentPage - 1, currentPage]);
        setEllipsis('...');
      }
    } else {
      // Версия для экранов от 768px
      if (currentPage === 1) {
        setPaginationItems([1, 2, 3]);
        setEllipsis('...');
      } else if (currentPage === maxPage) {
        setPaginationItems([maxPage - 2, maxPage - 1, maxPage]);
        setEllipsis('');
      } else {
        setPaginationItems([currentPage - 1, currentPage, currentPage + 1]);
        setEllipsis('...');
      }
    }
  }, [currentPage, maxPage, windowWidth]);

  // Функция для обработки кликов по кнопкам
  const handlePageClick = value => {
    if (value === '...') return; // Игнорируем клики по многоточию
    setCurrentPage(value);
  };

  const handleDecrease = () => {
    setCurrentPage(prev => Math.max(1, prev - 1)); // Уменьшаем страницу, не ниже 1
  };

  const handleIncrease = () => {
    setCurrentPage(prev => Math.min(maxPage, prev + 1)); // Увеличиваем страницу, не выше maxPage
  };

  const handleFirstPageClick = () => setCurrentPage(1);
  const handleLastPageClick = () => setCurrentPage(maxPage);

  // Если страниц меньше, чем количество элементов на странице, пагинация не отображается
  if (totalPages <= perPage) return null;
  console.log(currentPage);

  return (
    <div className={css.contPagination}>
      <div className={`${css.left} ${currentPage === 1 ? css.disabled : ''}`}>
        <div className={css.contDoubleLeft} onClick={handleFirstPageClick}>
          <svg className={css.leftSvg1}>
            <use href={'/symbol-defs-mob.svg#icon-fi-rr-angle-small-left'}></use>
          </svg>
          <svg className={css.leftSvg2}>
            <use href={'/symbol-defs-mob.svg#icon-fi-rr-angle-small-left'}></use>
          </svg>
        </div>
        <div className={css.contLeft} onClick={handleDecrease}>
          <svg className={css.leftSvg}>
            <use href={'/symbol-defs-mob.svg#icon-fi-rr-angle-small-left'}></use>
          </svg>
        </div>
      </div>

      <div className={css.center}>
        {currentPage > 2 && windowWidth >= 768 && (
          <div className={css.ellipsis} onClick={() => handlePageClick('...')}>
            {ellipsis}
          </div>
        )}

        {paginationItems.map(item => (
          <div
            key={item}
            className={`${css.pageItem} ${item === currentPage ? css.active : ''}`}
            onClick={() => handlePageClick(item)}
          >
            {item}
          </div>
        ))}

        {currentPage < maxPage - 1 && windowWidth >= 768 && (
          <div className={css.ellipsis} onClick={() => handlePageClick('...')}>
            {ellipsis}
          </div>
        )}
      </div>

      <div className={`${css.right} ${currentPage === maxPage ? css.disabled : ''}`}>
        <div className={css.contLeft} onClick={handleIncrease}>
          <svg className={css.rightSvg}>
            <use href={'/symbol-defs-mob.svg#icon-fi-rr-angle-small-left-1'}></use>
          </svg>
        </div>
        <div className={css.contDoubRight} onClick={handleLastPageClick}>
          <svg className={css.rightSvg1}>
            <use href={'/symbol-defs-mob.svg#icon-fi-rr-angle-small-left-1'}></use>
          </svg>
          <svg className={css.rightSvg2}>
            <use href={'/symbol-defs-mob.svg#icon-fi-rr-angle-small-left-1'}></use>
          </svg>
        </div>
      </div>
    </div>
  );
};
// ======================================================================================
// return (
//   <div className={css.contPagination}>
//     <div className={`${css.left} ${currentPage === 1 ? css.disabled : ''}`}>
//       <div className={css.contDoubleLeft} onClick={handleFirstPageClick}>
//         <svg className={css.leftSvg1}>
//           <use href={'/symbol-defs-mob.svg#icon-fi-rr-angle-small-left'}></use>
//         </svg>

//         <svg className={css.leftSvg2}>
//           <use href={'/symbol-defs-mob.svg#icon-fi-rr-angle-small-left'}></use>
//         </svg>
//       </div>
//       <div className={css.contLeft} onClick={handleDecrease}>
//         <svg className={css.leftSvg}>
//           <use href={'/symbol-defs-mob.svg#icon-fi-rr-angle-small-left'}></use>
//         </svg>
//       </div>
//     </div>

//     <div className={css.center}>
//       <div className={css.theFirstElem} onClick={() => handlePageClick(theFirstElem)}>
//         {theFirstElem}
//       </div>
//       <div className={css.theSecondtElem} onClick={() => handlePageClick(theSecondElem)}>
//         {theSecondElem}
//       </div>
//       <div className={css.theThirdElem} onClick={() => handlePageClick(theThirdElem)}>
//         {theThirdElem}
//       </div>
//       <div className={css.ellipsis} onClick={() => handlePageClick(theEllipsisElem)}>
//         {theEllipsisElem}
//       </div>
//     </div>

//     <div className={`${css.right} ${freeze || currentPage === maxPage ? css.disabled : ''}`}>
//       <div className={css.contLeft} onClick={handleIncrease}>
//         <svg className={css.rightSvg}>
//           <use href={'/symbol-defs-mob.svg#icon-fi-rr-angle-small-left-1'}></use>
//         </svg>
//       </div>
//       <div className={css.contDoubRight} onClick={handleLastPageClick}>
//         <svg className={css.rightSvg1}>
//           <use href={'/symbol-defs-mob.svg#icon-fi-rr-angle-small-left-1'}></use>
//         </svg>

//         <svg className={css.rightSvg2}>
//           <use href={'/symbol-defs-mob.svg#icon-fi-rr-angle-small-left-1'}></use>
//         </svg>
//       </div>
//     </div>
//   </div>
// );
