import { createSlice } from '@reduxjs/toolkit';
import { fetchFriendsThunk } from './operationsFriends';

const initialState = {
  items: [],
  isLoading: false,
  isError: null,
};

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchFriendsThunk.pending, (state, action) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchFriendsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.items = action.payload;
      })
      .addCase(fetchFriendsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload || 'Something went wrong';
      });
  },
});

export const friendsReducer = friendsSlice.reducer;
