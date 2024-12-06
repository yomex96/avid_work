import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import { portraitImage } from "../assets/assets";
import { useStoreContext } from "../context/StoreContext";

const Services = () => {
  const { services } = useStoreContext();

  console.log(services);

  // Handling loading or error state if services are not available
  if (!services) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full overflow-hidden">
      {/* Header Section */}
      <div className="flex flex-col justify-center w-full max-w-[1200px] mx-auto text-center items-center flex-wrap mt-32 gap-2.5 px-4">
        <h2 className="font-bold text-3xl">Our Services</h2>
        <div className="flex flex-col justify-center items-center text-center w-72 sm:w-96 md:w-full">
          {/* Portrait Photography -  Family, personal, and corporate portraits that showcase your personality.
         
            Event Photography - From weddings to corporate events, we capture every important event.

          Lifestyle Photography -  Unique moments captured in real-life settings for blogs, social media, and personal keepsakes.
            
            */}
          <p className="">
            Let us bring your visions into images and your style into memories
            that tell your story!
          </p>
        </div>
      </div>

      {/* Services Section */}
      <div className="flex flex-col items-center gap-12 py-12 px-6">
        {services.map((service, index) => (
          <div
            key={service._id}
            className="service-item text-center max-w-[700px] w-full"
          >
            <h3 className="font-bold text-2xl mt-4">{service.name}</h3>
            {service.categories &&
              service.categories.map((category) => (
                <div
                  key={category._id}
                  className={`category-item mt-6 flex flex-col md:flex-row items-center gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >

                   {/* Mobile-First Order 2: Text Description */}
                  {/* Text Description */}
                  <div
                    className={`flex flex-col order-3 md:order-2 items-center md:items-center w-full md:w-1/2 text-center md:text-center ${
                      index % 2 === 0 ? "" : "md:text-left md:items-end"
                    }`}
                  >
                    {/* <p>{category.name}</p> */}
                    
                    <p className="w-96 px-4">{category.description}</p>
                   
                   
                    {/* Mobile-First Order 3: Button */}
                    <div className="order-4 md:order-3">
                    <Link
                      to="/AllFashionPhotos"
                      state={{
                        serviceName: service.name,
                      }}
                    >

                      
                      <button className="inline-block border border-avidBrown rounded-full mt-3 py-4 px w-60 h-14 gap-2.5 hover:bg-avidBrown hover:text-white transition duration-300 ease-in-out">
                        {/* View All {service.name} */}
                        View
                      </button>
                    </Link>
                    </div>
                    
                  </div>

                  {/* Image */}
                  {/* <div className="relative w-full md:w-[423px] h-[300px] md:h-[640px] mx-auto">
                  <img
                    src={portraitImage.portrait1 || 'default-image.jpg'}
                    alt="portrait"
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div> */}

                 {/* Mobile-First Order 1: Image */}
                  <div className="relative mx-auto order-2 md:order-1">
                    <div className="bg-black w-72 sm:w-96 md:w-[400px] h-[460px] "></div>
                    <div>
                      <img 
                        src={ index % 2 === 0 ? portraitImage.portrait : portraitImage.portrait1 }
                        alt="portrait"
                        className="absolute top-4 left-4 w-72 sm:w-96 md:w-[400px] h-[460px] object-cover shadow-lg"
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>

      {/* Footer */}
      <Footer className={"mb-[-80px]"} />
    </div>
  );
};

export default Services;

// // back up

// import { useState, useEffect } from "react";
// import Footer from "../Components/Footer";
// import { Link } from "react-router-dom";
// import { portraitImage } from "../assets/assets";

// const Services = () => {
//   const [services, setServices] = useState([]);

//   // useEffect(() => {
//   //   const fetchServices = async () => {
//   //     try {
//   //       const response = await fetch("http://localhost:5000/api/services/media-services");
//   //       const data = await response.json();
//   //       setServices(data.mediaServices); // Corrected to match the data structure
//   //     } catch (error) {
//   //       console.error("Error fetching services:", error);
//   //     }
//   //   };

//   //   fetchServices();
//   // }, []);

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         // Determine the appropriate URL based on the hostname
//         const url =
//           window.location.hostname === "localhost"
//             ? "http://localhost:5000/api/services/media-services"
//             : "/api/services/media-services";

//         const response = await fetch(url);
//         const data = await response.json();
//         setServices(data.mediaServices); // Ensure this matches your API response structure
//       } catch (error) {
//         console.error("Error fetching services:", error);
//       }
//     };

//     fetchServices();
//   }, []);

//   return (
//     <div className="w-full overflow-hidden">
//       <div className="flex flex-col justify-center w-full max-w-[1200px] mx-auto text-center items-center flex-wrap mt-32 gap-2.5 px-4">
//         <h2 className="font-bold text-3xl">Our Services</h2>

//         <div className="flex flex-col justify-center items-center text-center w-[700px]">
//           <p className="text-center">
//             <span className="font-bold">Portrait Photography</span> - Family, personal, and corporate portraits that showcase your personality.
//           </p>
//           <p className="text-center">
//             <span className="font-bold">Event Photography</span> - From weddings to corporate events, we capture every important event.
//           </p>
//           <p className="text-center">
//             <span className="font-bold">Lifestyle Photography</span> - Unique moments captured in real-life settings for blogs, social media, and personal keepsakes. <br />
//             <br />
//           </p>
//           <p>Let us bring your visions into images and your style into memories that tell your story!</p>
//         </div>
//       </div>

//       <div className="flex flex-col items-center gap-12 py-12 px-6">
//   {services.map((service, index) => (
//     <div key={service._id} className="service-item text-center max-w-[700px] w-full">
//       <h3 className="font-bold text-2xl mt-4">{service.name}</h3>
//       {service.categories.map((category) => (
//         <div
//           key={category._id}
//           className={`category-item mt-6 flex flex-col md:flex-row items-center gap-8 ${
//             index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
//           }`}
//         >
//           {/* Text Description */}
//           <div
//             className={`flex flex-col items-center md:items-start w-full md:w-1/2 text-center md:text-left ${
//               index % 2 === 0 ? "" : "md:text-right md:items-end"
//             }`}
//           >
//             <p>{category.description}</p>

//             <Link
//               to="/AllFashionPhotos"
//               state={{
//                 serviceName: service.name,
//               }}
//             >
//               <button className="border border-avidBrown rounded-full py-4 px-8 w-72 h-14 gap-2.5 hover:bg-avidBrown hover:text-white transition duration-300 ease-in-out">
//                 View All {service.name}
//               </button>
//             </Link>
//           </div>

//           {/* Image */}
//           <div className="relative w-full md:w-[423px] h-[300px] md:h-[640px] mx-auto">
//             <img
//               src={portraitImage.portrait1}
//               alt="portrait"
//               className="w-full h-full object-cover rounded-lg shadow-lg"
//             />
//           </div>
//         </div>
//       ))}
//     </div>
//   ))}
// </div>

// <Footer className={"mb-[-80px]"} />

//     </div>
//   );
// };

// export default Services;

// one sided picture

// <div className="flex flex-col items-center gap-12 py-12 px-6">
// {services.map((service) => (
//   <div key={service._id} className="service-item text-center max-w-[700px] w-full">
//     <h3 className="font-bold text-2xl mt-4">{service.name}</h3>
//     {service.categories.map((category, index) => (
//       <div key={index} className="category-item mt-6 flex flex-col md:flex-row items-center gap-8">
//         <div className="flex flex-col items-center md:items-start w-full md:w-1/2">
//           <p className="text-center md:text-left">{category.description}</p>

//           <Link
//             to="/AllFashionPhotos"
//             state={{
//               // serviceName: "Brand Fashion",
//               serviceName: service.name,
//             }}
//           >
//             <button className="border border-avidBrown rounded-full py-4 px-8 w-72 h-14 gap-2.5 hover:bg-avidBrown hover:text-white transition duration-300 ease-in-out">
//               View All {service.name}
//             </button>
//           </Link>
//         </div>

//         {/* Right Div (Image) */}
//         <div className="relative w-full md:w-[423px] h-[300px] md:h-[640px] mx-auto">
//           <img
//             src={portraitImage.portrait1}
//             alt="portrait"
//             className="w-full h-full object-cover rounded-lg shadow-lg"
//           />
//         </div>
//       </div>
//     ))}
//   </div>
// ))}
// </div>

//yomex version

// import { useState, useEffect } from "react";
// import Footer from "../Components/Footer";

// const Services = () => {
//   const [services, setServices] = useState([]);

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/services/media-services");
//         const data = await response.json();
//         setServices(data.mediaServices); // Corrected to match the data structure
//       } catch (error) {
//         console.error("Error fetching services:", error);
//       }
//     };

//     fetchServices();
//   }, []);

//   return (
//     <div className="w-full overflow-hidden">
//       <div className="flex flex-col justify-center w-full max-w-[1200px] mx-auto text-center items-center flex-wrap mt-32 gap-2.5 px-4">
//         <h2 className="font-bold text-3xl">Our Services</h2>
//         <div className="flex flex-col justify-center items-center text-center w-[700px]">
//           <p className="text-center">
//             <span className="font-bold">Portrait Photography</span> - Family, personal, and corporate portraits that showcase your personality.
//           </p>
//           <p className="text-center">
//             <span className="font-bold">Event Photography</span> - From weddings to corporate events, we capture every important event.
//           </p>
//           <p className="text-center">
//             <span className="font-bold">Lifestyle Photography</span> - Unique moments captured in real-life settings for blogs, social media, and personal keepsakes. <br />
//             <br />
//           </p>
//           <p>Let us bring your visions into images and your style into memories that tell your story!</p>
//         </div>
//       </div>

//       <div className="flex flex-col items-center gap-12 py-12 px-6">
//         {services.map((service) => (
//           <div key={service._id} className="service-item text-center max-w-[700px] w-full">
//             <h3 className="font-bold text-2xl mt-4">{service.name}</h3>
//             {service.categories.map((category, index) => (
//               <div key={index} className="category-item mt-6">
//                 {/* <h4 className="text-xl font-semibold">{category.name}</h4> */}
//                 <p>{category.description}</p>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>

//       <Footer className={"mb-[-80px]"} />
//     </div>
//   );
// };

// export default Services;

//ben work

// import Footer from "../Components/Footer"
// import BrandFashion from "../Components/ServicesComponents/BrandFashion"
// import LifeStyleFashion from "../Components/ServicesComponents/LifeStyleFashion"
// import PreWeddingFashion from "../Components/ServicesComponents/PreWeddingFashion"

// const Services = () => {
//   return (
//     <div className="w-full overflow-hidden">
//       <div className='flex flex-col justify-center w-full max-w-[1200px] mx-auto text-center items-center flex-wrap mt-32 gap-2.5 px-4'>
//         <h2 className='font-bold text-3xl'>
//           Our Services
//         </h2>

//         <div className="flex flex-col justify-center items-center text-center w-[700px]">
//           <p className="text-center">
//             <span className="font-bold">
//               {/* &#x2022;  */}
//               Portrait Photography</span> -
//             Family, personal and corporate portraits that showcase your
//             personality
//           </p>
//           {/* <br /> */}
//           <p className="text-center">
//             <span className="font-bold">
//               {/* &#x2022;  */}
//               Event photography</span> - From
//             weddings to corporate events, we capture every important event.
//           </p>
//           {/* <br /> */}
//           <p className="text-center">
//             <span className="font-bold">
//               {/* &#x2022;  */}
//               Lifestyle Photography </span>-
//             Unique moments captured in real-life settings for blogs, social
//             media and personal keepsakes. <br />
//             <br />
//           </p>
//           <p>
//             Let us bring your visions into images and your style into memories
//             that tell your story!
//           </p>
//         </div>
//       </div>

//       <div className="flex flex-col items-center gap-12 py-12 px-6">
//         <LifeStyleFashion />
//         <BrandFashion />
//         <PreWeddingFashion />

//       </div>

//       <Footer className={'mb-[-80px]'} />
//     </div>
//   )
// }

// export default Services
