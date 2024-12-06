import { useState, useEffect, useContext } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { GoSortDesc } from "react-icons/go";
import DeletePopUp from "../Components/DeletePopUp";
import { SendHorizontal, X } from "lucide-react";
import StoreContext from "../context/StoreContext";

const Messages = () => {
  const { messages, fetchMessages, deleteMessages, sendReply, markAsRead, error } = useContext(StoreContext);
  const [loading, setLoading] = useState(true); 

   // Load messages on component mount
   useEffect(() => {
    fetchMessages();
    setLoading(false);
  }, [fetchMessages]);


  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [showUnread, setShowUnread] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [sortOption, setSortOption] = useState("Newest");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [reply, setReply] = useState("");
  const [replies, setReplies] = useState({});

  

  // Load replies from localStorage when the component first loads
useEffect(() => {
  const savedReplies = localStorage.getItem("replies");
  if (savedReplies) {
    setReplies(JSON.parse(savedReplies)); 
  }
}, []);


useEffect(() => {
  if (Object.keys(replies).length > 0) { 
    localStorage.setItem("replies", JSON.stringify(replies));
  }
}, [replies]);


  const filteredMessages = showUnread
    ? messages.filter((message) => message.Unread)
    : messages;

  


const sortedMessages = Array.isArray(filteredMessages) ? filteredMessages.sort((a, b) => {
  switch (sortOption) {
    case "Newest":
      return parseDate(b["Time Sent"]) - parseDate(a["Time Sent"]);
    case "Oldest":
      return parseDate(a["Time Sent"]) - parseDate(b["Time Sent"]);
    case "Name Ascending":
      return a.name.localeCompare(b.name);
    case "Name Descending":
      return b.name.localeCompare(a.name); 
    default:
      return 0;
  }
}) : [];

// Function to parse the "Time Sent" string into a Date object
function parseDate(timeSentString) {
  const [datePart, timePart] = timeSentString.split(', ');
  const [day, month, year] = datePart.split('/'); 
  const [hour, minute, second] = timePart.split(':').map(Number); 
  return new Date(year, month - 1, day, hour, minute, second); 
}


  const totalPages = Math.ceil(sortedMessages.length / itemsPerPage);
  const indexOfLastMessage = currentPage * itemsPerPage;
  const indexOfFirstMessage = indexOfLastMessage - itemsPerPage;
  const currentMessages = sortedMessages.slice(
    indexOfFirstMessage,
    indexOfLastMessage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


 
const handleDelete = () => {
  if (selectedMessages.length > 0) {
      setShowPopup(true);
  } else {
      alert("Please select at least one message to delete.");
  }
};

  


const handleConfirmDelete = async () => {
  await deleteMessages(selectedMessages);
  setSelectedMessages([]);
  setShowPopup(false);
};


  const handleCancelDelete = () => {
    setShowPopup(false);
  };

  const handleCheckboxChange = (id) => {
    setSelectedMessages((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((msgId) => msgId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSortOptionChange = (option) => {
    setSortOption(option);
    setDropdownOpen(false);
  };

  
  
 


  const handleSendReply = async () => {
    if (!reply.trim()) return;
    await sendReply(selectedMessage.id, reply);
    setReplies((prevReplies) => ({
      ...prevReplies,
      [selectedMessage.id]: [...(prevReplies[selectedMessage.id] || []), reply],
    }));
    setReply("");
  };


  // Handle the Enter key to send the reply
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendReply();
    }
  };

   // Modify this function to reset the page to 1
   const handleToggleShowUnread = (value) => {
    setShowUnread(value);
    setCurrentPage(1); 
  };

 

  const markAsReadMessage = async (id) => {
    await markAsRead(id);
  };


  

  return (
    <div className="p-4">
      {selectedMessage ? (
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 max-w-4xl mx-auto">
          <div className="mb-4 flex justify-between">
            <h2 className="text-xl font-bold">
              {selectedMessage.name}
            </h2>
            <button
              className="hover:bg-red-100 text-red-600 p-2 rounded-full"
              onClick={() => setSelectedMessage(null)}
            >
              <X />
            </button>
          </div>
          <div className="flex flex-col">
            <div className="self-start break-words bg-[#E4D5CD] rounded-lg p-4 mb-2 shadow-md w-3/4">
              <p>{selectedMessage.message}</p>
              <p className="text-xs text-gray-500 text-right">
  {(() => {
    // Parse the "Time Sent" string into a Date object
    const timeSentString = selectedMessage['Time Sent'];
    const [datePart, timePart] = timeSentString.split(', '); 
    const [day, month, year] = datePart.split('/'); 

    // Create a new Date object using the parsed components
    const parsedDate = new Date(year, month - 1, day, ...timePart.split(':').map(Number));

    // Format and return the date
    return parsedDate.toLocaleString();
  })()}
</p>
            </div>
            {replies[selectedMessage.id]?.map((rep, index) => (
              <div
                key={index}
                className="self-end break-words bg-[#F6F2EF] rounded-lg p-4 mb-2 shadow-md w-3/4"
              >
                <p>{rep}</p>
                <p className="text-xs text-gray-500 text-right">
                  {new Date().toLocaleString()}
                </p>
              </div>
            ))}
            <div className="flex gap-1 mt-4">
              <input
                type="text"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Type your reply..."
                className="flex-grow p-2 border rounded-l-md"
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={handleSendReply}
                className="bg-[#A9785D] flex gap-2 text-white px-4 py-2 rounded-r-full"
              >
                Send Message
                <SendHorizontal />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between mb-4">
            <div>
              <button
                className={`mr-2 py-1 px-5 rounded-full ${
                  !showUnread ? "bg-[#C5A592]" : "border border-[#C5A592]"
                }`}
                onClick={() => setShowUnread(false)}
              >
                All
              </button>
              <button
                className={`py-1 px-3 rounded-full ${
                  showUnread ? "bg-[#C5A592]" : "border border-[#C5A592]"
                }`}
                onClick={() => setShowUnread(true)}
              >
                Unread
              </button>
            </div>
            <div className="flex gap-2">
              <button
                className="bg-red-500 text-white px-12 py-2 rounded-full hover:bg-red-600"
                onClick={handleDelete}
                disabled={selectedMessages.length === 0}
              >
                Delete
              </button>
              <button
                className="border px-8 border-gray-200 py-2 rounded-full flex items-center"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                Sort By
                <GoSortDesc className="ml-2" />
              </button>
              {dropdownOpen && (
                <div className="absolute z-10 bg-white shadow-lg rounded mt-2 w-48">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleSortOptionChange("Newest")}
                  >
                    Newest
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleSortOptionChange("Oldest")}
                  >
                    Oldest
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleSortOptionChange("Name Ascending")}
                  >
                    Name Ascending
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleSortOptionChange("Name Descending")}
                  >
                    Name Descending
                  </button>
                </div>
              )}
            </div>
          </div>

          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Select</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Message</th>
                <th className="px-4 py-2 border">Time Sent</th>
              </tr>
            </thead>
           

<tbody>

{currentMessages.map((message) => (
        <tr key={message.id} className="hover:bg-gray-100">
            <td className="border px-4 py-2">
                <input
                    type="checkbox"
                    checked={selectedMessages.includes(message.id)} 
                    onChange={() => handleCheckboxChange(message.id)}
                />
            </td>
            <td className="border px-4 py-2">{message.name}</td>
            <td
                className="flex justify-between hover:text-[#8d6d5a] hover:scale-105 hover:mx-3 border break-all px-4 py-2 cursor-pointer"
                onClick={() => {
                  setSelectedMessage(message);
                  markAsRead(message.id); 
                }}
            >
                {message.message ? (
                    message.message.slice(0, 55) + (message.message.length > 55 ? "..." : "")
                ) : (
                    "No message content available"
                )}
                      {/* Conditionally render the "New" span */}
        {message.Unread && (
          <span className="bg-red-500 hover:uppercase text-white px-2 py-1 rounded-full text-xs font-semibold mr-2">
            New
          </span>
        )}
            </td>
            <td className="border px-4 py-2">{message["Time Sent"] || "Time not available"}</td>
        </tr>
    ))}

    
  </tbody>
          </table>

          <div className="flex justify-center gap-2 mt-4">
            <button
              className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <FaChevronLeft />
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <FaChevronRight />
            </button>
          </div>
        </>
      )}
      {showPopup && (
        <DeletePopUp
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default Messages;








// yomex ❤️


// import { useState, useEffect } from "react";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import { GoSortDesc } from "react-icons/go";
// import DeletePopUp from "../Components/DeletePopUp";
// import { SendHorizontal, X } from "lucide-react";

// const Messages = () => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true); // To manage loading state
//   const [error, setError] = useState(null); // To manage error state

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/contact/summary");
//         const data = await response.json(); 
//         console.log(data); 
//         setMessages(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching messages:", error); 
//         setError("Error fetching messages");
//         setLoading(false);
//       }
//     };
//     fetchMessages();
//   }, []);



  
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;
//   const [showUnread, setShowUnread] = useState(false);
//   const [selectedMessages, setSelectedMessages] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [sortOption, setSortOption] = useState("Newest");
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [selectedMessage, setSelectedMessage] = useState(null);
//   const [reply, setReply] = useState("");
//   const [replies, setReplies] = useState({});

  

//   // Load replies from localStorage when the component first loads
// useEffect(() => {
//   const savedReplies = localStorage.getItem("replies");
//   if (savedReplies) {
//     setReplies(JSON.parse(savedReplies)); // Load replies into state
//   }
// }, []);

// // Save replies to localStorage every time they change
// useEffect(() => {
//   if (Object.keys(replies).length > 0) { // Check if there are replies to save
//     localStorage.setItem("replies", JSON.stringify(replies));
//   }
// }, [replies]);


//   const filteredMessages = showUnread
//     ? messages.filter((message) => message.Unread)
//     : messages;

  


// const sortedMessages = Array.isArray(filteredMessages) ? filteredMessages.sort((a, b) => {
//   switch (sortOption) {
//     case "Newest":
//       return parseDate(b["Time Sent"]) - parseDate(a["Time Sent"]);
//     case "Oldest":
//       return parseDate(a["Time Sent"]) - parseDate(b["Time Sent"]);
//     case "Name Ascending":
//       return a.name.localeCompare(b.name);
//     case "Name Descending":
//       return b.name.localeCompare(a.name); 
//     default:
//       return 0;
//   }
// }) : [];

// // Function to parse the "Time Sent" string into a Date object
// function parseDate(timeSentString) {
//   const [datePart, timePart] = timeSentString.split(', ');
//   const [day, month, year] = datePart.split('/'); 
//   const [hour, minute, second] = timePart.split(':').map(Number); 
//   return new Date(year, month - 1, day, hour, minute, second); 
// }


//   const totalPages = Math.ceil(sortedMessages.length / itemsPerPage);
//   const indexOfLastMessage = currentPage * itemsPerPage;
//   const indexOfFirstMessage = indexOfLastMessage - itemsPerPage;
//   const currentMessages = sortedMessages.slice(
//     indexOfFirstMessage,
//     indexOfLastMessage
//   );

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };


 
// const handleDelete = () => {
//   if (selectedMessages.length > 0) {
//       setShowPopup(true);
//   } else {
//       alert("Please select at least one message to delete.");
//   }
// };

  

//   const handleConfirmDelete = async () => {
//     try {
//         // Sending DELETE request to the server for each selected message
//         await Promise.all(
//             selectedMessages.map((id) => 
//                 fetch(`http://localhost:5000/api/contact/${id}`, {
//                     method: "DELETE",
//                 })
//             )
//         );

//         // Update local state to remove deleted messages
//         setMessages((prevMessages) =>
//             prevMessages.filter((message) => !selectedMessages.includes(message.id))
//         );

//         setSelectedMessages([]);
//         setShowPopup(false);
//     } catch (error) {
//         console.error("Error deleting messages:", error);
//         alert("An error occurred while deleting messages.");
//         setShowPopup(false);
//     }
// };


//   const handleCancelDelete = () => {
//     setShowPopup(false);
//   };

//   const handleCheckboxChange = (id) => {
//     setSelectedMessages((prevSelected) =>
//       prevSelected.includes(id)
//         ? prevSelected.filter((msgId) => msgId !== id)
//         : [...prevSelected, id]
//     );
//   };

//   const handleSortOptionChange = (option) => {
//     setSortOption(option);
//     setDropdownOpen(false);
//   };

  
  
//   const handleSendReply = async () => {
//     if (!reply.trim()) return; // Prevent sending empty replies
//     const id = selectedMessage.id; // Get the selected message ID

//     try {
//       // Send reply message to the server
//       await fetch(`http://localhost:5000/api/contact/reply/${id}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ message: reply }), // Send reply content
//       });

//       // Update local replies state
//       setReplies((prevReplies) => ({
//         ...prevReplies,
//         [id]: [...(prevReplies[id] || []), reply],
//       }));
//       setReply(""); // Clear input after sending
//     } catch (error) {
//       console.error("Error sending reply:", error);
//     }
//   };


//   // Handle the Enter key to send the reply
//   const handleKeyDown = (event) => {
//     if (event.key === "Enter") {
//       handleSendReply();
//     }
//   };

//    // Modify this function to reset the page to 1
//    const handleToggleShowUnread = (value) => {
//     setShowUnread(value);
//     setCurrentPage(1); 
//   };

 

//   const markAsRead = async (id) => {
//     try {
//       await fetch(`http://localhost:5000/api/contact/messages/${id}/read `, {
//         method: "PATCH", 
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ Unread: false }), // Set Unread to false
//       });

