import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNewsThunk = createAsyncThunk(
  'fetchNews',
  async ({ page, keyword }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/news?page=${page}&keyword=${keyword}`);
      // console.log('news: ', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
