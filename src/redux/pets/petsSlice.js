import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCategoriesThunk,
  fetchCitiesThunk,
  // fetchPetByIdThunk,
  fetchPetsThunk,
} from './operationsPets';

const initialState = {
  items: [],
  isLoading: false,
  isError: null,
  page: 1,
  perPage: 0,
  totalPages: 0,
  categories: [],
  cities: [],
  // petsForFavorite: [],
  // petById: {},
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
        // state.isError = action.payload || 'Something went wrong';
        state.isError = action.error.message;
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
      })

      //Location
      .addCase(fetchCitiesThunk.pending, (state, action) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchCitiesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        // state.cities = action.payload.results;
        state.cities = action.payload;
      })
      .addCase(fetchCitiesThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload || 'Something went wrong';
      });

    // //petsForFavorite
    // .addCase(fetchPetByIdThunk.pending, (state, action) => {
    //   state.isLoading = true;
    //   state.isError = null;
    // })
    // .addCase(fetchPetByIdThunk.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.isError = null;

    //   const existingPet = state.petsForFavorite.find(pet => pet._id === action.payload._id);
    //   // console.log(action.payload._id);

    //   if (!existingPet) {
    //     state.petsForFavorite.unshift(action.payload);
    //   } else {
    //     state.petsForFavorite = state.petsForFavorite.filter(
    //       pet => pet._id !== action.payload._id
    //     );
    //   }
    // })
    // .addCase(fetchPetByIdThunk.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.isError = action.payload || 'Something went wrong';
    // });
  },
});

export const petsReducer = petsSlice.reducer;
