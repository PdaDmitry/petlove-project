import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPetsThunk = createAsyncThunk(
  'fetchPets',
  async ({ page, keyword }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/notices?page=${page}&keyword=${keyword}`);
      // console.log('pets: ', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
