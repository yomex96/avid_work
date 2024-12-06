// import { createContext, useState, useContext } from "react";
import { createContext, useContext, useState, useEffect} from "react";
import axios from "axios";
import { uploads as initialUploads } from "../assets/assets";
import toast from "react-hot-toast";

import { useRef } from "react";



export const StoreContext = createContext(null);

export const useStoreContext = () => useContext(StoreContext);

const StoreContextProvider = (props) => {
//   const url = "http://localhost:5000"; // Directly set the API base URL
  const [uploads, setUploads] = useState(initialUploads || []);

  // State for checking time availability
  const [isTimeAvailable, setIsTimeAvailable] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Function to send a contact message
  const sendContactMessage = async (contactData) => {
    try {
    //   const response = await axios.post(`${url}/api/contact/`, contactData);
    const response = await axios.post(`/api/contact/`, contactData);
      return response.data;
    } catch (error) {
      console.error(
        "Error sending contact message:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };
  

  const parseTime = (timeStr) => {
    const timePattern = /^(\d{1,2}):(\d{2})\s?(AM|PM)$/i;
    const match = timeStr.match(timePattern);

    if (!match) {
      throw new Error(`Invalid time format: ${timeStr}`);
    }

    let [_, hour, minute, period] = match;
    hour = hour.padStart(2, "0");
    minute = minute.padStart(2, "0");
    period = period.toUpperCase();

    return {
      hour,
      minute,
      period,
    };
  };


  
  // Main function to check availability
  const checkAvailability = async (date, timeFrom, timeTo) => {
    let data;
    try {
     
      data = {
        date: date,
        timeRange: {
          from: parseTime(timeFrom),
          to: parseTime(timeTo),
        },
      };
    } catch (parseError) {
      console.error("Error parsing time:", parseError);
      setIsTimeAvailable(false);
      setErrorMessage(`Accepted Time format: HH:MM AM/PM (02:30 PM or 7:15 AM)`);
      return;
    }

    console.log("Checking availability with data:", data);

    try {
      // Make the POST request to check availability
    //   const response = await axios.post(`${url}/api/bookings/check`, data);
    const response = await axios.post(`/api/bookings/check`, data);
      console.log("Availability response:", response.data); // the response from the backend

      if (response.data.available) {
        setIsTimeAvailable(true);
        setErrorMessage(""); 
      } else {
        setIsTimeAvailable(false);
        setErrorMessage(
          "Selected time is already booked. Please choose another slot."
        );
      }
    } catch (error) {
      console.error("Error checking availability:", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(`Error: ${error.response.data.message}`);
      } else {
        setErrorMessage("Error checking availability. Please try again later.");
      }

      setIsTimeAvailable(false);
    }
  };



  // Function to reset availability and error messages
  const resetAvailability = () => {
    setIsTimeAvailable(null);
    setErrorMessage("");
  }


  function validateTimeRange(timeRange) {
    const fromHour = parseInt(timeRange.from.hour, 10);
    const toHour = parseInt(timeRange.to.hour, 10);

    // Convert to 24-hour format for easier comparison
    const from24Hour =
      timeRange.from.period === "PM" && fromHour !== 12
        ? fromHour + 12
        : fromHour;
    const to24Hour =
      timeRange.to.period === "PM" && toHour !== 12 ? toHour + 12 : toHour;

    if (to24Hour <= from24Hour) {
      throw new Error("End time must be later than the start time.");
    }
  }


  const sendBookingDetails = async (bookingDetails) => {
    try {
        console.log("Booking Details:", bookingDetails);

       
        const timeString = bookingDetails.time || ""; 

        
        const [fromTime, toTime] = timeString.split(" - ");

        
        const parseTime = (time) => {
            if (!time) return null;
            const [hourMinute, period] = time.trim().split(" ");
            const [hour, minute] = hourMinute.split(":");

            return {
                hour: hour || "0",
                minute: minute || "0",
                period,
            };
        };

        // Parse the from and to times
        const from = parseTime(fromTime);
        const to = parseTime(toTime);

        // Validate periods
        if (!from || (from.period !== "AM" && from.period !== "PM")) {
            throw new Error(
                "From period is required and must be either 'AM' or 'PM'."
            );
        }

        if (!to || (to.period !== "AM" && to.period !== "PM")) {
            throw new Error(
                "To period is required and must be either 'AM' or 'PM'."
            );
        }

        // Validate the time range (implement the validateTimeRange function accordingly)
        validateTimeRange({ from, to });

        // Prepare the data object with the specified structure
        const data = {
            date: bookingDetails.date
                ? new Date(bookingDetails.date).toISOString().split('T')[0] 
                : "",
            bookingDate: new Date().toISOString().split('T')[0], 
            timeRange: {
                from: {
                    hour: from.hour,
                    minute: from.minute,
                    period: from.period,
                },
                to: {
                    hour: to.hour,
                    minute: to.minute,
                    period: to.period,
                },
            },
            name: bookingDetails.name || "N/A",
            email: bookingDetails.email || "N/A",
            phone: bookingDetails.phone || "N/A",
            services: Array.isArray(bookingDetails.services) ? bookingDetails.services : [],
            extraServices: bookingDetails.extraServices || false,
            location: bookingDetails.location
                ? {
                    type: "Point",
                    coordinates: [
                        bookingDetails.location.lng || 0,
                        bookingDetails.location.lat || 0,
                    ], 
                }
                : { type: "Point", coordinates: [0, 0] }, 
            transactionId: bookingDetails.transactionId || "", 
            flw_ref: bookingDetails.flw_ref || "",
            amount: bookingDetails.amount || 0, 
            settledAmount: bookingDetails.settledAmount || 0, 
            paymentType: bookingDetails.paymentType || "unknown", 
            currency: bookingDetails.currency || "NGN", 
          };

        console.log("Data being sent:", data);

       
        const response = await axios.post(`/api/bookings/create`, data);
        console.log("Booking created:", response.data);

        toast.success("Booking created successfully!");
        return response.data;

    } catch (error) {
        console.error("Error sending booking details:", error);

        toast.error("Error creating booking: " + error.message);
        throw error; 
    }
};


 // State to hold company information
 const [companyInfo, setCompanyInfo] = useState({
  phone: '',
  address: '',
  about: '',
  social: {
    facebook: '',
    instagram: '',
    linkedin: '',
    twitter: ''
    
  }
});

// Fetch company information from the backend
useEffect(() => {
  const fetchCompanyInfo = async () => {
    try {
      const url =
        window.location.hostname === 'localhost'
          ? 'http://localhost:5000/api/company-info'
          : '/api/company-info'; // Use relative URL in production

      const response = await axios.get(url);
      setCompanyInfo(response.data);
    } catch (error) {
      console.error('Error fetching company info:', error);
    }
  };

  fetchCompanyInfo();
}, []);


const [services, setServices] = useState([]);

  const fetchServices = async () => {
    try {
      const url =
        window.location.hostname === "localhost"
          ? "http://localhost:5000/api/services/media-services"
          : "/api/services/media-services";

      const response = await axios.get(url);
      setServices(response.data.mediaServices); // Ensure this matches your API structure
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  // Fetch services on mount
  useEffect(() => {
    fetchServices();
  }, []);

  



  // const [uploads, setUploads] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [fullScreenVideo, setFullScreenVideo] = useState(null);
  const [playing, setPlaying] = useState([]);
  const playerRefs = useRef([]);
  const itemsPerPage = 6;

  // Function to fetch the uploads based on service name
  // const fetchUploads = async (serviceName) => {
  //   try {
  //     const response = await fetch(`http://localhost:5000/api/services/name/${serviceName}`);
  //     const data = await response.json();

  //     const videos = data?.categories?.flatMap((category) =>
  //       category.videos.map((video) => ({
  //         url: video.url,
  //         filename: video.filename, // You can also map other attributes if necessary
  //       }))
  //     ) || [];

  //     setUploads(videos);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching uploads:", error);
  //     setLoading(false);
  //   }
  // };

  const fetchUploads = async (serviceName) => {
    try {
      const url =
        window.location.hostname === "localhost"
          ? `http://localhost:5000/api/services/name/${serviceName}`
          : `/api/services/name/${serviceName}`;
  
      const response = await fetch(url);
      const data = await response.json();
  
      const videos = data?.categories?.flatMap((category) =>
        category.videos.map((video) => ({
          url: video.url,
          filename: video.filename, // You can also map other attributes if necessary
        }))
      ) || [];
  
      setUploads(videos);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching uploads:", error);
      setLoading(false);
    }
  };
  

  // Handle page navigation
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  // Get the current items (videos) for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = uploads.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(uploads.length / itemsPerPage);

  // Play or pause the video at a particular index
  const handlePlayPause = (index) => {
    setPlaying((prev) => {
      const newPlaying = [...prev];
      newPlaying[index] = !newPlaying[index];
      return newPlaying;
    });
  };

  // Set the video to full-screen
  const handleFullScreen = (index) => {
    setFullScreenVideo(index);
  };

  const handleCloseFullScreen = () => {
    setFullScreenVideo(null);
    setPlaying([]);
  };




  const contextValue = {
    sendContactMessage,
    checkAvailability,
    sendBookingDetails,
    isTimeAvailable,
    errorMessage,
    uploads,
    resetAvailability,
    companyInfo,
    services, 
    fetchServices,
    //new
    // uploads,
        currentPage,
        loading,
        fullScreenVideo,
        playing,
        fetchUploads,
        handleNextPage,
        handlePrevPage,
        handlePageClick,
        handlePlayPause,
        handleFullScreen,
        handleCloseFullScreen,
        currentItems,
        totalPages,

  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;




//❤️

  // const sendBookingDetails = async (bookingDetails) => {
  //   try {
  //     console.log("Booking Details:", bookingDetails);
  
  //     // Assuming bookingDetails.time is in the format '3:30 AM - 2:30 AM'
  //     const timeString = bookingDetails.time || ""; // Fallback in case time is undefined
  
  //     // Split the time string into 'from' and 'to' parts
  //     const [fromTime, toTime] = timeString.split(" - ");
  
  //     // Helper function to split the time into hour, minute, and period (AM/PM)
  //     const parseTime = (time) => {
  //       if (!time) return null;
  //       const [hourMinute, period] = time.trim().split(" ");
  //       const [hour, minute] = hourMinute.split(":");
  
  //       return {
  //         hour: hour || "0", 
  //         minute: minute || "0",
  //         period,
  //       };
  //     };
  
  //     // Parse the from and to times
  //     const from = parseTime(fromTime);
  //     const to = parseTime(toTime);
  
  //     // Validate periods
  //     if (!from || (from.period !== "AM" && from.period !== "PM")) {
  //       throw new Error(
  //         "From period is required and must be either 'AM' or 'PM'."
  //       );
  //     }
  
  //     if (!to || (to.period !== "AM" && to.period !== "PM")) {
  //       throw new Error(
  //         "To period is required and must be either 'AM' or 'PM'."
  //       );
  //     }
  
  //     // Validate the time range (implement the validateTimeRange function accordingly)
  //     validateTimeRange({ from, to });
  
  //     // Prepare the data object with the specified structure
  //     const data = {
  //       date: bookingDetails.date
  //         ? new Date(bookingDetails.date).toISOString().split('T')[0] // Convert date to 'YYYY-MM-DD'
  //         : "", 
  //       bookingDate: new Date().toISOString().split('T')[0], // Current date in 'YYYY-MM-DD' format
  //       timeRange: {
  //         from: {
  //           hour: from.hour,
  //           minute: from.minute,
  //           period: from.period,
  //         },
  //         to: {
  //           hour: to.hour,
  //           minute: to.minute,
  //           period: to.period,
  //         },
  //       },
  //       name: bookingDetails.name || "N/A",
  //       email: bookingDetails.email || "N/A",
  //       phone: bookingDetails.phone || "N/A",
  //       services: Array.isArray(bookingDetails.services) ? bookingDetails.services : [],
  //       extraServices: bookingDetails.extraServices || false,
  //       location: bookingDetails.location
  //         ? {
  //             type: "Point",
  //             coordinates: [
  //               bookingDetails.location.lng || 0,
  //               bookingDetails.location.lat || 0,
  //             ], // Ensure [longitude, latitude] format
  //           }
  //         : { type: "Point", coordinates: [0, 0] }, // Default to (0, 0) if no location
  //       transactionId: bookingDetails.transactionId || "", // Include transactionId
  //       amount: bookingDetails.amount || 0, // Include amount, default to 0 if not provided
  //       settledAmount: bookingDetails.settledAmount || 0, // Include settledAmount, default to 0 if not provided
  //       paymentType: bookingDetails.paymentType || "unknown", // Include paymentType, default to 'unknown' if not provided
  //     };
  
  //     console.log("Data being sent:", data);
  
  //     // Make the API request with the correctly formatted data
  //     const response = await axios.post(`/api/bookings/create`, data);
  //     console.log("Booking created:", response.data);
  
  //     toast.success("Booking created successfully!");
  //     return response.data; 
  
  //   } catch (error) {
  //     console.error("Error sending booking details:", error);
  
  //     toast.error("Error creating booking: " + error.message);
  //     throw error; // Rethrow error to handle it in the calling context
  //   }
  // };
  
    





  
// const sendBookingDetails = async (bookingDetails) => {
//   try {
//     console.log("Booking Details:", bookingDetails);

//     // Assuming bookingDetails.time is in the format '3:30 AM - 2:30 AM'
//     const timeString = bookingDetails.time || ""; // Fallback in case time is undefined

//     // Split the time string into 'from' and 'to' parts
//     const [fromTime, toTime] = timeString.split(" - ");

//     // Helper function to split the time into hour, minute, and period (AM/PM)
//     const parseTime = (time) => {
//       if (!time) return null;
//       const [hourMinute, period] = time.trim().split(" ");
//       const [hour, minute] = hourMinute.split(":");

//       return {
//         hour: hour || "0", 
//         minute: minute || "0",
//         period,
//       };
//     };

//     // Parse the from and to times
//     const from = parseTime(fromTime);
//     const to = parseTime(toTime);

//     // Validate periods
//     if (!from || (from.period !== "AM" && from.period !== "PM")) {
//       throw new Error(
//         "From period is required and must be either 'AM' or 'PM'."
//       );
//     }

//     if (!to || (to.period !== "AM" && to.period !== "PM")) {
//       throw new Error(
//         "To period is required and must be either 'AM' or 'PM'."
//       );
//     }

//     // Validate the time range (implement the validateTimeRange function accordingly)
//     validateTimeRange({ from, to });

//     // Prepare the data object with the specified structure
//     const data = {
//       date: bookingDetails.date
//         ? new Date(bookingDetails.date).toISOString().split('T')[0]
//         : "", // Convert date to 'YYYY-MM-DD'
//       bookingDate: new Date().toISOString().split('T')[0], // Current date in 'YYYY-MM-DD' format
//       timeRange: {
//         from: {
//           hour: from.hour,
//           minute: from.minute,
//           period: from.period,
//         },
//         to: {
//           hour: to.hour,
//           minute: to.minute,
//           period: to.period,
//         },
//       },
//       name: bookingDetails.name || "N/A",
//       email: bookingDetails.email || "N/A",
//       phone: bookingDetails.phone || "N/A",
//       services: Array.isArray(bookingDetails.services)
//         ? bookingDetails.services
//         : [],
//       extraServices: bookingDetails.extraServices || false,
//       location: bookingDetails.location
//         ? {
//             type: "Point",
//             coordinates: [
//               bookingDetails.location.lng || 0,
//               bookingDetails.location.lat || 0,
//             ], // Ensure [longitude, latitude] format
//           }
//         : { type: "Point", coordinates: [0, 0] }, // Default to (0, 0) if no location
//     }; 
    

//     console.log("Data being sent:", data);

//     // Make the API request with the correctly formatted data

//     //   const response = await axios.post(`${url}/api/bookings/create`, data);

//     const response = await axios.post(`/api/bookings/create`, data);
//     console.log("Booking created:", response.data);