import { LoaderIcon } from "react-hot-toast";

const LoaderCompProfile = () => {
  return (
    <div>
      <div className="bg-gray-200 rounded-md w-40 h-6 mb-4 bgOverlayEffect"></div>
      <div className="animate-pulse flex justify-between"></div>

      <div className="relative flex justify-between">
        <div className="animate-pulse">
          <div className="bg-gray-200 rounded-md w-96 h-10 mb-4 bgOverlayEffect"></div>
          <div className="bg-gray-200 rounded-md w-96 h-10 mb-4 bgOverlayEffect"></div>
          <div className="bg-gray-200 rounded-md w-96 h-10 mb-4 bgOverlayEffect"></div>
          <div className="bg-gray-200 rounded-md w-96 h-10 mb-4 bgOverlayEffect"></div>
          <div className="bg-gray-200 rounded-md w-96 h-10 mb-4 bgOverlayEffect"></div>
        </div>
        <div className="absolute left-[392px] top-10 flex flex-col justify-center items-center">
          <img
            src="AvidLogo.png"
            className="absolute w-48 top-6 animate-bounce"
            alt=""
          />
          <LoaderIcon className="animate-spin mt-3 size-32" />
          <h2 className="animate-ping text-lg text-center">Loading...</h2>
        </div>

        <div className="animate-pulse">
          <div className="bg-gray-200 rounded-md w-96 h-10 mb-4 bgOverlayEffect"></div>
          <div className="bg-gray-200 rounded-md w-96 h-10 mb-4 bgOverlayEffect"></div>
          <div className="bg-gray-200 rounded-md w-96 h-10 mb-4 bgOverlayEffect"></div>
          <div className="bg-gray-200 rounded-md w-96 h-10 mb-4 bgOverlayEffect"></div>
          <div className="bg-gray-200 rounded-md w-96 h-10 mb-4 bgOverlayEffect"></div>
        </div>
      </div>

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

export default LoaderCompProfile;
