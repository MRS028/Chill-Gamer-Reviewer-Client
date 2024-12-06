import React, { useState, useEffect } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import banner1 from "../../assets/banner-1.jpg";
import banner2 from "../../assets/banner-2.jpg";
import banner4 from "../../assets/banner-4.jpg";
import banner5 from "../../assets/banner-5.jpg";
import banner6 from "../../assets/banner-6.jpg";

const BannerSlider = () => {
  const slides = [banner2, banner1, banner4,banner6,banner5];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds
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
      <div className="absolute inset-0">
        <img
          src={slides[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 left-5 cursor-pointer text-white text-4xl">
        <BsArrowLeftCircleFill onClick={handlePrev} />
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 right-5 cursor-pointer text-white text-4xl">
        <BsArrowRightCircleFill onClick={handleNext} />
      </div>
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

export default BannerSlider;
