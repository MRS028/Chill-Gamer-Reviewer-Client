import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const registeredEmail = "user@example.com";

    if (email === registeredEmail) {
      setMessage("Password reset email has been sent!");
      setError(""); 
    } else {
      setError("This email is not registered.");
      setMessage(""); 
    }


  };

  return (
    <div className="flex min-h-screen items-center justify-center md:py-8 bg-gray-100">
      <div className="w-11/12 max-w-md bg-white rounded-lg shadow-md p-6 border">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Forgot Your Password?
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your registered email"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Error  */}
          {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
          {message && <p className="text-xs text-green-500 mt-2">{message}</p>}

          {/* Submit Btn */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 text-white font-medium rounded-md hover:bg-green-700"
          >
            Reset Password
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Remembered your password?{" "}
          <Link to="/auth/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;
