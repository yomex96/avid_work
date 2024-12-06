
// import { useState, useEffect } from "react";
// import { ChevronRight, RotateCw, Trash2, X } from "lucide-react";
// import { MdAdd } from "react-icons/md";
// import { GoSortDesc } from "react-icons/go";
// import { LiaEdit } from "react-icons/lia"; 
// import { FaRedoAlt } from "react-icons/fa";
// import ServicePopup from "../Components/ServicesPopup";

// const Services = () => {
//   const [contentChanged, setContentChanged] = useState(false);
//   const [selectedService, setSelectedService] = useState(""); 
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//   });
//   const [isEditing, setIsEditing] = useState(false); // Track if editing mode is active
//   const [videos, setVideos] = useState([]); // Array to store uploaded videos
//   const [sortOption, setSortOption] = useState("date"); // State to track sorting option
//   const [showSortDropdown, setShowSortDropdown] = useState(false); // To show/hide the dropdown
//   const [selectedVideos, setSelectedVideos] = useState([]); // Array to track selected videos

//   const [showPopup, setShowPopup] = useState(false);
//   const [services, setServices] = useState([]);

//     const [loading, setLoading] = useState(true); 
//   const [error, setError] = useState(null);



//   // States for tracking the upload status and message
// const [uploadStatus, setUploadStatus] = useState(null); 
// const [uploadMessage, setUploadMessage] = useState(''); 

// // STATES FOR DELETE CONFIRMATION
// const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [serviceToDelete, setServiceToDelete] = useState(null);

//   // Function to handle delete button click
//   const handleDeleteClick = (serviceName, e) => {
//     e.stopPropagation(); // Prevent button click from triggering service selection
//     setServiceToDelete(serviceName);
//     setShowDeleteConfirm(true);
//   };


//   const handleDeleteConfirm = async () => {
//     try {
//       // Log the process start
//       console.log("Starting the delete process...");
  
//       // Check if serviceToDelete is defined
//       if (!serviceToDelete) {
//         console.error("No service selected for deletion.");
//         return;
//       }
  
//       console.log("Service selected for deletion:", serviceToDelete);
  
//       // Define the API URL (ensure selectedService is the name or ID of the service)
//       const apiUrl = `http://localhost:5000/api/services/${serviceToDelete}`;
//       console.log("API URL:", apiUrl);
  
//       // Make the DELETE API call
//       console.log("Sending DELETE request...");
//       const response = await fetch(apiUrl, {
//         method: 'DELETE',
//       });
  
//       console.log("DELETE request completed. Status code:", response.status);
  
//       // Check if the response is okay
//       if (response.ok) {
//         // Log success and parse response if necessary
//         const responseData = await response.json();
//         console.log("Service successfully deleted. Response data:", responseData);
  
//         // Update the local state to remove the deleted service
//         setServices(services.filter(service => service !== serviceToDelete));
//         console.log("Local state updated. Remaining services:", services);
//       } else {
//         console.error("Error deleting service. Status text:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error during service deletion:", error);
//     } finally {
//       console.log("Resetting UI state...");
  
//       // Close the confirmation dialog and reset serviceToDelete
//       setShowDeleteConfirm(false);
//       setServiceToDelete(null);
  
//       console.log("Delete process completed.");
//     }
//   };
  

//   // Function to handle cancel
//   const handleDeleteCancel = () => {
//     setShowDeleteConfirm(false);
//     setServiceToDelete(null);
//   };

//   const handleNewServiceClick = () => {
//     setShowPopup(true);
//   };

//   const handleNewServiceCreate = (newServiceName) => {
//     setServices([...services, newServiceName]);
//     console.log("New Service:", newServiceName);
//     setShowPopup(false);
//     // Save the new service to localStorage or other storage
//   };

//   // Load saved data and videos from localStorage on component mount
//   useEffect(() => {
//     const savedData = localStorage.getItem("savedServiceData");
//     if (savedData) {
//       setFormData(JSON.parse(savedData));
//     }

//     // Load saved videos from localStorage
//     const savedVideos = localStorage.getItem(`${selectedService}_videos`);
//     if (savedVideos) {
//       setVideos(JSON.parse(savedVideos));
//     }
//   }, [selectedService]);

//   // Function to handle button click to show new content and set dynamic content
//   const handleButtonClick = (serviceName) => {
//     setContentChanged(true);
//     setSelectedService(serviceName);

//     // Load previously saved data or set default values
//     const savedData = localStorage.getItem(`${serviceName}_data`);
//     if (savedData) {
//       setFormData(JSON.parse(savedData));
//     } else {
//       setFormData({
//         name: serviceName + " Name",
//         description: serviceName + " Service Description",
//       });
//     }

//     // Load saved videos when switching service
//     const savedVideos = localStorage.getItem(`${serviceName}_videos`);
//     if (savedVideos) {
//       setVideos(JSON.parse(savedVideos));
//     } else {
//       setVideos([]); // Reset videos if none exist
//     }
//   };

