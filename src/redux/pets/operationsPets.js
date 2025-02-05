import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPetsThunk = createAsyncThunk(
  'fetchPets',
  async ({ page, keyword, category, byGender, byType, popularity, price }, { rejectWithValue }) => {
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
      if (popularity) params.append('popularity', popularity);
      if (price) params.append('price', price);

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

// export const fetchPetsThunk = createAsyncThunk(
//   'fetchPets',
//   async ({ page, keyword, category, byGender, byType }, { rejectWithValue }) => {
//     try {
//       const params = new URLSearchParams({
//         page,
//         keyword,
//         category,
//         sex: byGender,
//         species: byType,
//       }).toString();

//       const response = await axios.get(`/notices?${params}`);

//       // console.log('pets: ', response.data);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );
