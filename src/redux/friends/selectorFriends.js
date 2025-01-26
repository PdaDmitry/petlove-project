import { createSelector } from '@reduxjs/toolkit';

export const selectFriends = state => state.friends.items;
export const selectFriendById = id =>
  createSelector([selectFriends], friends => friends.find(friend => friend._id === id));
