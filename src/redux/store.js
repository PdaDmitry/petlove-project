import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
  persistStore,
} from 'redux-persist';
import { authReducer } from './auth/authSlice';
import { friendsReducer } from './friends/friendsSlice';
import { newsReducer } from './news/newsSlice';
import { petsReducer } from './pets/petsSlice';

const persistAuthConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'user'],
};

const persistFriendsConfig = {
  key: 'friends',
  storage,
  whitelist: ['items'],
};

const persistNewsConfig = {
  key: 'news',
  storage,
  whitelist: ['items'],
};

const persistPetsConfig = {
  key: 'pets',
  storage,
  whitelist: ['items'],
};

const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);
const persistedFriendsReducer = persistReducer(persistFriendsConfig, friendsReducer);
const persistedNewsReducer = persistReducer(persistNewsConfig, newsReducer);
const persistedPetsReducer = persistReducer(persistPetsConfig, petsReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    friends: persistedFriendsReducer,
    news: persistedNewsReducer,
    pets: persistedPetsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
