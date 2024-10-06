import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  // Email validation function
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Validate email format
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Validate password length
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    console.log(userInfo);

    try {
      const res = await login({ email, password }).unwrap();
      if (res && typeof res === "object") {
        dispatch(setCredentials({ ...res }));
        toast.success("Login successful!");
        navigate(redirect);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err) {
      toast.error(
        err?.data?.message || err.message || "An unexpected error occurred."
      );
    }
  };

  // Disable the login button if either email or password is empty
  const isFormIncomplete = !email || !password;

  return (
    <div className="min-h-screen flex flex-col justify-center bg-cover bg-center px-4 sm:px-6 lg:px-8">
      <div
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80')`,
        }}
        className="max-w-md w-full space-y-8 mx-auto bg-white bg-opacity-80 p-8 rounded-lg shadow-lg"
      >
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Sign In
        </h1>

        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-3 border border-gray-300 rounded w-full"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-3 border border-gray-300 rounded w-full"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <button
            disabled={isLoading || isFormIncomplete} // Disable button if loading or form is incomplete
            type="submit"
            className={`w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded focus:outline-none transition duration-300 ${
              isFormIncomplete ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>

          {isLoading && <Loader />}
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600">
            New Customer?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
              className="text-pink-500 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
