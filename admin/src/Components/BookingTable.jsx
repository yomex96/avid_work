// import { useState, useEffect } from "react";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// const BookingTable = ({ sortOption, filterOption }) => {
//   const bookingsData = [
//     { id: "AVID001", name: "Israel Emmanuel", serviceType: "Prewedding", date: "2024-10-31", scheduleDate: "2024-09-05", status: "Pending" },
//     { id: "AVID002", name: "Bryan Waya", serviceType: "Lifestyle", date: "2024-12-12", scheduleDate: "2024-10-16", status: "Cancelled" },
//     { id: "AVID003", name: "Prince Amuche", serviceType: "Brand", date: "2024-09-15", scheduleDate: "2024-10-17", status: "Pending" },
//     { id: "AVID004", name: "Abayomi Onawole", serviceType: "Prewedding", date: "2024-08-22", scheduleDate: "2024-09-26", status: "Pending" },
//     { id: "AVID005", name: "Benjamin Richard", serviceType: "Lifestyle", date: "2024-11-02", scheduleDate: "2024-08-06", status: "Pending" },
//     { id: "AVID006", name: "Marilyn Olubayor", serviceType: "Prewedding", date: "2024-11-02", scheduleDate: "2024-09-12", status: "Pending" },
//     { id: "AVID007", name: "John Doe", serviceType: "Wedding", date: "2024-10-23", scheduleDate: "2024-08-08", status: "Confirmed" },
//     { id: "AVID008", name: "Jane Smith", serviceType: "Fashion", date: "2024-09-04", scheduleDate: "2024-10-20", status: "Completed" },
//     { id: "AVID009", name: "Zipporah Auta", serviceType: "Fashion", date: "2024-09-14", scheduleDate: "2024-10-20", status: "Completed" },
//     { id: "AVID010", name: "Amaka Platform", serviceType: "Fashion", date: "2022-09-24", scheduleDate: "2024-10-20", status: "Cancelled" },
//     { id: "AVID011", name: "Yusuf Danbaba", serviceType: "Fashion", date: "2023-09-30", scheduleDate: "2024-10-20", status: "Completed" },
//     { id: "AVID012", name: "Cynthia Ibekwe", serviceType: "Prewedding", date: "2019-10-31", scheduleDate: "2024-09-05", status: "Pending" },
//     { id: "AVID013", name: "Aaron Paul", serviceType: "Lifestyle", date: "2024-12-12", scheduleDate: "2024-10-16", status: "Confirmed" },
//     { id: "AVID014", name: "Ruth Chisom", serviceType: "Brand", date: "2021-09-15", scheduleDate: "2024-10-17", status: "Confirmed" },
//     { id: "AVID015", name: "Esther Chukudi", serviceType: "Prewedding", date: "2023-08-22", scheduleDate: "2024-09-26", status: "Confirmed" },
//     { id: "AVID016", name: "Abiola Sesan", serviceType: "Lifestyle", date: "2022-11-02", scheduleDate: "2024-08-06", status: "Confirmed" },
//     { id: "AVID017", name: "Deborah Opakirite", serviceType: "Prewedding", date: "2024-11-02", scheduleDate: "2024-09-12", status: "Confirmed" },
//     { id: "AVID018", name: "Precious Isaac", serviceType: "Wedding", date: "2022-10-23", scheduleDate: "2024-08-08", status: "Confirmed" },
//     { id: "AVID019", name: "Jane Smith", serviceType: "Fashion", date: "2021-09-04", scheduleDate: "2024-10-20", status: "Completed" },
//     { id: "AVID020", name: "Yusuf Ahmed", serviceType: "Fashion", date: "2021-09-14", scheduleDate: "2024-10-20", status: "Completed" },
//     { id: "AVID021", name: "Usman Tijani", serviceType: "Fashion", date: "2020-09-24", scheduleDate: "2024-10-20", status: "Completed" },
    
//   ];

//   const [currentPage, setCurrentPage] = useState(1);
//   const [bookingsPerPage] = useState(10);
//   const [bookingStatuses, setBookingStatuses] = useState(
//     bookingsData.reduce((acc, booking) => {
//       acc[booking.id] = booking.status;
//       return acc;
//     }, {})
//   );

//   // Handle filtering based on filterOption prop
//   const [filteredBookings, setFilteredBookings] = useState(bookingsData);

//   useEffect(() => {
//     const newFilteredBookings = bookingsData.filter(booking => {
//       // Apply filter if filterOption is provided
//       const statusMatch = filterOption ? bookingStatuses[booking.id] === filterOption : true;
//       return statusMatch;
//     });

//     setFilteredBookings(newFilteredBookings);
//   }, [filterOption, bookingStatuses]);

//   // Handle status change
//   const handleStatusChange = (id, newStatus) => {
//     setBookingStatuses((prevStatuses) => ({
//       ...prevStatuses,
//       [id]: newStatus,
//     }));
//   };

//   // Calculate the indices for pagination
//   const indexOfLastBooking = currentPage * bookingsPerPage;
//   const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
//   const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

//   // Function to handle pagination
//   const paginateNext = () => {
//     if (currentPage < Math.ceil(filteredBookings.length / bookingsPerPage)) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const paginatePrev = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   // Sorting logic based on sortOption prop
//   useEffect(() => {
//     let bookings = [...filteredBookings];

