import React, { useContext, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Loading from "./Loading";
import Swal from "sweetalert2";

const ReviewDetails = () => {
  const review = useLoaderData(); // Get the review data loaded by the loader
  const { user } = useContext(AuthContext); // Get user info from context
  const [message, setMessage] = useState(""); // Message state for success/failure
  const userEmail = user?.email; // User email from context
  const userName = user?.name; // User name from context

  
  // Add to WatchList Functionality
  const handleAddToWatchlist = async () => {
    const newWatchList = {
        reviewId: review._id,
        gameTitle: review.gameTitle,
        gameCover: review.gameCover,
        publishingYear : review.publishingYear,
        reviewDescription: review.reviewDescription,
        rating: review.rating,
        genre: review.genre,
        userEmail,
        userName,
      };
    try {
      const response = await fetch("http://localhost:5000/watchlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWatchList),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "Successfully added to your watchlist!",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: data.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error adding to watchlist:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong, please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  




  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-base-content">
        Review Details
      </h1>
      {review ? (
        <div className="flex flex-col lg:flex-row bg-base-100 shadow-xl rounded-lg p-6 space-y-6 border-2 lg:space-y-0  lg:space-x-8">
          <img
            src={review.gameCover}
            alt={review.gameTitle}
            className="w-full lg:w-1/3 rounded-lg mb-6 lg:mb-0 shadow-lg"
          />
          <div className="lg:ml-6 text-base-content text-left">
            <h2 className="text-3xl font-semibold text-base-content mb-4">{review.gameTitle}</h2>
            <p className="text-lg text-base-content mb-3">
              Genre: <span className="font-medium text-[#30beba]">{review.genre}</span>
            </p>
            <p className="text-lg text-base-content mb-3">
              Rating: <span className="font-medium text-yellow-500">{review.rating}/10</span>
            </p>
            <p className="text-lg text-base-content mb-3">
              Reviewer: <span className="font-medium text-[#30beba]">{review.userName}</span>
            </p>
            <p className="text-lg text-base-content mb-3">
              Email: <span className="font-medium">{review.userEmail}</span>
            </p>
            <p className="text-lg text-base-content0 mb-4 text-justify">{review.reviewDescription}</p>
            <div className="flex gap-2">
            <button
              onClick={handleAddToWatchlist}
              className="btn bg-[#30beba] text-white hover:bg-[#22a3a3] py-2 px-6 rounded-lg transition duration-300"
            >
              Add to WatchList
            </button>
            <Link to='/myWatchlist'>
            <button
              className="btn bg-[#30beba] text-white hover:bg-[#22a3a3] py-2 px-6 rounded-lg transition duration-300"
            >
              Go to WatchList
            </button></Link>
            </div>
            {message && (
              <p className="mt-4 text-sm text-green-600 font-medium">{message}</p>
            )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ReviewDetails;
