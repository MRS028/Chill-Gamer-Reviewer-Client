import React, { useState, useEffect } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import banner4 from "../../assets/banner-4.jpg";
import banner5 from "../../assets/banner-5.jpg";
import banner6 from "../../assets/banner-6.jpg";
import banner7 from "../../assets/banner-7.jpg";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const GamingBannerSlider = () => {
  useEffect(() => {
    document.title = "Home | Chill Gamer";
  }, [])
  const slides = [
    {
      image: banner4,
      title: "Top 10 Gaming Consoles of 2024...",
      description: "Discover the best gaming consoles that rule the gaming world today.",
    },
    {
      image: banner5,
      title: "5 Upcoming RPGs You Can't Miss...",
      description: "Explore the most anticipated role-playing games set to release soon.",
    },
    {
      image: banner6,
      title: "Mastering Esports Tournaments...",
      description: "Learn how to compete and excel in global esports competitions.",
    },
    {
      image: banner7,
      title: "Gaming Tips for Beginners...",
      description: "Get started with essential tips for your gaming journey.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 6000); 
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[500px]">
      {/* Slide Image */}
      <div className="absolute inset-0">
        <img
          src={slides[currentIndex].image}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Slide Content */}
      <div className="absolute inset-0 mx-2 bg-opacity-50 text-white flex flex-col justify-center items-start p-8 lg:p-16">
        <h2 className="text-4xl font-bold mb-4 text-[#30be91]"> <Typewriter
                words={[slides[currentIndex].title]} 
                loop={100} 
                cursor
                cursorStyle="|"
                typeSpeed={50}
                deleteSpeed={25}
              /></h2>
        <p className="text-xl">{slides[currentIndex].description}</p>
        <Link  to='/reviews' className="lg:mx-44 flex justify-center my-5">
        {/* <button className="btn border-none  bg-[#30beba] text-white">View More</button>  */}
        </Link>
      </div>
      {/* Navigation Buttons */}
      <div className="absolute top-1/2 transform -translate-y-1/2 left-5 cursor-pointer hidden text-base-content text-4xl">
        <BsArrowLeftCircleFill onClick={handlePrev} />
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 right-5 cursor-pointer hidden text-base-content text-4xl">
        <BsArrowRightCircleFill onClick={handleNext} />
      </div>
      {/* Dots Indicator */}
      <div className="absolute bottom-4 flex justify-center w-full">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 mx-2 rounded-full cursor-pointer ${
              index === currentIndex ? "bg-white" : "bg-gray-500"
            }`}
            onClick={() => setCurrentIndex(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default GamingBannerSlider;