//     if (sortOption === "asc") {
//       bookings.sort((a, b) => a.name.localeCompare(b.name));
//     } else if (sortOption === "desc") {
//       bookings.sort((a, b) => b.name.localeCompare(a.name));
//     } else if (sortOption === "date") {
//       bookings.sort((a, b) => new Date(a.date) - new Date(b.date));
//     }

//     setFilteredBookings(bookings);
//   }, [sortOption]);

//   return (
//     <div className="w-full">
//       <div className="overflow-x-auto">
//         <table className="w-full table-auto">
//           <thead className="bg-gray-200 text-left">
//             <tr>
//             <th className="border text-left border-gray-300 p-2">Select</th>
//               <th className="border border-gray-300 px-4 py-2">Booking ID</th>
//               <th className="border border-gray-300 px-4 py-2">Name</th>
//               <th className="border border-gray-300 px-4 py-2">Service Type</th>
//               <th className="border border-gray-300 px-4 py-2">Date</th>
//               <th className="border border-gray-300 px-4 py-2">Schedule Date</th>
//               <th className="border border-gray-300 px-4 py-2">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentBookings.map((booking) => (
//               <tr key={booking.id} className="hover:bg-gray-100">
//                 <td className="border border-gray-300 p-2 text-center">
//                 <input type="checkbox" />
//               </td>
//                 <td className="border px-4 py-2">{booking.id}</td>
//                 <td className="border px-4 py-2">{booking.name}</td>
//                 <td className="border px-4 py-2">{booking.serviceType}</td>
//                 <td className="border px-4 py-2">{booking.date}</td>
//                 <td className="border px-4 py-2">{booking.scheduleDate}</td>
//                 <td className="border border-gray-300 p-2">
//                   <select
//                     value={bookingStatuses[booking.id]}
//                     onChange={(e) => handleStatusChange(booking.id, e.target.value)}
//                     className="border p-1 rounded"
//                   >
//                     <option value="Pending">Pending</option>
//                     <option value="Confirmed">Confirmed</option>
//                     <option value="Cancelled">Cancelled</option>
//                     <option value="Completed">Completed</option>
//                   </select>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination Controls */}
//       <div className="mt-4 flex justify-center items-center">
//         <button
//           onClick={paginatePrev}
//           disabled={currentPage === 1}
//           className={`${currentPage === 1 ? "bg-gray-0" : "bg-gray-50 hover:bg-gray-100"} text-gray-700 py-2 px-2 rounded-full mr-2 flex items-center`}
//         >
//           <FaChevronLeft />
//         </button>

//         <span>
//           Page {currentPage} of{" "}
//           {Math.ceil(filteredBookings.length / bookingsPerPage)}
//         </span>

//         <button
//           onClick={paginateNext}
//           disabled={currentPage === Math.ceil(filteredBookings.length / bookingsPerPage)}
//           className={`${currentPage === Math.ceil(filteredBookings.length / bookingsPerPage) ? "bg-gray-0" : "bg-gray-50 hover:bg-gray-100"} text-gray-700 py-2 px-2 rounded-full ml-2 flex items-center`}
//         >
//           <FaChevronRight />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BookingTable;






















// COMMENTS FROM BOOKINGS.JSX from line 378
//original source code 

// import { useState, useEffect } from "react";
// import { GoSortDesc } from "react-icons/go";
// import { FaRedoAlt } from "react-icons/fa";
// import { RiDeleteBinLine } from "react-icons/ri";
// import { CiFilter } from "react-icons/ci";
// import { MdOutlinePendingActions } from "react-icons/md";
// import { RiHealthBookFill } from "react-icons/ri";
// import { GiConfirmed } from "react-icons/gi";
// import { PiNotebookFill } from "react-icons/pi";
// import { MdOutlineCancel } from "react-icons/md";
// import ScrollToTop from "../Components/ScrollToTop";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import { toast } from "react-hot-toast";

// const Bookings = () => {
//   const [showSortDropdown, setShowSortDropdown] = useState(false);
//   const [showFilterDropdown, setShowFilterDropdown] = useState(false);
//   const [sortOption, setSortOption] = useState('');
//   const [filterOption, setFilterOption] = useState('');
//   const [bookings, setBookings] = useState([]);
//   const [pending, setPending] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [selectedBookings, setSelectedBookings] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const bookingsPerPage = 10;



//   // Booking statuses state
//   const [bookingStatuses, setBookingStatuses] = useState({});

//     // Fetch bookings from API
//     useEffect(() => {
//       const fetchBookings = async () => {
//         try {
//           const response = await fetch("http://localhost:5000/api/bookings");
//           const data = await response.json();
//           setBookings(data);
//           setFilteredBookings(data); // Initially set filteredBookings to all bookings
  
//           // Initialize bookingStatuses state with current statuses from fetched data
//           const initialStatuses = {};
//           data.forEach((booking) => {
//             initialStatuses[booking.bookingId] = booking.status;
//           });
//           setBookingStatuses(initialStatuses);
//         } catch (error) {
//           console.error("Error fetching bookings:", error);
//         }
//       };
//       fetchBookings();
//     }, []);

//   // Filter bookings based on filterOption
//   useEffect(() => {
//     let filtered = bookings;
//     if (filterOption) {
//       filtered = bookings.filter((booking) => booking.status === filterOption);
//     }
//     setFilteredBookings(filtered);
//   }, [filterOption, bookings]);

