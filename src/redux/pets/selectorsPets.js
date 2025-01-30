import { createSelector } from '@reduxjs/toolkit';

export const selectPets = state => state.pets.items;
export const selectPetsPage = state => state.pets.page;
export const selectPetsPerPage = state => state.pets.perPage;
export const selectPetsTotalPages = state => state.pets.totalPages;
export const selectPetById = id =>
  createSelector([selectPets], pets => pets.find(pet => pet._id === id));