//   // Function to handle going back to previous content
//   const handleBackClick = () => {
//     setContentChanged(false);
//     setIsEditing(false); // Reset edit mode when going back
//     setSelectedVideos([]); // Clear selected videos
//   };

  


// const handleSaveClick = async () => {
//   try {
//     // Save the data to localStorage
//     localStorage.setItem(`${selectedService}_data`, JSON.stringify(formData));
//     setIsEditing(false); // Exit edit mode after saving

//     // Build the dynamic API URL using selectedService
//     const apiUrl = `http://localhost:5000/api/services/media-services/${selectedService}/category/${selectedService}`;

//       const response = await fetch(apiUrl, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData),
//     });

//     // Check if the response is successful
//     if (response.ok) {
//       const data = await response.json();
//       console.log('Data saved successfully:', data);
//       // You can add success notifications or further logic here
//     } else {
//       console.error('Error saving data:', response.statusText);
//     }
//   } catch (error) {
//     console.error('Error during API request:', error);
//   }
// };

// const handleEditClick = async () => {
//   try {
//     setIsEditing(true); // Enter edit mode

//     // Build the dynamic API URL using selectedService
//     const apiUrl = `http://localhost:5000/api/services/media-services/${selectedService}/category/${selectedService}`;

//     // Send the data to the backend when editing starts
//     const response = await fetch(apiUrl, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData), // Sending form data to backend
//     });

//     // Check if the response is successful
//     if (response.ok) {
//       const data = await response.json();
//       console.log('Data updated successfully:', data);
//       // Handle the success as needed
//     } else {
//       console.error('Error updating data:', response.statusText);
//     }
//   } catch (error) {
//     console.error('Error during API request:', error);
//   }
// };




// const handleVideoUpload = async (e) => {
//   // Set initial loading state
//   setUploadStatus('uploading'); // Show uploading status

//   try {
//     const uploadedFiles = e.target.files;
//     const formData = new FormData();

//     // Append each file to the FormData object
//     Array.from(uploadedFiles).forEach((file) => {
//       formData.append('video', file); // The 'video' field matches the backend's expected field name
//     });

//     // Set the dynamic API URL for video upload
//     const apiUrl = `http://localhost:5000/api/services/upload/video/${selectedService}/${selectedService}`;

//     // Send the video data to the backend
//     const response = await fetch(apiUrl, {
//       method: 'POST',
//       body: formData, // Send formData containing the uploaded video files
//     });

//     // Check if the response is successful
//     if (response.ok) {
//       const data = await response.json();
//       console.log('Video uploaded successfully:', data);

//       // Save to local state if needed
//       const newVideo = {
//         filename: data.video.filename,
//         url: data.video.url,
//         s3Key: data.video.s3Key,
//         _id: data.video._id,
//         createdAt: new Date(data.video.createdAt), // Convert ISO date string to Date object
//         updatedAt: new Date(data.video.updatedAt),
//       };

//       // Update state with new video details
//       setVideos((prevVideos) => [...prevVideos, newVideo]);

//       // Save to localStorage
//       const storedVideos = JSON.parse(localStorage.getItem(`${selectedService}_videos`)) || [];
//       storedVideos.push(newVideo); // Add new video details to the stored list
//       localStorage.setItem(`${selectedService}_videos`, JSON.stringify(storedVideos));

//       // Set successful upload status
//       setUploadStatus('success');
//       setUploadMessage('Video uploaded successfully!'); // Success message

//     } else {
//       console.error('Error uploading video:', response.statusText);
//       setUploadStatus('failed');
//       setUploadMessage('Video upload failed. Please try again.'); // Error message
//     }
//   } catch (error) {
//     console.error('Error during video upload:', error);
//     setUploadStatus('failed');
//     setUploadMessage('An error occurred while uploading the video.'); // Error message
//   }
// };

  


//   // Function to toggle the sorting dropdown
//   const toggleSortDropdown = () => {
//     setShowSortDropdown((prev) => !prev);
//   };

//   // Function to handle sorting videos by selected option
//   const handleSort = (option) => {
//     setSortOption(option);

//     const sortedVideos = [...videos];
//     if (option === "asc") {
//       sortedVideos.sort((a, b) => new Date(a.date) - new Date(b.date));
//     } else if (option === "desc") {
//       sortedVideos.sort((a, b) => new Date(b.date) - new Date(a.date));
//     }

//     setVideos(sortedVideos);
//     setShowSortDropdown(false); // Close the dropdown after sorting
//   };

//   // Function to handle selection of videos for deletion
//   const handleVideoSelect = (index) => {
//     setSelectedVideos(
//       (prev) =>
//         prev.includes(index)
//           ? prev.filter((i) => i !== index) // Deselect
//           : [...prev, index] // Select
//     );
//   };

 


//   const handleDeleteVideos = async () => {
//     // Set initial loading state
//     setUploadStatus('deleting'); // Show deleting status
  
//     try {
//       // Collect the s3Key of the selected video (sending one at a time)
//       const selectedVideoKeys = selectedVideos.map((index) => {
//         const videoS3Key = videos[index].s3Key; 
//         return videoS3Key;
//       });
  
