import { createSlice } from '@reduxjs/toolkit';
import { fetchNewsThunk } from './operationsNews';

const initialState = {
  items: [],
  isLoading: false,
  isError: null,
  page: 1,
  perPage: 0,
  totalPages: 0,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchNewsThunk.pending, (state, action) => {
        state.isLoading = true;
        state.isError = null;
        state.total = 0;
      })
      .addCase(fetchNewsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.items = action.payload.results;
        state.page = action.payload.page;
        state.perPage = action.payload.perPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchNewsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload || 'Something went wrong';
      });
  },
});

export const newsReducer = newsSlice.reducer;