//       setMessages((prevMessages) =>
//         prevMessages.map((message) =>
//           message.id === id ? { ...message, Unread: false } : message
//         )
//       );
//     } catch (error) {
//       console.error("Error marking message as read:", error);
//     }
//   };


  

//   return (
//     <div className="p-4">
//       {selectedMessage ? (
//         <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 max-w-4xl mx-auto">
//           <div className="mb-4 flex justify-between">
//             <h2 className="text-xl font-bold">
//               {selectedMessage.name}
//             </h2>
//             <button
//               className="hover:bg-red-100 text-red-600 p-2 rounded-full"
//               onClick={() => setSelectedMessage(null)}
//             >
//               <X />
//             </button>
//           </div>
//           <div className="flex flex-col">
//             <div className="self-start break-words bg-[#E4D5CD] rounded-lg p-4 mb-2 shadow-md w-3/4">
//               <p>{selectedMessage.message}</p>
//               {/* <p className="text-xs text-gray-500 text-right">
//                 {new Date(selectedMessage.message["Time Sent"]).toLocaleString()}
//               </p> */}
//               <p className="text-xs text-gray-500 text-right">
//   {(() => {
//     // Parse the "Time Sent" string into a Date object
//     const timeSentString = selectedMessage['Time Sent'];
//     const [datePart, timePart] = timeSentString.split(', '); 
//     const [day, month, year] = datePart.split('/'); 