//       // Loop through each selected video and send a delete request one by one
//       for (const s3Key of selectedVideoKeys) {
//         const requestBody = { s3key: s3Key };
//         console.log("Request body sent to backend:", JSON.stringify(requestBody));
  
//         // Make an API request to delete the selected video using its s3Key
//         const apiUrl = `http://localhost:5000/api/services/media/${selectedService}/category/${selectedService}/video`;
//         const response = await fetch(apiUrl, {
//           method: 'DELETE',
//           body: JSON.stringify(requestBody), 
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
  
//         if (response.ok) {
//           const data = await response.json();
//           console.log('Video deleted successfully:', data);
  
//           // Update state to remove deleted video based on its s3Key
//           const updatedVideos = videos.filter(
//             (video) => video.s3Key !== s3Key
//           );
//           setVideos(updatedVideos);
  
//           // Save the updated video list to localStorage
//           localStorage.setItem(`${selectedService}_videos`, JSON.stringify(updatedVideos));
  
//           // Clear selected videos after deletion
//           setSelectedVideos([]);
  
//           // Set successful deletion status
//           setUploadStatus('success');
//           setUploadMessage('Videos deleted successfully!');
//         } else {
//           console.error('Error deleting video:', response.statusText);
//           setUploadStatus('failed');
//           setUploadMessage('Video deletion failed. Please try again.');
//         }
//       }
//     } catch (error) {
//       console.error('Error during video deletion:', error);
//       setUploadStatus('failed');
//       setUploadMessage('An error occurred while deleting the videos.');
//     }
//   };
  
  


//   useEffect(() => {
//     // Fetch services from the API
//     fetch('http://localhost:5000/api/services/media-services') // Adjust the API endpoint if needed
//       .then((response) => response.json()) // Parse JSON response
//       .then((data) => {
//         console.log(data); // Log the fetched data for debugging
//         if (data && Array.isArray(data.mediaServices)) {
//           // Extract only the 'name' from each service in the mediaServices array
//           const serviceNames = data.mediaServices.map(service => service.name);
//           setServices(serviceNames); // Update state with the names
//         } else {
//           console.error('Fetched data is not in the expected format:', data);
//         }
//       })
//       .catch((error) => {
//         setError(error.message); // Set error state if fetch fails
//         console.error('Error fetching services:', error);
//       })
//       .finally(() => {
//         setLoading(false); // Set loading to false once the fetch is complete
//       });
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>; // Show loading text while fetching data
//   }

//   if (error) {
//     return <div>Error: {error}</div>; // Show error message if fetch fails
//   }




  



//   // If content has changed, display dynamic content with inputs
//   if (contentChanged) {
//     return (
//       <div className="relative">
//         {/* Top Section with Back Button, ChevronRight, and Service Name */}
//         <div className="flex items-center justify-between pb-2 mt-[-10px] gap-2 mb-4 border-b border-black">
//           <div className="flex items-center gap-2">
//             <button
//               onClick={handleBackClick}
//               className="text-black font-bold hover:underline hover:text-amber-700"
//             >
//               Services
//             </button>
//             <ChevronRight className="text-black" />
//             <span className="font-bold">{selectedService}</span>
//           </div>
//           <RotateCw />
//         </div>

//         <div className="flex flex-row justify-end">
//           <button
//             onClick={handleDeleteVideos}
//             className="flex bg-red-500 text-white rounded-full px-4 py-2 gap-2 hover:bg-white border border-red-500 hover:text-red-500 hover:font-bold"
//             disabled={selectedVideos.length === 0} // Disable if no videos selected
//           >
//             <Trash2 />
//             Delete
//           </button>
//         </div>
//         <h2 className="bg-[#E4D5CD] p-3 my-6 text-2xl font-bold">Details</h2>




//         {/* Form Fields */}
//         <div className="flex flex-col gap-4">
//           <div className="flex flex-col w-full relative">
//             <label className="absolute px-1 bg-white left-1 bottom-7 mb-1 font-semibold">
//               Name
//             </label>
//             <input
//               type="text"
//               value={formData.name}
//               className="border border-gray-300 p-2 rounded w-full"
//               onChange={(e) =>
//                 setFormData({ ...formData, name: e.target.value })
//               }
//               readOnly={!isEditing}
//             />
//           </div>

//           <div className="flex flex-col w-full">
//             <label className="absolute px-1 bg-white left-1 top-60 mb-1 font-semibold">
//               Service Description
//             </label>
//             <input
//               type="text"
//               value={formData.description}
//               className="border border-gray-300 p-2 rounded w-full"
//               onChange={(e) =>
//                 setFormData({ ...formData, description: e.target.value })
//               }
//               readOnly={!isEditing}
//             />
//           </div>

