import { useState, useEffect, useContext } from "react";
import { LiaEdit } from "react-icons/lia";
import { CiLock } from "react-icons/ci";
import { MdAdd } from "react-icons/md";
import { GoSortDesc } from "react-icons/go";
import axios from "axios";
import PaymentForm from "./PaymentForm";
import ScrollToTop from "./ScrollToTop";
import LoaderCompProfile from "./LoaderCompProfile";
import toast from "react-hot-toast";
import StoreContext from "../context/StoreContext";

import VideoSelectionPopup from "./VideoSelectionPopup";

const AccountInformation = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { updateCompanyInfo } = useContext(StoreContext); 
  const [selectedVideos, setSelectedVideos] = useState([]); // State to store uploaded videos
  const [videoInput, setVideoInput] = useState(null); // To hold the selected video file
  const [videoPreview, setVideoPreview] = useState(null); // CAN REMOVE THIS
  const [isSave, setIsSave] = useState(false);
  // State for each field
  const [profileName, setProfileName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedIn] = useState("");
  const [aboutUs, setAboutUs] = useState("");

  const [loading, setLoading] = useState(true);
  
  

  const [showVideoSelectionPopup, setShowVideoSelectionPopup] = useState(false);


  // Fetch existing videos from backend on component mount
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/features");
        if (response.status === 200) {
          setSelectedVideos(response.data.videos || []);
        } else {
          console.error("Failed to fetch videos:", response);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);
 
  

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Load saved data from local storage on component mount
  useEffect(() => {
    const savedProfileName = localStorage.getItem("profileName");
    const savedPhoneNumber = localStorage.getItem("phoneNumber");
    const savedEmail = localStorage.getItem("email");
    const savedAddress = localStorage.getItem("address");
    const savedInstagram = localStorage.getItem("instagram");
    const savedFacebook = localStorage.getItem("facebook");
    const savedTwitter = localStorage.getItem("twitter");
    const savedLinkedIn = localStorage.getItem("linkedin");
    const savedAboutUs = localStorage.getItem("aboutUs");

    if (savedProfileName) setProfileName(savedProfileName);
    if (savedPhoneNumber) setPhoneNumber(savedPhoneNumber);
    if (savedEmail) setEmail(savedEmail);
    if (savedAddress) setAddress(savedAddress);
    if (savedInstagram) setInstagram(savedInstagram);
    if (savedFacebook) setFacebook(savedFacebook);
    if (savedTwitter) setTwitter(savedTwitter);
    if (savedLinkedIn) setLinkedIn(savedLinkedIn);
    if (savedAboutUs) setAboutUs(savedAboutUs);
  }, []);

  // // Toggle edit mode and save to localStorage when saving changes
  // const handleEditClick = () => {
  //   if (isEditing) {
  //     localStorage.setItem("profileName", profileName);
  //     localStorage.setItem("phoneNumber", phoneNumber);
  //     localStorage.setItem("email", email);
  //     localStorage.setItem("address", address);
  //     localStorage.setItem("instagram", instagram);
  //     localStorage.setItem("facebook", facebook);
  //     localStorage.setItem("twitter", twitter);
  //     localStorage.setItem("linkedin", linkedin);
  //     localStorage.setItem("aboutUs", aboutUs);
  //   }
  //   setIsEditing((prev) => !prev); // Toggles between edit and save states
  //   if (isEditing && !isSave) {
  //     toast.success("Account Information Updated")
  //   }
  // };

  // Toggle edit mode and save to localStorage when saving changes
  const handleEditClick = () => {
    if (isEditing) {
      // Prepare the updated info object to send to the context
      const updatedInfo = {
        profileName,
        phone: phoneNumber, // Ensure this matches the backend schema
        email,
        address,
        social: {
          instagram,
          facebook,
          twitter,
          linkedin,
        },
        about: aboutUs, // Ensure this matches the backend schema
      };

      // Call the updateCompanyInfo function from context
      updateCompanyInfo(updatedInfo);

      // Optionally save data to localStorage
      localStorage.setItem("profileName", profileName);
      localStorage.setItem("phoneNumber", phoneNumber);
      localStorage.setItem("email", email);
      localStorage.setItem("address", address);
      localStorage.setItem("instagram", instagram);
      localStorage.setItem("facebook", facebook);
      localStorage.setItem("twitter", twitter);
      localStorage.setItem("linkedin", linkedin);
      localStorage.setItem("aboutUs", aboutUs);
      
      toast.success("Account Information Updated");
    }
    setIsEditing((prev) => !prev); // Toggles between edit and save states
  };



  // Handle video file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoInput(file);
    }
  };

  // // Handle uploading the selected video
  // const handleUploadVideo = async () => {
  //   if (!videoInput) {
  //     alert("Please select a video first.");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("video", videoInput);

  //   try {
  //     const response = await axios.post("/api/upload-video", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     // Add the new video URL to the state to display it
  //     setSelectedVideos([...selectedVideos, response.data.videoUrl]);
  //     setVideoInput(null); // Clear the input after successful upload
  //   } catch (error) {
  //     console.error("Error uploading video:", error);
  //   }
  // };



  
  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/company-info");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setProfileName(data.profileName || "");
        setPhoneNumber(data.phoneNumber || "");
        setEmail(data.email || "");
        setAddress(data.address || "");
        setInstagram(data.instagram || "");
        setFacebook(data.facebook || "");
        setTwitter(data.twitter || "");
        setLinkedIn(data.linkedin || "");
        setAboutUs(data.aboutUs || "");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  
  // // New function to handle video selection from the popup
  // const handleVideoSelection = async (videos) => {
  //   try {
  //     // Prepare the videos for upload to your backend
  //     const formData = new FormData();
  //     videos.forEach((video) => {
  //       formData.append("videos", {
  //         uri: video.url,
  //         name: video.filename,
  //         type: "video/mp4"
  //       });
  //     });

  //     // Make an API call to upload the selected videos
  //     const response = await axios.post("/api/upload-featured-videos", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     // Update the selectedVideos state with the newly uploaded videos
  //     setSelectedVideos([...selectedVideos, ...response.data.uploadedVideos]);

  //     // Show a success toast
  //     toast.success(`${videos.length} video(s) added to featured videos`);
  //   } catch (error) {
  //     console.error("Error uploading featured videos:", error);
  //     toast.error("Failed to upload videos");
  //   }
  // };



  const handleSelectVideos = async (videos) => {
    if (videos.length === 0) {
      toast.error("Please select at least one video."); // Show error toast
      return;
    }
  
    setLoading(true); // Set loading state to true
    const requestData = { urls: videos }; // Update request data to match the expected format
  
    try {
      // Change PUT to POST and use the correct URL for the add endpoint
      const response = await axios.post(
        "http://localhost:5000/api/features/add",
        requestData
      );
  
      if (response.status === 201) {
        toast.success("Videos successfully added! please Refresh"); // Success toast
        setSelectedVideos(response.data.videos); // Update the state with new videos
      } else {
        toast.error("Failed to add videos. Please try again."); // Error toast
        console.error("Failed to add videos:", response);
      }
    } catch (error) {
      toast.error("Error while adding videos. Please try again. Not more than 5"); // Error toast
      console.error("Error while adding videos:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };
  

  // // Handle video selection
  // const handleSelectVideos = async (videos) => {
  //   if (videos.length === 0) {
  //     toast.error("Please select at least one video."); // Show error toast
  //     return;
  //   }

  //   setLoading(true); // Set loading state to true
  //   const requestData = { videoUrls: videos };

  //   try {
  //     const response = await axios.put(
  //       "http://localhost:5000/api/features/edit",
  //       requestData
  //     );

  //     if (response.status === 200) {
  //       toast.success("Videos successfully updated!"); // Success toast
  //       setSelectedVideos(response.data.updatedVideos); // Update the state with new videos
  //     } else {
  //       toast.error("Failed to update videos. Please try again."); // Error toast
  //       console.error("Failed to update videos:", response);
  //     }
  //   } catch (error) {
  //     toast.error("Error while updating videos. Please try again."); // Error toast
  //     console.error("Error while updating videos:", error);
  //   } finally {
  //     setLoading(false); // Reset loading state
  //   }
  // };


  // Function to handle video removal
const handleRemoveVideo = async (url) => {
  try {
    const response = await axios.delete("http://localhost:5000/api/features/remove", {
      data: { url }, // Pass URL in the request body
    });

    if (response.status === 200) {
      toast.success("Video removed successfully");
      // Update the state to remove the video from the list
      setSelectedVideos(selectedVideos.filter((video) => video.url !== url));
    } else {
      toast.error("Failed to remove video. Please try again.");
    }
  } catch (error) {
    console.error("Error removing video:", error);
    toast.error("An error occurred while removing the video.");
  }
};

  

  return (
    <div className="w-full h-auto mt-[-40px] p-8">
      <h2 className="flex items-center p-2 text-2xl font-bold h-16 bg-[#E4D5CD]">
        Account Information
      </h2>

      <div className="flex flex-col lg:grid grid-cols-2 gap-4 mt-6">
        {/* Input Fields */}
        <div className="relative">
          <label className="absolute -top-3 left-3 bg-white px-1 text-sm">
            Profile Name
          </label>
          <input
            type="text"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
            placeholder="Enter your profile name"
            className="w-full h-[50px] border border-gray-300 px-4"
            disabled={!isEditing} // Disable when not editing
          />
          <CiLock className="absolute top-[50%] transform -translate-y-1/2 right-4 text-gray-500" />
        </div>

        {/* Other Input Fields */}
        <div className="relative">
          <label className="absolute -top-3 left-3 bg-white px-1 text-sm">
            Phone Number
          </label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
            className="w-full h-[50px] border border-gray-300 px-4"
            disabled={!isEditing}
          />
        </div>

        <div className="relative">
          <label className="absolute -top-3 left-3 bg-white px-1 text-sm">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
            className="w-full h-[50px] border border-gray-300 px-4"
            disabled={!isEditing}
          />
        </div>

        <div className="relative">
          <label className="absolute -top-3 left-3 bg-white px-1 text-sm">
            Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your Address"
            className="w-full h-[50px] border border-gray-300 px-4"
            disabled={!isEditing}
          />
        </div>

        <div className="relative">
          <label className="absolute -top-3 left-3 bg-white px-1 text-sm">
            Instagram
          </label>
          <input
            type="text"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            placeholder="Enter your Instagram Username"
            className="w-full h-[50px] border border-gray-300 px-4"
            disabled={!isEditing}
          />
        </div>

        <div className="relative">
          <label className="absolute -top-3 left-3 bg-white px-1 text-sm">
            Facebook
          </label>
          <input
            type="text"
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
            placeholder="Enter Your Facebook Username"
            className="w-full h-[50px] border border-gray-300 px-4"
            disabled={!isEditing}
          />
        </div>

        <div className="relative">
          <label className="absolute -top-3 left-3 bg-white px-1 text-sm">
            X (Twitter)
          </label>
          <input
            type="text"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
            placeholder="Enter your X Username"
            className="w-full h-[50px] border border-gray-300 px-4"
            disabled={!isEditing}
          />
        </div>

        <div className="relative">
          <label className="absolute -top-3 left-3 bg-white px-1 text-sm">
            LinkedIn
          </label>
          <input
            type="text"
            value={linkedin}
            onChange={(e) => setLinkedIn(e.target.value)}
            placeholder="Enter your LinkedIn Username"
            className="w-full h-[50px] border border-gray-300 px-4"
            disabled={!isEditing}
          />
        </div>
      </div>

      {/* About Us Section */}
      <div className="relative mt-6">
        <label className="absolute -top-3 left-3 bg-white px-1 text-sm">
          About Us
        </label>
        <textarea
          value={aboutUs}
          onChange={(e) => setAboutUs(e.target.value)}
          placeholder="About Us"
          className="w-full h-28 border border-gray-300 px-4 py-2"
          disabled={!isEditing}
        ></textarea>
      </div>

      {/* Button Section */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleEditClick}
          className="flex gap-2 items-center w-52 mt-6 bg-black text-white px-12 py-3 rounded-full"
        >
          {isEditing ? (
            "Save Changes"
          ) : (
            <>
              Edit Profile <LiaEdit className="size-6" />
            </>
          )}
        </button>
      </div>



      {/* Featured Videos Section */}
      {/* Featured Videos Section */}
      <div className="my-2">
        <div className="bg-[#E4D5CD]">
          <h2 className="flex items-center p-2 text-2xl font-bold h-16">
            Featured Videos
          </h2>
          <p className="pb-5 px-2 mt-[-15px]">
            Select at least five videos to be featured on your website gallery
          </p>
        </div>

        <div className="flex gap-4 justify-end mt-2">
          <button
            onClick={() => setShowVideoSelectionPopup(true)}
            className="flex items-center gap-2 border rounded-full py-2 px-6 text-white bg-[#333333]"
          >
            <MdAdd /> New
          </button>
          <GoSortDesc className="absolute size-7 right-20 bottom-[-145px]" />
          <button className="border hover:border hover:border-[#C5A592] h-12 w-36 rounded-full pl-4 flex items-center gap-2">
            Sort by
          </button>
        </div>

        {/* Display Selected/Uploaded Featured Videos */}
        <div className="grid grid-cols-4 gap-4 mt-4">
          {selectedVideos.map((video, index) => (
            <div key={index} className="relative">
              <video 
                src={video.url} 
                controls 
                className="w-full h-32 object-cover"
              />
              {/* Deselect Button */}
      <button
        onClick={() => handleRemoveVideo(video.url)}
        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
      >
        X
      </button>
              <p className="text-sm truncate">{video.filename}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Video Selection Popup */}
      {showVideoSelectionPopup && (
        <VideoSelectionPopup 
          onClose={() => setShowVideoSelectionPopup(false)}
          onSelectVideos={handleSelectVideos}
        />
      )}

      <ScrollToTop trigger={AccountInformation}/>
      <PaymentForm />
    </div>
  );
};

export default AccountInformation;



// //old code 
// import { useState, useEffect, useContext } from "react";
// import { LiaEdit } from "react-icons/lia";
// import { CiLock } from "react-icons/ci";
// import { MdAdd } from "react-icons/md";
// import { GoSortDesc } from "react-icons/go";
// import axios from "axios";
// import PaymentForm from "./PaymentForm";
// import ScrollToTop from "./ScrollToTop";
// import LoaderCompProfile from "./LoaderCompProfile";
// import toast from "react-hot-toast";
// import StoreContext from "../context/StoreContext";

// import VideoSelectionPopup from "./VideoSelectionPopup";

// const AccountInformation = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const { updateCompanyInfo } = useContext(StoreContext); 
//   const [selectedVideos, setSelectedVideos] = useState([]); // State to store uploaded videos
//   const [videoInput, setVideoInput] = useState(null); // To hold the selected video file
//   const [videoPreview, setVideoPreview] = useState(null); // CAN REMOVE THIS
//   const [isSave, setIsSave] = useState(false);
//   // State for each field
//   const [profileName, setProfileName] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [email, setEmail] = useState("");
//   const [address, setAddress] = useState("");
//   const [instagram, setInstagram] = useState("");
//   const [facebook, setFacebook] = useState("");
//   const [twitter, setTwitter] = useState("");
//   const [linkedin, setLinkedIn] = useState("");
//   const [aboutUs, setAboutUs] = useState("");

//   const [loading, setLoading] = useState(true);
  

//   const [showVideoSelectionPopup, setShowVideoSelectionPopup] = useState(false);


//   // if (loading) {
//   //   return (
//   //     <div className="min-h-screen bg-white mt-[-20px] p-10">
//   //       <LoaderCompProfile />
//   //     </div>
//   //   );
//   // }
//   //  useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       // Simulate fetching user data or any necessary data here
//   //       await axios.get('/api/user-data'); // Replace with your actual API endpoint

//   //       // Once the data is fetched, set loading to false
//   //       setLoading(false);
//   //     } catch (error) {
//   //       console.error("Error fetching data:", error);
//   //       setLoading(false); // Make sure to set loading to false even on error
//   //     }
//   //   };

//   //   fetchData();
//   // }, []);

  

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   // Load saved data from local storage on component mount
//   useEffect(() => {
//     const savedProfileName = localStorage.getItem("profileName");
//     const savedPhoneNumber = localStorage.getItem("phoneNumber");
//     const savedEmail = localStorage.getItem("email");
//     const savedAddress = localStorage.getItem("address");
//     const savedInstagram = localStorage.getItem("instagram");
//     const savedFacebook = localStorage.getItem("facebook");
//     const savedTwitter = localStorage.getItem("twitter");
//     const savedLinkedIn = localStorage.getItem("linkedin");
//     const savedAboutUs = localStorage.getItem("aboutUs");

//     if (savedProfileName) setProfileName(savedProfileName);
//     if (savedPhoneNumber) setPhoneNumber(savedPhoneNumber);
//     if (savedEmail) setEmail(savedEmail);
//     if (savedAddress) setAddress(savedAddress);
//     if (savedInstagram) setInstagram(savedInstagram);
//     if (savedFacebook) setFacebook(savedFacebook);
//     if (savedTwitter) setTwitter(savedTwitter);
//     if (savedLinkedIn) setLinkedIn(savedLinkedIn);
//     if (savedAboutUs) setAboutUs(savedAboutUs);
//   }, []);

//   // // Toggle edit mode and save to localStorage when saving changes
//   // const handleEditClick = () => {
//   //   if (isEditing) {
//   //     localStorage.setItem("profileName", profileName);
//   //     localStorage.setItem("phoneNumber", phoneNumber);
//   //     localStorage.setItem("email", email);
//   //     localStorage.setItem("address", address);
//   //     localStorage.setItem("instagram", instagram);
//   //     localStorage.setItem("facebook", facebook);
//   //     localStorage.setItem("twitter", twitter);
//   //     localStorage.setItem("linkedin", linkedin);
//   //     localStorage.setItem("aboutUs", aboutUs);
//   //   }
//   //   setIsEditing((prev) => !prev); // Toggles between edit and save states
//   //   if (isEditing && !isSave) {
//   //     toast.success("Account Information Updated")
//   //   }
//   // };

//   // Toggle edit mode and save to localStorage when saving changes
//   const handleEditClick = () => {
//     if (isEditing) {
//       // Prepare the updated info object to send to the context
//       const updatedInfo = {
//         profileName,
//         phone: phoneNumber, // Ensure this matches the backend schema
//         email,
//         address,
//         social: {
//           instagram,
//           facebook,
//           twitter,
//           linkedin,
//         },
//         about: aboutUs, // Ensure this matches the backend schema
//       };

//       // Call the updateCompanyInfo function from context
//       updateCompanyInfo(updatedInfo);

//       // Optionally save data to localStorage
//       localStorage.setItem("profileName", profileName);
//       localStorage.setItem("phoneNumber", phoneNumber);
//       localStorage.setItem("email", email);
//       localStorage.setItem("address", address);
//       localStorage.setItem("instagram", instagram);
//       localStorage.setItem("facebook", facebook);
//       localStorage.setItem("twitter", twitter);
//       localStorage.setItem("linkedin", linkedin);
//       localStorage.setItem("aboutUs", aboutUs);
      
//       toast.success("Account Information Updated");
//     }
//     setIsEditing((prev) => !prev); // Toggles between edit and save states
//   };



//   // Handle video file selection
//   const handleFileSelect = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setVideoInput(file);
//     }
//   };

//   // // Handle uploading the selected video
//   // const handleUploadVideo = async () => {
//   //   if (!videoInput) {
//   //     alert("Please select a video first.");
//   //     return;
//   //   }

//   //   const formData = new FormData();
//   //   formData.append("video", videoInput);

//   //   try {
//   //     const response = await axios.post("/api/upload-video", formData, {
//   //       headers: {
//   //         "Content-Type": "multipart/form-data",
//   //       },
//   //     });

//   //     // Add the new video URL to the state to display it
//   //     setSelectedVideos([...selectedVideos, response.data.videoUrl]);
//   //     setVideoInput(null); // Clear the input after successful upload
//   //   } catch (error) {
//   //     console.error("Error uploading video:", error);
//   //   }
//   // };



  
//   // Fetch data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/company-info");
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         const data = await response.json();
//         setProfileName(data.profileName || "");
//         setPhoneNumber(data.phoneNumber || "");
//         setEmail(data.email || "");
//         setAddress(data.address || "");
//         setInstagram(data.instagram || "");
//         setFacebook(data.facebook || "");
//         setTwitter(data.twitter || "");
//         setLinkedIn(data.linkedin || "");
//         setAboutUs(data.aboutUs || "");
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // // New function to handle video selection from the popup
//   // const handleVideoSelection = async (videos) => {
//   //   try {
//   //     // Prepare the videos for upload to your backend
//   //     const formData = new FormData();
//   //     videos.forEach((video) => {
//   //       formData.append("videos", {
//   //         uri: video.url,
//   //         name: video.filename,
//   //         type: "video/mp4"
//   //       });
//   //     });

//   //     // Make an API call to upload the selected videos
//   //     const response = await axios.post("/api/upload-featured-videos", formData, {
//   //       headers: {
//   //         "Content-Type": "multipart/form-data",
//   //       },
//   //     });

//   //     // Update the selectedVideos state with the newly uploaded videos
//   //     setSelectedVideos([...selectedVideos, ...response.data.uploadedVideos]);

//   //     // Show a success toast
//   //     toast.success(`${videos.length} video(s) added to featured videos`);
//   //   } catch (error) {
//   //     console.error("Error uploading featured videos:", error);
//   //     toast.error("Failed to upload videos");
//   //   }
//   // };


//   // Handle video selection (from the popup)
//   const handleSelectVideos = async (selectedVideos) => {
//     if (selectedVideos.length === 0) {
//       toast.error("Please select at least one video.");  // Show error toast
//       return;
//     }

//     setLoading(true);  // Set loading state to true while sending the request
//     const requestData = { videoUrls: selectedVideos };

//     console.log("Request Data being sent to the backend:", requestData);

//     try {
//       const response = await axios.put('http://localhost:5000/api/features/edit', requestData);

//       if (response.status === 200) {
//         toast.success("Videos successfully updated!");  // Success toast
//         console.log("Videos successfully updated:", response.data);
//       } else {
//         toast.error("Failed to update videos. Please try again.");  // Error toast
//         console.error("Failed to update videos:", response);
//       }
//     } catch (error) {
//       toast.error("Error while updating videos. Please try again.");  // Error toast
//       console.error("Error while updating videos:", error);
//     } finally {
//       setLoading(false);  // Reset loading state
//     }
//   };


//   return (
//     <div className="w-full h-auto mt-[-40px] p-8">
//       <h2 className="flex items-center p-2 text-2xl font-bold h-16 bg-[#E4D5CD]">
//         Account Information
//       </h2>

//       <div className="flex flex-col lg:grid grid-cols-2 gap-4 mt-6">
//         {/* Input Fields */}
//         <div className="relative">
//           <label className="absolute -top-3 left-3 bg-white px-1 text-sm">
//             Profile Name
//           </label>
//           <input
//             type="text"
//             value={profileName}
//             onChange={(e) => setProfileName(e.target.value)}
//             placeholder="Enter your profile name"
//             className="w-full h-[50px] border border-gray-300 px-4"
//             disabled={!isEditing} // Disable when not editing
//           />
//           <CiLock className="absolute top-[50%] transform -translate-y-1/2 right-4 text-gray-500" />
//         </div>

//         {/* Other Input Fields */}
//         <div className="relative">
//           <label className="absolute -top-3 left-3 bg-white px-1 text-sm">
//             Phone Number
//           </label>
//           <input
//             type="text"
//             value={phoneNumber}
//             onChange={(e) => setPhoneNumber(e.target.value)}
//             placeholder="Enter your phone number"
//             className="w-full h-[50px] border border-gray-300 px-4"
//             disabled={!isEditing}
//           />
//         </div>

//         <div className="relative">
//           <label className="absolute -top-3 left-3 bg-white px-1 text-sm">
//             Email
//           </label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your Email"
//             className="w-full h-[50px] border border-gray-300 px-4"
//             disabled={!isEditing}
//           />
//         </div>

//         <div className="relative">
//           <label className="absolute -top-3 left-3 bg-white px-1 text-sm">
//             Address
//           </label>
//           <input
//             type="text"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             placeholder="Enter your Address"
//             className="w-full h-[50px] border border-gray-300 px-4"
//             disabled={!isEditing}
//           />
//         </div>

//         <div className="relative">
//           <label className="absolute -top-3 left-3 bg-white px-1 text-sm">
//             Instagram
//           </label>
//           <input
//             type="text"
//             value={instagram}
//             onChange={(e) => setInstagram(e.target.value)}
//             placeholder="Enter your Instagram Username"
//             className="w-full h-[50px] border border-gray-300 px-4"
//             disabled={!isEditing}
//           />
//         </div>

//         <div className="relative">
//           <label className="absolute -top-3 left-3 bg-white px-1 text-sm">
//             Facebook
//           </label>
//           <input
//             type="text"
//             value={facebook}
//             onChange={(e) => setFacebook(e.target.value)}
//             placeholder="Enter Your Facebook Username"
//             className="w-full h-[50px] border border-gray-300 px-4"
//             disabled={!isEditing}
//           />
//         </div>

//         <div className="relative">
//           <label className="absolute -top-3 left-3 bg-white px-1 text-sm">
//             X (Twitter)
//           </label>
//           <input
//             type="text"
//             value={twitter}
//             onChange={(e) => setTwitter(e.target.value)}
//             placeholder="Enter your X Username"
//             className="w-full h-[50px] border border-gray-300 px-4"
//             disabled={!isEditing}
//           />
//         </div>

//         <div className="relative">
//           <label className="absolute -top-3 left-3 bg-white px-1 text-sm">
//             LinkedIn
//           </label>
//           <input
//             type="text"
//             value={linkedin}
//             onChange={(e) => setLinkedIn(e.target.value)}
//             placeholder="Enter your LinkedIn Username"
//             className="w-full h-[50px] border border-gray-300 px-4"
//             disabled={!isEditing}
//           />
//         </div>
//       </div>

//       {/* About Us Section */}
//       <div className="relative mt-6">
//         <label className="absolute -top-3 left-3 bg-white px-1 text-sm">
//           About Us
//         </label>
//         <textarea
//           value={aboutUs}
//           onChange={(e) => setAboutUs(e.target.value)}
//           placeholder="About Us"
//           className="w-full h-28 border border-gray-300 px-4 py-2"
//           disabled={!isEditing}
//         ></textarea>
//       </div>

//       {/* Button Section */}
//       <div className="flex justify-end mb-6">
//         <button
//           onClick={handleEditClick}
//           className="flex gap-2 items-center w-52 mt-6 bg-black text-white px-12 py-3 rounded-full"
//         >
//           {isEditing ? (
//             "Save Changes"
//           ) : (
//             <>
//               Edit Profile <LiaEdit className="size-6" />
//             </>
//           )}
//         </button>
//       </div>



//       {/* Featured Videos Section */}
//       {/* Featured Videos Section */}
//       <div className="my-2">
//         <div className="bg-[#E4D5CD]">
//           <h2 className="flex items-center p-2 text-2xl font-bold h-16">
//             Featured Videos
//           </h2>
//           <p className="pb-5 px-2 mt-[-15px]">
//             Select at least five videos to be featured on your website gallery
//           </p>
//         </div>

//         <div className="flex gap-4 justify-end mt-2">
//           <button
//             onClick={() => setShowVideoSelectionPopup(true)}
//             className="flex items-center gap-2 border rounded-full py-2 px-6 text-white bg-[#333333]"
//           >
//             <MdAdd /> New
//           </button>
//           <GoSortDesc className="absolute size-7 right-20 bottom-[-145px]" />
//           <button className="border hover:border hover:border-[#C5A592] h-12 w-36 rounded-full pl-4 flex items-center gap-2">
//             Sort by
//           </button>
//         </div>

//         {/* Display Selected/Uploaded Featured Videos */}
//         <div className="grid grid-cols-4 gap-4 mt-4">
//           {selectedVideos.map((video, index) => (
//             <div key={index} className="relative">
//               <video 
//                 src={video.url} 
//                 controls 
//                 className="w-full h-32 object-cover"
//               />
//               <p className="text-sm truncate">{video.filename}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Video Selection Popup */}
//       {showVideoSelectionPopup && (
//         <VideoSelectionPopup 
//           onClose={() => setShowVideoSelectionPopup(false)}
//           onSelectVideos={handleSelectVideos}
//         />
//       )}

//       <ScrollToTop trigger={AccountInformation}/>
//       <PaymentForm />
//     </div>
//   );
// };

// export default AccountInformation;

