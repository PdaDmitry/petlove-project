import { createSlice } from '@reduxjs/toolkit';
import { loginUser, logoutUser, refreshUser, registerUser, updateUser } from './operationsAuth';

const initialState = {
  user: {
    name: null,
    email: null,
    phone: null,
    avatar: null,
  },
  token: null,
  isLoggedIn: false,
  loader: false,
  error: null,
  avatarUload: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAvatarUpload: (state, action) => {
      state.avatarUload = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      //registerUser
      .addCase(registerUser.pending, (state, action) => {
        state.loader = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
          phone: action.payload.phone || null,
          avatar: action.payload.avatar || null,
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
        // state.user = { name: null, email: null };
        state.user = { name: null, email: null, phone: null, avatar: null };
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
          name: action.payload.name,
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
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
          phone: action.payload.phone,
          avatar: action.payload.avatar,
        };
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.loader = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload;
      })

      // updateUser
      .addCase(updateUser.pending, (state, action) => {
        state.loader = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
          phone: action.payload.phone,
          avatar: action.payload.avatar,
        };
        state.isLoggedIn = true;
        state.loader = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload || 'Something went wrong...';
      });
  },
});

export const { setAvatarUpload } = authSlice.actions;
export const authReducer = authSlice.reducer;
