import { useSelector } from 'react-redux';
import { selectPerPage, selectTotalPages } from '../../redux/news/selectorsNews';
import css from './Pagination.module.css';
import { useState } from 'react';

export const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = useSelector(selectTotalPages);
  const perPage = useSelector(selectPerPage);
  const maxPage = Math.ceil(totalPages / perPage);
  console.log(currentPage);

  if (totalPages <= 1) return null; // Hide pagination if only 1 page

  const handleFirstPageClick = () => setCurrentPage(1); // Устанавливаем первую страницу
  const handleLastPageClick = () => setCurrentPage(maxPage);

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
        <div className={css.contLeft}>
          <svg className={css.leftSvg}>
            <use href={'/symbol-defs-mob.svg#icon-fi-rr-angle-small-left'}></use>
          </svg>
        </div>
      </div>

      <div className={css.center}>
        <div className={css.theFirstElem}>1</div>
        <div className={css.theSecondtElem}>2</div>
        <div className={css.ellipsis}>...</div>
      </div>

      <div className={`${css.right} ${currentPage === maxPage ? css.disabled : ''}`}>
        <div className={css.contLeft}>
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
