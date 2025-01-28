import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNewsThunk = createAsyncThunk(
  'fetchNews',
  async ({ page }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/news?page=${page}`);
      // console.log('news: ', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
