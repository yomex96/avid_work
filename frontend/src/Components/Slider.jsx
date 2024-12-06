// import { useEffect, useRef } from 'react';
// import { mySlider } from '../assets/assets';

// const Slider = () => {
//   const sliderRef = useRef(null);

//   useEffect(() => {
//     const slider = sliderRef.current;
//     let scrollInterval;

//     const startScrolling = () => {
//       scrollInterval = setInterval(() => {
//         slider.scrollLeft += 1;
//         if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
//           slider.scrollLeft = 0;
//         }
//       }, 10); // SPEED
//     };

//     startScrolling();

//     return () => clearInterval(scrollInterval); // CLEANUP ON UNMOUNT
//   }, []);

//   return (
//     <div className="w-full h-[500px] overflow-hidden mb-10" ref={sliderRef}>
//       <div className="flex gap-2.5">
//         {Object.values(mySlider).map((image, index) => (
//           <img
//             src={image}
//             alt={`slider-${index}`}
//             key={index}
//             className="w-[384px] h-[600px] mx-2 flex-shrink-0 mr-2"
//           />
//         ))}
      
//         {Object.values(mySlider).map((image, index) => (
//           <img
//             src={image}
//             alt={`slider-duplicate-${index}`}
//             key={`duplicate-${index}`}
//             className="w-80 h-[624px] flex-shrink-0 mr-2"
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Slider;



//my work 






// import { useEffect, useState, useRef } from 'react';
// import axios from 'axios';

// const Slider = () => {
//   const [videos, setVideos] = useState([]);
//   const sliderRef = useRef(null);
//   const videoRefs = useRef([]); // To keep track of each video element for control
//   const scrollIntervalRef = useRef(null); // To store the scroll interval ID
//   const idleTimeoutRef = useRef(null); // To store the idle timeout when pausing the scroll

//   // Function to start auto-scrolling
//   const startScrolling = () => {
//     const slider = sliderRef.current;
//     scrollIntervalRef.current = setInterval(() => {
//       slider.scrollLeft += 1; // Move slider by 1px per interval
//       if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
//         slider.scrollLeft = 0; // Reset scroll position when it reaches the end
//       }
//     }, 10000); // Adjust speed by changing the interval
//   };

//   useEffect(() => {
//     // Fetch videos from API
//     const fetchVideos = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/features');
//         setVideos(response.data.videos); // Assuming the API returns an array of videos
//       } catch (error) {
//         console.error('Error fetching videos:', error);
//       }
//     };

//     fetchVideos();
    
//     // Start scrolling initially
//     startScrolling();

//     // Cleanup on unmount
//     return () => clearInterval(scrollIntervalRef.current);
//   }, [videos]);

//   // Function to handle manual video play/pause on click
//   const handleVideoClick = (index) => {
//     const clickedVideo = videoRefs.current[index];

//     // Pause all other videos
//     videoRefs.current.forEach((video, idx) => {
//       if (video !== clickedVideo) {
//         video.pause(); // Pause all other videos
//       }
//     });

//     // Pause scrolling when a video is clicked
//     clearInterval(scrollIntervalRef.current);

//     // Toggle the clicked video (play/pause)
//     if (clickedVideo.paused) {
//       clickedVideo.play(); // Play the clicked video
//     } else {
//       clickedVideo.pause(); // Pause the clicked video
//     }

//     // After 3 seconds of idle time, resume scrolling
//     if (idleTimeoutRef.current) {
//       clearTimeout(idleTimeoutRef.current);
//     }

//     idleTimeoutRef.current = setTimeout(() => {
//       startScrolling(); // Restart the scroll after 3 seconds of idle time
//     }, 3000); // 3 seconds delay before resuming scrolling
//   };

//   // Function to handle when the video ends
//   const handleVideoEnd = () => {
//     // Resume scrolling immediately once the video ends
//     startScrolling();
//   };

//   return (
//     <div className="w-full h-[500px] overflow-hidden mb-10 relative">
//       {/* Left Button to Scroll */}
//       <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
//         <button
//           onClick={() => (sliderRef.current.scrollLeft -= 200)} // Scroll left by 200px
//           className="bg-black text-white p-4 rounded-full"
//         >
//           &lt;
//         </button>
//       </div>

//       {/* Right Button to Scroll */}
//       <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
//         <button
//           onClick={() => (sliderRef.current.scrollLeft += 200)} // Scroll right by 200px
//           className="bg-black text-white p-4 rounded-full"
//         >
//           &gt;
//         </button>
//       </div>

