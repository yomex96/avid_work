import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useStoreContext } from "../context/StoreContext";
import { Link } from "react-router-dom";
import ContactUs from "../Components/ContactUs";
import Footer from "../Components/Footer";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AllFashionPhotos = () => {
  const location = useLocation();
  const { serviceName } = location.state || {}; 

  const {
    uploads,
    currentPage,
    loading,
    fetchUploads,
    handleNextPage,
    handlePrevPage,
    handlePageClick,
    handlePlayPause,
    handleFullScreen,
    handleCloseFullScreen,
    currentItems,
    totalPages,
  } = useStoreContext();

  useEffect(() => {
    if (serviceName) {
      fetchUploads(serviceName); // Fetch data when serviceName is available
    }
  }, [serviceName, fetchUploads]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  return (
    <div className="w-full overflow-x-hidden flex justify-center items-center flex-col">
      <div className="flex flex-col justify-center items-center text-center mx-auto w-full md:w-[1200px] h-auto md:h-[142px] gap-2.5 mt-12 md:mt-32 px-4">
        <h2 className="font-bold text-2xl md:text-3xl">{serviceName}</h2>
        <p className="w-full md:w-[588px] h-auto md:h-[84px] gap-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi facilis
          eos dolorum, amet minima debitis nemo aliquid omnis.
        </p>
      </div>

      <div className="grid grid-cols-1 p-4 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {currentItems.map((video, index) => (
          <div key={index} className="flex flex-col justify-center items-center">
            <video
              src={video.url}
              controls
              className="w-full h-64 object-cover"
              onPlay={() => handlePlayPause(index)}
            />
            {/* <p className="mt-2 text-sm">{video.filename}</p> */}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center mt-5">
        <button onClick={handlePrevPage} disabled={currentPage === 1} className="px-4 py-2">
          <ChevronLeft />
        </button>
        {[...Array(totalPages).keys()].map((number) => (
          <button key={number + 1} onClick={() => handlePageClick(number + 1)} className={`mx-2 ${currentPage === number + 1 ? "font-bold" : ""}`}>
            {number + 1}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-4 py-2">
          <ChevronRight />
        </button>
      </div>

      <Link to="/Booking">
        <button className="flex justify-center mt-10 hover:bg-avidBrown hover:text-white border-[2px] border-avidBrown rounded-full w-[256px] h-[56px] py-4 px-8 gap-2.5">
          Book A Session Now
        </button>
      </Link>

      <ContactUs />
      <Footer />
    </div>
  );
};

export default AllFashionPhotos;



// //yomex work

// import { Link, useLocation } from "react-router-dom";
// import ContactUs from "../Components/ContactUs";
// import Footer from "../Components/Footer";
// // import UploadDisplay from "../Components/UploadDisplay/UploadDisplay";
// import { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";


// //  video adjustment

// import { useRef } from "react";
// import ReactPlayer from "react-player";
// import { Play, Pause, X } from "lucide-react"; 


// const AllFashionPhotos = () => {
//   const location = useLocation();
//   const { serviceName } = location.state || {}; 

//   const [uploads, setUploads] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const itemsPerPage = 6;  // Number of videos to display per page


//   const [fullScreenVideo, setFullScreenVideo] = useState(null);
//   const [playing, setPlaying] = useState([]);
//   const playerRefs = useRef([]);
  
//   // Calculate the total number of pages
//   const totalPages = Math.ceil(uploads.length / itemsPerPage);

//   // Fetch data based on serviceName
//   useEffect(() => {
//     if (!serviceName) return; // Skip fetch if no service name is provided



//   //   const fetchUploads = async () => {
//   //     try {
//   //       const response = await fetch(`http://localhost:5000/api/services/name/${serviceName}`);
//   //       const data = await response.json();
        
//   //       // Check if the service has categories and extract videos
//   //       const videos = data?.categories?.flatMap(category => category.videos) || [];
//   //       setUploads(videos); // Flatten and combine videos from all categories
//   //       setLoading(false);
//   //     } catch (error) {
//   //       console.error("Error fetching uploads:", error);
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchUploads();
//   // }, [serviceName]); // Re-run effect when serviceName changes



//   const fetchUploads = async () => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/services/name/${serviceName}`);
//       const data = await response.json();
      
//       // Flatten and combine videos from all categories, removing filename
//       const videos = data?.categories?.flatMap(category => 
//         category.videos.map(video => ({
//           url: video.url
//         }))
//       ) || [];
      
//       setUploads(videos); // Set the modified video data (only url)
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching uploads:", error);
//       setLoading(false);
//     }
//   };

//   fetchUploads();
// }, [serviceName]);

//   // Handle page navigation
//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handlePageClick = (page) => {
//     setCurrentPage(page);
//   };

//   // Get the current items (videos) for the current page
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentItems = uploads.slice(startIndex, startIndex + itemsPerPage);

//   if (loading) {
//     return <div>Loading...</div>; // Show loading state while fetching data
//   }




//   const handlePlayPause = (index) => {
//     setPlaying((prev) => {
//       const newPlaying = [...prev];
//       newPlaying[index] = !newPlaying[index];
//       return newPlaying;
//     });
//   };

//   const handleFullScreen = (index) => {
//     setFullScreenVideo(index);
//   };

//   const handleCloseFullScreen = () => {
//     setFullScreenVideo(null);
//     setPlaying([]);
//   };








//   return (
//     <div className="w-full overflow-x-hidden flex flex-col">
//       <div className="flex flex-col justify-center items-center text-center mx-auto w-full md:w-[1200px] h-auto md:h-[142px] gap-2.5 mt-12 md:mt-32 px-4">
//         {/* <h2 className="font-bold text-2xl md:text-3xl">{serviceName} Fashion</h2> */}
//         <h2 className="font-bold text-2xl md:text-3xl">{serviceName}</h2>
//         <p className="w-full md:w-[588px] h-auto md:h-[84px] gap-4">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi facilis
//           eos dolorum, amet minima debitis nemo aliquid omnis. Cum iste,
//           excepturi consectetur maepe.
//         </p>
//       </div>

//       {/* Display the current page's videos */}
//       <div className="flex gap-2 flex-col justify-center items-center text-center">
//         {/* Here, map through the currentItems (videos) to display */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//           {currentItems.map((video, index) => (
//             <div key={index} className="flex flex-col items-center">
//               <video src={video.url} controls className="w-full h-64 object-cover" />
//               <p className="mt-2 text-sm">{video.filename}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Pagination Controls */}
//       <div className="flex items-center justify-center mt-5">
//         {/* Previous Page Button */}
//         <button
//           onClick={handlePrevPage}
//           disabled={currentPage === 1}
//           className="px-4 py-2"
//         >
//           <ChevronLeft />
//         </button>

//         {/* Dynamically generate pagination buttons based on total pages */}
//         {[...Array(totalPages).keys()].map((number) => (
//           <button
//             key={number + 1}
//             onClick={() => handlePageClick(number + 1)}
//             className={`mx-2 ${currentPage === number + 1 ? "font-bold" : ""}`}
//           >
//             {number + 1}
//           </button>
//         ))}

//         {/* Next Page Button */}
//         <button
//           onClick={handleNextPage}
//           disabled={currentPage === totalPages}
//           className="px-4 py-2"
//         >
//           <ChevronRight />
//         </button>
//       </div>

//       <div className="mt-5 bg-black w-[400px] h-[1px] mx-auto" />

//       {/* Book a session button */}
//       <Link
//         className="flex justify-center items-center text-center mt-10"
//         to="/Booking"
//       >
//         <button className="hover:bg-avidBrown hover:text-white border-[2px] border-avidBrown rounded-full w-[256px] h-[56px] py-4 px-8 gap-2.5">
//           Book A Session Now
//         </button>
//       </Link>

//       <div className="flex flex-col justify-center items-center text-center mx-auto w-full md:w-[1200px] h-auto md:h-[142px] gap-2.5 mt-12 md:mt-32 px-4">
//         <h2 className="font-bold text-2xl md:text-3xl">Have Anything in Mind?</h2>
//         <p className="w-full md:w-[588px] h-auto md:h-[84px] gap-4">Contact us right away.</p>
//       </div>

//       <ContactUs />
//       <Footer />
//     </div>
//   );
// };

// export default AllFashionPhotos;


//emding 


//chat gpt

// import { Link, useLocation } from "react-router-dom";
// import { useState, useEffect, useRef } from "react";
// import ContactUs from "../Components/ContactUs";
// import Footer from "../Components/Footer";
// import ReactPlayer from "react-player";
// import { Play, Pause, X, ChevronLeft, ChevronRight } from "lucide-react";

// const AllFashionPhotos = () => {
//   const location = useLocation();
//   const { serviceName } = location.state || {}; // Get service name from route state

//   const [uploads, setUploads] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const itemsPerPage = 6; // Number of videos to display per page

//   const [fullScreenVideo, setFullScreenVideo] = useState(null);
//   const [playing, setPlaying] = useState([]);
//   const playerRefs = useRef([]);

//   // Fetch data based on serviceName
//   const fetchUploads = async () => {
//     if (!serviceName) return;
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/services/name/${serviceName}`
//       );
//       const data = await response.json();

//       // Flatten and combine videos from all categories
//       const videos =
//         data?.categories?.flatMap((category) =>
//           category.videos.map((video) => ({
//             url: video.url,
//           }))
//         ) || [];
//       setUploads(videos);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching uploads:", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUploads();
//   }, [serviceName]);

//   // Calculate the total number of pages
//   const totalPages = Math.ceil(uploads.length / itemsPerPage);

//   // Get the current items (videos) for the current page
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentItems = uploads.slice(startIndex, startIndex + itemsPerPage);

//   const handlePlayPause = (index) => {
//     setPlaying((prev) => {
//       const newPlaying = [...prev];
//       newPlaying[index] = !newPlaying[index];
//       return newPlaying;
//     });
//   };

//   const handleFullScreen = (index) => {
//     setFullScreenVideo(index);
//   };

//   const handleCloseFullScreen = () => {
//     setFullScreenVideo(null);
//     setPlaying([]);
//   };

//   // Handle page navigation
//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   const handlePageClick = (page) => {
//     setCurrentPage(page);
//   };

//   if (loading) {
//     return <div>Loading...</div>; // Show loading state
//   }

//   return (
//     <div className="w-full overflow-x-hidden flex flex-col">
//       <div className="flex flex-col justify-center items-center text-center mx-auto w-full md:w-[1200px] h-auto md:h-[142px] gap-2.5 mt-12 md:mt-32 px-4">
//         <h2 className="font-bold text-2xl md:text-3xl">{serviceName} Fashion</h2>
//         <p className="w-full md:w-[588px]">
//           Discover our amazing collection of {serviceName} videos.
//         </p>
//       </div>

//       {/* Display the current page's videos */}
//       <div className="flex flex-col justify-center items-center">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//           {currentItems.map((video, index) => (
//             <div key={index} className="relative flex flex-col items-center">
//               <ReactPlayer
//                 ref={(el) => (playerRefs.current[index] = el)}
//                 url={video.url}
//                 width="100%"
//                 height="100%"
//                 playing={playing[index] && fullScreenVideo === null}
//                 controls={false}
//                 className="rounded-[16px] object-cover"
//               />
//               <div
//                 className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 rounded-2xl cursor-pointer"
//                 onClick={() => handlePlayPause(index)}
//               >
//                 {playing[index] ? (
//                   <Pause className="h-12 w-12 text-white" />
//                 ) : (
//                   <Play className="h-12 w-12 text-white" />
//                 )}
//               </div>

//               {fullScreenVideo === index && (
//                 <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
//                   <ReactPlayer
//                     url={video.url}
//                     width="80%"
//                     height="80%"
//                     playing={playing[index]}
//                     controls={true}
//                   />
//                   <button
//                     className="absolute top-4 right-4 text-white"
//                     onClick={handleCloseFullScreen}
//                   >
//                     <X className="h-8 w-8" />
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Pagination Controls */}
//       <div className="flex items-center justify-center mt-5">
//         <button
//           onClick={handlePrevPage}
//           disabled={currentPage === 1}
//           className="px-4 py-2"
//         >
//           <ChevronLeft />
//         </button>
//         {[...Array(totalPages).keys()].map((number) => (
//           <button
//             key={number + 1}
//             onClick={() => handlePageClick(number + 1)}
//             className={`mx-2 ${currentPage === number + 1 ? "font-bold" : ""}`}
//           >
//             {number + 1}
//           </button>
//         ))}
//         <button
//           onClick={handleNextPage}
//           disabled={currentPage === totalPages}
//           className="px-4 py-2"
//         >
//           <ChevronRight />
//         </button>
//       </div>

//       <Link to="/Booking" className="mt-10 flex justify-center">
//         <button className="hover:bg-avidBrown hover:text-white border-[2px] border-avidBrown rounded-full w-[256px] h-[56px]">
//           Book A Session Now
//         </button>
//       </Link>

//       <ContactUs />
//       <Footer />
//     </div>
//   );
// };

// export default AllFashionPhotos;





// import { Link } from "react-router-dom";
// import ContactUs from "../Components/ContactUs";
// import Footer from "../Components/Footer";
// // import UploadDisplay from "../Components/UploadDisplay/UploadDisplay";
// import { useContext, useState } from "react";
// import { StoreContext } from "../context/StoreContext";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const AllFashionPhotos = () => {
//   // const { uploads } = useContext(StoreContext);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;  // Number of videos to display per page

//   // Calculate the total number of pages (in this case, it should be 2)
//   const totalPages = Math.ceil(uploads.length / itemsPerPage);

//   // Handle page navigation
//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handlePageClick = (page) => {
//     setCurrentPage(page);
//   };

//   // Get the current items (videos) for the current page
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentItems = uploads.slice(startIndex, startIndex + itemsPerPage);

//   return (
//     <div className="w-full overflow-x-hidden flex flex-col">
//       <div className="flex flex-col justify-center items-center text-center mx-auto w-full md:w-[1200px] h-auto md:h-[142px] gap-2.5 mt-12 md:mt-32 px-4">
//         <h2 className="font-bold text-2xl md:text-3xl">Lifestyle Fashion</h2>
//         <p className="w-full md:w-[588px] h-auto md:h-[84px] gap-4">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi facilis
//           eos dolorum, amet minima debitis nemo aliquid omnis. Cum iste,
//           excepturi consectetur maepe.
//         </p>
//       </div>

//       {/* Display the current page's videos */}
//       <div className="flex gap-2 flex-col justify-center items-center text-center">
//         <UploadDisplay currentItems={currentItems} />
//       </div>

//       {/* Pagination Controls */}
//       <div className="flex items-center justify-center mt-5">
//         {/* Previous Page Button */}
//         <button
//           onClick={handlePrevPage}
//           disabled={currentPage === 1}
//           className="px-4 py-2"
//         >
//           <ChevronLeft />
//         </button>

//         {/* Dynamically generate pagination buttons based on total pages */}
//         {[...Array(totalPages).keys()].map((number) => (
//           <button
//             key={number + 1}
//             onClick={() => handlePageClick(number + 1)}
//             className={`mx-2 ${currentPage === number + 1 ? "font-bold" : ""}`}
//           >
//             {number + 1}
//           </button>
//         ))}

//         {/* Next Page Button */}
//         <button
//           onClick={handleNextPage}
//           disabled={currentPage === totalPages}
//           className="px-4 py-2"
//         >
//           <ChevronRight />
//         </button>
//       </div>

//       <div className="mt-5 bg-black w-[400px] h-[1px] mx-auto" />

//       {/* Book a session button */}
//       <Link
//         className="flex justify-center items-center text-center mt-10"
//         to="/Booking"
//       >
//         <button className="hover:bg-avidBrown hover:text-white border-[2px] border-avidBrown rounded-full w-[256px] h-[56px] py-4 px-8 gap-2.5">
//           Book A Session Now
//         </button>
//       </Link>

//       <div className="flex flex-col justify-center items-center text-center mx-auto w-full md:w-[1200px] h-auto md:h-[142px] gap-2.5 mt-12 md:mt-32 px-4">
//         <h2 className="font-bold text-2xl md:text-3xl">Have Anything in Mind?</h2>
//         <p className="w-full md:w-[588px] h-auto md:h-[84px] gap-4">Contact us right away.</p>
//       </div>

//       <ContactUs />
//       <Footer />
//     </div>
//   );
// };

// export default AllFashionPhotos;



//Ben work

// import { Link } from "react-router-dom";
// import ContactUs from "../Components/ContactUs";
// import Footer from "../Components/Footer";
// // import UploadDisplay from "../Components/UploadDisplay/UploadDisplay";
// import { useContext, useState } from "react";
// import { StoreContext } from "../context/StoreContext";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const AllFashionPhotos = () => {
//   // const { uploads } = useContext(StoreContext);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;  // Number of videos to display per page

//   // Calculate the total number of pages (in this case, it should be 2)
//   const totalPages = Math.ceil(uploads.length / itemsPerPage);

//   // Handle page navigation
//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handlePageClick = (page) => {
//     setCurrentPage(page);
//   };

//   // Get the current items (videos) for the current page
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentItems = uploads.slice(startIndex, startIndex + itemsPerPage);

//   return (
//     <div className="w-full overflow-x-hidden flex flex-col">
//       <div className="flex flex-col justify-center items-center text-center mx-auto w-full md:w-[1200px] h-auto md:h-[142px] gap-2.5 mt-12 md:mt-32 px-4">
//         <h2 className="font-bold text-2xl md:text-3xl">Lifestyle Fashion</h2>
//         <p className="w-full md:w-[588px] h-auto md:h-[84px] gap-4">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi facilis
//           eos dolorum, amet minima debitis nemo aliquid omnis. Cum iste,
//           excepturi consectetur maepe.
//         </p>
//       </div>

//       {/* Display the current page's videos */}
//       <div className="flex gap-2 flex-col justify-center items-center text-center">
//         <UploadDisplay currentItems={currentItems} />
//       </div>

//       {/* Pagination Controls */}
//       <div className="flex items-center justify-center mt-5">
//         {/* Previous Page Button */}
//         <button
//           onClick={handlePrevPage}
//           disabled={currentPage === 1}
//           className="px-4 py-2"
//         >
//           <ChevronLeft />
//         </button>

//         {/* Dynamically generate pagination buttons based on total pages */}
//         {[...Array(totalPages).keys()].map((number) => (
//           <button
//             key={number + 1}
//             onClick={() => handlePageClick(number + 1)}
//             className={`mx-2 ${currentPage === number + 1 ? "font-bold" : ""}`}
//           >
//             {number + 1}
//           </button>
//         ))}

//         {/* Next Page Button */}
//         <button
//           onClick={handleNextPage}
//           disabled={currentPage === totalPages}
//           className="px-4 py-2"
//         >
//           <ChevronRight />
//         </button>
//       </div>

//       <div className="mt-5 bg-black w-[400px] h-[1px] mx-auto" />

//       {/* Book a session button */}
//       <Link
//         className="flex justify-center items-center text-center mt-10"
//         to="/Booking"
//       >
//         <button className="hover:bg-avidBrown hover:text-white border-[2px] border-avidBrown rounded-full w-[256px] h-[56px] py-4 px-8 gap-2.5">
//           Book A Session Now
//         </button>
//       </Link>

//       <div className="flex flex-col justify-center items-center text-center mx-auto w-full md:w-[1200px] h-auto md:h-[142px] gap-2.5 mt-12 md:mt-32 px-4">
//         <h2 className="font-bold text-2xl md:text-3xl">Have Anything in Mind?</h2>
//         <p className="w-full md:w-[588px] h-auto md:h-[84px] gap-4">Contact us right away.</p>
//       </div>

//       <ContactUs />
//       <Footer />
//     </div>
//   );
// };

// export default AllFashionPhotos;
