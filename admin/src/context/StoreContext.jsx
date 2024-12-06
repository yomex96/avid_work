import React, { createContext, useState, useEffect } from "react";
import { toast } from 'react-hot-toast';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {

  // Messages-related state and functions

  // const [messages, setMessages] = useState(() => {
  //   const storedMessages = localStorage.getItem('messages');
  //   return storedMessages ? JSON.parse(storedMessages) : [];
  // });

  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  


  // local host & production
  // // Fetch messages
  // const fetchMessages = async () => {
  //   try {
  //     const response = await fetch("http://localhost:5000/api/contact/summary");
  //     const data = await response.json();
  //     setMessages(data);
  //   } catch (error) {
  //     console.error("Error fetching messages:", error);
  //     setError("Error fetching messages");
  //   }
  // };

  const fetchMessages = async () => {
    const url =
      window.location.hostname === "localhost"
        ? "http://localhost:5000/api/contact/summary"
        : "/api/contact/summary";
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setError("Error fetching messages");
    }
  };
  

    // Calculate the number of messages
    const messageCount = messages.length;


  //   // Update localStorage whenever messages change
  // useEffect(() => {
  //   localStorage.setItem('messages', JSON.stringify(messages));
  // }, [messages]);

  // // Function to add a new message
  // const addMessage = (newMessage) => {
  //   setMessages((prevMessages) => [...prevMessages, newMessage]);
  // };


  // Optionally, log or use the count in your component
  useEffect(() => {
    console.log("Total messages:", messageCount);
  }, [messages]);



  // Delete messages
  const deleteMessages = async (selectedMessages) => {
    try {
      await Promise.all(
        selectedMessages.map((id) =>
          fetch(`http://localhost:5000/api/contact/${id}`, { method: "DELETE" })
        )
      );
      setMessages((prevMessages) =>
        prevMessages.filter((message) => !selectedMessages.includes(message.id))
      );
    } catch (error) {
      console.error("Error deleting messages:", error);
    }
  };

  // Send reply
  const sendReply = async (id, reply) => {
    try {
      await fetch(`http://localhost:5000/api/contact/reply/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: reply }),
      });
    } catch (error) {
      console.error("Error sending reply:", error);
    }
  };

  // Mark as read
  const markAsRead = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/contact/messages/${id}/read`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Unread: false }),
      });
      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message.id === id ? { ...message, Unread: false } : message
        )
      );
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  const [token,setToken] = useState("")



  // Bookings-related state and functions
  const [bookings, setBookings] = useState([]);
  const [bookingStatuses, setBookingStatuses] = useState({});
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch bookings from API
  const fetchBookings = async () => {
    setLoading(true); 
    setError(null); 
    try {
      const response = await fetch("http://localhost:5000/api/bookings");
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      const data = await response.json();
      setBookings(data);
      setFilteredBookings(data); 

      // Initialize bookingStatuses state with current statuses from fetched data
      const initialStatuses = {};
      data.forEach((booking) => {
        initialStatuses[booking.bookingId] = booking.status;
      });
      setBookingStatuses(initialStatuses);
    } catch (error) {
      setError(error.message); 
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false); 
    }
  };

  // Call fetchBookings on mount
  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusUpdate = async (bookingId, newStatus) => {
    const previousStatus = bookingStatuses[bookingId];
    setBookingStatuses((prevStatuses) => ({
      ...prevStatuses,
      [bookingId]: newStatus,
    }));

    try {
      const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Failed to update booking status');
      }

      const updatedBooking = await response.json();
      console.log('Updated Booking:', updatedBooking);

      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.bookingId === bookingId ? { ...booking, status: newStatus } : booking
        )
      );
    } catch (error) {
      console.error('Error updating booking status:', error);
      setBookingStatuses((prevStatuses) => ({
        ...prevStatuses,
        [bookingId]: previousStatus,
      }));
      setError(error.message);
    }
  };

  const handleDelete = async (selectedBookings) => {
    if (selectedBookings.length === 0) return;

    try {
      const deletePromises = selectedBookings.map((bookingId) =>
        fetch(`http://localhost:5000/api/bookings/delete/${bookingId}`, {
          method: "DELETE",
        })
      );

      const responses = await Promise.all(deletePromises);
      const failedResponses = responses.filter(res => !res.ok);

      if (failedResponses.length > 0) {
        throw new Error('Some deletions failed');
      }

      setBookings((prev) => prev.filter((booking) => !selectedBookings.includes(booking.bookingId)));
    } catch (error) {
      console.error("Error deleting bookings:", error);
      setError(error.message); 
    }
  };

  // Optional: function to filter bookings
  const filterBookings = (status) => {
    const filtered = bookings.filter(booking => booking.status === status);
    setFilteredBookings(filtered);
  };