//     // Create a new Date object using the parsed components
//     const parsedDate = new Date(year, month - 1, day, ...timePart.split(':').map(Number));

//     // Format and return the date
//     return parsedDate.toLocaleString();
//   })()}
// </p>
//             </div>
//             {replies[selectedMessage.id]?.map((rep, index) => (
//               <div
//                 key={index}
//                 className="self-end break-words bg-[#F6F2EF] rounded-lg p-4 mb-2 shadow-md w-3/4"
//               >
//                 <p>{rep}</p>
//                 <p className="text-xs text-gray-500 text-right">
//                   {new Date().toLocaleString()}
//                 </p>
//               </div>
//             ))}
//             <div className="flex gap-1 mt-4">
//               <input
//                 type="text"
//                 value={reply}
//                 onChange={(e) => setReply(e.target.value)}
//                 placeholder="Type your reply..."
//                 className="flex-grow p-2 border rounded-l-md"
//                 onKeyDown={handleKeyDown}
//               />
//               <button
//                 onClick={handleSendReply}
//                 className="bg-[#A9785D] flex gap-2 text-white px-4 py-2 rounded-r-full"
//               >
//                 Send Message
//                 <SendHorizontal />
//               </button>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <>
//           <div className="flex justify-between mb-4">
//             <div>
//               <button
//                 className={`mr-2 py-1 px-5 rounded-full ${
//                   !showUnread ? "bg-[#C5A592]" : "border border-[#C5A592]"
//                 }`}
//                 onClick={() => setShowUnread(false)}
//               >
//                 All
//               </button>
//               <button
//                 className={`py-1 px-3 rounded-full ${
//                   showUnread ? "bg-[#C5A592]" : "border border-[#C5A592]"
//                 }`}
//                 onClick={() => setShowUnread(true)}
//               >
//                 Unread
//               </button>
//             </div>
//             <div className="flex gap-2">
//               <button
//                 className="bg-red-500 text-white px-12 py-2 rounded-full hover:bg-red-600"
//                 onClick={handleDelete}
//                 disabled={selectedMessages.length === 0}
//               >
//                 Delete
//               </button>
//               <button
//                 className="border px-8 border-gray-200 py-2 rounded-full flex items-center"
//                 onClick={() => setDropdownOpen((prev) => !prev)}
//               >
//                 Sort By
//                 <GoSortDesc className="ml-2" />
//               </button>
//               {dropdownOpen && (
//                 <div className="absolute z-10 bg-white shadow-lg rounded mt-2 w-48">
//                   <button
//                     className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                     onClick={() => handleSortOptionChange("Newest")}
//                   >
//                     Newest
//                   </button>
//                   <button
//                     className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                     onClick={() => handleSortOptionChange("Oldest")}
//                   >
//                     Oldest
//                   </button>
//                   <button
//                     className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                     onClick={() => handleSortOptionChange("Name Ascending")}
//                   >
//                     Name Ascending
//                   </button>
//                   <button
//                     className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                     onClick={() => handleSortOptionChange("Name Descending")}
//                   >
//                     Name Descending
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           <table className="min-w-full border">
//             <thead>
//               <tr>
//                 <th className="px-4 py-2 border">Select</th>
//                 <th className="px-4 py-2 border">Name</th>
//                 <th className="px-4 py-2 border">Message</th>
//                 <th className="px-4 py-2 border">Time Sent</th>
//               </tr>
//             </thead>
           

