import { useState } from "react";
import { bestShots } from "../assets/assets.js";
import ViewAllButton from "./ViewAllButton.jsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedUnderline from "./AnimatedUnderline.jsx";

const BestShots = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = Object.values(bestShots).length;

  const handleScroll = (direction) => {
    if (direction === "left") {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    } else {
      setCurrentIndex((prev) => Math.min(prev + 1, totalImages - 1));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 md:px-10 lg:px-20">
      
      <div className="flex flex-col items-center text-center mb-6">
<AnimatedUnderline>
<h1 className="font-bold text-2xl md:text-3xl">Best Shots</h1>
</AnimatedUnderline>
        <p className="w-full md:w-[588px]">
        Explore our curated collection of unforgettable moments. Each image tells a story, capturing the essence of emotion, beauty and celebrations. From vibrant events, breathtaking landscapes to portraits that brings out the magic in the smallest details. These shots represent the heart of our craft.
        </p>
      </div>

      {/* Mobile View: Image Scroll Section with Chevron and Dots */}
      <div className="block md:hidden relative w-full overflow-hidden">
        <button
          onClick={() => handleScroll("left")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
          disabled={currentIndex === 0}
        >
          <ChevronLeft
            size={36}
            className="bg-black text-white border rounded-full"
          />
        </button>

        <div className="flex justify-center">
          <img
            src={Object.values(bestShots)[currentIndex]}
            alt={`best shot ${currentIndex + 1}`}
            className="object-cover rounded-md w-[450px] h-[500px]  transition-transform transform hover:scale-105" // Updated sizes
          />
        </div>

        <button
          onClick={() => handleScroll("right")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
          disabled={currentIndex === totalImages - 1}
        >
          <ChevronRight
            size={36}
            className="bg-black text-white border rounded-full"
          />
        </button>
      </div>

      {/* Mobile View: Dots Indicator */}
      <div className="flex justify-center mt-4 md:hidden">
        {Array.from({ length: totalImages }).map((_, index) => (
          <div
            key={index}
            className={`h-2 w-6 mx-1 rounded-md ${
              currentIndex === index ? "bg-black" : "bg-gray-300"
            } transition-all duration-300`}
            style={{
              transform: currentIndex === index ? "scale(1.2)" : "scale(1)",
            }}
          />
        ))}
      </div>

      {/* Desktop View: Row of Images */}
      <div className="hidden md:flex justify-center flex-wrap gap-4 mt-6">
        {Object.values(bestShots).map((shot, index) => (
          <img
            key={index}
            src={shot}
            alt={`best shot ${index + 1}`}
            className="object-cover rounded-md w-[350px] h-[500px] transition-transform transform hover:scale-105" // Updated sizes
          />
        ))}
      </div>

      {/* View All Button Section */}
      <div className="mt-6">
        <Link to="/Portfolio">
        <ViewAllButton />
        </Link>
      </div>
    </div>
  );
};

export default BestShots;