//   // Sort bookings based on sortOption
//   useEffect(() => {
//     let sorted = [...filteredBookings];
//     if (sortOption === 'asc') {
//       sorted.sort((a, b) => a.name.localeCompare(b.name));
//     } else if (sortOption === 'desc') {
//       sorted.sort((a, b) => b.name.localeCompare(a.name));
//     } else if (sortOption === 'date') {
//       sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
//     }
//     setFilteredBookings(sorted);
//   }, [sortOption]);

//   // Pagination logic
//   const indexOfLastBooking = currentPage * bookingsPerPage;
//   const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
//   const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

//   const paginateNext = () => {
//     if (currentPage < Math.ceil(filteredBookings.length / bookingsPerPage)) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const paginatePrev = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   // Handle checkbox for selecting bookings
//   const handleCheckboxChange = (id) => {
//     setSelectedBookings((prev) =>
//       prev.includes(id) ? prev.filter((bookingId) => bookingId !== id) : [...prev, id]
//     );
//   };

//   // Handle delete selected bookings
//   const handleDelete = async () => {
//     if (selectedBookings.length === 0) {
//       toast.error("Please select at least one booking to delete.")
//       // alert("Please select at least one booking to delete.");
//       return;
//     }

//     try {
//       const deletePromises = selectedBookings.map((bookingId) =>
//         fetch(`http://localhost:5000/api/bookings/delete/${bookingId}`, {
//           method: "DELETE",
//         })
//       );

//       const responses = await Promise.all(deletePromises);
//       responses.forEach((response, index) => {
//         if (response.ok) {
//           console.log(`Booking with ID: ${selectedBookings[index]} deleted successfully.`);
//         } else {
//           console.error(`Failed to delete booking with ID: ${selectedBookings[index]}.`);
//         }
//       });

//       // Update bookings state after deletion
//       setBookings((prev) => prev.filter((booking) => !selectedBookings.includes(booking.bookingId)));
//       setSelectedBookings([]);
//       toast.success("Selected bookings deleted successfully.")
//       // alert("Selected bookings deleted successfully.");
//     } catch (error) {
//       console.error("Error deleting bookings:", error);
//       toast.error("An error occurred while deleting bookings.");
//     }
//   };

//   const toggleSortDropdown = () => {
//     setShowSortDropdown(!showSortDropdown);
//     setShowFilterDropdown(false);
//   };

//   const toggleFilterDropdown = () => {
//     setShowFilterDropdown(!showFilterDropdown);
//     setShowSortDropdown(false);
//   };

//   const handleSortOptionClick = (option) => {
//     setSortOption(option);
//     setShowSortDropdown(false);
//   };

//   const handleFilterOptionClick = (option) => {
//     setFilterOption(option);
//     setShowFilterDropdown(false);
//   };

//    // Handle status change in the dropdown
//    const handleStatusChange = (bookingId, newStatus) => {
//     // Optimistically update local state for the booking status
//     setBookingStatuses((prevStatuses) => ({
//       ...prevStatuses,
//       [bookingId]: newStatus,
//     }));

//     // Call handleStatusUpdate to send the updated status to the backend
//     handleStatusUpdate(bookingId, newStatus);
//   };

//   // Optimistically update the local state first
//   const handleStatusUpdate = async (bookingId, newStatus) => {
//     try {
//       console.log(`Sending updated status for bookingId ${bookingId}:`, { status: newStatus });

//       const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}/status`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ status: newStatus }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update booking status');
//       }

//       const updatedBooking = await response.json();
//       console.log('Booking updated successfully:', updatedBooking);

//       // Update the booking in the state with the response from the server (if needed)
//       setBookings((prevBookings) =>
//         prevBookings.map((booking) =>
//           booking.bookingId === bookingId ? { ...booking, status: newStatus } : booking
//         )
//       );

//       // Notify user of success
//       toast.success('Booking status updated successfully!');
//     } catch (error) {
//       console.error('Error updating booking status:', error);

//       // Notify user of error
//       toast.error('Failed to update booking status. Please try again.');
//     }
//   };




//   return (
//     <div className="flex flex-col gap-4 w-full">
//       <div className="py-2 flex items-center border-b border-black justify-between">
//         <h2 className="font-bold text-2xl">Bookings</h2>
//         <FaRedoAlt className="mt-[-25px]" />
//       </div>

//       <div className="w-full h-36 flex gap-2">
//      {/* Cards */}
//               <div className="w-48 h-28 bg-[#F0E7E1] flex flex-col items-center justify-center">
//         <div className="w-12 h-12 border-4 border-[#A9785D] rounded-full flex items-center justify-center text-lg font-semibold">
//         {bookings.length}
//            </div>
//            <RiHealthBookFill color="#A9785D" className="absolute top-40 right-[960px]" />
//            <p className="mt-2 text-sm">Total Booking</p>
//       </div>
//          <div className="w-48 h-28 bg-[#E8D5C6] flex flex-col items-center justify-center">
//            <div className="w-12 h-12 border-4 border-[#A9785D] rounded-full flex items-center justify-center text-lg font-semibold">
//             {bookings.filter((b) => b.status === "Pending").length}
//            </div>
//            <MdOutlinePendingActions color="#A9785D" className="absolute top-40 right-[760px]" />
//            <p className="mt-2 text-sm">Pending Booking</p>
//          </div>
//          <div className="w-48 h-28 bg-[#D6E9D0] flex flex-col items-center justify-center">
//            <div className="w-12 h-12 border-4 border-[#A9785D] rounded-full flex items-center justify-center text-lg font-semibold">
//            {bookings.filter((b) => b.status === "Confirmed").length}
//            </div>
//            <GiConfirmed color="#A9785D" className="absolute top-40 right-[560px]" />
//            <p className="mt-2 text-sm">Confirmed Booking</p>
//          </div>
//       <div className="w-48 h-28 bg-[#EBEBEB] flex flex-col items-center justify-center">
//            <div className="w-12 h-12 border-4 border-[#A9785D] rounded-full flex items-center justify-center text-lg font-semibold">
//            {bookings.filter((b) => b.status === "Completed").length}
//            </div>
//            <PiNotebookFill color="#A9785D" className="absolute top-40 right-[360px]" />
//            <p className="mt-2 text-sm">Completed</p>
//          </div>
//          <div className="w-48 h-28 bg-[#F4D6D6] flex flex-col items-center justify-center">
//            <div className="w-12 h-12 border-4 border-[#A9785D] rounded-full flex items-center justify-center text-lg font-semibold">
//              {bookings.filter((b) => b.status === "Cancelled").length}
//            </div>
//            <MdOutlineCancel color="#A9785D" className="absolute top-40 right-[160px]" />
//           <p className="mt-2 text-sm">Declined</p>
//         </div>
//      </div>

