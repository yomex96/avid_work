import { Link } from "react-router-dom";
import { portraitImage } from "../../assets/assets";

const PreWeddingFashion = () => {
  return (
    <>
      <div className="flex justify-center items-center w-full h-auto md:h-[640px] mt-32 mx-auto px-4 md:px-0">
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-12 w-full max-w-[945.23px] mx-auto">
          <div className="relative w-full md:w-[423px] h-[300px] md:h-[640px] mx-auto">
            <div className="bg-black relative w-[80%] h-[100%] md:h-[60%] mx-auto scale-125"></div>
            <img
              src={portraitImage.portrait}
              alt="portrait"
              className="absolute top-[4%] left-[15%] w-[80%] h-[100%] md:h-[60%] scale-125 object-cover"
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-8 w-full md:w-[480.23px] h-full md:h-full px-4 md:px-0 text-center md:text-left">
            <h2 className="mt-4 font-bold text-2xl">Prewedding Fashion</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
              eligendi sunt aperiam ipsa vero veniam velit architecto porro
              consectetur nihil. Sequi aliquid veniam magnam rem ratione labore
              at facere! Deleniti harum, itaque tempore voluptates officia
              doloremque sunt ex, dolorum sit sed, sapiente inventore non
              mollitia. Sequi minus cum ut in sint. Mollitia unde eaque omnis,
              accusamus dicta alias similique quas.
            </p>
            <div className="flex justify-center md:justify-start">
              {/* <Link to="/AllFashionPhotos"> */}

              <Link
  to="/AllFashionPhotos"
  state={{
    // serviceName: "Lifestyle",
    // categoryId: "b0bc699a-0397-4e65-8dfe-5c0e27718347"
      serviceName: "Prewedding",
    // categoryId: "6a422051-3872-402b-b766-93de2415b47c"
  }}
>
                <button className="hover:bg-avidBrown hover:text-white border-[2px] border-avidBrown rounded-full w-[224px] h-14 py-4 px-8 gap-2.5">
                  View
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 md:mt-[-80px] bg-black w-[400px] h-[1px] mx-auto" />
    </>
  );
};

export default PreWeddingFashion;


//Ben work

// import { Link } from "react-router-dom";
// import { portraitImage } from "../../assets/assets";

// const PreWeddingFashion = () => {
//   return (
//     <>
//       <div className="flex justify-center items-center w-full h-auto md:h-[640px] mt-32 mx-auto px-4 md:px-0">
//         <div className="flex flex-col md:flex-row justify-center items-stretch gap-12 w-full max-w-[945.23px] mx-auto">
//           <div className="relative w-full md:w-[423px] h-[300px] md:h-[640px] mx-auto">
//             <div className="bg-black relative w-[80%] h-[100%] md:h-[60%] mx-auto scale-125"></div>
//             <img
//               src={portraitImage.portrait}
//               alt="portrait"
//               className="absolute top-[4%] left-[15%] w-[80%] h-[100%] md:h-[60%] scale-125 object-cover"
//             />
//           </div>

//           <div className="flex flex-col justify-center items-center gap-8 w-full md:w-[480.23px] h-full md:h-full px-4 md:px-0 text-center md:text-left">
//             <h2 className="mt-4 font-bold text-2xl">Prewedding Fashion</h2>
//             <p>
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
//               eligendi sunt aperiam ipsa vero veniam velit architecto porro
//               consectetur nihil. Sequi aliquid veniam magnam rem ratione labore
//               at facere! Deleniti harum, itaque tempore voluptates officia
//               doloremque sunt ex, dolorum sit sed, sapiente inventore non
//               mollitia. Sequi minus cum ut in sint. Mollitia unde eaque omnis,
//               accusamus dicta alias similique quas.
//             </p>
//             <div className="flex justify-center md:justify-start">
//               <Link to="/AllFashionPhotos">
//                 <button className="hover:bg-avidBrown hover:text-white border-[2px] border-avidBrown rounded-full w-[224px] h-14 py-4 px-8 gap-2.5">
//                   View
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="mt-5 md:mt-[-80px] bg-black w-[400px] h-[1px] mx-auto" />
//     </>
//   );
// };

// export default PreWeddingFashion;