//       {/* Slider Container with hidden horizontal scrollbar */}
//       <div
//         className="flex gap-4 w-full h-[500px] overflow-x-auto snap-x scrollbar-hidden"
//         ref={sliderRef}
//         style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // For modern browsers
//       >
//         {videos.map((video, index) => (
//           <div key={index} className="relative w-[384px] h-[600px] flex-shrink-0">
//             {/* Play Button Overlay */}
//             <div
//               className={`absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 
//                 ${videoRefs.current[index] && !videoRefs.current[index].paused ? 'hidden' : 'block'}`}
//             >
//               <button
//                 onClick={() => handleVideoClick(index)} // Trigger play/pause
//                 className="text-white text-4xl"
//               >
//                 ▶
//               </button>
//             </div>

//             {/* Video */}
//             <video
//               ref={(el) => (videoRefs.current[index] = el)} // Store each video element in the refs array
//               controls
//               onClick={() => handleVideoClick(index)} // Allow pause/play on click
//               onEnded={handleVideoEnd} // When video ends, resume scrolling immediately
//               className="w-full h-full object-cover rounded-xl shadow-lg transition-all duration-200"
//             >
//               <source src={video.url} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Slider;



import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const Slider = () => {
  const [videos, setVideos] = useState([]);
  const sliderRef = useRef(null);
  const videoRefs = useRef([]); 
  const scrollIntervalRef = useRef(null);

  // Function to start auto-scrolling
  const startScrolling = () => {
    // Ensure no existing interval is running
    stopScrolling();

    const slider = sliderRef.current;
    scrollIntervalRef.current = setInterval(() => {
      slider.scrollLeft += 2; // Move slider by 2px per interval
      if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
        slider.scrollLeft = 0; // Reset scroll position when it reaches the end
      }
    }, 50); // Adjust speed by changing the interval
  };

  // Function to stop scrolling
  const stopScrolling = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  // useEffect(() => {
  //   // Fetch videos from API
  //   const fetchVideos = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/api/features');
  //       setVideos(response.data.videos);
  //     } catch (error) {
  //       console.error('Error fetching videos:', error);
  //     }
  //   };

  //   fetchVideos();


  //   // Start scrolling initially
  //   startScrolling();

  //   // Cleanup on unmount
  //   return () => {
  //     stopScrolling();
  //   };
  // }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const url =
          window.location.hostname === "localhost"
            ? "http://localhost:5000/api/features"
            : "/api/features";
        const response = await axios.get(url);
        setVideos(response.data.videos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
  
    fetchVideos();
  
    // Start scrolling initially
    startScrolling();
  
    // Cleanup on unmount
    return () => {
      stopScrolling();
    };
  }, []);
  

  // Function to handle manual video play/pause
  const toggleVideoPlayback = (index) => {
    const video = videoRefs.current[index];
    
    if (video.paused) {
      // Pause all other videos
      videoRefs.current.forEach((v, idx) => {
        if (idx !== index) {
          v.pause();
        }
      });
      
      // Play the clicked video
      video.play();
      
      // Completely stop scrolling when a video plays
      stopScrolling();
    } else {
      // Pause the video
      video.pause();
      
      // Resume scrolling
      startScrolling();
    }
  };

  return (
    <div className="w-full h-[500px] overflow-hidden mb-10 relative">
      {/* Left Button to Scroll */}
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
        <button
          onClick={() => {
            stopScrolling();
            sliderRef.current.scrollLeft -= 200;
            startScrolling();
          }}
          className="bg-black text-white p-4 rounded-full"
        >
          &lt;
        </button>
      </div>

      {/* Right Button to Scroll */}
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
        <button
          onClick={() => {
            stopScrolling();
            sliderRef.current.scrollLeft += 200;
            startScrolling();
          }}
          className="bg-black text-white p-4 rounded-full"
        >
          &gt;
        </button>
      </div>

      {/* Slider Container with hidden horizontal scrollbar */}
      <div
        className="flex gap-4 w-full h-[500px] overflow-x-auto snap-x scrollbar-hidden"
        ref={sliderRef}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {videos.map((video, index) => (
          <div key={index} className="relative w-[384px] h-[600px] flex-shrink-0">
            {/* Play/Pause Button Overlay */}
            <div
              className={`absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 
                ${videoRefs.current[index] && !videoRefs.current[index].paused ? 'hidden' : 'block'}`}
              onClick={() => toggleVideoPlayback(index)}
            >
              <button
                className="text-white text-4xl"
              >
                ▶
              </button>
            </div>

            {/* Video */}
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              onClick={() => toggleVideoPlayback(index)}
              onEnded={() => {
                // Automatically resume scrolling when a video ends
                startScrolling();
              }}
              className="w-full h-full object-cover rounded-xl shadow-lg transition-all duration-200"
            >
              <source src={video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;


// PREFER THIS BUT SLIDER WONT PAUSE WHEN PLAYING A VIDEO

// import { useEffect, useState, useRef } from 'react';
// import axios from 'axios';

// const Slider = () => {
//   const [videos, setVideos] = useState([]);
//   const sliderRef = useRef(null);
//   const videoRefs = useRef([]); // To keep track of each video element for control
//   const scrollIntervalRef = useRef(null); // To store the scroll interval ID
//   const idleTimeoutRef = useRef(null); // To store the idle timeout when pausing the scroll

//   // Function to start auto-scrolling
//   const startScrolling = () => {
//     const slider = sliderRef.current;
//     scrollIntervalRef.current = setInterval(() => {
//       slider.scrollLeft += 2; // Move slider by 1px per interval
//       if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
//         slider.scrollLeft = 0; // Reset scroll position when it reaches the end
//       }
//     }, 100); // Adjust speed by changing the interval
//   };

//   useEffect(() => {
//     // Fetch videos from API
//     const fetchVideos = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/features');
//         setVideos(response.data.videos); // Assuming the API returns an array of videos
//       } catch (error) {
//         console.error('Error fetching videos:', error);
//       }
//     };

//     fetchVideos();
    
//     // Start scrolling initially only if no video is playing
//     startScrolling();

//     // Cleanup on unmount
//     return () => clearInterval(scrollIntervalRef.current);
//   }, [videos]);

//   // Function to handle manual video play/pause on click
//   const handleVideoClick = (index) => {
//     const clickedVideo = videoRefs.current[index];

//     // Pause all other videos
//     videoRefs.current.forEach((video, idx) => {
//       if (video !== clickedVideo) {
//         video.pause(); // Pause all other videos
//       }
//     });

//     // Pause scrolling when a video is clicked
//     clearInterval(scrollIntervalRef.current);

//     // Toggle the clicked video (play/pause)
//     if (clickedVideo.paused) {
//       clickedVideo.play(); // Play the clicked video
//     } else {
//       clickedVideo.pause(); // Pause the clicked video
//     }

//     // After 3 seconds of idle time, resume scrolling if no video is playing
//     if (idleTimeoutRef.current) {
//       clearTimeout(idleTimeoutRef.current);
//     }

//     idleTimeoutRef.current = setTimeout(() => {
//       // Check if any video is playing; if not, start scrolling
//       if (videoRefs.current.every(video => video.paused)) {
//         startScrolling(); // Resume the scroll after idle time
//       }
//     }, 3000); // 3 seconds delay before resuming scrolling
//   };

//   // Function to handle when the video ends
//   const handleVideoEnd = () => {
//     // Resume scrolling immediately once the video ends
//     startScrolling();
//   };

//   return (
//     <div className="w-full h-[500px] overflow-hidden mb-10 relative">
//       {/* Left Button to Scroll */}
//       <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
//         <button
//           onClick={() => (sliderRef.current.scrollLeft -= 200)} // Scroll left by 200px
//           className="bg-black text-white p-4 rounded-full"
//         >
//           &lt;
//         </button>
//       </div>

//       {/* Right Button to Scroll */}
//       <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
//         <button
//           onClick={() => (sliderRef.current.scrollLeft += 200)} // Scroll right by 200px
//           className="bg-black text-white p-4 rounded-full"
//         >
//           &gt;
//         </button>
//       </div>

//       {/* Slider Container with hidden horizontal scrollbar */}
//       <div
//         className="flex gap-4 w-full h-[500px] overflow-x-auto snap-x scrollbar-hidden"
//         ref={sliderRef}
//         style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // For modern browsers
//       >
//         {videos.map((video, index) => (
//           <div key={index} className="relative w-[384px] h-[600px] flex-shrink-0">
//             {/* Play Button Overlay */}
//             <div
//               className={`absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 
//                 ${videoRefs.current[index] && !videoRefs.current[index].paused ? 'hidden' : 'block'}`}
//             >
//               <button
//                 onClick={() => handleVideoClick(index)} // Trigger play/pause
//                 className="text-white text-4xl"
//               >
//                 ▶
//               </button>
//             </div>

//             {/* Video */}
//             <video
//               ref={(el) => (videoRefs.current[index] = el)} // Store each video element in the refs array
//               controls
//               onClick={() => handleVideoClick(index)} // Allow pause/play on click
//               onEnded={handleVideoEnd} // When video ends, resume scrolling immediately
//               className="w-full h-full object-cover rounded-xl shadow-lg transition-all duration-200"
//             >
//               <source src={video.url} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Slider;



// import { useEffect, useState, useRef } from 'react';
// import axios from 'axios';

// const Slider = () => {
//   const [videos, setVideos] = useState([]);
//   const sliderRef = useRef(null);
//   const videoRefs = useRef([]); // To keep track of each video element for control
//   const scrollIntervalRef = useRef(null); // To store the scroll interval ID

//   useEffect(() => {
//     // Fetch videos from API
//     const fetchVideos = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/features');
//         setVideos(response.data.videos); // Assuming the API returns an array of videos
//       } catch (error) {
//         console.error('Error fetching videos:', error);
//       }
//     };

//     fetchVideos();
//   }, []);

//   useEffect(() => {
//     const slider = sliderRef.current;

//     // Function to start auto-scrolling
//     const startScrolling = () => {
//       scrollIntervalRef.current = setInterval(() => {
//         slider.scrollLeft += 1; // Move slider by 1px per interval
//         if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
//           slider.scrollLeft = 0; // Reset scroll position when it reaches the end
//         }
//       }, 10); // Adjust speed by changing the interval
//     };

//     // Start scrolling initially
//     startScrolling();

//     // Cleanup on unmount
//     return () => clearInterval(scrollIntervalRef.current);
//   }, [videos]);

//   // Function to check the video that is in view and play it
//   const checkAndPlayVideo = () => {
//     const slider = sliderRef.current;
//     const sliderLeft = slider.scrollLeft;
//     const sliderWidth = slider.offsetWidth;

//     videoRefs.current.forEach((video, index) => {
//       const videoLeft = video.offsetLeft;
//       const videoWidth = video.offsetWidth;

//       // Check if the video is within the visible area of the slider
//       if (videoLeft >= sliderLeft && videoLeft + videoWidth <= sliderLeft + sliderWidth) {
//         if (video.paused) {
//           video.play(); // Play video if it's in view and paused
//         }
//       } else {
//         if (!video.paused) {
//           video.pause(); // Pause video if it's out of view
//         }
//       }
//     });
//   };

//   // Function to handle when the video ends
//   const handleVideoEnd = () => {
//     // Do not stop the slider when video ends, just check and play next in view
//     checkAndPlayVideo();
//   };

//   // Function to handle manual video play on click
//   const handleVideoClick = (index) => {
//     const video = videoRefs.current[index];
//     if (video.paused) {
//       video.play();
//     } else {
//       video.pause();
//     }
//   };

//   // Watch for the scroll event to play/pause videos based on visibility
//   useEffect(() => {
//     const slider = sliderRef.current;

//     const onScroll = () => {
//       checkAndPlayVideo();
//     };

//     slider.addEventListener('scroll', onScroll);

//     return () => {
//       slider.removeEventListener('scroll', onScroll);
//     };
//   }, []);

//   return (
//     <div className="w-full h-[500px] overflow-hidden mb-10 relative">
//       {/* Left Button to Scroll */}
//       <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
//         <button
//           onClick={() => (sliderRef.current.scrollLeft -= 200)} // Scroll left by 200px
//           className="bg-black text-white p-4 rounded-full"
//         >
//           &lt;
//         </button>
//       </div>

//       {/* Right Button to Scroll */}
//       <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
//         <button
//           onClick={() => (sliderRef.current.scrollLeft += 200)} // Scroll right by 200px
//           className="bg-black text-white p-4 rounded-full"
//         >
//           &gt;
//         </button>
//       </div>

//       {/* Slider Container with hidden horizontal scrollbar */}
//       <div
//         className="flex gap-4 w-full h-[500px] overflow-x-auto snap-x scrollbar-hidden"
//         ref={sliderRef}
//         style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // For modern browsers
//       >
//         {videos.map((video, index) => (
//           <div key={index} className="relative w-[384px] h-[600px] flex-shrink-0">
//             {/* Play Button Overlay */}
//             <div 
//               className={`absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 
//                 ${videoRefs.current[index] && !videoRefs.current[index].paused ? 'hidden' : 'block'}`}
//             >
//               <button
//                 onClick={() => handleVideoClick(index)} // Trigger play/pause
//                 className="text-white text-4xl"
//               >
//                 ▶
//               </button>
//             </div>

//             {/* Video */}
//             <video
//               ref={(el) => (videoRefs.current[index] = el)} // Store each video element in the refs array
//               controls
//               onClick={() => handleVideoClick(index)} // Allow pause/play on click
//               onEnded={handleVideoEnd} // When video ends, resume checking and playing next in view
//               className="w-full h-full object-cover rounded-xl shadow-lg transition-all duration-200"
//             >
//               <source src={video.url} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Slider;