//       {/* Buttons */}
//       <div className="relative flex gap-4 justify-end">
//         <button
//           className="hover:border hover:border-red-600 flex items-center gap-2 border rounded-full py-2 px-6 text-white hover:text-red-600 bg-red-600 hover:bg-white"
//           onClick={handleDelete}
//         >
//           <RiDeleteBinLine />
//           Delete
//         </button>

//         {/* Sort dropdown */}
//         <div className="relative">
//           <button
//             className="border hover:border hover:border-[#C5A592] h-12 w-36 rounded-full pl-4 flex items-center gap-2"
//             onClick={toggleSortDropdown}
//           >
//             <GoSortDesc className="absolute right-5 top-[10px]" />
//             Sort by
//           </button>
//           {showSortDropdown && (
//             <div className="absolute right-0 mt-2 w-36 bg-white border rounded-md shadow-lg">
//               <ul className="text-sm">
//                 <li
//                   className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
//                   onClick={() => handleSortOptionClick("date")}
//                 >
//                   Date
//                 </li>
//                 <li
//                   className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
//                   onClick={() => handleSortOptionClick("asc")}
//                 >
//                   Name Ascending
//                 </li>
//                 <li
//                   className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
//                   onClick={() => handleSortOptionClick("desc")}
//                 >
//                   Name Descending
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>

//         {/* Filter dropdown */}
//         <div className="relative">
//           <button
//             className="border h-12 w-36 rounded-full pl-4 flex items-center gap-2"
//             onClick={toggleFilterDropdown}
//           >
//             <CiFilter className="absolute right-5 top-[10px]" />
//             Filter
//           </button>
//           {showFilterDropdown && (
//             <div className="absolute right-0 mt-2 w-36 bg-white border rounded-md shadow-lg">
//               <ul className="text-sm">
//                 <li
//                   className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
//                   onClick={() => handleFilterOptionClick("Pending")}
//                 >
//                   Pending
//                 </li>
//                 <li
//                   className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
//                   onClick={() => handleFilterOptionClick("Confirmed")}
//                 >
//                   Confirmed
//                 </li>
//                 <li
//                   className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
//                   onClick={() => handleFilterOptionClick("Completed")}
//                 >
//                   Completed
//                 </li>
//                 <li
//                   className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
//                   onClick={() => handleFilterOptionClick("Cancelled")}
//                 >
//                   Cancelled
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>

//       <ScrollToTop trigger={Bookings}/>

//       {/* Bookings Table */}
//       <table className="min-w-full border-collapse border border-gray-300 mt-4">
//         <thead>
//         <tr>
//             <th className="border text-left border-gray-300 p-2">Select</th>
//             <th className="border border-gray-300 px-4 py-2">Booking ID</th>
//             <th className="border border-gray-300 px-4 py-2">Name</th>
//             <th className="border border-gray-300 px-4 py-2">Service Type</th>
//             <th className="border border-gray-300 px-4 py-2">Booking Date</th>
//             <th className="border border-gray-300 px-4 py-2">Scheduled Date</th>
//             <th className="border border-gray-300 px-4 py-2">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentBookings.map((booking) => (
//             <tr key={booking.bookingId}>
//               <td className="border border-gray-300 px-4 py-2">
//                 <input
//                   type="checkbox"
//                   checked={selectedBookings.includes(booking.bookingId)}
//                   onChange={() => handleCheckboxChange(booking.bookingId)}
//                 />
//               </td>
//               <td className="border border-gray-300 px-4 py-2">{booking.bookingId}</td>
//               <td className="border border-gray-300 px-4 py-2">{booking.name}</td>
//               <td className="border border-gray-300 px-4 py-2">{booking.services}</td>
//               <td className="border border-gray-300 px-4 py-2">{booking.bookingDate}</td>
//               <td className="border border-gray-300 px-4 py-2">{booking.date}</td>
//               {/* <td className="border border-gray-300 px-4 py-2">{booking.status}</td> */}
//               <td className="border border-gray-300 p-2">
//               <select
//                   value={bookingStatuses[booking.bookingId]}
//                   onChange={(e) => handleStatusChange(booking.bookingId, e.target.value)}
//                   className="border p-1 rounded"
//                 >
//                   <option value="Pending">Pending</option>
//                   <option value="Confirmed">Confirmed</option>
//                   <option value="Cancelled">Cancelled</option>
//                   <option value="Completed">Completed</option>
//                 </select>
//                 </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination */}
//       <div className="flex justify-center mt-4 items-center">
//         <button
//           // className="px-4 py-2 mx-1 border rounded"
//           onClick={paginatePrev}
//           disabled={currentPage === 1}
//           className={`${currentPage === 1 ? "bg-gray-0" : "bg-gray-50 hover:bg-gray-100"} text-gray-700 py-2 px-2 rounded-full mr-2 flex items-center`}
//         >
         
