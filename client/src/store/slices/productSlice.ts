import { createSlice } from '@reduxjs/toolkit';
import { templateApi, Product } from './api/templateApi.generated';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    favorites: [], // Array of Product ObjectIds
  },
  reducers: {
    // Add new favorite to favorites array
    addFavorite: (state, { payload }) => {
      state.favorites?.push(payload);
    },

    // Remove favorite from favorites array
    removeFavorite: (state, { payload }) => {
      const updatedFavorites = state.favorites?.filter(
        (favorite) => favorite != payload,
      );
      state.favorites = updatedFavorites;
    },
  },

  // Order extra reducers
  extraReducers: (builder) => {
    builder.addMatcher(
      templateApi.endpoints.getAllProducts.matchFulfilled,
      (state, { payload }) => {
        state.products = payload.products;
      },
    );
    // Load in favorites to redux state from user document on login
    builder.addMatcher(
      templateApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.favorites = payload.user.favorites;
      },
    );
  },
});

export const selectAllProducts = (state): [Product] => state.product.products;
export const selectFavorites = (state) => state.product.favorites;

// Functions for executing actions on the Product state
export const { addFavorite, removeFavorite } = productSlice.actions;

export default productSlice.reducer;
