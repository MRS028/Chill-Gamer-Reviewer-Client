import React from "react";
import Banner from "./Banner";
import HighestRatedGames from "../../Pages/HighestRatedGames";
import GenreAnalysis from "../Extra-Section/GenreAnalysis";
import RecentReviews from "../Extra-Section/RecentReviews";


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
      <div>
       <RecentReviews></RecentReviews>
      </div>
    </section>
  );
};

export default Home;