//           <FaChevronLeft />

//         </button>

//         <span>
//           Page {currentPage} of{" "}
//           {Math.ceil(filteredBookings.length / bookingsPerPage)}
//         </span>


//         <button
//           // className="px-4 py-2 mx-1 border rounded"
//           onClick={paginateNext}
//           disabled={currentPage === Math.ceil(filteredBookings.length / bookingsPerPage)}
//           className={`${currentPage === Math.ceil(filteredBookings.length / bookingsPerPage) ? "bg-gray-0" : "bg-gray-50 hover:bg-gray-100"} text-gray-700 py-2 px-2 rounded-full ml-2 flex items-center`}
//           >
         
//           <FaChevronRight />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Bookings;





// //yomex
// import { useState, useEffect } from "react";
// import { GoSortDesc } from "react-icons/go";
// import { FaRedoAlt } from "react-icons/fa";
// import { RiDeleteBinLine } from "react-icons/ri";
// import { CiFilter } from "react-icons/ci";
// import { MdOutlinePendingActions } from "react-icons/md";
// import { RiHealthBookFill } from "react-icons/ri";
// import { GiConfirmed } from "react-icons/gi";
// import { PiNotebookFill } from "react-icons/pi";
// import { MdOutlineCancel } from "react-icons/md";
// import ScrollToTop from "../Components/ScrollToTop";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// const Bookings = () => {
//   const [showSortDropdown, setShowSortDropdown] = useState(false);
//   const [showFilterDropdown, setShowFilterDropdown] = useState(false);
//   const [sortOption, setSortOption] = useState('');
//   const [filterOption, setFilterOption] = useState('');
//   const [bookings, setBookings] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [selectedBookings, setSelectedBookings] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const bookingsPerPage = 10;

//     // Booking statuses state
//   const [bookingStatuses, setBookingStatuses] = useState({});

//   // Fetch bookings from API
//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/bookings");
//         const data = await response.json();
//         setBookings(data);
//         setFilteredBookings(data); // Initially set filteredBookings to all bookings
//       } catch (error) {
//         console.error("Error fetching bookings:", error);
//       }
//     };
//     fetchBookings();
//   }, []);

//   // Filter bookings based on filterOption
//   useEffect(() => {
//     let filtered = bookings;
//     if (filterOption) {
//       filtered = bookings.filter(booking => booking.status === filterOption);
//     }
//     setFilteredBookings(filtered);
//   }, [filterOption, bookings]);

//   // Sort bookings based on sortOption
//   useEffect(() => {
//     let sorted = [...filteredBookings];
//     if (sortOption === 'asc') {
//       sorted.sort((a, b) => a.name.localeCompare(b.name));
//     } else if (sortOption === 'desc') {
//       sorted.sort((a, b) => b.name.localeCompare(a.name));
//     } else if (sortOption === 'date') {
//       sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
//     }
//     setFilteredBookings(sorted);
//   }, [sortOption]);

//   // Pagination logic
//   const indexOfLastBooking = currentPage * bookingsPerPage;
//   const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
//   const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

//   const paginateNext = () => {
//     if (currentPage < Math.ceil(filteredBookings.length / bookingsPerPage)) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const paginatePrev = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   // Handle checkbox for selecting bookings
//   const handleCheckboxChange = (id) => {
//     setSelectedBookings((prev) =>
//       prev.includes(id) ? prev.filter((bookingId) => bookingId !== id) : [...prev, id]
//     );
//   };

//   // Handle delete selected bookings
//   const handleDelete = async () => {
//     if (selectedBookings.length === 0) {
//       alert("Please select at least one booking to delete.");
//       return;
//     }

//     try {
//       const deletePromises = selectedBookings.map((bookingId) =>
//         fetch(`http://localhost:5000/api/bookings/delete/${bookingId}`, {
//           method: "DELETE",
//         })
//       );

//       const responses = await Promise.all(deletePromises);
//       responses.forEach((response, index) => {
//         if (response.ok) {
//           console.log(`Booking with ID: ${selectedBookings[index]} deleted successfully.`);
//         } else {
//           console.error(`Failed to delete booking with ID: ${selectedBookings[index]}.`);
//         }
//       });

//       // Update bookings state after deletion
//       setBookings((prev) => prev.filter((booking) => !selectedBookings.includes(booking.bookingId)));
//       setSelectedBookings([]);
//       alert("Selected bookings deleted successfully.");
//     } catch (error) {
//       console.error("Error deleting bookings:", error);
//       alert("An error occurred while deleting bookings.");
//     }
//   };

//   const toggleSortDropdown = () => {
//     setShowSortDropdown(!showSortDropdown);
//     setShowFilterDropdown(false);
//   };

//   const toggleFilterDropdown = () => {
//     setShowFilterDropdown(!showFilterDropdown);
//     setShowSortDropdown(false);
//   };

//   const handleSortOptionClick = (option) => {
//     setSortOption(option);
//     setShowSortDropdown(false);
//   };

