import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCategoriesThunk,
  fetchCitiesThunk,
  fetchPetForContact,
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
  petContacts: {},
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
        state.cities = action.payload;
      })
      .addCase(fetchCitiesThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload || 'Something went wrong';
      })

      //fetchPetForContact
      .addCase(fetchPetForContact.pending, (state, action) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchPetForContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.petContacts = action.payload;
      })
      .addCase(fetchPetForContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload || 'Something went wrong';
      });
  },
});

export const petsReducer = petsSlice.reducer;
