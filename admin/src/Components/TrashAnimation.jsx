import { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';

const TrashAnimation = () => {
  const [showItems, setShowItems] = useState(false);

  useEffect(() => {
    // Start the animation after component mounts
    setShowItems(true);
  }, []);

  return (
    <div className="relative flex flex-col items-center">
      {/* Trash icon */}
      <FaTrash size={48} className="text-red-600" />

      {/* Items that enter the trash */}
      <div className="relative w-8 h-8 mt-2">
        {showItems && (
          <>
            <div className="absolute right-6 bg-blue-500 w-4 h-4 rounded-full animate-enterItem"></div>
            <div className="absolute right-6 bg-green-500 w-4 h-4 rounded-full animate-enterItem" style={{ animationDelay: '0.2s' }}></div>
            <div className="absolute right-6 bg-gray-500 w-4 h-4 rounded-full animate-enterItem" style={{ animationDelay: '0.4s' }}></div>
            <div className="absolute right-6 bg-green-500 w-4 h-4 rounded-full animate-enterItem" style={{ animationDelay: '0.6s' }}></div>
            <div className="absolute right-6 bg-gray-500 w-4 h-4 rounded-full animate-enterItem" style={{ animationDelay: '0.8s' }}></div>
            <div className="absolute right-6 bg-green-500 w-4 h-4 rounded-full animate-enterItem" style={{ animationDelay: '1s' }}></div>
            <div className="absolute right-6 bg-gray-500 w-4 h-4 rounded-full animate-enterItem" style={{ animationDelay: '1.2s' }}></div>
            <div className="absolute right-6 bg-gray-500 w-4 h-4 rounded-full animate-enterItem" style={{ animationDelay: '1.4s' }}></div>
            <div className="absolute right-6 bg-green-500 w-4 h-4 rounded-full animate-enterItem" style={{ animationDelay: '1.6s' }}></div>
            <div className="absolute right-6 bg-gray-500 w-4 h-4 rounded-full animate-enterItem" style={{ animationDelay: '1.8s' }}></div>
            <div className="absolute right-6 bg-green-500 w-4 h-4 rounded-full animate-enterItem" style={{ animationDelay: '2s' }}></div>
            <div className="absolute right-6 bg-gray-500 w-4 h-4 rounded-full animate-enterItem" style={{ animationDelay: '2.2s' }}></div>
            <div className="absolute right-6 bg-gray-500 w-4 h-4 rounded-full animate-enterItem" style={{ animationDelay: '2.4s' }}></div>
            <div className="absolute right-6 bg-green-500 w-4 h-4 rounded-full animate-enterItem" style={{ animationDelay: '2.6s' }}></div>
            <div className="absolute right-6 bg-gray-500 w-4 h-4 rounded-full animate-enterItem" style={{ animationDelay: '2.8s' }}></div>
            <div className="absolute right-6 bg-gray-500 w-4 h-4 rounded-full animate-enterItem" style={{ animationDelay: '3s' }}></div>
          </>
        )}
      </div>
    </div>
  );
};

export default TrashAnimation;
