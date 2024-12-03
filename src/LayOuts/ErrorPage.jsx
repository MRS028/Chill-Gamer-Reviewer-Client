import React, { useEffect } from "react";

const ErrorPage = () => {
  useEffect(() => {
    document.title = "ERROR 404";
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-base-200 text-red-800 text-center">
      <img
        className="w-40 h-40"
        src="https://cdn-icons-png.flaticon.com/512/6261/6261498.png"
        alt=""
      />
      <h1 className="text-4xl font-bold mb-4">Oops! Something Went Wrong.</h1>
      <p className="text-lg mb-6 px-5">
        We couldn't find the page you were looking for.
      </p>
      <button
        className="px-6 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg"
        onClick={() => (window.location.href = "/")}
      >
        Go to Home
      </button>
    </div>
  );
};

export default ErrorPage;