// <tbody>

// {currentMessages.map((message) => (
//         <tr key={message.id} className="hover:bg-gray-100">
//             <td className="border px-4 py-2">
//                 <input
//                     type="checkbox"
//                     checked={selectedMessages.includes(message.id)} 
//                     onChange={() => handleCheckboxChange(message.id)}
//                 />
//             </td>
//             <td className="border px-4 py-2">{message.name}</td>
//             <td
//                 className="flex justify-between hover:text-[#8d6d5a] hover:scale-105 hover:mx-3 border break-all px-4 py-2 cursor-pointer"
//                 onClick={() => {
//                   setSelectedMessage(message);
//                   markAsRead(message.id); 
//                 }}
//             >
//                 {message.message ? (
//                     message.message.slice(0, 55) + (message.message.length > 55 ? "..." : "")
//                 ) : (
//                     "No message content available"
//                 )}
//                       {/* Conditionally render the "New" span */}
//         {message.Unread && (
//           <span className="bg-red-500 hover:uppercase text-white px-2 py-1 rounded-full text-xs font-semibold mr-2">
//             New
//           </span>
//         )}
//             </td>
//             <td className="border px-4 py-2">{message["Time Sent"] || "Time not available"}</td>
//         </tr>
//     ))}

    
//   </tbody>
//           </table>

