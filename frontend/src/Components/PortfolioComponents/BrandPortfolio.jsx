import { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const BrandPortfolio = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [videos, setVideos] = useState([]);
  const playerRef = useRef(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("/api/services/name/brand");
        const fetchedVideos = response.data.categories[0].videos.map(video => video.url);
        setVideos(fetchedVideos);
      } catch (error) {
        console.error("Error fetching video data", error);
      }
    };

    fetchVideos();
  }, []);

  const totalVideos = videos.length;

  const handleNext = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % totalVideos);
    setPlaying(false); // Pause video when changing
  };

  const handlePrev = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === 0 ? totalVideos - 1 : prevIndex - 1
    );
    setPlaying(false); // Pause video when changing
  };

  const handlePlayPause = () => {
    setPlaying((prevPlaying) => !prevPlaying);
  };

  const handleVideoClick = (index) => {
    setCurrentVideoIndex(index);
    setPlaying(true); // Start playing the selected video
    if (playerRef.current) {
      playerRef.current.getInternalPlayer().getVideo().requestFullscreen();
    }
  };

  return (
    <div className="items-center px-4">
      <h2 className="text-center text-3xl font-bold mb-12 mt-12 text-avidBrown shadow-lg">
        Brand Videos
      </h2>

      {/* Desktop Grid Layout */}
      <div className="hidden lg:grid grid-cols-4 gap-8 w-full mx-auto">
        {videos.map((video, index) => (
          <div key={index} className="w-full h-[400px] relative rounded-lg overflow-hidden shadow-xl transition-all duration-300 ease-in-out hover:scale-105">
            <ReactPlayer
              url={video}
              width="100%"
              height="100%"
              playing={currentVideoIndex === index && playing}
              controls={false}
              className="rounded-lg object-cover cursor-pointer"
              onClick={() => handleVideoClick(index)}
              ref={playerRef}
            />
          </div>
        ))}
      </div>

      {/* Mobile Scroll Layout */}
      <div className="block lg:hidden w-full relative">
        <div className="flex justify-center items-center relative">
          <button
            onClick={handlePrev}
            className="absolute left-2 z-10 bg-black rounded-full text-white p-2 hover:bg-gray-700 transition-all"
          >
            <ChevronLeft size={30} />
          </button>

          <div className="w-full mx-auto px-4">
            <div className="relative">
              <ReactPlayer
                url={videos[currentVideoIndex]}
                width="100%"
                height="auto"
                playing={playing}
                controls={false}
                className="rounded-lg object-cover shadow-lg"
              />
              <button
                onClick={handlePlayPause}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white rounded-full p-4 hover:bg-gray-700 hover:scale-105 transition duration-300 ease-in-out"
              >
                {playing ? 'Pause' : 'Play'}
              </button>
            </div>
            <p className="portfolio-description mt-4 text-center text-sm text-gray-600">
              Video {currentVideoIndex + 1} of {totalVideos}
            </p>
          </div>

          <button
            onClick={handleNext}
            className="absolute right-2 z-10 bg-black rounded-full text-white p-2 hover:bg-gray-700 transition-all"
          >
            <ChevronRight size={30} />
          </button>
        </div>
      </div>

      {/* View All Button */}
      <div className="flex justify-center text-center items-center mt-8">
        {/* <Link to="/AllfashionPhotos"> */}


        <Link
  to="/AllFashionPhotos"
  state={{
    
      serviceName: "Brand Fashion",
  }}
>
          <button className="border border-avidBrown rounded-full py-4 px-8 w-72 h-14 gap-2.5 hover:bg-avidBrown hover:text-white transition duration-300 ease-in-out">
            View All Brand Videos
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BrandPortfolio;





//ben work

// import { useState, useRef } from "react";
// import ReactPlayer from "react-player";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { Link } from "react-router-dom";

// const BrandPortfolio = () => {
//   const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
//   const [playing, setPlaying] = useState(false);
//   const playerRef = useRef(null); // Ref to hold the ReactPlayer instance

//   const videos = [
//     // "https://www.youtube.com/watch?v=nYIfIcYeEmo",
//     // "https://www.youtube.com/watch?v=eO51VVCpTk0",
//     // "https://www.youtube.com/watch?v=frprXs-icyY",
//     // "https://www.youtube.com/watch?v=i3C7H7iHwFo",
//     // "https://www.youtube.com/watch?v=QvlM8vAXb7U",
//     // "https://www.youtube.com/watch?v=VY17031qw3M",
//     // "https://www.youtube.com/watch?v=ti49slEH6yQ",
//     // "https://www.youtube.com/watch?v=1AGfny6EdOE",
//   ];

//   const totalVideos = videos.length;

//   const handleNext = () => {
//     setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % totalVideos);
//     setPlaying(false); // Pause video when changing
//   };

//   const handlePrev = () => {
//     setCurrentVideoIndex((prevIndex) =>
//       prevIndex === 0 ? totalVideos - 1 : prevIndex - 1
//     );
//     setPlaying(false); // Pause video when changing
//   };

//   const handlePlayPause = () => {
//     setPlaying((prevPlaying) => !prevPlaying);
//   };

//   const handleVideoClick = (index) => {
//     setCurrentVideoIndex(index);
//     setPlaying(true); // Start playing the selected video
//     // Request full screen
//     if (playerRef.current) {
//       playerRef.current.getInternalPlayer().getVideo().requestFullscreen();
//     }
//   };

//   return (
//     <div className="items-center px-4">
//       <h2 className="text-center text-2xl font-bold mb-16 mt-16">
//         Brand Videos
//       </h2>

//       {/* Desktop Grid Layout */}
//       <div className="hidden lg:grid grid-cols-4 gap-8 w-[1032px] mx-auto h--[1001.18px]">
//         {videos.map((video, index) => (
//           <div key={index} className="w-[239.28px] h-[374.03px] relative">
//             <ReactPlayer
//               url={video}
//               width="100%"
//               height="100%"
//               playing={currentVideoIndex === index && playing} // Play only if selected video and playing state is true
//               controls={false} // Hide default controls
//               className="rounded-[16px] object-cover cursor-pointer" // Added cursor-pointer for clickable
//               onClick={() => handleVideoClick(index)} // Play video in full screen on click
//               ref={playerRef} // Attach ref to the ReactPlayer
//             />
//           </div>
//         ))}
//       </div>

//       {/* Mobile Scroll Layout */}
//       <div className="block lg:hidden w-full relative">
//         <div className="flex justify-center items-center relative">
//           {/* Previous Chevron */}
//           <button
//             onClick={handlePrev}
//             className="absolute left-2 z-10 bg-black rounded-full text-white p-2"
//           >
//             <ChevronLeft size={30} />
//           </button>

//           {/* Current Video */}
//           <div className="w-full mx-auto px-4">
//             <div className="relative">
//               <ReactPlayer
//                 url={videos[currentVideoIndex]}
//                 width="100%"
//                 height="574px"
//                 playing={playing} // Controlled by play/pause state
//                 controls={false} // Hide default controls
//                 className="rounded-[16px] object-cover" // Added border radius here
//               />
//               {/* Play/Pause Button */}
//               <button
//                 onClick={handlePlayPause}
//                 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white rounded-full p-3 hover:bg-gray-700 hover:scale-105 transition duration-300 ease-in-out"
//               >
//                 {playing ? 'Pause' : 'Play'}
//               </button>
//             </div>
//             <p className="portfolio-description mt-4 text-center text-sm">
//               Video {currentVideoIndex + 1} of {totalVideos}
//             </p>
//           </div>

//           {/* Next Chevron */}
//           <button
//             onClick={handleNext}
//             className="absolute right-2 z-10 bg-black rounded-full text-white p-2"
//           >
//             <ChevronRight size={30} />
//           </button>
//         </div>
//       </div>

//       <div className="flex justify-center text-center items-center mt-8">
//         <Link to="/AllfashionPhotos">
//           <button className="border border-avidBrown rounded-full py-4 px-8 w-72 h-14 gap-2.5 hover:bg-avidBrown hover:text-white">
//             View All Brand Videos
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default BrandPortfolio;
