import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPetsThunk = createAsyncThunk(
  'fetchPets',
  async (
    { page, keyword, category, byGender, byType, locationId, byPopularity, byPrice },
    { rejectWithValue }
  ) => {
    try {
      const params = new URLSearchParams();

      params.append('page', page);

      if (keyword) {
        params.append('keyword', keyword);
      } else if (byType && byType !== 'show all') {
        params.append('species', byType);
      }

      if (category && category !== 'show all') params.append('category', category);
      if (byGender && byGender !== 'show all') params.append('sex', byGender);

      if (byPopularity && byPopularity !== undefined && byPopularity !== null) {
        params.append('byPopularity', byPopularity);
      } else if (byPopularity === false) {
        params.append('byPopularity', byPopularity);
      }

      params.append('locationId', locationId);

      if (byPrice && byPrice !== undefined && byPrice !== null) {
        params.append('byPrice', byPrice);
      } else if (byPrice === false) {
        params.append('byPrice', byPrice);
      }

      const response = await axios.get(`/notices?${params.toString()}`);

      return response.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ======================================Categories=======================================

export const fetchCategoriesThunk = createAsyncThunk(
  'fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/notices/categories');
      // console.log('Categories: ', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ======================================Location=========================================

export const fetchCitiesThunk = createAsyncThunk('fetchCities', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/cities/locations');

    // console.log('Cities: ', response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// ======================================add favorites pets==================================

export const addFavoritesThunk = createAsyncThunk(
  'addFavorites',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/notices/favorites/add/${id}`);
      // console.log('Favorites Pets: ', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ======================================remove favorite pet==================================

export const removeFavoriteThunk = createAsyncThunk(
  'removeFavorite',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/notices/favorites/remove/${id}`);
      // console.log('Removed from Favorites: ', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ======================================/notices/{id}=======================================

export const fetchPetByIdThunk = createAsyncThunk(
  'fetchPetById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/notices/${id}`);
      // console.log('fetchPetById: ', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
