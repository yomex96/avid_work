import { useEffect, useState } from "react";
import axios from "axios"; 
import toast from "react-hot-toast";
import { FaRedoAlt } from "react-icons/fa";
import { GoSortDesc } from "react-icons/go";
import { MdAdd } from "react-icons/md";

const Clients = () => {
  const [images, setImages] = useState([]);

  // Function to fetch images from the server
  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/media/images');
      if (response.status === 200 && response.data) {
        setImages(response.data); // Set the data as is since it's structured correctly
        // toast.success("Images loaded successfully");
      } else {
        toast.error("Failed to load images");
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      toast.error("Unable to fetch images");
    }
  };

  // Load images from localStorage on component mount and also fetch images from backend
  useEffect(() => {
    // Fetch images from backend
    fetchImages();

    // You can optionally load images from localStorage as a fallback
    const storedImages = JSON.parse(localStorage.getItem("clientImages")) || [];
    setImages(storedImages);
  }, []);  // Empty dependency array ensures this runs only once when the component mounts

  // Handle image selection and upload
  const handleImageChange = async (event) => {
    const files = Array.from(event.target.files);
  
    for (const file of files) {
      const background = await loadImage('/avidBlack.png');
      const selectedImage = await loadImage(URL.createObjectURL(file));
  
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      canvas.width = background.width;
      canvas.height = background.height;
  
      context.drawImage(background, 0, 0, canvas.width, canvas.height);
      context.drawImage(selectedImage, canvas.width / 4, canvas.height / 4, canvas.width / 2, canvas.height / 2);
  
      canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append('image', blob, 'combined_image.png');
  
        try {
          const response = await axios.post("http://localhost:5000/api/media/upload/image", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
  
          const newImageUrl = response.data.image.url;
  
          // Directly update the state with the new image
          setImages((prevImages) => {
            const updatedImages = [...prevImages, newImageUrl];
            localStorage.setItem("clientImages", JSON.stringify(updatedImages));
            return updatedImages;
          });
  
          // Optionally re-fetch images to ensure they're synced with the server
          fetchImages();
  
          toast.success("Client Image Added Successfully");
        } catch (error) {
          console.error("Error uploading image:", error);
          toast.error("Failed to upload image");
        }
      }, 'image/png');
    }
  
    event.target.value = ""; // Clear the file input
  };

  // Helper function to load image
  function loadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  }

  // Handle image deletion
  const handleDeleteImage = async (index) => {
    const imageToDelete = images[index];

    if (!imageToDelete) {
      console.error("No image found at the specified index");
      return;
    }

    // Remove the image from local state and localStorage first
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    localStorage.setItem("clientImages", JSON.stringify(updatedImages));

    toast.success("Client Image Successfully Removed from the Dashboard");

    // Attempt to delete from backend, but don't impact frontend immediately
    try {
      await axios.delete("http://localhost:5000/api/media/images", {
        data: { url: imageToDelete.url }, // Ensure we're sending the image URL, not the image object
      });
      console.log("Image deleted from backend successfully");
    } catch (error) {
      console.error("Error deleting image from backend:", error);
      toast.error("Failed to delete image from backend, but removed from dashboard");
      
      // Rollback the frontend state if backend deletion fails
      setImages(images); // Restore the original state if deletion fails
      localStorage.setItem("clientImages", JSON.stringify(images));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="py-2 flex items-center border-b border-black justify-between">
        <h2 className="font-bold text-2xl mt-[-30px]">Clients</h2>
        <FaRedoAlt className="mt-[-25px] cursor-pointer" />
      </div>
      <div className="flex gap-4 justify-end">
        <label htmlFor="imageUpload" className="flex items-center gap-2 border rounded-full py-2 px-6 text-white bg-[#333333] cursor-pointer">
          <MdAdd />
          New
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
        
        <button className="flex flex-row items-center w-44 px-6 border border-gray-200 rounded-full">
          <GoSortDesc className="cursor-pointer absolute size-7 right-16 top-[120px]" />
          Sort by
        </button>
      </div>
      <div className="pt-4">
        <h2 className="bg-[#E4D5CD] p-2 font-bold text-2xl mt-[-30px]">My Clients</h2>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative bg-cover bg-center" style={{ backgroundImage: `url('/avidBlack.png')` }}>
            <img 
              src={image.url}
              alt={`Client ${index + 1}`} 
              className="w-full h-32 object-cover border p-3 rounded-md" 
            />
            <button
              onClick={() => handleDeleteImage(index)}
              className="absolute top-2 right-2 hover:bg-gray-400/30 hover:text-red-600 rounded-full p-1"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clients;





// import { useEffect, useState } from "react";
// import axios from "axios"; 
// import toast from "react-hot-toast";
// import { FaRedoAlt } from "react-icons/fa";
// import { GoSortDesc } from "react-icons/go";
// import { MdAdd } from "react-icons/md";

// const Clients = () => {
//   const [images, setImages] = useState([]);


//   //added  new 
//   const fetchImages = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/media/images');
//       if (response.status === 200 && response.data) {
//         setImages(response.data); // Set the data as is since it's structured correctly
//         toast.success("Images loaded successfully");
//       } else {
//         toast.error("Failed to load images");
//       }
//     } catch (error) {
//       console.error("Error fetching images:", error);
//       toast.error("Unable to fetch images");
//     }
//   };
  

//   // Load images from localStorage on component mount
//   useEffect(() => {
//     const storedImages = JSON.parse(localStorage.getItem("clientImages")) || [];
//     setImages(storedImages);
//   }, []);

//   // // Handle image selection and upload
//   // const handleImageChange = async (event) => {
//   //   const files = Array.from(event.target.files);
    
//   //   // Iterate through each file to upload
//   //   for (const file of files) {
//   //     const formData = new FormData();
//   //     formData.append("image", file); 

//   //     try {
//   //       const response = await axios.post("http://localhost:5000/api/media/upload/image", formData, {
//   //         headers: {
//   //           "Content-Type": "multipart/form-data",
//   //         },
//   //       });

//   //       // Get the uploaded image URL from the response
//   //       const newImageUrl = response.data.image.url;

//   //       // Update state with the new image URL
//   //       setImages((prevImages) => {
//   //         const updatedImages = [...prevImages, newImageUrl];
//   //         localStorage.setItem("clientImages", JSON.stringify(updatedImages));
//   //         return updatedImages;
//   //       });

//   //       toast.success("Client Image Added Successfully");
//   //     } catch (error) {
//   //       console.error("Error uploading image:", error);
//   //       toast.error("Failed to upload image");
//   //     }
//   //   }

//   //   event.target.value = ""; 
//   // };


//   const handleImageChange = async (event) => {
//     const files = Array.from(event.target.files);
  
//     for (const file of files) {
//       const background = await loadImage('/avidBlack.png');
//       const selectedImage = await loadImage(URL.createObjectURL(file));
  
//       const canvas = document.createElement('canvas');
//       const context = canvas.getContext('2d');
      
//       canvas.width = background.width;
//       canvas.height = background.height;
  
//       context.drawImage(background, 0, 0, canvas.width, canvas.height);
//       context.drawImage(selectedImage, canvas.width / 4, canvas.height / 4, canvas.width / 2, canvas.height / 2);
  
//       canvas.toBlob(async (blob) => {
//         const formData = new FormData();
//         formData.append('image', blob, 'combined_image.png');
  
//         try {
//           const response = await axios.post("http://localhost:5000/api/media/upload/image", formData, {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           });
  
//           const newImageUrl = response.data.image.url;
  
//           // Directly update the state with the new image
//           setImages((prevImages) => {
//             const updatedImages = [...prevImages, newImageUrl];
//             localStorage.setItem("clientImages", JSON.stringify(updatedImages));
//             return updatedImages;
//           });
  
//           // Optionally re-fetch images to ensure they're synced with the server
//           fetchImages();
  
//           toast.success("Client Image Added Successfully");
//         } catch (error) {
//           console.error("Error uploading image:", error);
//           toast.error("Failed to upload image");
//         }
//       }, 'image/png');
//     }
  
//     event.target.value = ""; // Clear the file input
//   };
  

//   // const handleImageChange = async (event) => {
//   //   const files = Array.from(event.target.files);
  
//   //   for (const file of files) {
//   //     // Load the background image
//   //     const background = await loadImage('/avidBlack.png');
//   //     const selectedImage = await loadImage(URL.createObjectURL(file));
  
//   //     // Create a canvas element
//   //     const canvas = document.createElement('canvas');
//   //     const context = canvas.getContext('2d');
      
//   //     // Set canvas size to background image size
//   //     canvas.width = background.width;
//   //     canvas.height = background.height;
  
//   //     // Draw the background and overlay selected image
//   //     context.drawImage(background, 0, 0, canvas.width, canvas.height);
//   //     context.drawImage(selectedImage, canvas.width / 4, canvas.height / 4, canvas.width / 2, canvas.height / 2);
  
//   //     // Convert canvas to Blob
//   //     canvas.toBlob(async (blob) => {
//   //       const formData = new FormData();
//   //       formData.append('image', blob, 'combined_image.png'); // Name the file as desired
  
//   //       try {
//   //         const response = await axios.post("http://localhost:5000/api/media/upload/image", formData, {
//   //           headers: {
//   //             "Content-Type": "multipart/form-data",
//   //           },
//   //         });
  
//   //         const newImageUrl = response.data.image.url;
  
//   //         setImages((prevImages) => {
//   //           const updatedImages = [...prevImages, newImageUrl];
//   //           localStorage.setItem("clientImages", JSON.stringify(updatedImages));
//   //           return updatedImages;
//   //         });
  
//   //         toast.success("Client Image Added Successfully");
//   //       } catch (error) {
//   //         console.error("Error uploading image:", error);
//   //         toast.error("Failed to upload image");
//   //       }
//   //     }, 'image/png'); // Adjust format as needed
//   //   }
  
//   //   event.target.value = ""; 
//   // };
  
//   // Helper function to load image
//   function loadImage(url) {
//     return new Promise((resolve, reject) => {
//       const img = new Image();
//       img.src = url;
//       img.onload = () => resolve(img);
//       img.onerror = reject;
//     });
//   }




// // const handleDeleteImage = async (index) => {
// //   const imageToDelete = images[index]; 

// //   if (!imageToDelete) {
// //       console.error("No image found at the specified index");
// //       return;
// //   }

// //   // const imageUrl = imageToDelete.url;

// //   console.log("Image to delete:", imageToDelete); 
// //   // console.log("Image URL:", imageUrl); // Log the URL specifically

// //   // if (!imageUrl) {
// //   //     console.error("Image URL is undefined");
// //   //     return; // Exit if URL is undefined
// //   // }

// //   try {
// //       const response = await axios.delete("http://localhost:5000/api/media/images", {
// //           data: { url: imageToDelete }, 
// //       });
// //       console.log("Delete response:", response.data); 

// //       // Update local state and local storage
// //       const updatedImages = images.filter((_, i) => i !== index);
// //       setImages(updatedImages);
// //       localStorage.setItem("clientImages", JSON.stringify(updatedImages));
// //       toast.success("Client Image Successfully Removed");
// //   } catch (error) {
// //       console.error("Error deleting image:", error); 
// //   }
// // };



// const handleDeleteImage = async (index) => {
//   const imageToDelete = images[index];

//   if (!imageToDelete) {
//     console.error("No image found at the specified index");
//     return;
//   }

//   // Remove the image from local state and localStorage first
//   const updatedImages = images.filter((_, i) => i !== index);
//   setImages(updatedImages);
//   localStorage.setItem("clientImages", JSON.stringify(updatedImages));

//   toast.success("Client Image Successfully Removed from the Dashboard");

//   // Attempt to delete from backend, but don't impact frontend immediately
//   try {
//     await axios.delete("http://localhost:5000/api/media/images", {
//       data: { url: imageToDelete.url }, // Ensure we're sending the image URL, not the image object
//     });
//     console.log("Image deleted from backend successfully");
//   } catch (error) {
//     console.error("Error deleting image from backend:", error);
//     toast.error("Failed to delete image from backend, but removed from dashboard");
    
//     // Rollback the frontend state if backend deletion fails
//     setImages(images); // Restore the original state if deletion fails
//     localStorage.setItem("clientImages", JSON.stringify(images));
//   }
// };





// // const handleDeleteImage = async (index) => {
// //   // Remove the image from local state and localStorage first
// //   const updatedImages = images.filter((_, i) => i !== index);
// //   setImages(updatedImages);
// //   localStorage.setItem("clientImages", JSON.stringify(updatedImages));

// //   toast.success("Client Image Successfully Removed from the Dashboard");

// //   const imageToDelete = images[index];

// //   if (!imageToDelete) {
// //     console.error("No image found at the specified index");
// //     return;
// //   }

// //   // Attempt to delete from backend, but don't impact frontend
// //   try {
// //     await axios.delete("http://localhost:5000/api/media/images", {
// //       data: { url: imageToDelete },
// //     });
// //     console.log("Image deleted from backend successfully");
// //   } catch (error) {
// //     console.error("Error deleting image from backend:", error);
// //     toast.error("Failed to delete image from backend, but removed from dashboard");
// //   }
// // };





//   return (
//     <div className="flex flex-col gap-4">
//       <div className="py-2 flex items-center border-b border-black justify-between">
//         <h2 className="font-bold text-2xl mt-[-30px]">Clients</h2>
//         <FaRedoAlt className="mt-[-25px] cursor-pointer" />
//       </div>
//       <div className="flex gap-4 justify-end">
//         <label htmlFor="imageUpload" className="flex items-center gap-2 border rounded-full py-2 px-6 text-white bg-[#333333] cursor-pointer">
//           <MdAdd />
//           New
//           <input
//             type="file"
//             id="imageUpload"
//             accept="image/*"
//             className="hidden"
//             onChange={handleImageChange}
//           />
//         </label>
        
//         <button className="flex flex-row items-center w-44 px-6 border border-gray-200 rounded-full">
//           <GoSortDesc className="cursor-pointer absolute size-7 right-16 top-[120px]" />
//           Sort by
//         </button>
//       </div>
//       <div className="pt-4">
//         <h2 className="bg-[#E4D5CD] p-2 font-bold text-2xl mt-[-30px]">My Clients</h2>
//       </div>
//       <div className="grid grid-cols-4 gap-4">
//         {images.map((image, index) => (
//           <div key={index} className="relative bg-cover bg-center" style={{ backgroundImage: `url('/avidBlack.png')` }}>
//             <img 
//             src={image.url}
//               // src={image} 
//               alt={`Client ${index + 1}`} 
//               className="w-full h-32 object-cover border p-3 rounded-md" 
//             />
//             <button
//               onClick={() => handleDeleteImage(index)}
//               className="absolute top-2 right-2 hover:bg-gray-400/30 hover:text-red-600 rounded-full p-1"
//             >
//               X
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Clients;










//reference purpose

// const handleDeleteImage = async (index) => {
//   const imageToDelete = images[index]; // Get the image object
//   console.log("Image to delete:", imageToDelete); // Log the image object

//   const imageId = imageToDelete?._id; // Use optional chaining to safely access _id

//   console.log("Extracted Image ID:", imageId); // Log the extracted image ID

//   if (!imageId) {
//       console.error("Image ID is undefined");
//       return; // Exit if ID is undefined
//   }

//   try {
//       const response = await axios.delete(`http://localhost:5000/api/media/images/${imageId}`);
//       console.log("Delete response:", response.data); // Log the response from the server

//       // Proceed to update local state and local storage
//       const updatedImages = images.filter((_, i) => i !== index);
//       setImages(updatedImages);
//       localStorage.setItem("clientImages", JSON.stringify(updatedImages)); // Update localStorage
//       toast.success("Client Image Successfully Removed");
//   } catch (error) {
//       console.error("Error deleting image:", error); // Log any error
//   }
// };


  // Handle image deletion
  // const handleDeleteImage = (index) => {
  //   const updatedImages = images.filter((_, i) => i !== index);
  //   setImages(updatedImages);
  //   localStorage.setItem("clientImages", JSON.stringify(updatedImages)); // Update localStorage
  //   toast.success("Client Image Successfully Removed");
  // };



//ben work


// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { FaRedoAlt } from "react-icons/fa";
// import { GoSortDesc } from "react-icons/go";
// import { MdAdd } from "react-icons/md";

// const Clients = () => {
//   const [images, setImages] = useState([]);

//   // Load images from localStorage on component mount
//   useEffect(() => {
//     const storedImages = JSON.parse(localStorage.getItem("clientImages")) || [];
//     setImages(storedImages);
//   }, []);

//   // Handle image selection
//   const handleImageChange = (event) => {
//     const files = Array.from(event.target.files);

//     const fileReaders = files.map((file) => {
//       return new Promise((resolve) => {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           resolve(reader.result); // Resolve with the base64 string
//         };
//         reader.readAsDataURL(file); // Read file as a base64 string
//       });
//     });

//     // Save the new images to state and localStorage
//     Promise.all(fileReaders).then((fileUrls) => {
//       setImages((prevImages) => {
//         const updatedImages = [...prevImages, ...fileUrls];
        
//         localStorage.setItem("clientImages", JSON.stringify(updatedImages));
//         return updatedImages;
//       });
//     });
//     toast.success("Client Image Added Successfully")
//     event.target.value = ""; // Clear the input
//   };

//   // Handle image deletion
//   const handleDeleteImage = (index) => {
//     const updatedImages = images.filter((_, i) => i !== index);
//     setImages(updatedImages);
//     localStorage.setItem("clientImages", JSON.stringify(updatedImages)); // Update localStorage
//     toast.success("Client Image Successfully Removed");
//   };

//   return (
//     <div className="flex flex-col gap-4">
//       <div className="py-2 flex items-center border-b border-black justify-between">
//         <h2 className="font-bold text-2xl mt-[-30px]">Clients</h2>
//         <FaRedoAlt className="mt-[-25px] cursor-pointer" />
//       </div>
//       <div className="flex gap-4 justify-end">
//         <label htmlFor="imageUpload" className="flex items-center gap-2 border rounded-full py-2 px-6 text-white bg-[#333333] cursor-pointer">
//           <MdAdd />
//           New
//           <input
//             type="file"
//             id="imageUpload"
//             accept="image/*"
//             className="hidden"
//             onChange={handleImageChange}
//           />
//         </label>
        
//         <button className="flex flex-row items-center w-44 px-6 border border-gray-200 rounded-full">
//         <GoSortDesc className="cursor-pointer absolute size-7 right-16 top-[120px]" />
//           Sort by
//         </button>
//       </div>
//       <div className="pt-4">
//         <h2 className="bg-[#E4D5CD] p-2 font-bold text-2xl mt-[-30px]">My Clients</h2>
//       </div>
//       <div className="grid grid-cols-4 gap-4">
//         {images.map((image, index) => (
//           <div key={index} className="relative bg-cover bg-center" style={{ backgroundImage: `url('/avidflower.png')` }}>
//             <img 
//               src={image} 
//               alt={`Client ${index + 1}`} 
//               className="w-full h-32 object-contain border p-3 rounded-md" 
//             />
//             <button
//               onClick={() => handleDeleteImage(index)}
//               className="absolute top-2 right-2 bg-gray-400/30 text-red-600 hover:bg-red-600 hover:text-white rounded-full p-1"
//             >
//               X
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Clients;