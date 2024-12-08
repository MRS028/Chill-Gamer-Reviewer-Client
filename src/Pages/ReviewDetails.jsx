import React, { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Loading from "./Loading";
import Swal from "sweetalert2";

const ReviewDetails = () => {
  useEffect(() => {
    document.title = "Review Details | Chill Gamer";
  }, [])
  const review = useLoaderData(); 
  const { user } = useContext(AuthContext); 
  const [message, setMessage] = useState(""); 
  const userEmail = user?.email; 
  const userName = user?.name; 

  
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
      const response = await fetch("https://chill-gamer-server-sigma.vercel.app/watchlist", {
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
  <h1 className="text-4xl font-extrabold text-center mb-8 text-base-content">
    Review Details
  </h1>
  {review ? (
    <div className="flex flex-col lg:flex-row bg-base-100 shadow-2xl rounded-2xl p-8 lg:space-x-10 border-t-4 border-[#30beba] hover:shadow-3xl transition-shadow duration-300">
      {/* Game Cover Section */}
      <img
        src={review.gameCover}
        alt={review.gameTitle}
        className="w-full lg:w-1/2 rounded-xl shadow-lg transform transition-transform duration-500 hover:scale-105"
      />
      {/* Details Section */}
      <div className="lg:ml-6 text-base-content">
        <h2 className="text-2xl my-5  lg:text-3xl mb-4  font-extrabold text-base-content  line-clamp-1">{review.gameTitle}</h2>
        <p className="text-lg mb-3">
          <strong>Genre: </strong>
          <span className="font-medium text-[#30beba]">{review.genre}</span>
        </p>
        <p className="text-lg mb-3">
          <strong>Rating: </strong>
          <span className="font-medium text-yellow-500">{review.rating}/10</span>
        </p>
        <p className="text-lg mb-3">
          <strong>Published: </strong>
          <span className="font-medium text-green-500">{review.publishingYear}</span>
        </p>
        <p className="text-lg mb-3">
          <strong>Reviewer: </strong>
          <span className="font-medium text-[#30beba]">{review.userName}</span>
        </p>
        <p className="text-lg mb-3 opacity-90">
          <strong>Email: </strong> <span className="font-medium">{review.userEmail}</span>
        </p>
        <div className="w-[95%] mx-auto text-center">
        
        <p className="  text-base-content mb-6 text-justify leading-relaxed opacity-80"><strong>Description: </strong>
          {review.reviewDescription}
        </p>
        </div>
        {/* Buttons Section */}
        <div className="flex flex-wrap gap-4 justify-between">
          <button
            onClick={handleAddToWatchlist}
            className="bg-[#30beba] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#22a3a3] transition-all duration-300"
          >
            Add to WatchList
          </button>
          <Link to="/myWatchlist">
            <button className="bg-[#30beba] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#22a3a3] transition-all duration-300">
              Go to WatchList
            </button>
          </Link>
        </div>
        {/* Success Message */}
        {message && (
          <p className="mt-6 text-sm text-green-600 font-medium">{message}</p>
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
