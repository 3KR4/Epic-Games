import { createSelector } from '@reduxjs/toolkit';

const selectCart = (state) => state.cart;

export const selectCartItemById = (id) => createSelector (
  [selectCart],
  (cart) => cart.cartItems.find((item) => item.id === id)
);
