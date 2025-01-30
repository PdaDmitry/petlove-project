import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPetsThunk = createAsyncThunk(
  'fetchPets',
  async ({ page, query }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/notices?page=${page}&query=${query}`);
      console.log('pets: ', response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
