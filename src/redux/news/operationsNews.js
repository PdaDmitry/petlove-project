import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNewsThunk = createAsyncThunk('fetchNews', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/news');
    console.log('news: ', response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});
