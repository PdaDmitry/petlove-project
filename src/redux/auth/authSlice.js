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
import { addFavoritesThunk, fetchPetByIdThunk, removeFavoriteThunk } from '../pets/operationsPets';

const initialState = {
  user: {
    name: null,
    email: null,
    phone: null,
    avatar: null,
    addedPets: [],
    // noticesFavorites: [],
    petsForFavorite: [],
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
          petsForFavorite: action.payload.petsForFavorite || [],
          // noticesFavorites: action.payload.noticesFavorites || [],
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
        state.user = {
          name: null,
          email: null,
          phone: null,
          avatar: null,
          addedPets: [],
          petsForFavorite: [],
          // noticesFavorites: [],
        };
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
          petsForFavorite: action.payload.noticesFavorites,
          // noticesFavorites: action.payload.noticesFavorites.map(notice => notice._id),
          // noticesFavorites: action.payload.noticesFavorites,
        };
        // console.log('petsForFavorite Slice: ', action.payload.noticesFavorites);
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.loader = false;
        state.petsForFavorite = action.payload.noticesFavorites;
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
          // noticesFavorites: action.payload.noticesFavorites.map(notice => notice._id),
          // noticesFavorites: action.payload.noticesFavorites,
          petsForFavorite: action.payload.noticesFavorites,
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
      })

      // petsForFavorite
      .addCase(fetchPetByIdThunk.pending, (state, action) => {
        state.loader = true;
        state.error = null;
      })
      .addCase(fetchPetByIdThunk.fulfilled, (state, action) => {
        state.loader = false;
        state.error = null;

        const existingPet = state.user.petsForFavorite.find(pet => pet._id === action.payload._id);

        if (!existingPet) {
          state.user.petsForFavorite.unshift(action.payload);
        } else {
          state.user.petsForFavorite = state.petsForFavorite.filter(
            pet => pet._id !== action.payload._id
          );
        }
      })
      .addCase(fetchPetByIdThunk.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload || 'Something went wrong';
      });

    // =========================================================================
    // addFavoritesThunk
    // .addCase(addFavoritesThunk.pending, state => {
    //   state.loader = true;
    //   state.error = null;
    // })
    // .addCase(addFavoritesThunk.fulfilled, (state, action) => {
    //   state.user.petsForFavorite = action.payload;
    //   state.loader = false;
    // })
    // .addCase(addFavoritesThunk.rejected, (state, action) => {
    //   state.loader = false;
    //   state.error = action.payload || 'Something went wrong...';
    // })

    // //removeFavoriteThunk
    // .addCase(removeFavoriteThunk.pending, state => {
    //   state.loader = true;
    //   state.error = null;
    // })
    // .addCase(removeFavoriteThunk.fulfilled, (state, action) => {
    //   state.user.petsForFavorite = action.payload;
    //   state.loader = false;
    // })
    // .addCase(removeFavoriteThunk.rejected, (state, action) => {
    //   state.loader = false;
    //   state.error = action.payload || 'Something went wrong...';
    // });
  },
});

export const { setAvatarUpload, resetUploadedPhoto, removeUserPhoto } = authSlice.actions;
export const authReducer = authSlice.reducer;
