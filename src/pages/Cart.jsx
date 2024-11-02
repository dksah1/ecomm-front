import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty = 1) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shop");
  };

  return (
    <div className="container mx-auto px-4 mt-8">
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500">
          <p className="text-lg">Your cart is empty</p>
          <Link to="/shop" className="text-pink-500 underline mt-2">
            Go To Shop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-semibold mb-6">Shopping Cart</h1>
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center bg-white p-4 rounded-lg shadow-md"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />

                  <div className="flex-1 ml-4">
                    <Link
                      to={`/product/${item._id}`}
                      className="text-lg font-semibold text-pink-500 hover:underline"
                    >
                      {item.name}
                    </Link>
                    <p className="text-gray-500 mt-1">{item.brand}</p>
                    <p className="text-xl font-bold mt-1">${item.price}</p>
                  </div>

                  <div className="w-24">
                    <select
                      className="w-full p-2 border rounded-md text-gray-700"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    className="text-red-500 ml-4 hover:text-red-600"
                    onClick={() => removeFromCartHandler(item._id)}
                  >
                    <FaTrash className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white text-black p-6 rounded-lg shadow-md h-fit sticky top-[104px]">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <p className="text-lg mb-2">
              Items:{" "}
              <span className="font-bold">
                {cartItems.reduce((acc, item) => acc + (item.qty || 0), 0)}
              </span>
            </p>
            <p className="text-xl font-bold mb-4">
              Total: $
              {cartItems
                .reduce((acc, item) => acc + (item.qty || 0) * item.price, 0)
                .toFixed(2)}
            </p>
            <button
              className="bg-pink-500 hover:bg-pink-600 text-white py-3 px-6 rounded-full w-full text-lg font-medium transition-colors disabled:bg-gray-400"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
