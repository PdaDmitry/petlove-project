import { createSelector } from '@reduxjs/toolkit';

export const selectPets = state => state.pets.items;
export const selectPetsPage = state => state.pets.page;
export const selectPetsPerPage = state => state.pets.perPage;
export const selectPetsTotalPages = state => state.pets.totalPages;
export const selectPetById = id =>
  createSelector([selectPets], pets => pets.find(pet => pet._id === id));

// =====================================================================

// export const selectPetsForFavorite = state => state.pets.petsForFavorite;
// export const selectPetsForFavoriteById = id =>
//   createSelector([selectPetsForFavorite], pets => pets.find(pet => pet._id === id));

// =====================================================================

export const selectCategories = state => state.pets.categories;
export const selectCities = state => state.pets.cities;
export const selectLoader = state => state.pets.isLoading;
export const selectError = state => state.pets.isError;

// export const selectNoticesFavorites = state => state.auth.user.noticesFavorites;

// export const selectNoticesFavoriteById = id =>
//   createSelector([selectNoticesFavorites], pets => pets.find(pet => pet._id === id));
