import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFriendsThunk = createAsyncThunk(
  'fetchFriends',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/friends'); // относительный путь
      // console.log('friends: ', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
