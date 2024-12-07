import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  useEffect(() => {
    document.title = "Login | Chill Gamer";
  }, []);
  const { userLogin, setUser, signInWithGoogle } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // console.log(location)
  // Login part
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and Password are required.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");

    userLogin(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        Swal.fire({
          title: "Log in Successful!",
          text: "Welcome back to Chill Gamer!",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        if (error.code) {
          Swal.fire({
            icon: "warning",
            title: "Incorrect email or Password",
            text: "The password you entered is incorrect. Please try again.",
            confirmButtonText: "OK",
            confirmButtonColor: "#f59e0b",
          });
          setError("Incorrect email or password. Please try again.");
        }
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        // console.log(result?.name);
        navigate(location?.state ? location.state : "/");
        // toast.success("Log in successfull");

        Swal.fire({
          title: "Login Successful!",
          text: "Welcome back to Chill Gamer!",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
        });

        // Swal.fire({
        //   title: "Login Successful!",
        //   text: "Welcome to Chill Gamer!",
        //   icon: "success",
        //   confirmButtonText: "OK",
        // });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password. Please try again.",
          confirmButtonText: "Retry",
          confirmButtonColor: "#d33",
        });
        // console.log("ERROR", error.message);
      });
  };

  const navigateToForgetPassword = () => {
    navigate("/auth/forgetpassword", {
      state: { email: email || "" },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center md:py-8 text-base-content ">
      <div className="w-11/12 max-w-md bg-base-200 rounded-lg shadow-md p-6 border">
        <h2 className="text-2xl font-semibold text-center text-base-content mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="flex items-center text-sm font-medium text-base-content"
            >
              Email
            </label>
            <input
              name="email"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="flex items-center text-sm font-medium text-base-content"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit btn */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={navigateToForgetPassword}
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot Password?
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#30beba] text-white font-medium rounded-md hover:bg-green-700"
          >
            Login
          </button>
        </form>

        {/* google login */}
        <div className="flex items-center justify-center space-x-2 mt-6">
          <span className="block w-20 border-t border-gray-300"></span>
          <span className="text-sm text-gray-500">Or Login with</span>
          <span className="block w-20 border-t border-gray-300"></span>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="flex border-2 items-center justify-center w-full py-2 mt-4 bg-transparent font-medium rounded-md hover:bg-gray-200"
        >
          <FcGoogle className="mr-2" /> Login with Google
        </button>

        <p className="text-sm text-center text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link to="/auth/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Login;
