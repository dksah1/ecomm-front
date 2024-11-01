import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
      setComment("");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, quantity }));
    navigate("/cart");
  };

  return (
    <>
      <div className="mb-4">
        <Link to="/" className="text-white font-semibold hover:underline ml-40">
          Go Back
        </Link>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.message}
        </Message>
      ) : (
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:justify-between mt-8">
          <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto rounded-lg object-cover max-w-md"
              />
              <HeartIcon product={product} className="absolute top-4 right-4" />
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-between px-4">
            <h2 className="text-3xl font-semibold mb-4">{product.name}</h2>
            <p className="text-[#b0b0b0] text-lg mb-4">{product.description}</p>

            <p className="text-4xl font-bold text-pink-100 mb-4">
              ${product.price}
            </p>

            <div className="flex">
              <div className="one flex flex-col space-y-4">
                <div className="flex items-center">
                  <FaStore className="mr-2 text-gray-500" />
                  <span className="text-lg">Brand: {product.brand}</span>
                </div>
                <div className="flex items-center">
                  <FaClock className="mr-2 text-gray-500" />
                  <span className="text-lg">
                    Added: {moment(product.createdAt).fromNow()}
                  </span>
                </div>
                <div className="flex items-center">
                  <FaStar className="mr-2 text-yellow-500" />
                  <span className="text-lg">Reviews: {product.numReviews}</span>
                </div>
              </div>
              <div className="two ml-24">
                <h1 className="flex items-center mb-6">
                  <FaStar className="mr-2 text-white" /> Ratings :{rating}
                </h1>
                <h1 className="flex items-center mb-6">
                  <FaShoppingCart className="mr-2 text-white" /> Quantity:
                  {product.quantity}
                </h1>
                <h1 className="flex items-center mb-6">
                  <FaBox className="mr-2 text-white" /> In Stock :
                  {product.countInStock}
                </h1>
              </div>
            </div>
            <div className="flex justify-between flex-wrap">
              <Ratings
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
              {product.countInStock > 0 && (
                <div className="">
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="p-2 w-[6rem] rounded-lg  text- block"
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <div className="btn-container">
              <button
                onClick={addToCartHandler}
                disabled={product.countInStock === 0}
                className="bg-pink-600 text-white py-2 px-4 rounded-lg"
              >
                Add To Cart{" "}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="mt-[5rem] container flex flex-wrap items-start justify-between ml-[10rem]">
        <ProductTabs
          loadingProductReview={loadingProductReview}
          userInfo={userInfo}
          submitHandler={submitHandler}
          rating={rating}
          setRating={setRating}
          comment={comment}
          setComment={setComment}
          product={product}
        />
      </div>
    </>
  );
};

export default ProductDetails;
