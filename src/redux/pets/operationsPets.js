import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPetsThunk = createAsyncThunk(
  'fetchPets',
  async ({ page, keyword, category, byGender, byType }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({
        page,
        keyword,
        category,
        sex: byGender,
        species: byType,
      }).toString();

      const response = await axios.get(`/notices?${params}`);
      // const response = await axios.get(
      //   `/notices?page=${page}&keyword=${keyword}&category=${category}&sex=${byGender}&species=${byType}`
      // );
      // console.log('pets: ', response.data);
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
      console.log('Categories: ', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
