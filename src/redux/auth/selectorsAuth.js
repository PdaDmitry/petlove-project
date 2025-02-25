import { createSelector } from '@reduxjs/toolkit';

export const selectUser = state => state.auth.user;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectToken = state => state.auth.token;
export const selectAvatarUload = state => state.auth.avatarUload;
export const selectUploadedPhoto = state => state.auth.uploadedPhoto;
export const selectDeletedUserPhoto = state => state.auth.deletedUserPhoto;

export const selectAddedPets = state => state.auth.addedPets;

export const selectAddPetById = id =>
  createSelector([selectAddedPets], pets => pets.find(pet => pet._id === id));