//           <div className="flex justify-end">
//             {isEditing ? (
//               <button
//                 type="button"
//                 onClick={handleSaveClick}
//                 className="w-44 mt-6 text-white bg-green-900 px-4 py-3 rounded-full"
//               >
//                 Save Changes
//               </button>
//             ) : (
//               <button
//                 type="button"
//                 onClick={handleEditClick}
//                 className="flex gap-2 items-center w-24 mt-6 text-black border border-black bg-white px-4 py-3 rounded-full"
//               >
//                 Edit
//                 <LiaEdit className="size-6" />
//               </button>
//             )}
//           </div>
//         </div>




//         {/* Dynamic H2 with the service name */}
//         <h2 className="bg-[#E4D5CD] p-3 mt-6 text-2xl font-bold">
//           {selectedService} Videos
//         </h2>



//         {/* Add and Sort Buttons */}
//         <div className="flex justify-end gap-4 my-4">
//           <label className="flex items-center gap-2 border rounded-full py-2 px-6 bg-[#333333] text-white cursor-pointer">
//             <MdAdd />
//             Add
//             <input
//               type="file"
//               accept="video/*"
//               className="hidden"
//               multiple
//               onChange={handleVideoUpload}
//             />
//           </label>
//              {/* Displaying Upload Status */}
// {uploadStatus === 'uploading' && <p>Uploading video, please wait...</p>}
// {uploadStatus === 'success' && <p style={{ color: 'green' }}></p>}
// {uploadStatus === 'failed' && <p style={{ color: 'red' }}></p>}

// {/* Displaying Deleting Status */}
// {uploadStatus === 'deleting' && <p>Deleting videos, please wait...</p>}
// {uploadStatus === 'success' && <p style={{ color: 'green' }}></p>}
// {uploadStatus === 'failed' && <p style={{ color: 'red' }}></p>}
        

//           <div className="relative">
//             <button
//               className="flex items-center border rounded-full py-2 px-6 bg-white text-black"
//               onClick={toggleSortDropdown}
//               onBlur={() => setShowSortDropdown(false)} 
//             >
//               <GoSortDesc />
//               Sort By
//             </button>
//             {showSortDropdown && (
//               <div className="absolute right-0 z-10 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
//                 <button
//                   onClick={() => handleSort("asc")}
//                   className="block w-full text-left px-4 py-2 hover:bg-gray-200"
//                 >
//                   Date Ascending
//                 </button>
//                 <button
//                   onClick={() => handleSort("desc")}
//                   className="block w-full text-left px-4 py-2 hover:bg-gray-200"
//                 >
//                   Date Descending
//                 </button>
//                 <button
//                   onClick={() => handleSort("name")}
//                   className="block w-full text-left px-4 py-2 hover:bg-gray-200"
//                 >
//                   Name
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>




//         {/* Display Uploaded Videos */}

//         <div className="grid grid-cols-4 gap-4">
//   {videos.map((video, index) => (
//     <div
//       key={index}
//       className="flex items-center justify-between border-b p-2"
//     >
//       <input
//         type="checkbox"
//         checked={selectedVideos.includes(index)}
//         onChange={() => handleVideoSelect(index)}
//       />
//       <div className="flex-grow ml-2 cursor-pointer">
//         <video
//           src={video.url}
//           controls
//           className="w-full h-32"
//           onClick={(e) => e.stopPropagation()} 
//         />
//         {/* <p>{video.filename}</p> */}

//         {/* Format date */}
//         <p>
//           {isNaN(new Date(video.createdAt).getTime()) 
//             ? 'Invalid date' 
//             : new Date(video.createdAt).toLocaleDateString()}
//         </p>
//       </div>
      

//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }




//   // Render service buttons if content hasn't changed
//   return (
//     <div className="flex flex-col gap-2">
//       <div className="py-2 flex items-center border-b border-black justify-between">
//         <h2 className="font-bold text-2xl mt-[-30px]">Services</h2>
//         {/* <FaRedoAlt className="mt-[-25px] cursor-pointer" /> */}
//       </div>

//       <div className="flex gap-4 justify-end">
//         <div className="flex flex-row justify-end">
         
//         </div>
//         <button
//           onClick={handleNewServiceClick}
//           className="flex items-center gap-2 border rounded-full py-2 px-6 text-white bg-[#333333]"
//         >
//           <MdAdd />
//           New
//         </button>
//         {showPopup && <ServicePopup onCreateService={handleNewServiceCreate} />}
        

//         <button className="flex pl-4 border rounded-full py-2 px-20 text-black border-black">
//           <GoSortDesc className="cursor-pointer absolute size-7 right-12 top-[110px]" />
//           Sort by
//         </button>
//       </div>


      
    



//       {/* NEWLY ADDED BUTTONS */} 
//       <div className="flex flex-col gap-2">
//           {services.map((service) => (
//             <button 
//             className=""
//             key={service} 
//             onClick={() => handleButtonClick(service)}>
//               <div className="flex justify-between w-96 text-left border p-4 bg-gray-200 hover:bg-gray-300">
//               <div className="flex gap-3">
//               <Trash2 
//                 onClick={(e) => handleDeleteClick(service, e)}
//                 className="text-gray-300 hover:text-red-600" 
//               />
//               {service}
//               </div>
//                 <ChevronRight /></div>
//             </button>
//           ))}
//         </div>
        
