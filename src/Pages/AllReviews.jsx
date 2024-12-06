import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import { Fade } from "react-awesome-reveal";

const AllReviews = () => {
  const [sortCriteria, setSortCriteria] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  const [filteredReviews, setFilteredReviews] = useState([]);

  const reviews = useLoaderData();

  useEffect(() => {
    document.title = "All Reviews | Chill Gamer";
  }, []);

  useEffect(() => {
    let updatedReviews = [...reviews];

    if (filterGenre) {
      updatedReviews = updatedReviews.filter(
        (review) => review.genre === filterGenre
      );
    }

    // Sort by Rating , Year
    if (sortCriteria === "rating-asc") {
      updatedReviews.sort((a, b) => a.rating - b.rating);
    } else if (sortCriteria === "rating-desc") {
      updatedReviews.sort((a, b) => b.rating - a.rating);
    } else if (sortCriteria === "year-asc") {
      updatedReviews.sort((a, b) => a.year - b.year);
    } else if (sortCriteria === "year-desc") {
      updatedReviews.sort((a, b) => b.year - a.year);
    }

    setFilteredReviews(updatedReviews);
  }, [sortCriteria, filterGenre, reviews]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <Fade direction="left" duration={1000} delay={500}>
        <h1 className="text-4xl font-extrabold mb-8 text-center text-base-content">
          All Reviews
        </h1>
      </Fade>

      <div className="flex justify-center gap-4 mb-6">
        <select
          className="select select-bordered w-full max-w-xs"
          onChange={(e) => setSortCriteria(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="rating-asc">Rating (Low to High)</option>
          <option value="rating-desc">Rating (High to Low)</option>
          <option value="year-asc">Year (Oldest to Newest)</option>
          <option value="year-desc">Year (Newest to Oldest)</option>
        </select>

        <select
          className="select select-bordered w-full max-w-xs"
          onChange={(e) => setFilterGenre(e.target.value)}
        >
          <option value="">Filter By Genre</option>
          {Array.from(new Set(reviews.map((review) => review.genre))).map(
            (genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            )
          )}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredReviews.map((review) => (
          <ReviewCard key={review._id} review={review}></ReviewCard>
        ))}
      </div>
    </div>
  );
};

export default AllReviews;
