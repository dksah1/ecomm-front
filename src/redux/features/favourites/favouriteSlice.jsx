import { createSlice } from "@reduxjs/toolkit";

const favouriteSlice = createSlice({
  name: "favourites",
  initialState: [],
  reducers: {
    addToFavourites: (state, action) => {
      // check is the produt is already favourites
      if (!state.some((product) => product._id === action.payload._id)) {
        state.push(action.payload);
      }
    },
    removeFromFavourites: (state, action) => {
      // Remove the product with matching ID
      return state.filter((product) => product._id !== action.payload._id);
    },
    setFavourite: (state, action) => {
      // set the favourite from localstorage
      return action.payload;
    },
  },
});

export const { addToFavourites, removeFromFavourites, setFavourite } =
  favouriteSlice.actions;

export const selectFavouriteProduct = (state) => state.favourites;
export default favouriteSlice.reducer;
