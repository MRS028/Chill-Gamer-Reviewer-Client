import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { FaTrashAlt } from "react-icons/fa"; // Import React Icons
import Loading from "./Loading";
import Swal from "sweetalert2";
import { Fade } from "react-awesome-reveal";

const MyWatchlist = () => {
  useEffect(() => {
    document.title = "My Watchlists | Chill Gamer";
  }, [])
  const [watchlist, setWatchlist] = useState([]);
  const [myWatchlist, setMyWatchlist] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const { user } = useContext(AuthContext); 
  
  useEffect(() => {
    const fetchWatchlist = async () => {

      try {
        setLoading(true);
        const response = await fetch("https://chill-gamer-server-sigma.vercel.app/watchlist");
        const data = await response.json();
        setWatchlist(data); // Store all watchlist data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching watchlist:", error);
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  // Filter items for logged-in user
  useEffect(() => {
    if (user?.email) {
      const filteredWatchlist = watchlist.filter(
        (item) => item.userEmail === user.email
      );
      setMyWatchlist(filteredWatchlist);
    }
  }, [watchlist, user?.email]);

  // Delete Watchlist
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
        fetch(`https://chill-gamer-server-sigma.vercel.app/watchlist/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Watchlist's game has been deleted.",
                icon: "success",
              });
              setMyWatchlist(myWatchlist.filter((item) => item._id !== id));
            }
          });
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <Fade direction="left" duration={1000} delay={500}>
      <h1 className="text-3xl text-base-content font-bold text-center mb-8">
        My Watchlist
      </h1>
      </Fade>
      {loading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border-collapse border border-base-200 shadow-md rounded-lg">
            <thead className="bg-[#30beba]  dark:text-white text-xl">
              <tr>
                <th className="px-6 py-3">NO</th>
                <th className="px-6 py-3">Game Title</th>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Genre</th>
                <th className="px-6 py-3">Rating</th>
                <th className="px-10 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myWatchlist.map((item, index) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-50 transition duration-300 ease-in-out"
                >
                  <td className="border-t border-base-200 px-6 py-4 text-left">
                    {index + 1}
                  </td>
                  <td className="border-t border-base-200 px-6 py-4 text-left">
                    {item.gameTitle}
                  </td>
                  <td className="border-t border-base-200 px-8 py-4 text-left"><img className="w-10 h-10 rounded-xl" src={item.gameCover} alt="" /></td>
                  <td className="border-t border-base-200 px-6 py-4 text-left">
                    {item.genre}
                  </td>
                  <td className="border-t border-base-200 px-8 py-4 text-left">
                    {item.rating}/10
                  </td>
                  <td className="border-t px-10 border-base-200 py-4 text-left">
                    <button
                      className="btn btn-sm bg-red-500 text-white hover:bg-red-600 p-2 rounded-md shadow-md"
                      onClick={() => handleDelete(item._id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {myWatchlist.length === 0 && (
            <p className="text-center text-gray-500 mt-4">
              No games in your watchlist.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default MyWatchlist;
