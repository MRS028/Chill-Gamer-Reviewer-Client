import React, { useContext, useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Loading from "../../Pages/Loading";

const RecentReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { loading, setLoading } = useContext(AuthContext);

  useEffect(() => {
    fetch("https://chill-gamer-server-sigma.vercel.app/allReviews")
      .then((res) => res.json())
      .then((data) => setReviews(data.slice(0, 6)));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 bg-base-100 rounded-2xl ">
      <Fade direction="down" duration={1000}>
        <h2 className="text-4xl font-extrabold text-center text-base-content mb-8">
          🎮 Recent Reviews
        </h2>
      </Fade>

      <ul className="space-y-6">
        {reviews.map((review) => (
          <li
            key={review._id}
            className="bg-base-100 p-6 rounded-xl shadow-xl hover:bg-base-200 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
         
            <h3 className="text-2xl font-semibold  text-[#30beba] hover:text-green-600">
              {review.gameTitle}
            </h3>
            <div className=" items-center mb-4 text-center"></div>
            <p className="text-yellow-500 font-semibold">
              Rating: {review.rating}/10
            </p>
            <p className="text-base text-base-content mb-4">
              {/* {review.reviewDescription.substring(0, 150)}... */}
            </p>
            <p className="text-sm text-base-content">
              Published:{review.publishingYear}
            </p>
            <Link
              to={`/review/${review._id}`}
              className="text-[#30beba] hover:underline mt-4 block"
            >
              Read full review
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentReviews;