//           <div className="flex justify-center gap-2 mt-4">
//             <button
//               className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded"
//               onClick={handlePreviousPage}
//               disabled={currentPage === 1}
//             >
//               <FaChevronLeft />
//             </button>
//             <span>
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded"
//               onClick={handleNextPage}
//               disabled={currentPage === totalPages}
//             >
//               <FaChevronRight />
//             </button>
//           </div>
//         </>
//       )}
//       {showPopup && (
//         <DeletePopUp
//           onConfirm={handleConfirmDelete}
//           onCancel={handleCancelDelete}
//         />
//       )}
//     </div>
//   );
// };

// export default Messages;















//ben work 

// import { useState, useEffect } from "react";

// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import { GoSortDesc } from "react-icons/go";
// import DeletePopUp from "../Components/DeletePopUp";
// import { SendHorizontal, X } from "lucide-react";

// const Messages = () => {
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       customerName: "Israel Emmanuel",
//       content:
//         "Looking for a booking for my wedding. Your timely response to this request is crucial",
//       timeSent: "2024-10-20T10:30:00Z",
//       isNew: true,
//     },
//     {
//       id: 2,
//       customerName: "Bryan Waya",
//       content: "Can I get a quote for a lifestyle shoot?",
//       timeSent: "2024-10-20T08:00:00Z",
//       isNew: true,
//     },
//     {
//       id: 3,
//       customerName: "Prince Amuche",
//       content: "What are your available dates?",
//       timeSent: "2024-10-20T09:00:00Z",
//       isNew: true,
//     },
//     {
//       id: 4,
//       customerName: "Abayomi Onawole",
//       content: "I need to reschedule my appointment.",
//       timeSent: "2024-10-19T15:00:00Z",
//       isNew: false,
//     },
//     {
//       id: 5,
//       customerName: "Benjamin Richard",
//       content: "Can you send me the contract details?",
//       timeSent: "2024-10-19T12:00:00Z",
//       isNew: false,
//     },
//     {
//       id: 6,
//       customerName: "Marilyn Olubayor",
//       content: "When will I receive my photos?",
//       timeSent: "2024-10-20T09:30:00Z",
//       isNew: true,
//     },
//     {
//       id: 7,
//       customerName: "Deborah Opakirite",
//       content: "Is there an update on my request?",
//       timeSent: "2024-10-18T08:30:00Z",
//       isNew: false,
//     },

