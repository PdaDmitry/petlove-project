import { createSlice } from '@reduxjs/toolkit';
import { loginUser, logoutUser, refreshUser, registerUser } from './operationsAuth';

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  loader: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      //registerUser
      .addCase(registerUser.pending, (state, action) => {
        state.loader = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = {
          name: action.payload.name, // Прямое присвоение данных
          email: action.payload.email,
        };
        // state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.loader = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload || 'Something went wrong...';
      })

      //logoutUser
      .addCase(logoutUser.pending, (state, action) => {
        state.loader = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.loader = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload || 'Something went wrong...';
      })
      // loginUser
      .addCase(loginUser.pending, (state, action) => {
        state.loader = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = {
          name: action.payload.name, // Прямое присвоение данных
          email: action.payload.email,
        };
        // state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.loader = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload || 'Something went wrong...';
      })
      //refreshUser
      .addCase(refreshUser.pending, state => {
        state.loader = true;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.loader = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;
