// import { X } from 'lucide-react';
// import { useState } from 'react';

// const ServicePopup = ({ onCreateService, onClose }) => {
//   const [newServiceName, setNewServiceName] = useState('');

//   const handleContinueClick = () => {
//     onCreateService(newServiceName);
//     onClose(); // Close the popup after creating the service (optional)
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="relative bg-white rounded-lg shadow-lg p-6 w-96 flex flex-col items-center justify-center text-center">
//         {/* Close button */}
//         {/* <button
//           className="absolute top-2 right-2 hover:bg-red-100 text-red-600 p-2 rounded-full"
//           onClick={onClose}
//         >
//           <X />
//         </button> */}

//         {/* Popup content */}
//         <h2 className="font-bold mb-4">Add New Service</h2>
//         <input
//           type="text"
//           value={newServiceName}
//           onChange={(e) => setNewServiceName(e.target.value)}
//           placeholder="Name of Service"
//           className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-gray-50"
//         />
//         <button
//           onClick={handleContinueClick}
//           className="px-4 py-2 w-full bg-black text-white rounded-full hover:bg-[#c5a592]"
//         >
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ServicePopup;




import { X } from 'lucide-react';
import { useState } from 'react';

const ServicePopup = ({ onCreateService, onClose }) => {
  const [newServiceName, setNewServiceName] = useState('');

  const handleContinueClick = async () => {
    // Prepare the payload for the POST request
    const payload = {
      name: newServiceName
    };

    try {
      // Send the POST request to your backend API
      const response = await fetch('http://localhost:5000/api/services/name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Handle the response
      if (response.ok) {
        const data = await response.json();
        console.log('Service created successfully:', data);
        onCreateService(newServiceName); // Call onCreateService callback to update the state in the parent component
        onClose(); // Close the popup after creating the service
      } else {
        const errorData = await response.json();
        console.error('Error creating service:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-96 flex flex-col items-center justify-center text-center">
        {/* Close button */}
        <button
          className="absolute top-2 right-2 hover:bg-red-100 text-red-600 p-2 rounded-full"
          onClick={onClose}  // Make sure this triggers the onClose function passed as prop
        >
          <X />
        </button>

        {/* Popup content */}
        <h2 className="font-bold mb-4">Add New Service</h2>
        <input
          type="text"
          value={newServiceName}
          onChange={(e) => setNewServiceName(e.target.value)}
          placeholder="Name of Service"
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-gray-50"
        />
        <button
          onClick={handleContinueClick}
          className="px-4 py-2 w-full bg-black text-white rounded-full hover:bg-[#c5a592]"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ServicePopup;