//     {
//       id: 8,
//       customerName: "Israel Moses",
//       content: "Looking for a booking for my wedding. Please reply as soon.",
//       timeSent: "2023-10-20T10:30:00Z",
//       isNew: false,
//     },
//     {
//       id: 9,
//       customerName: "Bryan Benard",
//       content: "Can I get a quote for a lifestyle shoot?",
//       timeSent: "2022-10-20T08:00:00Z",
//       isNew: false,
//     },
//     {
//       id: 10,
//       customerName: "Prince Amaka",
//       content: "What are your available dates?",
//       timeSent: "2021-10-20T09:00:00Z",
//       isNew: false,
//     },
//     {
//       id: 11,
//       customerName: "Robert Onawole",
//       content: "I need to reschedule my appointment.",
//       timeSent: "2021-10-19T15:00:00Z",
//       isNew: false,
//     },
//     {
//       id: 12,
//       customerName: "Esther Richard",
//       content: "Can you send me the contract details?",
//       timeSent: "2022-10-19T12:00:00Z",
//       isNew: false,
//     },
//     {
//       id: 13,
//       customerName: "Marilyn Moses",
//       content: "When will I receive my photos?",
//       timeSent: "2023-10-20T09:30:00Z",
//       isNew: false,
//     },
//     {
//       id: 14,
//       customerName: "Simon Alex",
//       content: "Is there an update on my request?",
//       timeSent: "2020-10-18T08:30:00Z",
//       isNew: false,
//     },
//   ]);

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;
//   const [showUnread, setShowUnread] = useState(false);
//   const [selectedMessages, setSelectedMessages] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [sortOption, setSortOption] = useState("Newest");
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [selectedMessage, setSelectedMessage] = useState(null);
//   const [reply, setReply] = useState("");
//   const [replies, setReplies] = useState({});

//   // Load replies from localStorage on component mount
//   useEffect(() => {
//     const savedReplies = localStorage.getItem("replies");
//     if (savedReplies) {
//       setReplies(JSON.parse(savedReplies));
//     }
//   }, []);

