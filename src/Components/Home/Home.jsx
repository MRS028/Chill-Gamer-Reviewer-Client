import React from "react";
import Banner from "./Banner";
import HighestRatedGames from "../../Pages/HighestRatedGames";
import GenreAnalysis from "../Extra-Section/GenreAnalysis";

const Home = () => {
  return (
    <section>
      <div>
        <Banner></Banner>
      </div>
      <div>
        <HighestRatedGames></HighestRatedGames>
      </div>

      <div>
        <GenreAnalysis></GenreAnalysis>
      </div>
    </section>
  );
};

export default Home;