//   const handleFilterOptionClick = (option) => {
//     setFilterOption(option);
//     setShowFilterDropdown(false);
//   };

//   const updateBookingStatus = async (bookingId, newStatus) => {
//     // Validate new status
//     const validStatuses = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];
//     if (!validStatuses.includes(newStatus)) {
//       alert('Invalid status update.');
//       return;
//     }
  
//     // Optimistically update the local state first
//     setBookings((prevBookings) =>
//       prevBookings.map((booking) =>
//         booking.bookingId === bookingId ? { ...booking, status: newStatus } : booking
//       )
//     );
  
//     try {
//       console.log(`Sending updated status for bookingId ${bookingId}:`, { status: newStatus });
  
//       const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}/status`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ status: newStatus }),
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to update booking status');
//       }
  
//       const updatedBooking = await response.json();
//       console.log('Booking updated successfully:', updatedBooking);
  
//       // Update state with the response from the server
//       setBookings((prevBookings) =>
//         prevBookings.map((booking) =>
//           booking.bookingId === bookingId ? { ...updatedBooking } : booking
//         )
//       );
  
//       // Notify user of success
//       alert('Booking status updated successfully!');
//     } catch (error) {
//       console.error('Error updating booking status:', error);
  
//       // Revert the optimistic update in case of an error
//       setBookings((prevBookings) =>
//         prevBookings.map((booking) =>
//           booking.bookingId === bookingId ? { ...booking, status: prevBookings.find(b => b.bookingId === bookingId).status } : booking
//         )
//       );
  
//       // Notify user of error
//       alert('Failed to update booking status. Please try again.');
//     }
//   };
  


//   return (
//     <div className="flex flex-col gap-4 w-full">
//       <div className="py-2 flex items-center border-b border-black justify-between">
//         <h2 className="font-bold text-2xl">Bookings</h2>
//         <FaRedoAlt className="mt-[-25px]" />
//       </div>

//       <div className="w-full h-36 flex gap-2">
//      {/* Cards */}
//               <div className="w-48 h-28 bg-[#F0E7E1] flex flex-col items-center justify-center">
//         <div className="w-12 h-12 border-4 border-[#A9785D] rounded-full flex items-center justify-center text-lg font-semibold">
//             {bookings.length}
//            </div>
//            <RiHealthBookFill color="#A9785D" className="absolute top-32 right-[960px]" />
//            <p className="mt-2 text-sm">Total Booking</p>
//       </div>
//          <div className="w-48 h-28 bg-[#E8D5C6] flex flex-col items-center justify-center">
//            <div className="w-12 h-12 border-4 border-[#A9785D] rounded-full flex items-center justify-center text-lg font-semibold">
//             100
//            </div>
//            <MdOutlinePendingActions color="#A9785D" className="absolute top-32 right-[760px]" />
//            <p className="mt-2 text-sm">Pending Booking</p>
//          </div>
//          <div className="w-48 h-28 bg-[#D6E9D0] flex flex-col items-center justify-center">
//            <div className="w-12 h-12 border-4 border-[#A9785D] rounded-full flex items-center justify-center text-lg font-semibold">
//              100
//            </div>
//            <GiConfirmed color="#A9785D" className="absolute top-32 right-[560px]" />
//            <p className="mt-2 text-sm">Confirmed Booking</p>
//          </div>
//       <div className="w-48 h-28 bg-[#EBEBEB] flex flex-col items-center justify-center">
//            <div className="w-12 h-12 border-4 border-[#A9785D] rounded-full flex items-center justify-center text-lg font-semibold">
//             100
//            </div>
//            <PiNotebookFill color="#A9785D" className="absolute top-32 right-[360px]" />
//            <p className="mt-2 text-sm">Completed</p>
//          </div>
//          <div className="w-48 h-28 bg-[#F4D6D6] flex flex-col items-center justify-center">
//            <div className="w-12 h-12 border-4 border-[#A9785D] rounded-full flex items-center justify-center text-lg font-semibold">
//              100
//            </div>
//            <MdOutlineCancel color="#A9785D" className="absolute top-32 right-[160px]" />
//           <p className="mt-2 text-sm">Declined</p>
//         </div>
//      </div>

//       {/* Buttons */}
//       <div className="relative flex gap-4 justify-end">
//         <button
//           className="hover:border hover:border-red-600 flex items-center gap-2 border rounded-full py-2 px-6 text-white hover:text-red-600 bg-red-600 hover:bg-white"
//           onClick={handleDelete}
//         >
//           <RiDeleteBinLine />
//           Delete
//         </button>

//         {/* Sort dropdown */}
//         <div className="relative">
//           <button
//             className="border hover:border hover:border-[#C5A592] h-12 w-36 rounded-full pl-4 flex items-center gap-2"
//             onClick={toggleSortDropdown}
//           >
//             <GoSortDesc className="absolute right-5 top-[10px]" />
//             Sort by
//           </button>
//           {showSortDropdown && (
//             <div className="absolute right-0 mt-2 w-36 bg-white border rounded-md shadow-lg">
//               <ul className="text-sm">
//                 <li
//                   className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
//                   onClick={() => handleSortOptionClick("date")}
//                 >
//                   Date
//                 </li>
//                 <li
//                   className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
//                   onClick={() => handleSortOptionClick("asc")}
//                 >
//                   Name Ascending
//                 </li>
//                 <li
//                   className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
//                   onClick={() => handleSortOptionClick("desc")}
//                 >
//                   Name Descending
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>