//         {/* Custom Delete Confirmation Dialog */}
//       {showDeleteConfirm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold">Delete Service</h3>
//               <button
//                 onClick={handleDeleteCancel}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X size={20} />
//               </button>
//             </div>
            
//             <p className="text-gray-600 mb-6">
//               Are you sure you want to delete "{selectedService}"? This action cannot be undone.
//             </p>
            
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={handleDeleteCancel}
//                 className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDeleteConfirm}
//                 className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// export default Services;
























import { useState, useEffect } from "react";
import { ChevronRight, RotateCw, Trash2, X } from "lucide-react";
import { MdAdd } from "react-icons/md";
import { GoSortDesc } from "react-icons/go";
import { LiaEdit } from "react-icons/lia"; 
import { FaRedoAlt } from "react-icons/fa";
import ServicePopup from "../Components/ServicesPopup";

const Services = () => {
  const [contentChanged, setContentChanged] = useState(false);
  const [selectedService, setSelectedService] = useState(""); 
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false); 
  const [videos, setVideos] = useState([]); 
  const [sortOption, setSortOption] = useState("date"); 
  const [showSortDropdown, setShowSortDropdown] = useState(false); 
  const [selectedVideos, setSelectedVideos] = useState([]); 

  const [showPopup, setShowPopup] = useState(false);
  const [services, setServices] = useState([]);


    const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);


  const [serviceNames, setServiceNames] = useState([]);
  const [videoUrls, setVideoUrls] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(true); 


  // States for tracking the upload status and message
const [uploadStatus, setUploadStatus] = useState(null); 
const [uploadMessage, setUploadMessage] = useState(''); 

// STATES FOR DELETE CONFIRMATION
const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  // Function to handle delete button click
  const handleDeleteClick = (serviceName, e) => {
    e.stopPropagation(); // Prevent button click from triggering service selection
    setServiceToDelete(serviceName);
    setShowDeleteConfirm(true);
  };


  const handleDeleteConfirm = async () => {
    try {
      // Log the process start
      console.log("Starting the delete process...");
  
      // Check if serviceToDelete is defined
      if (!serviceToDelete) {
        console.error("No service selected for deletion.");
        return;
      }
  
      console.log("Service selected for deletion:", serviceToDelete);
  
      // Define the API URL (ensure selectedService is the name or ID of the service)
      const apiUrl = `http://localhost:5000/api/services/${serviceToDelete}`;
      console.log("API URL:", apiUrl);
  
      // Make the DELETE API call
      console.log("Sending DELETE request...");
      const response = await fetch(apiUrl, {
        method: 'DELETE',
      });
  
      console.log("DELETE request completed. Status code:", response.status);
  
      // Check if the response is okay
      if (response.ok) {
        // Log success and parse response if necessary
        const responseData = await response.json();
        console.log("Service successfully deleted. Response data:", responseData);
  
        // Update the local state to remove the deleted service
        setServices(services.filter(service => service !== serviceToDelete));
        console.log("Local state updated. Remaining services:", services);
      } else {
        console.error("Error deleting service. Status text:", response.statusText);
      }
    } catch (error) {
      console.error("Error during service deletion:", error);
    } finally {
      console.log("Resetting UI state...");
  
      // Close the confirmation dialog and reset serviceToDelete
      setShowDeleteConfirm(false);
      setServiceToDelete(null);
  
      console.log("Delete process completed.");
    }
  };
  

  // Function to handle cancel
  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setServiceToDelete(null);
  };

  const handleNewServiceClick = () => {
    setShowPopup(true);
  };

  const handleNewServiceCreate = (newServiceName) => {
    setServices([...services, newServiceName]);
    console.log("New Service:", newServiceName);
    setShowPopup(false);
    // Save the new service to localStorage or other storage
  };

  // Load saved data and videos from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("savedServiceData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }

    // Load saved videos from localStorage
    const savedVideos = localStorage.getItem(`${selectedService}_videos`);
    if (savedVideos) {
      setVideos(JSON.parse(savedVideos));
    }
  }, [selectedService]);

  // Function to handle button click to show new content and set dynamic content
  const handleButtonClick = (serviceName) => {
    setContentChanged(true);
    setSelectedService(serviceName);

    // Load previously saved data or set default values
    const savedData = localStorage.getItem(`${serviceName}_data`);
    if (savedData) {
      setFormData(JSON.parse(savedData));
    } else {
      setFormData({
        name: serviceName + " Name",
        description: serviceName + " Service Description",
      });
    }


 // Handle service switch with localStorage
 const handleServiceSwitch = (serviceName, mediaServices) => {
  // Check if videos are saved in localStorage for the selected service
  const savedVideos = localStorage.getItem(`${serviceName}_videos`);

  if (savedVideos) {
    // Use videos from localStorage if available
    setVideos(JSON.parse(savedVideos));
  } else {
    // Find the corresponding service in mediaServices
    const selectedService = mediaServices.find(service => service.name === serviceName);

    if (selectedService) {
     
      const videos = selectedService.categories
        .flatMap(category => category.videos) 
        .map(video => ({
          url: video.url,
          s3Key: video.s3Key,
          filename: video.filename,
          createdAt: video.createdAt,
        })); // Extract video details

      // Save these videos in localStorage for future use
      localStorage.setItem(`${serviceName}_videos`, JSON.stringify(videos));

      // Update state with the video details
      setVideos(videos);
    } else {
      console.error("Service not found in mediaServices");
      setVideos([]); // Fallback to an empty array if the service is not found
    }
  }
};

  


    // Load saved videos when switching service
    const savedVideos = localStorage.getItem(`${serviceName}_videos`);
    if (savedVideos) {
      setVideos(JSON.parse(savedVideos));
    } else {
      setVideos([]); // Reset videos if none exist
    }
  };


  


  // Function to handle going back to previous content
  const handleBackClick = () => {
    setContentChanged(false);
    setIsEditing(false); 
    setSelectedVideos([]); 
  };

  


