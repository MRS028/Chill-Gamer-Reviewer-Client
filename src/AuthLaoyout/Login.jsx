import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";

const Login = () => {
  const { userLogin, setUser, user } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ login: " " });

  const navigate = useLocation();


  // Login part
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    console.log(email, password);

    userLogin(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
        Swal.fire({
          title: "Log in Successful!",
          text: "Welcome back to our platform!",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate('/')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError({ login: "Invalid email or password 🙃" });

        // console.log(errorCode, errorMessage);
      });
  };

  // Passsword validition
  {
    user?.email ? <> </> : <>{}</>;
  }

  //   if (email ===  && password === "Password123") {

  //   } else {
  //     setError({ login: "Invalid email or password" });
  //   }
  // };

  // handle log in

  const navigateToForgetPassword = () => {
    Swal.fire({
      icon: "info",
      title: "Forgot Password",
      text: "Reset password functionality can be added.",
    });
  };

  const handleGoogleSignIn = () => {
    alert("Google Sign-In clicked!");
  };

  return (
    <div className="flex min-h-screen items-center justify-center md:py-8 bg-gray-100">
      <div className="w-11/12 max-w-md bg-white rounded-lg shadow-md p-6 border">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="flex items-center text-sm font-medium text-gray-700"
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
              className="flex items-center text-sm font-medium text-gray-700"
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
            {error.login && (
              <p className="text-red-500 text-sm">{error.login}</p>
            )}
          </div>

          {/* Forgot Pass */}
          <div className="text-right">
            <Link to="/auth/forgetpassword">
              <button
                type="button"
                onClick={navigateToForgetPassword}
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot Password?
              </button>
            </Link>
          </div>

          {/* Submit btn */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 text-white font-medium rounded-md hover:bg-green-700"
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
    </div>
  );
};

export default Login;
