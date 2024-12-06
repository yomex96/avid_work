import { LoaderIcon } from "react-hot-toast";

const LoaderComp = () => {
  return (
    <div>
      <div className="bg-gray-200 rounded-md w-40 h-6 mb-4 bgOverlayEffect"></div>
      <div className="animate-pulse flex justify-between">
        <div className="bg-gray-200 rounded-md w-44 h-28 mb-4 bgOverlayEffect"></div>
        
        <div className="bg-gray-200 rounded-md w-44 h-28 mb-4 bgOverlayEffect"></div>
        <div className="bg-gray-200 rounded-md w-44 h-28 mb-4 bgOverlayEffect"></div>
        <div className="bg-gray-200 rounded-md w-44 h-28 mb-4 bgOverlayEffect"></div>
        <div className="bg-gray-200 rounded-md w-44 h-28 mb-4 bgOverlayEffect"></div>
        {/* <div className="bg-gray-700 rounded-md w-40 h-6 mb-4 bgOverlayEffect"></div>
        <div className="bg-gray-700 rounded-md w-full h-9 mb-4 bgOverlayEffect"></div>
        <div className="bg-gray-700 rounded-md w-3/4 h-6 mb-2 bgOverlayEffect"></div>
        <div className="bg-gray-700 rounded-md w-1/2 h-6 mb-4 bgOverlayEffect"></div>
        <div className="bg-gray-700 rounded-md w-full h-2 mb-24 bgOverlayEffect"></div> */}
      </div>

      <div className="flex justify-center items-center mt relative">
        <img
          src="AvidLogo.png"
          className="absolute w-48 top-1 animate-bounce"
          alt=""
        />
        <LoaderIcon className="animate-spin mt-3 size-32" />
      </div>
      <h2 className="animate-ping text-xl text-center mt-4">Loading...</h2>

      <div className="animate-pulse">
        <div className="bg-gray-200 rounded-md w-40 h-6 mb-4 bgOverlayEffect"></div>
        <div className="bg-gray-200 rounded-md w-full h-9 mb-4 bgOverlayEffect"></div>
        <div className="bg-gray-200 rounded-md w-3/4 h-6 mb-2 bgOverlayEffect"></div>
        <div className="bg-gray-200 rounded-md w-1/2 h-6 mb-4 bgOverlayEffect"></div>
        <div className="bg-gray-200 rounded-md w-full h-2 mb-24 bgOverlayEffect"></div>
        <div className="bg-gray-200 rounded-md w-full h-9 mb-4 bgOverlayEffect"></div>
        <div className="bg-gray-200 rounded-md w-full h-2 mb-24 bgOverlayEffect"></div>
      </div>
    </div>
  );
};

export default LoaderComp;
