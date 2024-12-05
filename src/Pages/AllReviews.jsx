import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import ReviewCard from "./ReviewCard";

const AllReviews = () => {

  useEffect(() => {
    document.title = "All Reviews | Chill Gamer";
  }, []);

  const reviews = useLoaderData();

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-base-content">
        All Reviews
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review) => ( <ReviewCard key={review._id} review={review}></ReviewCard>
         
        ))}
      </div>
    </div>
  );
};

export default AllReviews;
