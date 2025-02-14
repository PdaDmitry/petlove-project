import { useSelector } from 'react-redux';
import { selectPage, selectTotalPages } from '../../redux/news/selectorsNews';
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
  // console.log('currentPage: ', currentPage);

  const maxPage = totalPages;
  // Since changing a page from local storage, paginationItems returns the previous CurrentPage value,
  // all CurrentPage values must be either incremented by 1 or decremented by 1, respectively(page numbering is incremented or decremented)!!!!!!
  const [paginationItems, setPaginationItems] = useState(() => {
    return JSON.parse(localStorage.getItem('paginationItems')) || [];
  });
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
      if (totalPages === 2) {
        setPaginationItems([1, 2]);
      } else if (currentPage === 1) {
        setPaginationItems([1, 2, '...']);
      } else if (currentPage === maxPage) {
        setPaginationItems(['...', maxPage - 1, maxPage]);
      }
    } else {
      if (totalPages === 2) {
        setPaginationItems([1, 2]);
      } else if (currentPage === 1) {
        setPaginationItems([1, 2, 3, '...']);
      } else if (currentPage === maxPage) {
        setPaginationItems(['...', maxPage - 2, maxPage - 1, maxPage]);
      }
    }
  }, [currentPage, maxPage, windowWidth, totalPages]);

  const handleDecrease = () => {
    setPage(prev => Math.max(1, prev - 1));
    updatePaginationItems('decrease');
  };

  const handleIncrease = () => {
    setPage(prev => Math.min(maxPage, prev + 1));
    updatePaginationItems('increase');
  };

  const updatePaginationItems = action => {
    let newItems;

    if (window.innerWidth < 768) {
      if (action === 'decrease') {
        newItems = ['...', currentPage - 1, currentPage];
      } else {
        newItems = [currentPage, currentPage + 1, '...'];
      }
    } else {
      if (action === 'decrease') {
        if (currentPage - 1 === 2) {
          newItems = [currentPage - 2, currentPage - 1, currentPage, '...'];
        } else {
          newItems = ['...', currentPage - 2, currentPage - 1, currentPage];
        }
      } else {
        if (currentPage + 1 === 2) {
          newItems = [currentPage, currentPage + 1, currentPage + 2, '...'];
        } else if (currentPage + 1 === maxPage - 1) {
          newItems = ['...', currentPage, currentPage + 1, currentPage + 2];
        } else {
          newItems = [currentPage, currentPage + 1, currentPage + 2, '...'];
        }
      }
    }
    setPaginationItems(newItems);
  };

  const handlePageClick = value => {
    if (value === '...') return;
    setPage(value);
  };

  // Write paginationItems to localStorage, since the second time the component is mounted, paginationItems is reset to an empty array!!!!!!!!!
  useEffect(() => {
    localStorage.setItem('paginationItems', JSON.stringify(paginationItems));
  }, [paginationItems]);

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
