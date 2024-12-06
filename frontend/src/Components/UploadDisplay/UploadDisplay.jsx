// import { useRef, useState } from "react";
// import ReactPlayer from "react-player";
// import { Play, Pause, X } from "lucide-react"; // Import icons from lucide-react

// const UploadDisplay = ({ currentItems }) => {
//   const videoUrls = [

//     "https://avidbucket.s3.amazonaws.com/video/1731309137487_istock-1290744826.mov",
//     "https://avidbucket.s3.amazonaws.com/video/1731309137487_istock-1290744826.mov",
//     "https://avidbucket.s3.amazonaws.com/video/1731309137487_istock-1290744826.mov",
//     "https://avidbucket.s3.amazonaws.com/video/1731309137487_istock-1290744826.mov",
//     "https://avidbucket.s3.amazonaws.com/video/1731309137487_istock-1290744826.mov",
//     "https://avidbucket.s3.amazonaws.com/video/1731309137487_istock-1290744826.mov"
//   ];

//   const playerRefs = useRef([]); // Array to store refs for each player
//   const [playing, setPlaying] = useState(Array(currentItems.length).fill(false)); // Track playing state
//   const [fullScreenVideo, setFullScreenVideo] = useState(null); // Track fullscreen mode

//   const handlePlayPause = (index) => {
//     if (fullScreenVideo !== null && fullScreenVideo !== index) {
//       // If there's another video already fullscreen, stop it before starting a new one
//       setPlaying((prev) => {
//         const newPlaying = [...prev];
//         newPlaying[fullScreenVideo] = false;
//         return newPlaying;
//       });
//     }

//     setFullScreenVideo(index); // Set the video to full screen mode
//     setPlaying((prev) => {
//       const newPlaying = [...prev];
//       newPlaying[index] = !newPlaying[index]; // Toggle playback
//       return newPlaying;
//     });
//   };

//   const handleCloseFullScreen = () => {
//     setFullScreenVideo(null); // Close full screen
//     setPlaying(Array(currentItems.length).fill(false)); // Pause all videos
//   };

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//       {currentItems.map((item, index) => (
//         <div
//           key={index}
//           className="w-[340px] pt-3 md:w-96 h-[540px] flex justify-center items-center relative group"
//         >
//           {/* Normal view for videos */}
//           <div className="w-full h-full rounded-2xl overflow-hidden transform transition-transform duration-300 hover:scale-105">
//             <ReactPlayer
//               ref={(el) => (playerRefs.current[index] = el)} // Store ref
//               url={videoUrls[index]} // Video URL
//               width="100%"
//               height="100%"
//               playing={playing[index] && fullScreenVideo === null} // Play normally if not in fullscreen
//               controls={false} // Hide default controls
//               className="rounded-[16px] object-cover" // Added border radius here
//             />
//             {/* Play button overlay */}
//             <div
//               className="absolute inset-0 flex justify-center items-center opacity-100 transition-opacity duration-300 bg-black bg-opacity-30 rounded-2xl cursor-pointer"
//               onClick={() => handlePlayPause(index)} // Play or pause
//             >
//               {playing[index] ? (
//                 <Pause className="h-12 w-12 text-white" />
//               ) : (
//                 <Play className="h-12 w-12 text-white" />
//               )}
//             </div>
//           </div>

//           {/* Fullscreen modal */}
//           {fullScreenVideo === index && (
//             <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
//               <ReactPlayer
//                 url={videoUrls[index]} // Play the same video in full screen
//                 width="80%" // Adjust to desired full-screen size
//                 height="80%"
//                 playing={playing[index]}
//                 controls={true} // Enable controls in fullscreen mode
//               />
//               <button
//                 className="absolute top-4 right-4 text-white text-3xl cursor-pointer"
//                 onClick={handleCloseFullScreen} // Close full screen
//               >
//                 <X className="h-8 w-8" />
//               </button>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default UploadDisplay;



//Ben work

import { useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Play, Pause, X } from "lucide-react"; // Import icons from lucide-react

const UploadDisplay = ({ currentItems }) => {
  const videoUrls = [
    "https://www.youtube.com/watch?v=37-UYW-0mJA",
    "https://www.youtube.com/watch?v=TXTqy2GAhOI",
    "https://www.youtube.com/watch?v=dHbU3wlHT34",
    "https://www.youtube.com/watch?v=aLIbPbVIBLg",
    "https://www.youtube.com/watch?v=0eQDOUj6CPc",
    "https://www.youtube.com/watch?v=rQzwzrSNOe4",
    "https://www.youtube.com/watch?v=Em0Rt0rzY9g",
    "https://www.youtube.com/watch?v=7JJYtW-W0HY",
    
  ];

  const playerRefs = useRef([]); // Array to store refs for each player
  const [playing, setPlaying] = useState(Array(currentItems.length).fill(false)); // Track playing state
  const [fullScreenVideo, setFullScreenVideo] = useState(null); // Track fullscreen mode

  const handlePlayPause = (index) => {
    if (fullScreenVideo !== null && fullScreenVideo !== index) {
      // If there's another video already fullscreen, stop it before starting a new one
      setPlaying((prev) => {
        const newPlaying = [...prev];
        newPlaying[fullScreenVideo] = false;
        return newPlaying;
      });
    }

    setFullScreenVideo(index); // Set the video to full screen mode
    setPlaying((prev) => {
      const newPlaying = [...prev];
      newPlaying[index] = !newPlaying[index]; // Toggle playback
      return newPlaying;
    });
  };

  const handleCloseFullScreen = () => {
    setFullScreenVideo(null); // Close full screen
    setPlaying(Array(currentItems.length).fill(false)); // Pause all videos
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {currentItems.map((item, index) => (
        <div
          key={index}
          className="w-[340px] pt-3 md:w-96 h-[540px] flex justify-center items-center relative group"
        >
          {/* Normal view for videos */}
          <div className="w-full h-full rounded-2xl overflow-hidden transform transition-transform duration-300 hover:scale-105">
            <ReactPlayer
              ref={(el) => (playerRefs.current[index] = el)} // Store ref
              url={videoUrls[index]} // Video URL
              width="100%"
              height="100%"
              playing={playing[index] && fullScreenVideo === null} // Play normally if not in fullscreen
              controls={false} // Hide default controls
              className="rounded-[16px] object-cover" // Added border radius here
            />
            {/* Play button overlay */}
            <div
              className="absolute inset-0 flex justify-center items-center opacity-100 transition-opacity duration-300 bg-black bg-opacity-30 rounded-2xl cursor-pointer"
              onClick={() => handlePlayPause(index)} // Play or pause
            >
              {playing[index] ? (
                <Pause className="h-12 w-12 text-white" />
              ) : (
                <Play className="h-12 w-12 text-white" />
              )}
            </div>
          </div>

          {/* Fullscreen modal */}
          {fullScreenVideo === index && (
            <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
              <ReactPlayer
                url={videoUrls[index]} // Play the same video in full screen
                width="80%" // Adjust to desired full-screen size
                height="80%"
                playing={playing[index]}
                controls={true} // Enable controls in fullscreen mode
              />
              <button
                className="absolute top-4 right-4 text-white text-3xl cursor-pointer"
                onClick={handleCloseFullScreen} // Close full screen
              >
                <X className="h-8 w-8" />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UploadDisplay;
