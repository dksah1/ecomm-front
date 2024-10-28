// add a product to localstorage
export const addFavouriteToLocalStorage = (product) => {
  const favourites = getFavouritesFromLocalStorage();
  if (!favourites.some((p) => p._id === product._id)) {
    favourites.push(product);
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }
};

// remove from localstorage
export const removeFavouriteFromLocalStorage = (productId) => {
  const favourites = getFavouritesFromLocalStorage();
  const updateFavourites = favourites.filter(
    (product) => product._id !== productId
  );
  localStorage.setItem("favourites", JSON.stringify(updateFavourites));
};

// retrives favourite from localstorage

export const getFavouritesFromLocalStorage = () => {
  const favouritesJSON = localStorage.getItem("favour");
  return favouritesJSON ? JSON.parse(favouritesJSON) : [];
};
