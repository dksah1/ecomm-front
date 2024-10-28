import { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavourites,
  removeFromFavourites,
  setFavourite,
} from "../../redux/features/favourites/favouriteSlice";
import {
  addFavouriteToLocalStorage,
  getFavouritesFromLocalStorage,
  removeFavouriteFromLocalStorage,
} from "../../Utils/localStorage";

const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();

  return <div>HeartIcon</div>;
};

export default HeartIcon;