const handleSaveClick = async () => {
  try {
    // Save the data to localStorage
    localStorage.setItem(`${selectedService}_data`, JSON.stringify(formData));
    setIsEditing(false); 

    // Build the dynamic API URL using selectedService
    const apiUrl = `http://localhost:5000/api/services/media-services/${selectedService}/category/${selectedService}`;

      const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    // Check if the response is successful
    if (response.ok) {
      const data = await response.json();
      console.log('Data saved successfully:', data);
      // You can add success notifications or further logic here
    } else {
      console.error('Error saving data:', response.statusText);
    }
  } catch (error) {
    console.error('Error during API request:', error);
  }
};

const handleEditClick = async () => {
  try {
    setIsEditing(true); // Enter edit mode

    // Build the dynamic API URL using selectedService
    const apiUrl = `http://localhost:5000/api/services/media-services/${selectedService}/category/${selectedService}`;

    // Send the data to the backend when editing starts
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData), // Sending form data to backend
    });

    // Check if the response is successful
    if (response.ok) {
      const data = await response.json();
      console.log('Data updated successfully:', data);
      // Handle the success as needed
    } else {
      console.error('Error updating data:', response.statusText);
    }
  } catch (error) {
    console.error('Error during API request:', error);
  }
};




const handleVideoUpload = async (e) => {
  // Set initial loading state
  setUploadStatus('uploading'); 

  try {
    const uploadedFiles = e.target.files;
    const formData = new FormData();

    // Append each file to the FormData object
    Array.from(uploadedFiles).forEach((file) => {
      formData.append('video', file); // The 'video' field matches the backend's expected field name
    });

    // Set the dynamic API URL for video upload
    const apiUrl = `http://localhost:5000/api/services/upload/video/${selectedService}/${selectedService}`;

    // Send the video data to the backend
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData, 
    });

    // Check if the response is successful
    if (response.ok) {
      const data = await response.json();
      console.log('Video uploaded successfully:', data);

      // Save to local state if needed
      const newVideo = {
        filename: data.video.filename,
        url: data.video.url,
        s3Key: data.video.s3Key,
        _id: data.video._id,
        createdAt: new Date(data.video.createdAt), 
        updatedAt: new Date(data.video.updatedAt),
      };

      // Update state with new video details
      setVideos((prevVideos) => [...prevVideos, newVideo]);

      // Save to localStorage
      const storedVideos = JSON.parse(localStorage.getItem(`${selectedService}_videos`)) || [];
      storedVideos.push(newVideo); // Add new video details to the stored list
      localStorage.setItem(`${selectedService}_videos`, JSON.stringify(storedVideos));

      // Set successful upload status
      setUploadStatus('success');
      setUploadMessage('Video uploaded successfully!'); 

    } else {
      console.error('Error uploading video:', response.statusText);
      setUploadStatus('failed');
      setUploadMessage('Video upload failed. Please try again.'); 
    }
  } catch (error) {
    console.error('Error during video upload:', error);
    setUploadStatus('failed');
    setUploadMessage('An error occurred while uploading the video.'); 
  }
};

  


  // Function to toggle the sorting dropdown
  const toggleSortDropdown = () => {
    setShowSortDropdown((prev) => !prev);
  };

  // Function to handle sorting videos by selected option
  const handleSort = (option) => {
    setSortOption(option);

    const sortedVideos = [...videos];
    if (option === "asc") {
      sortedVideos.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (option === "desc") {
      sortedVideos.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    setVideos(sortedVideos);
    setShowSortDropdown(false); // Close the dropdown after sorting
  };

  // Function to handle selection of videos for deletion
  const handleVideoSelect = (index) => {
    setSelectedVideos(
      (prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index) // Deselect
          : [...prev, index] // Select
    );
  };

 


  const handleDeleteVideos = async () => {
    // Set initial loading state
    setUploadStatus('deleting'); 
  
    try {
      // Collect the s3Key of the selected video (sending one at a time)
      const selectedVideoKeys = selectedVideos.map((index) => {
        const videoS3Key = videos[index].s3Key; 
        return videoS3Key;
      });
  
      // Loop through each selected video and send a delete request one by one
      for (const s3Key of selectedVideoKeys) {
        const requestBody = { s3key: s3Key };
        console.log("Request body sent to backend:", JSON.stringify(requestBody));
  
        // Make an API request to delete the selected video using its s3Key
        const apiUrl = `http://localhost:5000/api/services/media/${selectedService}/category/${selectedService}/video`;
        const response = await fetch(apiUrl, {
          method: 'DELETE',
          body: JSON.stringify(requestBody), 
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log('Video deleted successfully:', data);
  
          // Update state to remove deleted video based on its s3Key
          const updatedVideos = videos.filter(
            (video) => video.s3Key !== s3Key
          );
          setVideos(updatedVideos);
  
          // Save the updated video list to localStorage
          localStorage.setItem(`${selectedService}_videos`, JSON.stringify(updatedVideos));
  
          // Clear selected videos after deletion
          setSelectedVideos([]);
  
          // Set successful deletion status
          setUploadStatus('success');
          setUploadMessage('Videos deleted successfully!');
        } else {
          console.error('Error deleting video:', response.statusText);
          setUploadStatus('failed');
          setUploadMessage('Video deletion failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error during video deletion:', error);
      setUploadStatus('failed');
      setUploadMessage('An error occurred while deleting the videos.');
    }
  };
  
  

    useEffect(() => {
      fetch("http://localhost:5000/api/services/media-services")
        .then((response) => response.json())
        .then((data) => {
          // console.log(data); // Log for debugging
          if (data && Array.isArray(data.mediaServices)) {
            const serviceNames = data.mediaServices.map((service) => service.name);
            setServices(serviceNames); // Update the state used in the JSX
          } else {
            console.error("Fetched data is not in the expected format:", data);
          }
        })
        .catch((error) => {
          setError(error.message);
          console.error("Error fetching services:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, []);
  


  useEffect(() => {
    // Only fetch if selectedService exists (avoid unnecessary fetches)
    if (!selectedService) return;

    setLoading(true); // Set loading state

    // Fetch video details based on the selected service
    fetch(`http://localhost:5000/api/services/servicesVideos/${selectedService}`)  
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the fetched data for debugging
        
        if (data && data.videoDetails && Array.isArray(data.videoDetails)) {
          // Process the video details (extract URL, S3 key, etc.)
          const videoDetails = data.videoDetails.map((video) => ({
            url: video.url,
            s3Key: video.s3Key,
            filename: video.filename,
            createdAt: video.createdAt,
            serviceName: video.serviceName,
            categoryName: video.categoryName,
          }));

          // Cache fetched videos in localStorage for future use
          localStorage.setItem(`${selectedService}_videos`, JSON.stringify(videoDetails));

          // Update state with the fetched videos
          setVideos(videoDetails);
        } else {
          console.error('No videos found for the selected service:', data);
        }
      })
      .catch((error) => {
        setError(error.message); 
        console.error('Error fetching video details:', error);
      })
      .finally(() => {
        setLoading(false); 
      });
  }, [selectedService]); 


    if (loading) {
      return <div>Loading...</div>; 
    }
  
    if (error) {
      return <div>Error: {error}</div>; 
    }




  // If content has changed, display dynamic content with inputs
  if (contentChanged) {
    return (
      <div className="relative">
        {/* Top Section with Back Button, ChevronRight, and Service Name */}
        <div className="flex items-center justify-between pb-2 mt-[-10px] gap-2 mb-4 border-b border-black">
          <div className="flex items-center gap-2">
            <button
              onClick={handleBackClick}
              className="text-black font-bold hover:underline hover:text-amber-700"
            >
              Services
            </button>
            <ChevronRight className="text-black" />
            <span className="font-bold">{selectedService}</span>
          </div>
          <RotateCw />
        </div>

        <div className="flex flex-row justify-end">
          <button
            onClick={handleDeleteVideos}
            className="flex bg-red-500 text-white rounded-full px-4 py-2 gap-2 hover:bg-white border border-red-500 hover:text-red-500 hover:font-bold"
            disabled={selectedVideos.length === 0} // Disable if no videos selected
          >
            <Trash2 />
            Delete
          </button>
        </div>
        <h2 className="bg-[#E4D5CD] p-3 my-6 text-2xl font-bold">Details</h2>




        {/* Form Fields */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col w-full relative">
            <label className="absolute px-1 bg-white left-1 bottom-7 mb-1 font-semibold">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              className="border border-gray-300 p-2 rounded w-full"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              readOnly={!isEditing}
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="absolute px-1 bg-white left-1 top-60 mb-1 font-semibold">
              Service Description
            </label>
            <input
              type="text"
              value={formData.description}
              className="border border-gray-300 p-2 rounded w-full"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              readOnly={!isEditing}
            />
          </div>

          <div className="flex justify-end">
            {isEditing ? (
              <button
                type="button"
                onClick={handleSaveClick}
                className="w-44 mt-6 text-white bg-green-900 px-4 py-3 rounded-full"
              >
                Save Changes
              </button>
            ) : (
              <button
                type="button"
                onClick={handleEditClick}
                className="flex gap-2 items-center w-24 mt-6 text-black border border-black bg-white px-4 py-3 rounded-full"
              >
                Edit
                <LiaEdit className="size-6" />
              </button>
            )}
          </div>
        </div>




        {/* Dynamic H2 with the service name */}
        <h2 className="bg-[#E4D5CD] p-3 mt-6 text-2xl font-bold">
          {selectedService} Videos
        </h2>



        {/* Add and Sort Buttons */}
        <div className="flex justify-end gap-4 my-4">
          <label className="flex items-center gap-2 border rounded-full py-2 px-6 bg-[#333333] text-white cursor-pointer">
            <MdAdd />
            Add
            <input
              type="file"
              accept="video/*"
              className="hidden"
              multiple
              onChange={handleVideoUpload}
            />
          </label>
             {/* Displaying Upload Status */}
{uploadStatus === 'uploading' && <p>Uploading video, please wait...</p>}
{uploadStatus === 'success' && <p style={{ color: 'green' }}></p>}
{uploadStatus === 'failed' && <p style={{ color: 'red' }}></p>}

{/* Displaying Deleting Status */}
{uploadStatus === 'deleting' && <p>Deleting videos, please wait...</p>}
{uploadStatus === 'success' && <p style={{ color: 'green' }}></p>}
{uploadStatus === 'failed' && <p style={{ color: 'red' }}></p>}
        

          <div className="relative">
            <button
              className="flex items-center border rounded-full py-2 px-6 bg-white text-black"
              onClick={toggleSortDropdown}
              onBlur={() => setShowSortDropdown(false)} 
            >
              <GoSortDesc />
              Sort By
            </button>
            {showSortDropdown && (
              <div className="absolute right-0 z-10 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                <button
                  onClick={() => handleSort("asc")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Date Ascending
                </button>
                <button
                  onClick={() => handleSort("desc")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Date Descending
                </button>
                <button
                  onClick={() => handleSort("name")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Name
                </button>
              </div>
            )}
          </div>
        </div>




        {/* Display Uploaded Videos */}

        <div className="grid grid-cols-4 gap-4">
  {videos.map((video, index) => (
    <div
      key={index}
      className="flex items-center justify-between border-b p-2"
    >
      <input
        type="checkbox"
        checked={selectedVideos.includes(index)}
        onChange={() => handleVideoSelect(index)}
      />
      
      <div className="flex-grow ml-2 cursor-pointer">
        <video
          src={video.url}
          controls
          className="w-full h-32"
          onClick={(e) => e.stopPropagation()} 
        />
        {/* <p>{video.filename}</p> */}

        {/* Format date */}
        <p>
          {isNaN(new Date(video.createdAt).getTime()) 
            ? 'Invalid date' 
            : new Date(video.createdAt).toLocaleDateString()}
        </p>
      </div>
      

            </div>
          ))}
        </div>
      </div>
    );
  }




  // Render service buttons if content hasn't changed
  return (
    <div className="flex flex-col gap-2">
      <div className="py-2 flex items-center border-b border-black justify-between">
        <h2 className="font-bold text-2xl mt-[-30px]">Services</h2>
        {/* <FaRedoAlt className="mt-[-25px] cursor-pointer" /> */}
      </div>

      <div className="flex gap-4 justify-end">
        <div className="flex flex-row justify-end">
         
        </div>
        <button
          onClick={handleNewServiceClick}
          className="flex items-center gap-2 border rounded-full py-2 px-6 text-white bg-[#333333]"
        >
          <MdAdd />
          New
        </button>
        {showPopup && <ServicePopup onCreateService={handleNewServiceCreate} />}
        

        <button className="flex pl-4 border rounded-full py-2 px-20 text-black border-black">
          <GoSortDesc className="cursor-pointer absolute size-7 right-12 top-[110px]" />
          Sort by
        </button>
      </div>


      

      {/* NEWLY ADDED BUTTONS */} 
      <div className="flex flex-col gap-2">
          {services.map((service) => (
            <button 
            className=""
            key={service} 
            onClick={() => handleButtonClick(service)}>
              <div className="flex justify-between w-96 text-left border p-4 bg-gray-200 hover:bg-gray-300">
              <div className="flex gap-3">
              <Trash2 
                onClick={(e) => handleDeleteClick(service, e)}
                className="text-gray-300 hover:text-red-600" 
              />
              {service}
              </div>
                <ChevronRight /></div>
            </button>
          ))}
        </div>
        
        {/* Custom Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Delete Service</h3>
              <button
                onClick={handleDeleteCancel}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{selectedService}"? This action cannot be undone.
            </p>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={handleDeleteCancel}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Services;