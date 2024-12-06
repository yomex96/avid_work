



import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { servicesImage } from "../assets/assets"; // Import servicesImage
import ViewAllButton from "./ViewAllButton";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import Chevron icons
import AnimatedUnderline from "./AnimatedUnderline";

const OurServices = () => {
  // Using an array of states for hovering and leaving
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [leavingIndex, setLeavingIndex] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); // State for the current image index

  const navigate = useNavigate(); // Initialize useNavigate

  // Image data with titles and descriptions
  const serviceItems = [
    {
      title: "Lifestyle Fashion",
      image: servicesImage.avid1,
      description:
        "We capture natural moments that tell authentic stories, perfect for sharing with ones or your online audience. Each photo we take is crafted with expertise to turn your moments into lasting memories.",
    },
    {
      title: "Brand Fashion",
      image: servicesImage.avid5,
      description:
        "Showcasing your brand, products and authentic stories! We work closely with you to capture images that reflect your brand’s personality to attract and engage your audience. ",
    },
    {
      title: "Prewedding Fashion",
      image: servicesImage.avid6,
      description:
        "This  is all about celebrating the journey of love before the big day. Our pre-wedding sessions are crafted to showcase your relationship, blending natural moments with beautiful backdrops to tell your love story. From intimate settings to scenic locations, we capture candid, heartfelt moments that serve as timeless memories of this exciting chapter in your life.",
    },
  ];

  // Functions to navigate images
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? serviceItems.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === serviceItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 md:px-0">
      {/* Title Section */}
<AnimatedUnderline>
<h1 className="font-bold text-2xl md:text-3xl">Our Services</h1>
</AnimatedUnderline>

      <div className="w-full md:w-[1450px] mt-4 md:px-72 text-center mb-6">
        <p>
          At Avid Studio, we offer a wide range of professional photography
          services tailored to meet your needs. Whether you’re looking to
          capture life’s special milestones or elevate your brand, we’ve got you
          covered.
        </p>
        <br />
        
      </div>

      {/* Images Display */}
      <div className="relative w-full md:w-[1200px] flex justify-center gap-4">
        {/* Mobile View - Show only one image with navigation */}
        <div className="md:hidden">
          <div className="relative w-full h-[500px]">
            <img
              src={serviceItems[currentIndex].image}
              alt={serviceItems[currentIndex].title}
              className="object-cover rounded-lg w-full h-full transition-all duration-300 ease-in-out"
              onClick={() => navigate("/AllFashionPhotos")} // Navigate on click
            />
            {/* TEXT OVERLAY */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="bg-black bg-opacity-50 p-2 rounded-t-lg">
                <h2 className="font-bold text-2xl px-4 text-white mb-1">
                  {serviceItems[currentIndex].title}
                </h2>
                <p className="text-sm text-left text-white px-4">
                  {serviceItems[currentIndex].description}
                </p>
              </div>
            </div>
            {/* Chevron Icons for Mobile Navigation */}
            <div className="bg-black rounded-full absolute top-1/2 left-0 transform -translate-y-1/2">
              <ChevronLeft
                onClick={handlePrev}
                className="text-white cursor-pointer"
                size={40}
              />
            </div>
            <div className="bg-black rounded-full absolute top-1/2 right-0 transform -translate-y-1/2">
              <ChevronRight
                onClick={handleNext}
                className="text-white cursor-pointer"
                size={40}
              />
            </div>
          </div>
        </div>

        {/* Desktop View - Show all images in a row */}
        <div className="hidden md:flex justify-center gap-4">
          {serviceItems.map((item, index) => (
            <div
              key={index}
              className="relative w-[350px] h-[500px]"
              onMouseEnter={() => {
                setHoveredIndex(index);
                setLeavingIndex(null); // Reset leaving index
              }}
              onMouseLeave={() => {
                setLeavingIndex(index); // Set leaving index on mouse leave
                setTimeout(() => {
                  if (leavingIndex === index) {
                    setHoveredIndex(null); // Reset hovered index after 1 second
                  }
                }, 1000); // Delay for returning to original state
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                className={`object-cover cursor-pointer rounded-lg w-full h-full transition-all duration-300 ease-in-out ${
                  hoveredIndex === index
                    ? "brightness-75" // Dim on hover
                    : leavingIndex === index
                    ? "brightness-40" // Dim further on leave
                    : "brightness-100" // Original brightness
                }`}
                onClick={() => navigate("/AllFashionPhotos")} // Navigate on click
              />
              {/* TEXT OVERLAY */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="bg-black bg-opacity-50 h-60 px-2 rounded-t-lg">
                  <h2 className="font-bold text-2xl px-4 text-white mb-1">
                    {item.title}
                  </h2>
                  <p className="text-sm text-left text-white px-4">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Link to="/Services">
        <ViewAllButton />
      </Link>
    </div>
  );
};

export default OurServices;
