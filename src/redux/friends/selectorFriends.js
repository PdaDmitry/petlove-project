import { createSelector } from '@reduxjs/toolkit';

export const selectFriends = state => state.friends.items;
export const selectFriendById = id =>
  createSelector([selectFriends], friends => friends.find(friend => friend._id === id));

export const selectFriendsLoader = state => state.friends.isLoading;
export const selectFriendsError = state => state.friends.isError;
