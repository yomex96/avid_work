import { useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { Play, X } from "lucide-react";
import ReactPlayer from "react-player/youtube";

const Landing = () => {
  const videos = [
    "https://youtu.be/5Ux3qXaeenk",
    "https://youtu.be/wtqyqFP4j78",
    "https://youtu.be/O7eJk6s6_Hc",
    "https://youtu.be/4E7MJ5WEB4c",
  ];

  const images = Object.values(assets);

  // NEW ARRAY THAT INCLUDES EACH IMAGE TWICE (original and enlarged)
  const displayImages = images.flatMap((image) => [image, image]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const playerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPlayerVisible) {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === displayImages.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [displayImages.length, isPlayerVisible]);

  const handlePlayVideo = () => {
    setIsPlaying(true);
    setIsPlayerVisible(true);
  };

  const handleVideoEnd = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === videos.length - 1 ? 0 : prevIndex + 1
    );
    setIsPlaying(false);
    setIsPlayerVisible(false);
  };

  const handleClosePlayer = () => {
    setIsPlaying(false);
    setIsPlayerVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (playerRef.current && !playerRef.current.contains(event.target)) {
        handleClosePlayer();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [playerRef]);

  useEffect(() => {
    const handleScroll = () => {
      if (isPlaying) {
        setIsPlaying(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isPlaying]);

  // CALCULATE CURRENT IMAGE PAIR INDEX
  const currentPairIndex = Math.floor(currentImageIndex / 2);

  return (
    <div className="h-full relative flex flex-col md:flex-row items-center p-4 w-full overflow-hidden">
      {/* LEFT SIDE CONTENT */}
      <div className="flex flex-col items-center md:items-start w-full md:w-3/6 h-auto md:ml-24 z-10 mb-6 md:mb-0">
        <h1 className="font-Poppins font-bold text-3xl md:text-5xl text-center md:text-left md:mr-16 mb-4">
          Capture the Magic In Every Second
        </h1>
        <p className="text-center md:text-left mx-auto mb-6 md:pr-24">
          Let's tell your story together, capturing the moments that matter most
          in a way that feels truly you.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col md:flex-row gap-4 items-center md:items-start mb-16">
          <Link to="/Booking">
            <button className="flex bg-black text-white rounded-full w-80 md:w-[153px] justify-center py-2 hover:bg-amber-900 text-center md:px-4">
              Book Now
            </button>
          </Link>
          <Link to="/Contact">
            <button className="flex bg-white border-[1px] border-amber-700 text-amber-700 hover:text-white justify-center rounded-full w-80 md:w-[153px] py-2 hover:bg-amber-900 text-center md:px-4">
              Contact Us
            </button>
          </Link>
        </div>
      </div>

      {/* RIGHT SIDE IMAGE SLIDER */}
      <div className="relative w-full md:w-2/3 h-[300px] md:h-[500px] max-w-full flex justify-center items-center">
        {/* OUTER CIRCLE */}
        <div className="absolute w-[700px] h-[700px] scale-[80%] md:scale-100 border-[60px] p-[100px] rounded-full border-avidBrown2 hidden md:block md:w-[600px] md:h-[600px] md:border-[180px] md:p-[300px]"></div>

        {/* INNER CIRCLE */}
        <div className="absolute w-[500px] h-[500px] scale-[80%] md:scale-100 border-[45px] p-[50px] rounded-full border-avidBrown2 hidden md:block md:w-[500px] md:h-[500px] md:border-[90px] md:p-[100px]"></div>

        {displayImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`slide-${index}`}
            className={`rounded-full absolute w-80 h-80 object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            } ${index % 2 !== 0 ? "transform scale-125" : ""}`} // SCALE FOR ENLARGED IMAGES
            style={{ cursor: "pointer" }}
            onClick={handlePlayVideo} // HANDLE IMAGE CLICK TO PLAY VIDEO
          />
        ))}

        {/* PLAY BUTTON */}
        {!isPlayerVisible && (
          <div
            className="absolute inset-0 flex items-center justify-center z-20"
            onClick={handlePlayVideo}
          >
            <Play className="w-16 h-16 text-white bg-black bg-opacity-50 rounded-full p-2 cursor-pointer hover:bg-opacity-75" />
          </div>
        )}

        {/* REACT VIDEO PLAYER */}
        {isPlayerVisible && (
          <div
            ref={playerRef}
            className="absolute w-full h-96 overflow-hidden flex justify-center items-center"
          >
            <ReactPlayer
              url={videos[currentImageIndex]} // PLAY CURRENT VIDEO
              playing={isPlaying}
              controls={true} // PLAY AND PAUSE CONTROL
              onEnded={handleVideoEnd} // HANDLE VIDEO END
              width="100%"
              height="100%"
              className="rounded-full"
            />

            {/* CLOSE BUTTON */}
            <div
              className="absolute top-4 right-4 text-red-500 cursor-pointer z-50 bg-white bg-opacity-70 rounded-full p-1"
              onClick={handleClosePlayer}
            >
              <X className="w-8 h-8" />
            </div>
          </div>
        )}

        {/* DOTS AND MOVING RECTANGLE */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
          {/* DOTS */}
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className={`w-2.5 h-2.5 rounded-full border border-black transition-opacity duration-300 ${
                currentPairIndex === index ? "opacity-0" : "opacity-100"
              }`}
              style={{ marginRight: index < 2 ? "25px" : "0px" }} // SPACING BETWEEN DOTS
            />
          ))}

          {/* MOVING RECTANGLE */}
          <div
            className="absolute h-2 rounded-full bg-black"
            style={{
              width: "30px", // SAME WIDTH FOR RECTANGLE
              height: "10px",
              borderRadius: "32px",
              transform: `translateX(${
                currentPairIndex === 0 ? -5 : currentPairIndex * 30
              }px)`, // TRANSLATE-X FOR FIRST DOT
              transition: "transform 0.3s ease-in-out",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;











// import { useState, useEffect, useRef } from "react";
// import { assets } from "../assets/assets";
// import { Link } from "react-router-dom";
// import { Play, X } from "lucide-react";
// import ReactPlayer from "react-player/youtube";

// const Landing = () => {
//   const videos = [
//     "https://youtu.be/5Ux3qXaeenk",
//     "https://youtu.be/wtqyqFP4j78",
//     "https://youtu.be/O7eJk6s6_Hc",
//     "https://youtu.be/4E7MJ5WEB4c"
//   ];

//   const images = Object.values(assets);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isPlayerVisible, setIsPlayerVisible] = useState(false);
//   const playerRef = useRef(null); // Create a ref for the player

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (!isPlayerVisible) {
//         setCurrentImageIndex((prevIndex) =>
//           prevIndex === images.length - 1 ? 0 : prevIndex + 1
//         );
//       }
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [images.length, isPlayerVisible]);

//   const handlePlayVideo = () => {
//     setIsPlaying(true);
//     setIsPlayerVisible(true);
//   };

//   const handleVideoEnd = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === videos.length - 1 ? 0 : prevIndex + 1
//     );
//     setIsPlaying(false);
//     setIsPlayerVisible(false);
//   };

//   const handleClosePlayer = () => {
//     setIsPlaying(false);
//     setIsPlayerVisible(false);
//   };

//   // Handle click outside the player to close it
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (playerRef.current && !playerRef.current.contains(event.target)) {
//         handleClosePlayer();
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [playerRef]);

//   return (
//     <div className="h-full relative flex flex-col md:flex-row items-center p-4 w-full overflow-hidden">
//       {/* LEFT SIDE CONTENT */}
//       <div className="flex flex-col items-center md:items-start w-full md:w-3/6 h-auto md:ml-24 z-10 mb-6 md:mb-0">
//         <h1 className="font-Poppins font-bold text-3xl md:text-5xl text-center md:text-left md:mr-16 mb-4">
//           Capture the Magic In Every Second
//         </h1>
//         <p className="text-center md:text-left mx-auto mb-6 md:pr-24">
//           Let's tell your story together, capturing the moments that matter
//           most in a way that feels truly you.
//         </p>

//         {/* BUTTONS */}
//         <div className="flex flex-col md:flex-row gap-4 items-center md:items-start mb-16">
//           <Link to="/Booking">
//             <button className="flex bg-black text-white rounded-full w-80 md:w-[153px] justify-center py-2 hover:bg-amber-900 text-center md:px-4">
//               Book Now
//             </button>
//           </Link>
//           <Link to="/Contact">
//             <button className="flex bg-white border-[1px] border-amber-700 text-amber-700 hover:text-white justify-center rounded-full w-80 md:w-[153px] py-2 hover:bg-amber-900 text-center md:px-4">
//               Contact Us
//             </button>
//           </Link>
//         </div>
//       </div>

//       {/* RIGHT SIDE IMAGE SLIDER */}
//       <div className="relative w-full md:w-2/3 h-[300px] md:h-[500px] max-w-full flex justify-center items-center">
//         {/* OUTER CIRCLE */}
//         <div className="absolute w-[700px] h-[700px] scale-[80%] md:scale-100 border-[60px] p-[100px] rounded-full border-avidBrown2 hidden md:block md:w-[600px] md:h-[600px] md:border-[180px] md:p-[300px]"></div>

//         {/* INNER CIRCLE */}
//         <div className="absolute w-[500px] h-[500px] scale-[80%] md:scale-100 border-[45px] p-[50px] rounded-full border-avidBrown2 hidden md:block md:w-[500px] md:h-[500px] md:border-[90px] md:p-[100px]"></div>

//         {images.map((image, index) => (
//           <img
//             key={index}
//             src={image}
//             alt={`slide-${index}`}
//             className={`rounded-full absolute w-80 h-80 object-cover transition-opacity duration-1000 ease-in-out ${
//               index === currentImageIndex ? "opacity-100" : "opacity-0"
//             }`}
//             style={{ cursor: "pointer" }}
//             onClick={handlePlayVideo} // Handle image click to play video
//           />
//         ))}

//         {/* Play Button */}
//         {!isPlayerVisible && (
//           <div
//             className="absolute inset-0 flex items-center justify-center z-20"
//             onClick={handlePlayVideo}
//           >
//             <Play className="w-16 h-16 text-white bg-black bg-opacity-50 rounded-full p-2 cursor-pointer hover:bg-opacity-75" />
//           </div>
//         )}

//         {/* ReactPlayer Video Player */}
//         {isPlayerVisible && (
//           <div
//             ref={playerRef} // Attach ref to this div
//             className="absolute w-full h-full md:h-full flex justify-center items-center"
//           >
//             <ReactPlayer
//               url={videos[currentImageIndex]} // Play the current video
//               playing={isPlaying}
//               controls={true} // Add play/pause controls
//               onEnded={handleVideoEnd} // Handle video end
//               width="100%"
//               height="100%"
//               className="rounded-full"
//             />

//             {/* Close Button */}
//             <div
//               className="absolute top-4 right-4 text-red-500 cursor-pointer z-50 bg-white bg-opacity-70 rounded-full p-1" // Added background and padding
//               onClick={handleClosePlayer}
//             >
//               <X className="w-8 h-8" />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Landing;
