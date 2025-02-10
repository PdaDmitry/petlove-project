import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPetsThunk = createAsyncThunk(
  'fetchPets',
  async (
    { page, keyword, category, byGender, byType, byPopularity, byPrice }, //popularity, price,
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

      if (byPrice && byPrice !== undefined && byPrice !== null) {
        params.append('byPrice', byPrice);
      } else if (byPrice === false) {
        params.append('byPrice', byPrice);
      }

      const response = await axios.get(`/notices?${params.toString()}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ======================================Categories=========================================

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
