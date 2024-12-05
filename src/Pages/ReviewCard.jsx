import React from 'react';
import { Link } from 'react-router-dom';

const ReviewCard = ({review}) => {
const {
    _id,
    gameCover,
    gameTitle,
    genre,
    rating,
    userName,
    publishingYear} = review;





    return (
        <div
            
        className="group relative bg-base-200 shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
      >
        <img
          src={gameCover}
          alt={gameTitle}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="p-5">
          <h2 className="text-xl font-bold text-base-content mb-2 truncate">
            {gameTitle}
          </h2>
          <p className="text-sm text-base-content">
            <strong>Published:</strong> {publishingYear}
          </p>
          <p className="text-sm text-base-content">
            <strong>Genre:</strong> {genre}
          </p>
          <p className="text-sm text-base-content">
            <strong>Rating:</strong>{" "}
            <span className="text-yellow-500 font-medium">
              {rating}/10
            </span>
          </p>
          <p className="text-sm text-base-content">
            <strong>Reviewer:</strong> {userName}
          </p>
          {/* <p className="mt-3 text-gray-700 line-clamp-2">
            {review.reviewDescription}
          </p> */}
          <Link to={`/review/${_id}`}><button
           className="mt-4 w-full py-2 text-sm font-semibold rounded-lg bg-[#30beba] text-white hover:bg-green-500 transition-colors">
            Explore Details
          </button></Link>
        </div>
        <span className="absolute top-4 left-4 bg-green-600 text-white text-xs px-3 py-1 rounded-full uppercase font-semibold shadow-sm">
          New
        </span>
      </div>
    );
};

export default ReviewCard;