//   // Save replies to localStorage whenever they change
//   useEffect(() => {
//     localStorage.setItem("replies", JSON.stringify(replies));
//   }, [replies]);

//   const filteredMessages = showUnread
//     ? messages.filter((message) => message.isNew)
//     : messages;

//   const sortedMessages = filteredMessages.sort((a, b) => {
//     switch (sortOption) {
//       case "Newest":
//         return new Date(b.timeSent) - new Date(a.timeSent);
//       case "Oldest":
//         return new Date(a.timeSent) - new Date(b.timeSent);
//       case "Name Ascending":
//         return a.customerName.localeCompare(b.customerName);
//       case "Name Descending":
//         return b.customerName.localeCompare(a.customerName);
//       default:
//         return 0;
//     }
//   });

//   const totalPages = Math.ceil(sortedMessages.length / itemsPerPage);
//   const indexOfLastMessage = currentPage * itemsPerPage;
//   const indexOfFirstMessage = indexOfLastMessage - itemsPerPage;
//   const currentMessages = sortedMessages.slice(
//     indexOfFirstMessage,
//     indexOfLastMessage
//   );

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleDelete = () => {
//     setShowPopup(true);
//   };

//   const handleConfirmDelete = () => {
//     setMessages((prevMessages) =>
//       prevMessages.filter((message) => !selectedMessages.includes(message.id))
//     );
//     setSelectedMessages([]);
//     setShowPopup(false);
//   };

//   const handleCancelDelete = () => {
//     setShowPopup(false);
//   };

//   const handleCheckboxChange = (id) => {
//     setSelectedMessages((prevSelected) =>
//       prevSelected.includes(id)
//         ? prevSelected.filter((msgId) => msgId !== id)
//         : [...prevSelected, id]
//     );
//   };

//   const handleSortOptionChange = (option) => {
//     setSortOption(option);
//     setDropdownOpen(false);
//   };

//   const handleSendReply = () => {
//     if (!reply.trim()) return; // Prevent sending empty replies
//     setReplies((prevReplies) => ({
//       ...prevReplies,
//       [selectedMessage.id]: [...(prevReplies[selectedMessage.id] || []), reply],
//     }));
//     setReply(""); // Clear input after sending
//   };

//   // Handle the Enter key to send the reply
//   const handleKeyDown = (event) => {
//     if (event.key === "Enter") {
//       handleSendReply();
//     }
//   };

//   return (
//     <div className="p-4">
//       {selectedMessage ? (
//         <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 max-w-4xl mx-auto">
//           <div className="mb-4 flex justify-between">
//             <h2 className="text-xl font-bold">
//               {selectedMessage.customerName}
//             </h2>
//             <button
//               className="hover:bg-red-100 text-red-600 p-2 rounded-full"
//               onClick={() => setSelectedMessage(null)}
//             >
//               <X />
//             </button>
//           </div>
//           <div className="flex flex-col">
//             <div className="self-start break-words bg-[#E4D5CD] rounded-lg p-4 mb-2 shadow-md w-3/4">
//               <p>{selectedMessage.content}</p>
//               <p className="text-xs text-gray-500 text-right">
//                 {new Date(selectedMessage.timeSent).toLocaleString()}
//               </p>
//             </div>
//             {replies[selectedMessage.id]?.map((rep, index) => (
//               <div
//                 key={index}
//                 className="self-end break-words bg-[#F6F2EF] rounded-lg p-4 mb-2 shadow-md w-3/4"
//               >
//                 <p>{rep}</p>
//                 <p className="text-xs text-gray-500 text-right">
//                   {new Date().toLocaleString()}
//                 </p>
//               </div>
//             ))}
//             <div className="flex gap-1 mt-4">
//               <input
//                 type="text"
//                 value={reply}
//                 onChange={(e) => setReply(e.target.value)}
//                 placeholder="Type your reply..."
//                 className="flex-grow p-2 border rounded-l-md"
//                 onKeyDown={handleKeyDown}
//               />
//               <button
//                 onClick={handleSendReply}
//                 className="bg-[#A9785D] flex gap-2 text-white px-4 py-2 rounded-r-full"
//               >
//                 Send Message
//                 <SendHorizontal />
//               </button>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <>
//           <div className="flex justify-between mb-4">
//             <div>
//               <button
//                 className={`mr-2 py-1 px-5 rounded-full ${
//                   !showUnread ? "bg-[#C5A592]" : "border border-[#C5A592]"
//                 }`}
//                 onClick={() => setShowUnread(false)}
//               >
//                 All
//               </button>
//               <button
//                 className={`py-1 px-3 rounded-full ${
//                   showUnread ? "bg-[#C5A592]" : "border border-[#C5A592]"
//                 }`}
//                 onClick={() => setShowUnread(true)}
//               >
//                 Unread
//               </button>
//             </div>
//             <div className="flex gap-2">
//               <button
//                 className="bg-red-500 text-white px-12 py-2 rounded-full hover:bg-red-600"
//                 onClick={handleDelete}
//                 disabled={selectedMessages.length === 0}
//               >
//                 Delete
//               </button>
//               <button
//                 className="border px-8 border-gray-200 py-2 rounded-full flex items-center"
//                 onClick={() => setDropdownOpen((prev) => !prev)}
//               >
//                 Sort By
//                 <GoSortDesc className="ml-2" />
//               </button>
//               {dropdownOpen && (
//                 <div className="absolute z-10 bg-white shadow-lg rounded mt-2 w-48">
//                   <button
//                     className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                     onClick={() => handleSortOptionChange("Newest")}
//                   >
//                     Newest
//                   </button>
//                   <button
//                     className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                     onClick={() => handleSortOptionChange("Oldest")}
//                   >
//                     Oldest
//                   </button>
//                   <button
//                     className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                     onClick={() => handleSortOptionChange("Name Ascending")}
//                   >
//                     Name Ascending
//                   </button>
//                   <button
//                     className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                     onClick={() => handleSortOptionChange("Name Descending")}
//                   >
//                     Name Descending
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           <table className="min-w-full border">
//             <thead>
//               <tr>
//                 <th className="px-4 py-2 border">Select</th>
//                 <th className="px-4 py-2 border">Name</th>
//                 <th className="px-4 py-2 border">Message</th>
//                 <th className="px-4 py-2 border">Time Sent</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentMessages.map((message) => (
//                 <tr key={message.id} className="hover:bg-gray-100">
//                   <td className="border px-4 py-2">
//                     <input
//                       type="checkbox"
//                       checked={selectedMessages.includes(message.id)}
//                       onChange={() => handleCheckboxChange(message.id)}
//                     />
//                   </td>
//                   <td className="border px-4 py-2">{message.customerName}</td>
//                   <td
//                     className="border break-all hover:underline px-4 py-2 cursor-pointer"
//                     onClick={() => setSelectedMessage(message)}
//                   >
//                     {/* {message.content.slice(0, 40) + (message.content.split(" ").length > 40 ? " ..." : "")} */}
//                     {message.content.slice(0, 55) +
//                       "  " +
//                       (message.content.length > 55 ? "..." : "")}
//                   </td>

//                   <td className="border border-gray-300 p-2">
//                     {new Date(message.timeSent).toLocaleString()}{" "}
//                     {message.isNew && <span className="text-red-500">New</span>}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div className="flex justify-center gap-2 mt-4">
//             <button
//               className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded"
//               onClick={handlePreviousPage}
//               disabled={currentPage === 1}
//             >
//               <FaChevronLeft />
//             </button>
//             <span>
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded"
//               onClick={handleNextPage}
//               disabled={currentPage === totalPages}
//             >
//               <FaChevronRight />
//             </button>
//           </div>
//         </>
//       )}
//       {showPopup && (
//         <DeletePopUp
//           onConfirm={handleConfirmDelete}
//           onCancel={handleCancelDelete}
//         />
//       )}
//     </div>
//   );
// };

// export default Messages;