//         {/* Filter dropdown */}
//         <div className="relative">
//           <button
//             className="border h-12 w-36 rounded-full pl-4 flex items-center gap-2"
//             onClick={toggleFilterDropdown}
//           >
//             <CiFilter className="absolute right-5 top-[10px]" />
//             Filter
//           </button>
//           {showFilterDropdown && (
//             <div className="absolute right-0 mt-2 w-36 bg-white border rounded-md shadow-lg">
//               <ul className="text-sm">
//                 <li
//                   className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
//                   onClick={() => handleFilterOptionClick("Pending")}
//                 >
//                   Pending
//                 </li>
//                 <li
//                   className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
//                   onClick={() => handleFilterOptionClick("Confirmed")}
//                 >
//                   Confirmed
//                 </li>
//                 <li
//                   className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
//                   onClick={() => handleFilterOptionClick("Completed")}
//                 >
//                   Completed
//                 </li>
//                 <li
//                   className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
//                   onClick={() => handleFilterOptionClick("Cancelled")}
//                 >
//                   Cancelled
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>

//       <ScrollToTop trigger={Bookings}/>

//       {/* Bookings Table */}
//       <table className="min-w-full border-collapse border border-gray-300 mt-4">
//         <thead>
//         <tr>
//             <th className="border text-left border-gray-300 p-2">Select</th>
//             <th className="border border-gray-300 px-4 py-2">Booking ID</th>
//             <th className="border border-gray-300 px-4 py-2">Name</th>
//             <th className="border border-gray-300 px-4 py-2">Service Type</th>
//             <th className="border border-gray-300 px-4 py-2">Booking Date</th>
//             <th className="border border-gray-300 px-4 py-2">Scheduled Date</th>
//             <th className="border border-gray-300 px-4 py-2">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentBookings.map((booking) => (
//             <tr key={booking.bookingId}>
//               <td className="border border-gray-300 px-4 py-2">
//                 <input
//                   type="checkbox"
//                   checked={selectedBookings.includes(booking.bookingId)}
//                   onChange={() => handleCheckboxChange(booking.bookingId)}
//                 />
//               </td>
//               <td className="border border-gray-300 px-4 py-2">{booking.bookingId}</td>
//               <td className="border border-gray-300 px-4 py-2">{booking.name}</td>
//               <td className="border border-gray-300 px-4 py-2">{booking.services}</td>
//               <td className="border border-gray-300 px-4 py-2">{booking.bookingDate}</td>
//               <td className="border border-gray-300 px-4 py-2">{booking.date}</td>
//               {/* <td className="border border-gray-300 px-4 py-2">{booking.status}</td> */}
//               <td className="border border-gray-300 p-2">
//               <select
//     value={booking.status}
//     onChange={(e) => updateBookingStatus(booking.bookingId, e.target.value)}
//   >
//     <option value="pending">Pending</option>
//     <option value="confirmed">Confirmed</option>
//     <option value="completed">Completed</option>
//     <option value="canceled">Canceled</option>
//   </select>
//                 </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination */}
//       <div className="flex justify-center mt-4 items-center">
//         <button
//           className="px-4 py-2 mx-1 border rounded"
//           onClick={paginatePrev}
//           disabled={currentPage === 1}
//           className={`${currentPage === 1 ? "bg-gray-0" : "bg-gray-50 hover:bg-gray-100"} text-gray-700 py-2 px-2 rounded-full mr-2 flex items-center`}
//         >
         
//           <FaChevronLeft />

//         </button>

//         <span>
//           Page {currentPage} of{" "}
//           {Math.ceil(filteredBookings.length / bookingsPerPage)}
//         </span>


//         <button
//           className="px-4 py-2 mx-1 border rounded"
//           onClick={paginateNext}
//           disabled={currentPage === Math.ceil(filteredBookings.length / bookingsPerPage)}
//           className={`${currentPage === Math.ceil(filteredBookings.length / bookingsPerPage) ? "bg-gray-0" : "bg-gray-50 hover:bg-gray-100"} text-gray-700 py-2 px-2 rounded-full ml-2 flex items-center`}
//           >
         
//           <FaChevronRight />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Bookings;












//ben work

// import { useState } from "react";
// import { GoSortDesc } from "react-icons/go";
// import { FaRedoAlt } from "react-icons/fa";
// import { RiDeleteBinLine } from "react-icons/ri";
// import { CiFilter } from "react-icons/ci";
// import { MdOutlinePendingActions } from "react-icons/md";
// import { RiHealthBookFill } from "react-icons/ri";
// import { GiConfirmed } from "react-icons/gi";
// import { PiNotebookFill } from "react-icons/pi";
// import { MdOutlineCancel } from "react-icons/md";
// import BookingTable from "../Components/BookingTable";
// import ScrollToTop from "../Components/ScrollToTop";

// const Bookings = () => {
//   const [showSortDropdown, setShowSortDropdown] = useState(false);
//   const [showFilterDropdown, setShowFilterDropdown] = useState(false);
//   const [sortOption, setSortOption] = useState(""); // State to store sort option
//   const [filterOption, setFilterOption] = useState(""); // State to store filter option


//   const toggleSortDropdown = () => {
//     setShowSortDropdown(!showSortDropdown);
//     setShowFilterDropdown(false); // Close filter dropdown if open
//   };

//   const toggleFilterDropdown = () => {
//     setShowFilterDropdown(!showFilterDropdown);
//     setShowSortDropdown(false); // Close sort dropdown if open
//   };

