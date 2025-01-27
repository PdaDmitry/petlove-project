import { createSelector } from '@reduxjs/toolkit';

export const selectNews = state => state.news.items;
export const selectPerPage = state => state.news.perPage;
export const selectTotalPages = state => state.news.totalPages;
export const selectNewById = id =>
  createSelector([selectNews], news => news.find(newItem => newItem._id === id));
