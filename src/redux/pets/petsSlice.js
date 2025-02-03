import { createSlice } from '@reduxjs/toolkit';
import { fetchCategoriesThunk, fetchPetsThunk } from './operationsPets';

const initialState = {
  items: [],
  isLoading: false,
  isError: null,
  page: 1,
  perPage: 0,
  totalPages: 0,
  categories: [],
};

const petsSlice = createSlice({
  name: 'pets',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchPetsThunk.pending, (state, action) => {
        state.isLoading = true;
        state.isError = null;
        state.total = 0;
      })
      .addCase(fetchPetsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.items = action.payload.results;
        state.page = action.payload.page;
        state.perPage = action.payload.perPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPetsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload || 'Something went wrong';
      })

      //categories
      .addCase(fetchCategoriesThunk.pending, (state, action) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.categories = action.payload.results;
        // state.categories = action.payload;
      })
      .addCase(fetchCategoriesThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload || 'Something went wrong';
      });
  },
});

export const petsReducer = petsSlice.reducer;
