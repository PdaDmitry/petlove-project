import { createSelector } from '@reduxjs/toolkit';

export const selectUser = state => state.auth.user;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectToken = state => state.auth.token;
export const selectAvatarUload = state => state.auth.avatarUload;
export const selectUploadedPhoto = state => state.auth.uploadedPhoto;
export const selectDeletedUserPhoto = state => state.auth.deletedUserPhoto;

// ===============================================================================
export const selectAddedPets = state => state.auth.user.addedPets;

export const selectAddPetById = id =>
  createSelector([selectAddedPets], pets => pets.find(pet => pet._id === id));

// ===============================================================================
export const selectPetsForFavorite = state => state.auth.user.petsForFavorite;

export const selectPetsForFavoriteById = id =>
  createSelector([selectPetsForFavorite], pets => pets.find(pet => pet._id === id));

// ===============================================================================
export const selectNoticesViewed = state => state.auth.user.noticesViewed;

export const selectNoticesViewedById = id =>
  createSelector([selectNoticesViewed], pets => pets.find(pet => pet._id === id));
