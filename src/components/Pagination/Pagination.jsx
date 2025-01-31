import { useSelector } from 'react-redux';
import { selectPage, selectPerPage, selectTotalPages } from '../../redux/news/selectorsNews';
import css from './Pagination.module.css';
import { useEffect, useState } from 'react';
import { selectPetsPage, selectPetsTotalPages } from '../../redux/pets/selectorsPets';
import { useLocation } from 'react-router-dom';

export const Pagination = ({ setPage }) => {
  const location = useLocation();
  const isNewsPage = location.pathname.includes('/news');

  const totalNewsPages = useSelector(selectTotalPages);
  const totalPetsPages = useSelector(selectPetsTotalPages);
  const totalPages = isNewsPage ? totalNewsPages : totalPetsPages;
  // console.log('totalPages: ', totalPages);

  const currentNewsPage = useSelector(selectPage);
  const currentPetsPage = useSelector(selectPetsPage);
  const currentPage = isNewsPage ? currentNewsPage : currentPetsPage;

  const perPage = useSelector(selectPerPage);
  // const maxPage = Math.ceil(totalPages / perPage);
  const maxPage = totalPages;
  const [paginationItems, setPaginationItems] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth < 768) {
      if (currentPage === 1) {
        setPaginationItems([1, 2, '...']);
      } else if (currentPage === maxPage) {
        setPaginationItems(['...', maxPage - 1, maxPage]);
      }
    } else {
      if (currentPage === 1) {
        setPaginationItems([1, 2, 3, '...']);
      } else if (currentPage === maxPage) {
        setPaginationItems(['...', maxPage - 2, maxPage - 1, maxPage]);
      }
    }
  }, [currentPage, maxPage, windowWidth]);

  const handlePageClick = value => {
    if (value === '...') return;
    setPage(value);
  };

  const handleDecrease = () => {
    setPage(prev => {
      const newPage = Math.max(1, prev - 1);
      if (windowWidth < 768) {
        setPaginationItems(['...', newPage, newPage + 1]);
      } else {
        if (newPage === 2) {
          setPaginationItems([newPage - 1, newPage, newPage + 1, '...']);
        } else {
          setPaginationItems(['...', newPage - 1, newPage, newPage + 1]);
        }
      }
      return newPage;
    });
  };

  const handleIncrease = () => {
    setPage(prev => {
      const newPage = Math.min(maxPage, prev + 1);
      if (windowWidth < 768) {
        setPaginationItems([newPage - 1, newPage, '...']);
      } else {
        if (newPage === 2) {
          setPaginationItems([newPage - 1, newPage, newPage + 1, '...']);
        } else if (newPage === 31) {
          setPaginationItems(['...', newPage - 1, newPage, newPage + 1]);
        } else {
          setPaginationItems([newPage - 1, newPage, newPage + 1, '...']);
        }
      }
      return newPage;
    });
  };

  const handleFirstPageClick = () => setPage(1);
  const handleLastPageClick = () => setPage(maxPage);

  if (totalPages === 1) return null;

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
        {paginationItems.map(item => (
          <div
            key={item}
            className={`${css.pageItem} ${item === currentPage ? css.active : ''}`}
            onClick={() => handlePageClick(item)}
          >
            {item}
          </div>
        ))}
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
