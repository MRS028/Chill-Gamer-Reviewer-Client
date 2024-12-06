import React, { useEffect } from "react";
import { Bounce } from "react-awesome-reveal";
import { Link } from "react-router-dom";

const ReviewCard = ({ review }) => {
  useEffect(() => {
    document.title = "All Review | Chill Gamer";
  }, [])
  const { _id, gameCover, gameTitle, genre, rating, userName, publishingYear } =
    review;

  return (
    <div className="relative group bg-gradient-to-br from-gray-100 to-gray-300 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
    <div className="relative overflow-hidden">
      <img
        src={gameCover}
        alt={gameTitle}
        className="w-full h-56 object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-110"
      />
      
      <span className="absolute top-4 left-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full uppercase font-bold shadow-md">
       <Bounce duration={2000} delay={500} > New</Bounce>
      </span>
     
    </div>
  
    <div className="p-6 bg-base-100 rounded-b-2xl">
      <h2 className="text-lg font-extrabold text-base-content mb-3 line-clamp-1">
        {gameTitle}
      </h2>
      <div className="text-sm text-base-content space-y-2">
        <p>
          <strong>Published:</strong> {publishingYear}
        </p>
        <p>
          <strong>Rating:</strong>{" "}
          <span className="text-yellow-500 font-bold">{rating}/10</span>
        </p>
        <p>
          <strong>Genre:</strong> {genre}
        </p>
        <p>
          <strong>Reviewer:</strong> {userName}
        </p>
      </div>
  
      <Link to={`/review/${_id}`} className="block mt-6">
        <button className="w-full py-3 bg-gradient-to-r from-teal-400 to-green-500 text-white font-semibold rounded-lg shadow-md hover:from-teal-500 hover:to-green-600 transition-all duration-300">
          Explore Details
        </button>
      </Link>
    </div>
  </div>
  
  
  );
};

export default ReviewCard;
