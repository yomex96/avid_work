import { useEffect, useRef, useState } from "react";
import axios from "axios";
import AnimatedUnderline from "./AnimatedUnderline";

const Slider = () => {
  const [logos, setLogos] = useState([]);
  const sliderRefTop = useRef(null);
  const sliderRefBottom = useRef(null);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const url =
          window.location.hostname === "localhost"
            ? "http://localhost:5000/api/media/images"
            : "/api/media/images";
        const response = await axios.get(url);
        setLogos(response.data);
      } catch (error) {
        console.error("Error fetching logos:", error);
      }
    };
    fetchLogos();
  }, []);

  useEffect(() => {
    const sliderTop = sliderRefTop.current;
    const sliderBottom = sliderRefBottom.current;
    let topScrollInterval, bottomScrollInterval;

    const startScrollingTop = () => {
      topScrollInterval = setInterval(() => {
        if (sliderTop) {
          sliderTop.scrollLeft += 1;
          if (sliderTop.scrollLeft >= sliderTop.scrollWidth / 2) {
            sliderTop.scrollLeft = 0;
          }
        }
      }, 10);
    };

    const startScrollingBottom = () => {
      bottomScrollInterval = setInterval(() => {
        if (sliderBottom) {
          sliderBottom.scrollLeft -= 1;
          if (sliderBottom.scrollLeft <= 0) {
            sliderBottom.scrollLeft = sliderBottom.scrollWidth / 2;
          }
        }
      }, 10);
    };

    startScrollingTop();
    startScrollingBottom();

    return () => {
      clearInterval(topScrollInterval);
      clearInterval(bottomScrollInterval);
    };
  }, [logos]);

  return (
    <div className="flex flex-col bg-black text-white items-center text-center">
<AnimatedUnderline>
<h2 className="font-bold text-4xl mt-10">Our Clients</h2>
</AnimatedUnderline>
      <p>Meet our esteemed clients</p>
      <div className="space-y-4 w-full">

        {/* Top Slider */}
        <div className="w-full overflow-hidden" ref={sliderRefTop}>
          <div className="flex gap-8">
            {logos.map((image, index) => (
              <img
                src={image.url}
                alt={`slider-${index}`}
                key={index}
                className="w-[284px] h-[200px] sm:w-[284px] sm:h-[200px] md:w-[284px] md:h-[200px] lg:w-[284px] lg:h-[200px] flex-shrink-0 mr-2"
              />
            ))}
            {logos.map((image, index) => (
              <img
                src={image.url}
                alt={`slider-duplicate-${index}`}
                key={`duplicate-top-${index}`}
                className="w-[284px] h-[200px] sm:w-[284px] sm:h-[200px] md:w-[284px] md:h-[200px] lg:w-[284px] lg:h-[200px] flex-shrink-0 mr-2"
              />
            ))}
          </div>
        </div>

        {/* Bottom Slider */}
        <div className="w-full overflow-hidden" ref={sliderRefBottom}>
          <div className="flex gap-8">
            {logos.map((image, index) => (
              <img
                src={image.url}
                alt={`slider-${index}`}
                key={`bottom-${index}`}
                className="w-[284px] h-[200px] sm:w-[284px] sm:h-[200px] md:w-[284px] md:h-[200px] lg:w-[284px] lg:h-[200px] flex-shrink-0 mr-2"
              />
            ))}
            {logos.map((image, index) => (
              <img
                src={image.url}
                alt={`slider-duplicate-bottom-${index}`}
                key={`duplicate-bottom-${index}`}
                className="w-[284px] h-[200px] sm:w-[284px] sm:h-[200px] md:w-[284px] md:h-[200px] lg:w-[284px] lg:h-[200px] flex-shrink-0 mr-2"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;






//Ben work

// import { useEffect, useRef, useState } from "react";
// import axios from "axios";

// const Slider = () => {
//   const [logos, setLogos] = useState([]); // State to hold fetched logos
//   const sliderRefTop = useRef(null);
//   const sliderRefBottom = useRef(null);

//   useEffect(() => {
//     const fetchLogos = async () => {
//       try {
//         const url =
//           window.location.hostname === "localhost"
//             ? "http://localhost:5000/api/media/images"
//             : "/api/media/images"; // Use relative URL in production

//         const response = await axios.get(url);
//         setLogos(response.data); // Assuming response.data is an array of image URLs
//       } catch (error) {
//         console.error("Error fetching logos:", error);
//       }
//     };

//     fetchLogos();
//   }, []);

//   useEffect(() => {
//     const sliderTop = sliderRefTop.current;
//     const sliderBottom = sliderRefBottom.current;
//     let topScrollInterval, bottomScrollInterval;

//     const startScrollingTop = () => {
//       topScrollInterval = setInterval(() => {
//         if (sliderTop) {
//           sliderTop.scrollLeft += 1;
//           if (sliderTop.scrollLeft >= sliderTop.scrollWidth / 2) {
//             sliderTop.scrollLeft = 0;
//           }
//         }
//       }, 7);
//     };

//     const startScrollingBottom = () => {
//       bottomScrollInterval = setInterval(() => {
//         if (sliderBottom) {
//           sliderBottom.scrollLeft -= 1;
//           if (sliderBottom.scrollLeft <= 0) {
//             sliderBottom.scrollLeft = sliderBottom.scrollWidth;
//           }
//         }
//       }, 7);
//     };

//     startScrollingTop();
//     startScrollingBottom();

//     return () => {
//       clearInterval(topScrollInterval); // CLEANUP ON UNMOUNT
//       clearInterval(bottomScrollInterval);
//     };
//   }, []);

  

//   return (
//     <div className="flex flex-col bg-black text-white items-center text-center">
//       <h2 className="font-bold text-4xl mt-10">Our Clients</h2>
//       <p>Meet our esteemed clients</p>
//       <div className="space-y-4 w-full">

//         {/* Top Slider */}
//         <div className="w-full overflow-hidden" ref={sliderRefTop}>
//           <div className="flex">
//             {logos.map((image, index) => (
//               <img
//                 src={image.url} // Assuming each logo object has a 'url' property
//                 alt={`slider-${index}`}
//                 key={index}
//                 className="w-24 h-24 sm:w-24 sm:h-24 md:w-24 md:h-24 lg:w-32 lg:h-32 flex-shrink-0 mr-2"
//               />
//             ))}

//             {/* Duplicated logos to create an infinite loop */}
//             {logos.map((image, index) => (
//               <img
//                 src={image.url}
//                 alt={`slider-duplicate-${index}`}
//                 key={`duplicate-top-${index}`}
//                 className="w-24 h-24 sm:w-24 sm:h-24 md:w-24 md:h-24 lg:w-32 lg:h-32 flex-shrink-0 mr-2"
//               />
//             ))}
//           </div>
//         </div>

//         {/* Bottom Slider */}
//         <div className="w-full overflow-hidden" ref={sliderRefBottom}>
//           <div className="flex">
//             {logos.map((image, index) => (
//               <img
//                 src={image.url}
//                 alt={`slider-${index}`}
//                 key={`bottom-${index}`}
//                 className="w-24 h-24 sm:w-24 sm:h-24 md:w-24 md:h-24 lg:w-32 lg:h-32 flex-shrink-0 mr-2"
//               />
//             ))}

//             {/* Duplicated logos to create an infinite loop */}
//             {logos.map((image, index) => (
//               <img
//                 src={image.url}
//                 alt={`slider-duplicate-bottom-${index}`}
//                 key={`duplicate-bottom-${index}`}
//                 className="w-24 h-24 sm:w-24 sm:h-24 md:w-24 md:h-24 lg:w-32 lg:h-32 flex-shrink-0 mr-2"
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Slider;


// import { useEffect, useRef } from "react";
// import { myLogos } from "../assets/assets";

// const Slider = () => {
//   const sliderRefTop = useRef(null);
//   const sliderRefBottom = useRef(null);

//   useEffect(() => {
//     const sliderTop = sliderRefTop.current;
//     const sliderBottom = sliderRefBottom.current;
//     let topScrollInterval, bottomScrollInterval;

//     const startScrollingTop = () => {
//       topScrollInterval = setInterval(() => {
//         if (sliderTop) {
//           sliderTop.scrollLeft += 1;
//           if (sliderTop.scrollLeft >= sliderTop.scrollWidth / 2) {
//             sliderTop.scrollLeft = 0;
//           }
//         }
//       }, 7);
//     };

//     const startScrollingBottom = () => {
//       bottomScrollInterval = setInterval(() => {
//         if (sliderBottom) {
//           sliderBottom.scrollLeft -= 1;
//           if (sliderBottom.scrollLeft <= 0) {
//             sliderBottom.scrollLeft = sliderBottom.scrollWidth;
//           }
//         }
//       }, 7);
//     };

//     startScrollingTop();
//     startScrollingBottom();

//     return () => {
//       clearInterval(topScrollInterval); // CLEANUP ON UNMOUNT
//       clearInterval(bottomScrollInterval);
//     };
//   }, []);

//   return (
//     <div className="flex flex-col bg-black text-white items-center text-center">
//       <h2 className="font-bold text-4xl mt-10">Our Clients</h2>
//       <p>Meet our esteemed clients</p>
//       <div className="space-y-4 w-full">

//         {/* Top Slider */}
//         <div className="w-full overflow-hidden" ref={sliderRefTop}>
//           <div className="flex">
//             {Object.values(myLogos).map((image, index) => (
//               <img
//                 src={image}
//                 alt={`slider-${index}`}
//                 key={index}
//                 className="w-24 h-24 sm:w-24 sm:h-24 md:w-24 md:h-24 lg:w-32 lg:h-32 flex-shrink-0 mr-2"
//               />
//             ))}
            
//             {/* images duplicated to create an infinite loop */}
//             {Object.values(myLogos).map((image, index) => (
//               <img
//                 src={image}
//                 alt={`slider-duplicate-${index}`}
//                 key={`duplicate-${index}`}
//                 className="w-24 h-24 sm:w-24 sm:h-24 md:w-24 md:h-24 lg:w-32 lg:h-32 flex-shrink-0 mr-2"
//               />
//             ))}

//             {Object.values(myLogos).map((image, index) => (
//               <img
//                 src={image}
//                 alt={`slider-duplicate-${index}`}
//                 key={`duplicate-${index}`}
//                 className="w-24 h-24 sm:w-24 sm:h-24 md:w-24 md:h-24 lg:w-32 lg:h-32 flex-shrink-0 mr-2"
//               />
//             ))}

//             {Object.values(myLogos).map((image, index) => (
//               <img
//                 src={image}
//                 alt={`slider-duplicate-${index}`}
//                 key={`duplicate-${index}`}
//                 className="w-24 h-24 sm:w-24 sm:h-24 md:w-24 md:h-24 lg:w-32 lg:h-32 flex-shrink-0 mr-2"
//               />
//             ))}

//             {Object.values(myLogos).map((image, index) => (
//               <img
//                 src={image}
//                 alt={`slider-duplicate-${index}`}
//                 key={`duplicate-${index}`}
//                 className="w-24 h-24 sm:w-24 sm:h-24 md:w-24 md:h-24 lg:w-32 lg:h-32 flex-shrink-0 mr-2"
//               />
//             ))}
//           </div>
//         </div>



//         {/* Bottom Slider */}
//         <div className="w-full overflow-hidden" ref={sliderRefBottom}>
//           <div className="flex">
//             {Object.values(myLogos).map((image, index) => (
//               <img
//                 src={image}
//                 alt={`slider-${index}`}
//                 key={index}
//                 className="w-24 h-24 sm:w-24 sm:h-24 md:w-24 md:h-24 lg:w-32 lg:h-32 flex-shrink-0 mr-2"
//               />
//             ))}

//             {/* images duplicated to create an infinite loop */}
//             {Object.values(myLogos).map((image, index) => (
//               <img
//                 src={image}
//                 alt={`slider-duplicate-${index}`}
//                 key={`duplicate-${index}`}
//                 className="w-24 h-24 sm:w-24 sm:h-24 md:w-24 md:h-24 lg:w-32 lg:h-32 flex-shrink-0 mr-2"
//               />
//             ))}

//             {Object.values(myLogos).map((image, index) => (
//               <img
//                 src={image}
//                 alt={`slider-duplicate-${index}`}
//                 key={`duplicate-${index}`}
//                 className="w-24 h-24 sm:w-24 sm:h-24 md:w-24 md:h-24 lg:w-32 lg:h-32 flex-shrink-0 mr-2"
//               />
//             ))}

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Slider;
