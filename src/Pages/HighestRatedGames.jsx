import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { Fade } from "react-awesome-reveal";
import { Typewriter } from "react-simple-typewriter"; // Import Typewriter

const HighestRatedGames = () => {
  const [highestRatedGames, setHighestRatedGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching the highest-rated games
    fetch("https://chill-gamer-server-sigma.vercel.app/highestRatedGames")
      .then((res) => res.json())
      .then((data) => {
        setHighestRatedGames(data);
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Error", error);
        setLoading(false); 
      });
  }, []);

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <Fade direction="right" duration={1000} delay={500}>
        <h2 className="text-3xl font-bold text-center mb-8 text-base-content">
          Highest Rated Games 🎮
        </h2>
      </Fade>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {highestRatedGames.map((game) => (
          <div
            key={game._id}
            className="border border-base-200 p-4 shadow-lg rounded-lg  bg-base-200"
          >
           
            <img
              src={game.gameCover}
              alt={game.gameTitle}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
           
            <h3 className="text-lg font-bold text-base-content">
             
              <Typewriter
                words={[game.gameTitle]} 
                loop={10} 
                cursor
                cursorStyle="|"
                typeSpeed={50}
                deleteSpeed={25}
              />
            </h3>
            <p className="text-sm text-base-content"><strong className="opacity-80">Genre:</strong> {game.genre}</p>
            <p className="text-sm text-base-content">
              <strong className="opacity-80">Rating:</strong > <span className="text-yellow-500 font-bold">{game.rating.toFixed(1)}/10</span>
            </p>
            <p className="mt-4 text-base-content opacity-85">
              {game.reviewDescription.slice(0, 110)}...
            </p>
            <Link to={`/review/${game._id}`}>
              <button className="btn bg-[#30beba] text-white hover:bg-green-500 mt-4">
                Explore Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HighestRatedGames;