//   const handleSortOptionClick = (option) => {
//     setSortOption(option); // Update sort option when selected
//     setShowSortDropdown(false); // Close dropdown after selecting
//   };

//   const handleFilterOptionClick = (option) => {
//     setFilterOption(option); // Update filter option when selected
//     setShowFilterDropdown(false); // Close dropdown after selecting
//   };

//   return (
//     <div className="flex flex-col gap-4 w-full">
//       <div className="py-2 flex items-center border-b border-black justify-between">
//         <h2 className="font-bold text-2xl mt-[-30px]">Bookings</h2>
//         <FaRedoAlt className="mt-[-25px]" />
//       </div>

//       <div className="w-full h-36 flex gap-2">
//         {/* Cards */}
//         <div className="w-48 h-28 bg-[#F0E7E1] flex flex-col items-center justify-center">
//           <div className="w-12 h-12 border-4 border-[#A9785D] rounded-full flex items-center justify-center text-lg font-semibold">
//             100
//           </div>
//           <RiHealthBookFill color="#A9785D" className="absolute top-32 right-[960px]" />
//           <p className="mt-2 text-sm">Total Booking</p>
//         </div>
//         <div className="w-48 h-28 bg-[#E8D5C6] flex flex-col items-center justify-center">
//           <div className="w-12 h-12 border-4 border-[#A9785D] rounded-full flex items-center justify-center text-lg font-semibold">
//             100
//           </div>
//           <MdOutlinePendingActions color="#A9785D" className="absolute top-32 right-[760px]" />
//           <p className="mt-2 text-sm">Pending Booking</p>
//         </div>
//         <div className="w-48 h-28 bg-[#D6E9D0] flex flex-col items-center justify-center">
//           <div className="w-12 h-12 border-4 border-[#A9785D] rounded-full flex items-center justify-center text-lg font-semibold">
//             100
//           </div>
//           <GiConfirmed color="#A9785D" className="absolute top-32 right-[560px]" />
//           <p className="mt-2 text-sm">Confirmed Booking</p>
//         </div>
//         <div className="w-48 h-28 bg-[#EBEBEB] flex flex-col items-center justify-center">
//           <div className="w-12 h-12 border-4 border-[#A9785D] rounded-full flex items-center justify-center text-lg font-semibold">
//             100
//           </div>
//           <PiNotebookFill color="#A9785D" className="absolute top-32 right-[360px]" />
//           <p className="mt-2 text-sm">Completed</p>
//         </div>
//         <div className="w-48 h-28 bg-[#F4D6D6] flex flex-col items-center justify-center">
//           <div className="w-12 h-12 border-4 border-[#A9785D] rounded-full flex items-center justify-center text-lg font-semibold">
//             100
//           </div>
//           <MdOutlineCancel color="#A9785D" className="absolute top-32 right-[160px]" />
//           <p className="mt-2 text-sm">Declined</p>
//         </div>
//       </div>

//        {/* Buttons */}
//        <div className="relative flex gap-4 justify-end">
//         <button className="hover:border hover:border-red-600 flex items-center gap-2 border rounded-full py-2 px-6 text-white hover:text-red-600 bg-red-600 hover:bg-white">
//           <RiDeleteBinLine />
//           Delete
//         </button>

//         <div className="relative">
//           <button
//             className="border hover:border hover:border-[#C5A592] h-12 w-36 rounded-full pl-4 flex items-center gap-2"
//             onClick={toggleSortDropdown}
//           >
//             <GoSortDesc className="absolute size-7 right-5 top-[10px]" />
//             Sort by
//           </button>
//           {showSortDropdown && (
//             <div className="absolute right-0 mt-2 w-36 bg-white border rounded-md shadow-lg">
//               <ul className="text-sm">
//                 <li
//                   className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
//                   onClick={() => handleSortOptionClick("date")}
//                 >
//                   Date
//                 </li>
//                 <li
//                   className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
//                   onClick={() => handleSortOptionClick("asc")}
//                 >
//                   Name Ascending
//                 </li>
//                 <li
//                   className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
//                   onClick={() => handleSortOptionClick("desc")}
//                 >
//                   Name Descending
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>

//         <div className="relative">
//           <button
//             className="border hover:border hover:border-[#C5A592] h-12 w-36 rounded-full pl-4 flex items-center gap-2"
//             onClick={toggleFilterDropdown}
//           >
//             <CiFilter className="absolute size-7 right-5 top-[10px]" />
//             Filter
//           </button>
//           {showFilterDropdown && (
//             <div className="absolute right-0 mt-2 w-36 bg-white border rounded-md shadow-lg">
//               <ul className="text-sm">
//                 <li
//                   className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
//                   onClick={() => handleFilterOptionClick("Pending")}
//                 >
//                   Pending
//                 </li>
//                 <li
//                   className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
//                   onClick={() => handleFilterOptionClick("Confirmed")}
//                 >
//                   Confirmed
//                 </li>
//                 <li
//                   className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
//                   onClick={() => handleFilterOptionClick("Completed")}
//                 >
//                   Completed
//                 </li>
//                 <li
//                   className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
//                   onClick={() => handleFilterOptionClick("Cancelled")}
//                 >
//                   Cancelled
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>
// <ScrollToTop trigger={Bookings}/>

//       {/* Table */}
//       <BookingTable sortOption={sortOption} filterOption={filterOption} />
//     </div>
//   );
// };

// export default Bookings;

