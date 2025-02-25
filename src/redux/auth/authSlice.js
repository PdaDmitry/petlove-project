import { createSlice } from '@reduxjs/toolkit';
import {
  addPet,
  loginUser,
  logoutUser,
  refreshUser,
  registerUser,
  removeAddedPet,
  updateUser,
} from './operationsAuth';

const initialState = {
  user: {
    name: null,
    email: null,
    phone: null,
    avatar: null,
    addedPets: [],
  },
  token: null,
  isLoggedIn: false,
  loader: false,
  error: null,
  avatarUload: null,
  uploadedPhoto: false,
  deletedUserPhoto: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAvatarUpload: (state, action) => {
      state.avatarUload = action.payload;
      state.uploadedPhoto = true;
    },
    resetUploadedPhoto: state => {
      state.uploadedPhoto = false;
    },
    removeUserPhoto: (state, action) => {
      state.deletedUserPhoto = action.payload;
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
          addedPets: action.payload.addedPets || [],
        };
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
        state.user = { name: null, email: null, phone: null, avatar: null, addedPets: [] };
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
          addedPets: action.payload.pets,
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
          addedPets: action.payload.pets,
          // addedPets: action.payload.addedPets,
        };
        state.isLoggedIn = true;
        state.loader = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload || 'Something went wrong...';
      })

      // addPet
      .addCase(addPet.pending, state => {
        state.loader = true;
        state.error = null;
      })
      .addCase(addPet.fulfilled, (state, action) => {
        state.user.addedPets = action.payload;
        state.loader = false;
      })
      .addCase(addPet.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload || 'Something went wrong...';
      })

      // removeAddedPet
      .addCase(removeAddedPet.pending, state => {
        state.loader = true;
        state.error = null;
      })
      .addCase(removeAddedPet.fulfilled, (state, action) => {
        state.loader = false;
        state.user.addedPets = state.user.addedPets.filter(pet => pet._id !== action.payload);
      })
      .addCase(removeAddedPet.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload || 'Something went wrong...';
      });
  },
});

export const { setAvatarUpload, resetUploadedPhoto, removeUserPhoto } = authSlice.actions;
export const authReducer = authSlice.reducer;
