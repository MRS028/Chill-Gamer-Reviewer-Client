import React from "react";

const Banner = () => {
  return (
    <div>
      <header className="relative  h-80 flex items-center justify-center text-center px-4 md:px-0">
        <div>
          <h1 className="text-2xl md:text-4xl font-extrabold">
            Explore & Review Your Favorite Games
          </h1>
          <p className="mt-4 text-sm md:text-lg">
            Find out the best games and share your experiences with the world.
          </p>
          <button className="mt-6 bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-700">
            Start Reviewing
          </button>
        </div>
      </header>
    </div>
  );
};

export default Banner;
