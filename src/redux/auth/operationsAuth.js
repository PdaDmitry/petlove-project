import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

axios.defaults.baseURL = 'https://petlove.b.goit.study/api/';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  localStorage.setItem('token', token);
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
  localStorage.removeItem('token');
};

// =========================================registerUser===============================

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, thunkAPI) => {
    try {
      const res = await axios.post('/users/signup', { name, email, password });

      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// =====================================logoutUser======================================

export const logoutUser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/signout');
    clearAuthHeader();
    toast.success('Sign out success', {
      duration: 2000,
      position: 'top-center',
      style: { background: 'white', color: ' orange' },
    });
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// =====================================loginUser======================================

export const loginUser = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
  try {
    const res = await axios.post('/users/signin', { email, password });
    // console.log('res: ', res);
    setAuthHeader(res.data.token);
    toast.success(`Welcome back, ${email}!`, {
      duration: 2000,
      position: 'top-center',
      style: { background: 'green', color: 'white' },
    });
    return res.data;
  } catch (error) {
    toast.error(`Invalid credentials, please try again.`, {
      duration: 2000,
      position: 'bottom-center',
      style: { background: 'red', color: 'white' },
    });
    // return thunkAPI.rejectWithValue(error.message);
  }
});
