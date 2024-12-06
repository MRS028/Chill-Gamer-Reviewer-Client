import React, { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";

const GenreAnalysis = () => {
  const [reviews, setReviews] = useState([]);
  const [genreStats, setGenreStats] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user reviews from the API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:5000/allReviews");
        const data = await response.json();
        setReviews(data);
        setLoading(false);

        // Group data by genre
        const genreData = data.reduce((acc, review) => {
          const genre = review.genre;
          if (!acc[genre]) {
            acc[genre] = { count: 0, totalRating: 0 };
          }
          acc[genre].count += 1;
          acc[genre].totalRating += parseFloat(review.rating);
          return acc;
        }, {});

        // Transform data into an array
        const genreStatsArray = Object.keys(genreData).map((genre) => ({
          genre,
          count: genreData[genre].count,
          avgRating: (genreData[genre].totalRating / genreData[genre].count).toFixed(1),
        }));

        setGenreStats(genreStatsArray);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-2xl font-bold text-gray-500">Loading genre analysis...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <Fade direction="down" duration={1000}>
        <h2 className="text-3xl font-bold text-center mb-8 text-base-content">
          Game Genre Analysis 📊
        </h2>
      </Fade>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {genreStats.map((stat) => (
          <Fade key={stat.genre} direction="up" cascade duration={800}>
            <div className="border border-base-200 shadow-lg rounded-lg p-6 bg-base-200">
              <h3 className="text-lg font-bold text-base-content">{stat.genre}</h3>
              <p className="text-sm text-base-content">
                <span className="font-semibold">Total Games:</span> {stat.count}
              </p>
              <p className="text-sm text-base-content">
                <span className="font-semibold">Average Rating:</span> {stat.avgRating}/10
              </p>
            </div>
          </Fade>
        ))}
      </div>
    </div>
  );
};

export default GenreAnalysis;
