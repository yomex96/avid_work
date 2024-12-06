
// import BrandPortfolio from "../Components/PortfolioComponents/BrandPortfolio"
// import LifeStylePortfolio from "../Components/PortfolioComponents/LifeStylePortfolio"
// import PreWeddingPortfolio from "../Components/PortfolioComponents/PreWeddingPortfolio"
// import Footer from "../Components/Footer"
// import LineDiv from "../Components/LineDiv"

// const Portfolio = () => {
//   return (
//     <div className="w-full overflow-x-hidden">
//       <div className="flex justify-center mx-auto px-6 pt-20">
//       <h2 className=" font-bold text-3xl">Portfolio</h2>
//       </div>
//         <PreWeddingPortfolio />
//         <LineDiv />
//         <BrandPortfolio />
//         <LineDiv />
//         <LifeStylePortfolio />
//         <Footer />
//     </div>
//   )
// }

// export default Portfolio


import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Footer from "../Components/Footer";
import LineDiv from "../Components/LineDiv";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Portfolio = () => {
  const [services, setServices] = useState([]);
  const [videoStates, setVideoStates] = useState({});
  const [loading, setLoading] = useState(true); // Loading state for videos
  const [isBuffering, setIsBuffering] = useState(false); // Buffering state
  const playerRef = useRef(null);

  const fetchServices = async () => {
    try {
      const url =
        window.location.hostname === "localhost"
          ? "http://localhost:5000/api/services/media-services"
          : "/api/services/media-services";

      const response = await axios.get(url);
      setServices(response.data.mediaServices);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (services.length > 0) {
      const initialStates = services.reduce((acc, service) => {
        if (service?.categories && service.categories[0]?.videos?.length > 0) {
          acc[service._id] = {
            currentVideoIndex: 0,
            playing: false, // Default to not playing
          };
        }
        return acc;
      }, {});

      setVideoStates((prevState) => ({
        ...prevState,
        ...initialStates,
      }));
    }
  }, [services]);

  const handleNext = (serviceId) => {
    setVideoStates((prevState) => {
      const currentIndex = prevState[serviceId]?.currentVideoIndex || 0;
      const nextIndex =
        (currentIndex + 1) %
        services.find((service) => service._id === serviceId).categories[0].videos.length;
      return {
        ...prevState,
        [serviceId]: {
          currentVideoIndex: nextIndex,
          playing: true,
        },
      };
    });
  };

  const handlePrev = (serviceId) => {
    setVideoStates((prevState) => {
      const currentIndex = prevState[serviceId]?.currentVideoIndex || 0;
      const prevIndex =
        currentIndex === 0
          ? services.find((service) => service._id === serviceId).categories[0].videos.length - 1
          : currentIndex - 1;
      return {
        ...prevState,
        [serviceId]: {
          currentVideoIndex: prevIndex,
          playing: true,
        },
      };
    });
  };

  const handlePlayPause = (serviceId) => {
    setVideoStates((prevState) => ({
      ...prevState,
      [serviceId]: {
        ...prevState[serviceId],
        playing: !prevState[serviceId]?.playing,
      },
    }));
  };

  const handleVideoClick = (serviceId, index) => {
    setVideoStates((prevState) => ({
      ...prevState,
      [serviceId]: {
        currentVideoIndex: index,
        playing: true,
      },
    }));
    if (playerRef.current) {
      playerRef.current.getInternalPlayer().muted = false; // Ensure unmuted when clicked
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="w-full overflow-x-hidden">
      <div className="flex justify-center mx-auto px-6 pt-20">
        <h2 className="font-bold text-3xl">Portfolio</h2>
      </div>

      <div className="flex justify-center items-center flex-col mt-6">
        {services.map((service) => (
          <div key={service._id} className="w-full max-w-4xl mb-10 flex flex-col items-center text-center">
            <h3 className="font-bold text-xl mb-4">{service.name}</h3>

            {service.categories && service.categories[0]?.videos?.length > 0 && (
              <div className="w-full mx-auto mt-12">
                {/* Desktop Layout */}
                <div className="hidden lg:grid grid-cols-4 gap-8 w-full mx-auto">
                  {service.categories[0].videos.map((video, index) => (
                    <div
                      key={index}
                      className="w-full h-[400px] relative rounded-lg overflow-hidden shadow-2xl transition-all duration-300 ease-in-out hover:scale-105"
                    >
                      <ReactPlayer
                        url={video.url}
                        width="100%"
                        height="100%"
                        playing={
                          videoStates[service._id]?.currentVideoIndex === index &&
                          videoStates[service._id]?.playing
                        }
                        controls={false}
                        className="rounded-lg object-cover cursor-pointer"
                        onClick={() => handleVideoClick(service._id, index)}
                        preload="auto"
                        ref={playerRef}
                      />
                    </div>
                  ))}
                </div>

                {/* Mobile Layout */}
                <div className="block lg:hidden w-full relative">
                  <div className="flex justify-center items-center relative">
                    <button
                      onClick={() => handlePrev(service._id)}
                      className="absolute left-2 z-10 bg-black rounded-full text-white p-2 hover:bg-gray-700 transition-all"
                    >
                      <ChevronLeft size={30} />
                    </button>

                    <div className="w-full mx-auto px-4">
                      <div className="relative">
                        <ReactPlayer
                          url={service.categories[0].videos[videoStates[service._id]?.currentVideoIndex]?.url}
                          width="100%"
                          height="auto"
                          playing={videoStates[service._id]?.playing}
                          controls={false}
                          className="rounded-lg object-cover shadow-lg"
                          preload="auto"
                          onBuffer={() => setIsBuffering(true)}
                          onBufferEnd={() => setIsBuffering(false)}
                          ref={playerRef}
                        />
                        {isBuffering && (
                          <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                            <div className="loader"></div>
                          </div>
                        )}
                        <button
                          onClick={() => handlePlayPause(service._id)}
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white rounded-full p-4 hover:bg-gray-700 transition duration-300 ease-in-out"
                        >
                          {videoStates[service._id]?.playing ? "Pause" : "Play"}
                        </button>
                      </div>
                      <p className="portfolio-description mt-4 text-center text-sm text-gray-600">
                        Video {videoStates[service._id]?.currentVideoIndex + 1} of{" "}
                        {service.categories[0].videos.length}
                      </p>
                    </div>

                    <button
                      onClick={() => handleNext(service._id)}
                      className="absolute right-2 z-10 bg-black rounded-full text-white p-2 hover:bg-gray-700 transition-all"
                    >
                      <ChevronRight size={30} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-center items-center mb-6">
              <Link
                to="/AllFashionPhotos"
                state={{
                  serviceName: service.name,
                }}
              >
                <button className="border mt-8 border-avidBrown rounded-full py-4 px-8 w-72 h-14 gap-2.5 hover:bg-avidBrown hover:text-white transition duration-300 ease-in-out">
                  View All {service.name}
                </button>
              </Link>
            </div>
            <LineDiv />
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Portfolio;



// back up good


// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import Footer from "../Components/Footer";
// import LineDiv from "../Components/LineDiv";
// import { Link } from "react-router-dom";
// import ReactPlayer from "react-player";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const Portfolio = () => {
//   const [services, setServices] = useState([]);
//   const [videoStates, setVideoStates] = useState({});
//   const [loading, setLoading] = useState(true); // Loading state for videos
//   const [isBuffering, setIsBuffering] = useState(false); // Buffering state
//   const playerRef = useRef(null);

//   const fetchServices = async () => {
//     try {
//       const url =
//         window.location.hostname === "localhost"
//           ? "http://localhost:5000/api/services/media-services"
//           : "/api/services/media-services";

//       const response = await axios.get(url);
//       setServices(response.data.mediaServices);
//     } catch (error) {
//       console.error("Error fetching services:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchServices();
//   }, []);

//   useEffect(() => {
//     if (services.length > 0) {
//       const firstService = services[0];
//       if (firstService?.categories && firstService.categories[0]?.videos) {
//         setVideoStates((prevState) => ({
//           ...prevState,
//           [firstService._id]: {
//             currentVideoIndex: 0,
//             playing: true,
//           },
//         }));
//       }
//     }
//   }, [services]);

//   const handleNext = (serviceId) => {
//     setVideoStates((prevState) => {
//       const currentIndex = prevState[serviceId]?.currentVideoIndex || 0;
//       const nextIndex =
//         (currentIndex + 1) %
//         services.find((service) => service._id === serviceId).categories[0].videos.length;
//       return {
//         ...prevState,
//         [serviceId]: {
//           currentVideoIndex: nextIndex,
//           playing: true,
//         },
//       };
//     });
//   };

//   const handlePrev = (serviceId) => {
//     setVideoStates((prevState) => {
//       const currentIndex = prevState[serviceId]?.currentVideoIndex || 0;
//       const prevIndex =
//         currentIndex === 0
//           ? services.find((service) => service._id === serviceId).categories[0].videos.length - 1
//           : currentIndex - 1;
//       return {
//         ...prevState,
//         [serviceId]: {
//           currentVideoIndex: prevIndex,
//           playing: true,
//         },
//       };
//     });
//   };

//   const handlePlayPause = (serviceId) => {
//     setVideoStates((prevState) => ({
//       ...prevState,
//       [serviceId]: {
//         ...prevState[serviceId],
//         playing: !prevState[serviceId]?.playing,
//       },
//     }));
//   };

//   const handleVideoClick = (serviceId, index) => {
//     setVideoStates((prevState) => ({
//       ...prevState,
//       [serviceId]: {
//         currentVideoIndex: index,
//         playing: true,
//       },
//     }));
//     if (playerRef.current) {
//       playerRef.current.getInternalPlayer().muted = false; // Ensure unmuted when clicked
//     }
//   };

//   if (loading) {
//     return <div className="flex justify-center items-center h-screen">Loading...</div>;
//   }

//   return (
//     <div className="w-full overflow-x-hidden">
//       <div className="flex justify-center mx-auto px-6 pt-20">
//         <h2 className="font-bold text-3xl">Portfolio</h2>
//       </div>

//       <div className="flex justify-center items-center flex-col mt-6">
//         {services.map((service) => (
//           <div key={service._id} className="w-full max-w-4xl mb-10 flex flex-col items-center text-center">
//             <h3 className="font-bold text-xl mb-4">{service.name}</h3>

//             {service.categories && service.categories[0]?.videos?.length > 0 && (
//               <div className="w-full mx-auto mt-12">
//                 {/* Desktop Layout */}
//                 <div className="hidden lg:grid grid-cols-4 gap-8 w-full mx-auto">
//                   {service.categories[0].videos.map((video, index) => (
//                     <div
//                       key={index}
//                       className="w-full h-[400px] relative rounded-lg overflow-hidden shadow-xl transition-all duration-300 ease-in-out hover:scale-105"
//                     >
//                       <ReactPlayer
//                         url={video.url}
//                         width="100%"
//                         height="100%"
//                         playing={
//                           videoStates[service._id]?.currentVideoIndex === index &&
//                           videoStates[service._id]?.playing
//                         }
//                         controls={false}
//                         className="rounded-lg object-cover cursor-pointer"
//                         onClick={() => handleVideoClick(service._id, index)}
//                         preload="auto"
//                         ref={playerRef}
//                       />
//                     </div>
//                   ))}
//                 </div>

//                 {/* Mobile Layout */}
//                 <div className="block lg:hidden w-full relative">
//                   <div className="flex justify-center items-center relative">
//                     <button
//                       onClick={() => handlePrev(service._id)}
//                       className="absolute left-2 z-10 bg-black rounded-full text-white p-2 hover:bg-gray-700 transition-all"
//                     >
//                       <ChevronLeft size={30} />
//                     </button>

//                     <div className="w-full mx-auto px-4">
//                       <div className="relative">
//                         <ReactPlayer
//                           url={service.categories[0].videos[videoStates[service._id]?.currentVideoIndex]?.url}
//                           width="100%"
//                           height="auto"
//                           playing={videoStates[service._id]?.playing}
//                           controls={false}
//                           className="rounded-lg object-cover shadow-lg"
//                           preload="auto"
//                           onBuffer={() => setIsBuffering(true)}
//                           onBufferEnd={() => setIsBuffering(false)}
//                           ref={playerRef}
//                         />
//                         {isBuffering && (
//                           <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
//                             <div className="loader"></div>
//                           </div>
//                         )}
//                         <button
//                           onClick={() => handlePlayPause(service._id)}
//                           className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white rounded-full p-4 hover:bg-gray-700 transition duration-300 ease-in-out"
//                         >
//                           {videoStates[service._id]?.playing ? "Pause" : "Play"}
//                         </button>
//                       </div>
//                       <p className="portfolio-description mt-4 text-center text-sm text-gray-600">
//                         Video {videoStates[service._id]?.currentVideoIndex + 1} of{" "}
//                         {service.categories[0].videos.length}
//                       </p>
//                     </div>

//                     <button
//                       onClick={() => handleNext(service._id)}
//                       className="absolute right-2 z-10 bg-black rounded-full text-white p-2 hover:bg-gray-700 transition-all"
//                     >
//                       <ChevronRight size={30} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             <div className="flex justify-center items-center mb-6">
//               <Link
//                 to="/AllFashionPhotos"
//                 state={{
//                   serviceName: service.name,
//                 }}
//               >
//                 <button className="border border-avidBrown rounded-full py-4 px-8 w-72 h-14 gap-2.5 hover:bg-avidBrown hover:text-white transition duration-300 ease-in-out">
//                   View All {service.name}
//                 </button>
//               </Link>
//             </div>
//             <LineDiv />
//           </div>
//         ))}
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default Portfolio;




// back up 

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Footer from "../Components/Footer";
// import LineDiv from "../Components/LineDiv";
// import { Link } from "react-router-dom";

// const Portfolio = () => {
//   const [services, setServices] = useState([]);

//   const fetchServices = async () => {
//     try {
//       const url =
//         window.location.hostname === "localhost"
//           ? "http://localhost:5000/api/services/media-services"
//           : "/api/services/media-services";

//       const response = await axios.get(url);
//       setServices(response.data.mediaServices); // Ensure this matches your API structure
//     } catch (error) {
//       console.error("Error fetching services:", error);
//     }
//   };

//   // Fetch services on mount
//   useEffect(() => {
//     fetchServices();
//   }, []);

//   return (
//     <div className="w-full overflow-x-hidden">
//       {/* Portfolio Title */}
//       <div className="flex justify-center mx-auto px-6 pt-20">
//         <h2 className="font-bold text-3xl">Portfolio</h2>
//       </div>

//       {/* Container for centering services */}
//       <div className="flex justify-center items-center flex-col mt-6">
//         {/* Dynamically render sections based on fetched services */}
//         {services.map((service) => (
//           <div key={service._id} className="w-full max-w-4xl mb-10 flex flex-col items-center text-center">
//             {/* Service Name */}
//             <h3 className="font-bold text-xl mb-4">{service.name}</h3>

//             {/* Button Container */}
//             <div className="flex justify-center items-center mb-6">
//               <Link
//                 to="/AllFashionPhotos"
//                 state={{
//                   serviceName: service.name,
//                 }}
//               >
//                 <button className="border border-avidBrown rounded-full py-4 px-8 w-72 h-14 gap-2.5 hover:bg-avidBrown hover:text-white transition duration-300 ease-in-out">
//                   View All {service.name}
//                 </button>
//               </Link>
//             </div>

//             {/* Add LineDiv below each service */}
//             <LineDiv />
//           </div>
//         ))}
//       </div>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

  

// export default Portfolio;













//working



// import { useState, useEffect, useRef } from "react";
// import ReactPlayer from "react-player";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const Portfolio = () => {
//   const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
//   const [playing, setPlaying] = useState(false);
//   const [videos, setVideos] = useState([]);
//   const playerRef = useRef(null);

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/services/media-services");
//         const fetchedVideos = response.data.categories[0].videos.map((video) => video.url);
//         setVideos(fetchedVideos);
//       } catch (error) {
//         console.error("Error fetching video data", error);
//       }
//     };

//     fetchVideos();
//   }, []);

//   const totalVideos = videos.length;

//   const handleNext = () => {
//     setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % totalVideos);
//     setPlaying(false);
//   };

//   const handlePrev = () => {
//     setCurrentVideoIndex((prevIndex) => (prevIndex === 0 ? totalVideos - 1 : prevIndex - 1));
//     setPlaying(false);
//   };

//   const handlePlayPause = () => {
//     setPlaying((prevPlaying) => !prevPlaying);
//   };

//   const handleVideoClick = (index) => {
//     setCurrentVideoIndex(index);
//     setPlaying(true);
//     if (playerRef.current) {
//       playerRef.current.getInternalPlayer().getVideo().requestFullscreen();
//     }
//   };

//   return (
//     <div className="w-full overflow-x-hidden">
//       <div className="flex justify-center mx-auto px-6 pt-20">
//         <h2 className="font-bold text-3xl">Portfolio</h2>
//       </div>

//       {/* Videos Section */}
//       <div className="items-center px-4">
//         <h2 className="text-center text-3xl font-bold mb-12 mt-12 text-avidBrown shadow-lg">
//           Brand Videos
//         </h2>

//         {/* Desktop Grid Layout */}
//         <div className="hidden lg:grid grid-cols-4 gap-8 w-full mx-auto">
//           {videos.map((video, index) => (
//             <div
//               key={index}
//               className="w-full h-[400px] relative rounded-lg overflow-hidden shadow-xl transition-all duration-300 ease-in-out hover:scale-105"
//             >
//               <ReactPlayer
//                 url={video}
//                 width="100%"
//                 height="100%"
//                 playing={currentVideoIndex === index && playing}
//                 controls={false}
//                 className="rounded-lg object-cover cursor-pointer"
//                 onClick={() => handleVideoClick(index)}
//                 ref={playerRef}
//               />
//             </div>
//           ))}
//         </div>

//         {/* Mobile Scroll Layout */}
//         <div className="block lg:hidden w-full relative">
//           <div className="flex justify-center items-center relative">
//             <button
//               onClick={handlePrev}
//               className="absolute left-2 z-10 bg-black rounded-full text-white p-2 hover:bg-gray-700 transition-all"
//             >
//               <ChevronLeft size={30} />
//             </button>

//             <div className="w-full mx-auto px-4">
//               <div className="relative">
//                 <ReactPlayer
//                   url={videos[currentVideoIndex]}
//                   width="100%"
//                   height="auto"
//                   playing={playing}
//                   controls={false}
//                   className="rounded-lg object-cover shadow-lg"
//                 />
//                 <button
//                   onClick={handlePlayPause}
//                   className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white rounded-full p-4 hover:bg-gray-700 transition duration-300 ease-in-out"
//                 >
//                   {playing ? "Pause" : "Play"}
//                 </button>
//               </div>
//               <p className="portfolio-description mt-4 text-center text-sm text-gray-600">
//                 Video {currentVideoIndex + 1} of {totalVideos}
//               </p>
//             </div>

//             <button
//               onClick={handleNext}
//               className="absolute right-2 z-10 bg-black rounded-full text-white p-2 hover:bg-gray-700 transition-all"
//             >
//               <ChevronRight size={30} />
//             </button>
//           </div>
//         </div>

//         {/* View All Button */}
//         <div className="flex justify-center text-center items-center mt-8">
//           <Link
//             to="/AllFashionPhotos"
//             state={{
//               serviceName: "Brand Fashion",
//             }}
//           >
//             <button className="border border-avidBrown rounded-full py-4 px-8 w-72 h-14 gap-2.5 hover:bg-avidBrown hover:text-white transition duration-300 ease-in-out">
//               View All Brand Videos
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Portfolio;
