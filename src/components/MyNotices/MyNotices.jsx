import { useState } from 'react';

import css from './MyNotices.module.css';
import { FavoritePets } from '../FavoritePets/FavoritePets';
import { Viewed } from '../Viewed/Viewed';

export const MyNotices = () => {
  const [activeTab, setActiveTab] = useState('favorites');
  return (
    <div className={css.contFavoriteViewed}>
      <div className={css.contBtns}>
        <button
          className={` ${css.btnFavorite} ${activeTab === 'favorites' ? css.active : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          My favorite pets
        </button>
        <button
          className={` ${css.btnViewed} ${activeTab === 'viewed' ? css.active : ''}`}
          onClick={() => setActiveTab('viewed')}
        >
          Viewed
        </button>
      </div>
      {activeTab === 'favorites' ? <FavoritePets /> : <Viewed />}
    </div>
  );
};
