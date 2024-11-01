import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  // console.log("cartitem", cartItems);

  const addToCartHandler = (product, quantity) => {
    dispatch(addToCart({ ...product, quantity }));
  };
  return (
    <>
      <div className="container flex justify-around items-start flex-wrap mx-auto mt-8 ">
        {cartItems.length === 0 ? (
          <div className="">
            Your cart is empty{" "}
            <Link to="/shop" className="text-sky-400 underline">
              Go To Shop
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col w-[80%] ">
              <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>

              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center mb-[1rem] pb-2"
                >
                  <div className="w-[5rem] h-[5rem]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="flex-1 ml-4">
                    <Link to={`/product/${item._id}`} className="text-pink-500">
                      {item.name}
                    </Link>
                    <div className="mt-2 text-white ">{item.brand}</div>
                    <div className="mt-2 text-white font-bold ">
                      ${item.price}
                    </div>
                  </div>

                  <div className="w-24">
                    <select
                      value={item.quantity}
                      className="w-full p-1 border rounded text-black "
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option value={x + 1} key={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
