import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { FaRegEye, FaEdit, FaTrashAlt } from "react-icons/fa"; // Import React Icons
import Loading from "./Loading";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyReviews = ({ userEmail }) => {
  useEffect(() => {
    document.title = "My Reviews | Chill Gamer";
  }, [])
  const [reviews, setReviews] = useState([]);
  const [myReviews, setMyReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  userEmail = user?.email;

  // Fetch all reviews from the server
  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/allReviews");
        const data = await response.json();
        setReviews(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setLoading(false);
      }
    };

    fetchAllReviews();
  }, []);

  // Filter reviews for logged-in user
  useEffect(() => {
    if (userEmail) {
      const filteredReviews = reviews.filter(
        (review) => review.userEmail === userEmail
      );
      setMyReviews(filteredReviews);
    }
  }, [reviews, userEmail]);

  // Delete Review
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/allReviews/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your review has been deleted.",
                icon: "success",
              });
              // Update 'reviews' state as well
              setReviews((prevReviews) =>
                prevReviews.filter((item) => item._id !== id)
              );
              // Update 'myReviews' state after deleting
              setMyReviews((prevReviews) =>
                prevReviews.filter((item) => item._id !== id)
              );
            }
          });
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-base-content">
        My Reviews
      </h1>
      {loading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border-collapse border border-base-200 shadow-md rounded-lg">
            <thead className="bg-[#30beba] dark:text-white text-xl">
              <tr>
                <th className="px-6 py-3">Index</th>
                <th className="px-6 py-3">Game Title</th>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Genre</th>
                <th className="px-6 py-3">Rating</th>
                <th className="px-10 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myReviews.map((review, index) => (
                <tr
                  key={review._id}
                  className="hover:bg-gray-50 transition duration-300 ease-in-out"
                >
                  <td className="border-t border-base-200 px-8 py-4 text-left">
                    {index + 1}
                  </td>

                  <td className="border-t border-base-200 px-6 py-4 text-left">
                    {review.gameTitle}
                  </td>
                  <td className="border-t border-base-200 px-8 py-4 text-left">
                    <img
                      className="w-10 h-10 rounded-xl"
                      src={review.gameCover}
                      alt=""
                    />
                  </td>
                  <td className="border-t border-base-200 px-6 py-4 text-left">
                    {review.genre}
                  </td>
                  <td className="border-t border-base-200 px-8 py-4 text-left">
                    {review.rating}/10
                  </td>
                  <td className="border-t border-base-200  py-4 text-left flex  gap-2">
                    <Link to={`/review/${review?._id}`}>
                      <button className="btn btn-sm bg-[#30beba] text-white hover:bg-[#22a3a3] p-2 rounded-md shadow-md">
                        <FaRegEye />
                      </button>
                    </Link>
                    <Link to={`/review/updateReview/${review?._id}`}>
                      <button className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600 p-2 rounded-md shadow-md">
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      className="btn btn-sm bg-red-500 text-white hover:bg-red-600 p-2 rounded-md shadow-md"
                      onClick={() => handleDelete(review._id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {myReviews.length === 0 && (
            <p className="text-center text-gray-500 mt-4">
              No reviews found for your account.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