//company info 

// const [error, setError] = useState(null); 
const [companyInfo, setCompanyInfo] = useState(null); 


 // Update company info
 const updateCompanyInfo = async (updatedInfo) => {
  try {
    const response = await fetch("http://localhost:5000/api/company-info", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedInfo),
    });
    console.log("Response status:", response.status);
    if (!response.ok) throw new Error("Failed to update company info");

    const updatedCompanyInfo = await response.json();
    console.log("Updated company info:", updatedCompanyInfo);

    setCompanyInfo(updatedCompanyInfo); 
  } catch (error) {
    console.error("Error updating company info:", error);
    setError(error.message);
  }
};

  // Fetch company info on mount
  useEffect(() => {
    updateCompanyInfo();
  }, []);



  const [bankInfo, setBankInfo] = useState(null);

   // Fetch bank info when component mounts
   useEffect(() => {
    addBankInfo;
  }, [])

  const addBankInfo = async (formData) => {
    const bankId = '672127f1fb0ea2635fba1b9f'; 
  
    try {
      // Exclude the _id field from formData if it exists
      const { _id, ...updateData } = formData;
  
      console.log("Sending request to update bank info with data:", updateData);
      console.log("Bank ID:", bankId);
  
      const response = await fetch(`http://localhost:5000/api/bank/${bankId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData), 
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Server response:", data);
      setBankInfo(data);
      // toast.success("Bank information saved successfully.");
    } catch (error) {
      console.error("Error saving bank information:", error);
      toast.error("Failed to save bank information.");
    }
  };

//   // Function to add bank info
// const addBankInfo = async (newBankInfo) => {
//   try {
//     // Log the new bank info being sent to the backend
//     console.log("Data being sent to the backend:", newBankInfo);

//     const response = await fetch('http://localhost:5000/api/bank', {
//       method: "PUT",
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newBankInfo),
//     });

//     if (!response.ok) throw new Error('Failed to add bank info');

//     const data = await response.json();
//     console.log("Updated bank info:", data); // Log the updated bank info
//     setBankInfo(data.bankInfo); // Update state with the new bank info
//   } catch (error) {
//     console.error('Error adding bank info:', error);
//     setError(error.message); // Set error message
//   }
// };
 // Add or update bank information



//authentication section


 const [authData, setAuthData] = useState(null);
 const [isLoading, setIsLoading] = useState(false);
//  const [error, setError] = useState("");

 const setLoginData = (data) => {
   setAuthData(data);
 };

 const logout = () => {
   setAuthData(null); // Clear login data
 };

 const handleLogin = async (loginData) => {
   setIsLoading(true);
   setError("");
   
   try {
     const response = await fetch("http://localhost:5000/api/admin/login", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(loginData),
     });

     const data = await response.json();

     if (response.ok) {
       // Store the authentication data
       setLoginData({
         token: data.token,
         email: data.email,
         phoneNumber: data.phoneNumber,
       });
       return { success: true };
     } else {
       setError(data.error || "Login failed. Please try again.");
       return { success: false, error: data.error };
     }
   } catch (err) {
     console.error("Error during login:", err);
     setError("An error occurred. Please try again.");
     return { success: false, error: err.message };
   } finally {
     setIsLoading(false);
   }
 };


  

  return (
    <StoreContext.Provider
      value={{
        messages,
        bankInfo,
        error,
        messageCount,
        // addMessage,
        fetchMessages,
        companyInfo,
        updateCompanyInfo,
        deleteMessages,
        sendReply,
        markAsRead,
        addBankInfo,
        bookings,
        filteredBookings,
        bookingStatuses,
        loading,
        handleStatusUpdate,
        handleDelete,
        fetchBookings,
        filterBookings,
        // validateEmail, createAccount, message, loading

        authData, isLoading, handleLogin, logout,
        
        

      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContext;















//reference purposes 

// import React, { createContext, useState, useEffect } from 'react';

// const StoreContext = createContext();

// export const StoreProvider = ({ children }) => {
//     const [bookings, setBookings] = useState([]);
//     const [bookingStatuses, setBookingStatuses] = useState({});
//     const [filteredBookings, setFilteredBookings] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     // Fetch bookings from API
//     const fetchBookings = async () => {
//         setLoading(true); // Set loading to true while fetching
//         setError(null); // Clear previous errors
//         try {
//             const response = await fetch("http://localhost:5000/api/bookings");
//             if (!response.ok) {
//                 throw new Error('Failed to fetch bookings');
//             }
//             const data = await response.json();
//             setBookings(data);
//             setFilteredBookings(data); // Initially set filteredBookings to all bookings

//             // Initialize bookingStatuses state with current statuses from fetched data
//             const initialStatuses = {};
//             data.forEach((booking) => {
//                 initialStatuses[booking.bookingId] = booking.status;
//             });
//             setBookingStatuses(initialStatuses);
//         } catch (error) {
//             setError(error.message); // Set error message for display
//             console.error("Error fetching bookings:", error);
//         } finally {
//             setLoading(false); // Set loading to false after fetch
//         }
//     };

//     // Call fetchBookings on mount
//     useEffect(() => {
//         fetchBookings();
//     }, []);

    

//     const handleStatusUpdate = async (bookingId, newStatus) => {
//       const previousStatus = bookingStatuses[bookingId]; 
//       setBookingStatuses((prevStatuses) => ({
//           ...prevStatuses,
//           [bookingId]: newStatus,
//       }));
  
//       try {
//           const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}/status`, {
//               method: 'PATCH',
//               headers: {
//                   'Content-Type': 'application/json',
//               },
//               body: JSON.stringify({ status: newStatus }),
//           });
  
//           if (!response.ok) {
//               const errorResponse = await response.json();
//               throw new Error(errorResponse.message || 'Failed to update booking status');
//           }
  
//           const updatedBooking = await response.json();
//           console.log('Updated Booking:', updatedBooking);
  
//           setBookings((prevBookings) =>
//               prevBookings.map((booking) =>
//                   booking.bookingId === bookingId ? { ...booking, status: newStatus } : booking
//               )
//           );
//       } catch (error) {
//           console.error('Error updating booking status:', error);
//           setBookingStatuses((prevStatuses) => ({
//               ...prevStatuses,
//               [bookingId]: previousStatus,
//           }));
//           setError(error.message);
//       }
//   };

  

//     const handleDelete = async (selectedBookings) => {
//         if (selectedBookings.length === 0) return;

//         try {
//             const deletePromises = selectedBookings.map((bookingId) =>
//                 fetch(`http://localhost:5000/api/bookings/delete/${bookingId}`, {
//                     method: "DELETE",
//                 })
//             );

//             const responses = await Promise.all(deletePromises);
//             const failedResponses = responses.filter(res => !res.ok);
            
//             if (failedResponses.length > 0) {
//                 throw new Error('Some deletions failed');
//             }

//             setBookings((prev) => prev.filter((booking) => !selectedBookings.includes(booking.bookingId)));
//         } catch (error) {
//             console.error("Error deleting bookings:", error);
//             setError(error.message); // Set error message for display
//         }
//     };

//     // Optional: function to filter bookings
//     const filterBookings = (status) => {
//         const filtered = bookings.filter(booking => booking.status === status);
//         setFilteredBookings(filtered);
//     };

//     return (
//         <StoreContext.Provider value={{
//             bookings,
//             filteredBookings,
//             bookingStatuses,
//             loading,
//             error,
//             handleStatusUpdate,
//             handleDelete,
//             fetchBookings,
//             filterBookings // Optional: expose the filter function
//         }}>
//             {children}
//         </StoreContext.Provider>
//     );
// };

// export default StoreContext;


// src/context/StoreContext.js



