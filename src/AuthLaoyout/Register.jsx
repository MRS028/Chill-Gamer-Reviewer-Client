import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthProvider, { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const Register = () => {
  useEffect(() => {
    document.title = "Register | Chill Gamer";
  }, []);
  // Export from Authprovider
  const { createNewUser, user, setUser, updateUserProfile, signInWithGoogle } =
    useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  //  console.log(user);
  const navigate = useNavigate();
  const location = useLocation();
  // Form submit Section
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    const email = form.get("email");
    const photourl = form.get("photourl");
    const password = form.get("password");
    const FormInfo = { name, email, photourl, password };

    // console.log(FormInfo);
    createNewUser(email, password)
      .then((result) => {
        navigate("/");
        const user = result.user;
        setUser(user);
        // console.log(user);
        updateUserProfile({ displayName: name, photoURL: photourl })
          .then((result) => {
            navigate("/");
          })
          .catch((error) => {
            // console.log(error);
          });
          Swal.fire({
            title: "Registration Successful!",
            text: "Welcome to Chill Gamer!",
            icon: "success",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        // console.log(errorCode, errorMessage);
      });

    //  password check section
    if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setPasswordError("Password must contain at least one lowercase letter.");
      return;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }

    setPasswordError("");
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        // console.log(result?.user?.name);
        navigate("/");
        Swal.fire({
          title: "Registration Successful!",
          text: "Welcome to Chill Gamer!",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
        });
      })
      .catch((error) => {
        console.log("ERROR", error.message);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password. Please try again.",
          confirmButtonText: "Retry",
          confirmButtonColor: "#d33",
        });
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center md:my-8 text-base-content">
      <div className="w-11/12 max-w-md bg-base-200 rounded-lg shadow-md p-6 border">
        <h2 className="text-2xl font-semibold text-center text-base-content mb-6">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="flex items-center text-sm font-medium text-base-content"
            >
              Name
            </label>
            <input
              name="name"
              type="text"
              id="name"
              required
              placeholder="Enter your name"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="flex items-center text-sm font-medium text-base-content"
            >
              Email
            </label>
            <input
              required
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label
              htmlFor="photo"
              className="flex items-center text-sm font-medium text-base-content"
            >
              Photo URL
            </label>
            <input
              name="photourl"
              type="text"
              id="photo"
              placeholder="Enter photo URL"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Password  */}
          <div>
            <label
              htmlFor="password"
              className="flex items-center text-sm font-medium text-base-content"
            >
              Password
            </label>
            <div className="relative">
              <input
                required
                name="password"
                type={showPassword ? "text" : "password"}
                id="password"
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
            {passwordError && (
              <p className="text-xs text-red-500 mt-2">{passwordError}</p>
            )}
          </div>

          {/* Submit btn */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#30beba] text-white font-medium rounded-md hover:bg-green-700"
          >
            Register
          </button>
        </form>

        <div className="flex items-center justify-center space-x-2 mt-6">
          <span className="block w-20 border-t border-gray-300"></span>
          <span className="text-sm text-gray-500">Or Register with</span>
          <span className="block w-20 border-t border-gray-300"></span>
        </div>
        <button
          onClick={handleGoogleSignIn}
          className="flex border-2 items-center justify-center w-full py-2 mt-4 bg-transparent font-medium rounded-md hover:bg-gray-200"
        >
          <FcGoogle className="mr-2" /> Register with Google
        </button>

        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
