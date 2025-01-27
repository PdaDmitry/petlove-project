import { createSlice } from '@reduxjs/toolkit';
import { fetchNewsThunk } from './operationsNews';

const initialState = {
  items: [],
  isLoading: false,
  isError: null,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchNewsThunk.pending, (state, action) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchNewsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.items = action.payload;
      })
      .addCase(fetchNewsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload || 'Something went wrong';
      });
  },
});

export const newsReducer = newsSlice.reducer;
