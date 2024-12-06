import { useState, useEffect, useContext } from "react";
import { GoSortDesc } from "react-icons/go";
import { FaRedoAlt } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiFilter } from "react-icons/ci";
import { MdOutlinePendingActions } from "react-icons/md";
import { RiHealthBookFill } from "react-icons/ri";
import { GiConfirmed } from "react-icons/gi";
import { PiNotebookFill } from "react-icons/pi";
import { MdOutlineCancel } from "react-icons/md";
import ScrollToTop from "../Components/ScrollToTop";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { toast } from "react-hot-toast";
import StoreContext from "../context/StoreContext";
import LoaderComp from "../Components/LoaderComp";

import { X } from "lucide-react";

const Bookings = () => {
  const { bookings, handleStatusUpdate, handleDelete } =
    useContext(StoreContext);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 10;

  // state for selected booking details(pop-up)

  const [selectedBookingDetails, setSelectedBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [content, setContent] = useState({});

  // Booking statuses state
  const [bookingStatuses, setBookingStatuses] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Initialize bookingStatuses based on current bookings
    const initialStatuses = bookings.reduce((statuses, booking) => {
      statuses[booking.bookingId] = booking.status;
      return statuses;
    }, {});
    setBookingStatuses(initialStatuses);
  }, [bookings]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white mt-[-20px] p-10">
        <LoaderComp />
      </div>
    );
  }

  // Filter bookings based on filterOption
  const filteredBookings = bookings.filter(
    (booking) => !filterOption || booking.status === filterOption
  );

  // Sort bookings based on sortOption
  const sortedBookings = [...filteredBookings].sort((a, b) => {
    if (sortOption === "asc") return a.name.localeCompare(b.name);
    if (sortOption === "desc") return b.name.localeCompare(a.name);
    if (sortOption === "date")
      return new Date(a.bookingDate) - new Date(b.bookingDate);
    return 0;
  });

  // Pagination logic
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = sortedBookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  const paginateNext = () => {
    if (currentPage < Math.ceil(sortedBookings.length / bookingsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const paginatePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle checkbox for selecting bookings
  const handleCheckboxChange = (id) => {
    setSelectedBookings((prev) =>
      prev.includes(id)
        ? prev.filter((bookingId) => bookingId !== id)
        : [...prev, id]
    );
  };

  // Handle delete selected bookings
  const handleDeleteBookings = () => {
    if (selectedBookings.length > 0) {
      handleDelete(selectedBookings);
      setSelectedBookings([]);
      toast.success("Selected bookings deleted successfully!");
    } else {
      toast.error("Please select at least one booking to delete.");
    }
  };

  const toggleSortDropdown = () => {
    setShowSortDropdown(!showSortDropdown);
    setShowFilterDropdown(false);
  };

  const toggleFilterDropdown = () => {
    setShowFilterDropdown(!showFilterDropdown);
    setShowSortDropdown(false);
  };

  const handleSortOptionClick = (option) => {
    setSortOption(option);
    setShowSortDropdown(false);
  };

  const handleFilterOptionClick = (option) => {
    setFilterOption(option);
    setShowFilterDropdown(false);
  };

  const handleStatusChange = (bookingId, newStatus) => {
    // Update local status state
    setBookingStatuses((prev) => ({
      ...prev,
      [bookingId]: newStatus,
    }));
    // Call function to update the backend
    handleStatusUpdate(bookingId, newStatus);
    toast.success(`Status updated to ${newStatus}`);
  };

  // New function to handle row click and show booking details
  const handleRowClick = (booking) => {
    setSelectedBookingDetails(booking);
  };

 
  // Booking Details Modal Component
  const BookingDetailsModal = ({ booking, onClose }) => {
    if (!booking) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          >
            <X size={24} />
          </button>

          <div className="space-y-3">
            {/* <div className="flex justify-between"> */}
            <div className="text-2xl font-bold mb-4 border-b pb-2">
              <span className="font-medium">ID:</span>
              <span> #{booking.bookingId}</span>
            </div>
            <div className="flex justify-end items-center">
              <span className="font-medium mr-1">Status: </span>
              <span
                className={`px-2 py-1 rounded-xl text-black ${
                  booking.status === "Confirmed"
                    ? "bg-green-300"
                    : booking.status === "Pending"
                    ? "bg-yellow-200"
                    : booking.status === "Cancelled"
                    ? "bg-red-200"
                    : "bg-blue-500"
                }`}
              >
                {booking.status}
              </span>
            </div>

            {/* </div> */}

            {/* <div className="flex justify-between">
              <span className="font-medium">Customer Name:</span>
              <span>{booking.name}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Email:</span>
              <span>{booking.email || "N/A"}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Phone Number:</span>
              <span>{booking.phone || "N/A"}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Service Type:</span>
              <span>{booking.services}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Booking Date:</span>
              <span>{booking.bookingDate}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Event Date:</span>
              <span>{booking.date}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Location:</span>
              <span>{booking.location || "N/A"}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Extra Services:</span>
              <span>{booking.extraServices || "None"}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Total Amount:</span>
              <span>${booking.totalAmount || "N/A"}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Status:</span>
              <span
              // className={`px-2 py-1 rounded text-white ${
              //   booking.status === 'Confirmed' ? 'bg-green-500' :
              //   booking.status === 'Pending' ? 'bg-yellow-500' :
              //   booking.status === 'Cancelled' ? 'bg-red-500' :
              //   'bg-blue-500'
              // }`}
              >
                {booking.status}
              </span>
            </div> */}

{[
              { label: "Customer Name", value: booking.name },
              { label: "Email", value: booking.email || "N/A" },
              { label: "Phone Number", value: booking.phone || "N/A" },
              { label: "Service Type", value: booking.services },
              { label: "Booking Date", value: booking.bookingDate },
              { label: "Event Date", value: booking.date },
              { label: "Location", value: booking.location || "N/A" },
              { label: "Extra Services", value: booking.extraServices || "None" },
              { label: "Total Amount", value: `$${booking.amount || "N/A"}` },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between">
                <span className="font-medium">{label}:</span>
                <span>{value}</span>
              </div>
            ))}


            <div className="flex justify-between">
              <span className="font-medium">Payment Status:</span>
              <span
                className={`px-2 py-1 rounded text-white ${
                  booking.paymentStatus === "Paid"
                    ? "bg-green-500"
                    : booking.paymentStatus === "Pending"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
              >
                {booking.paymentStatus || "Paid"}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 px-4 sm:px-6 lg:px-8 max-w-full w-full">
      <div className="py-2 flex items-center border-b border-black justify-between">
        <h2 className="font-bold text-2xl">Bookings</h2>
        <FaRedoAlt className="mt-[-25px]" />
      </div>
      {/* DASHBAORD INDICATORS */}
      <div className="w-full h-36 flex gap-2">
        {/* Cards */}
        <div className="w-44 h-28 bg-[#F0E7E1] flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-[#A9785D] rounded-full flex items-center justify-center text-lg font-semibold">
            {bookings.length}
          </div>
          <RiHealthBookFill
            color="#A9785D"
            className="absolute top-40 left-96"
          />
          <p className="mt-2 text-sm">Total Booking</p>
        </div>
        <div className="w-44 h-28 bg-[#E8D5C6] flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-[#A9785D] rounded-full flex items-center justify-center text-lg font-semibold">
            {bookings.filter((b) => b.status === "Pending").length}
          </div>
          <MdOutlinePendingActions
            color="#A9785D"
            className="absolute top-40 left-[565px]"
          />
          <p className="mt-2 text-sm">Pending Booking</p>
        </div>
        <div className="w-44 h-28 bg-[#D6E9D0] flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-[#A9785D] rounded-full flex items-center justify-center text-lg font-semibold">
            {bookings.filter((b) => b.status === "Confirmed").length}
          </div>
          <GiConfirmed
            color="#A9785D"
            className="absolute top-40 right-[580px]"
          />
          <p className="mt-2 text-sm">Confirmed Booking</p>
        </div>
        <div className="w-44 h-28 bg-[#EBEBEB] flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-[#A9785D] rounded-full flex items-center justify-center text-lg font-semibold">
            {bookings.filter((b) => b.status === "Completed").length}
          </div>
          <PiNotebookFill
            color="#A9785D"
            className="absolute top-40 right-[395px]"
          />
          <p className="mt-2 text-sm">Completed</p>
        </div>
        <div className="w-44 h-28 bg-[#F4D6D6] flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-[#A9785D] rounded-full flex items-center justify-center text-lg font-semibold">
            {bookings.filter((b) => b.status === "Cancelled").length}
          </div>
          <MdOutlineCancel
            color="#A9785D"
            className="absolute top-40 right-[215px]"
          />
          <p className="mt-2 text-sm">Declined</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="relative flex gap-4 justify-end">
        <button
          className="hover:border hover:border-red-600 flex items-center gap-2 border rounded-full py-2 px-6 text-white hover:text-red-600 bg-red-600 hover:bg-white"
          // onClick={handleDelete}
          onClick={handleDeleteBookings}
        >
          <RiDeleteBinLine />
          Delete
        </button>

        {/* Sort dropdown */}
        <div className="relative">
          <button
            className="border hover:border hover:border-[#C5A592] h-12 w-36 rounded-full pl-4 flex items-center gap-2"
            onClick={toggleSortDropdown}
          >
            <GoSortDesc className="absolute right-5 top-[10px]" />
            Sort by
          </button>
          {showSortDropdown && (
            <div className="absolute right-0 mt-2 w-36 bg-white border rounded-md shadow-lg">
              <ul className="text-sm">
                <li
                  className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSortOptionClick("date")}
                >
                  Date
                </li>
                <li
                  className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSortOptionClick("asc")}
                >
                  Name Ascending
                </li>
                <li
                  className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSortOptionClick("desc")}
                >
                  Name Descending
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Filter dropdown */}
        <div className="relative">
          <button
            className="border h-12 w-36 rounded-full pl-4 flex items-center gap-2"
            onClick={toggleFilterDropdown}
          >
            <CiFilter className="absolute right-5 top-[10px]" />
            Filter
          </button>
          {showFilterDropdown && (
            <div className="absolute right-0 mt-2 w-36 bg-white border rounded-md shadow-lg">
              <ul className="text-sm">
                <li
                  className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleFilterOptionClick("Pending")}
                >
                  Pending
                </li>
                <li
                  className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleFilterOptionClick("Confirmed")}
                >
                  Confirmed
                </li>
                <li
                  className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleFilterOptionClick("Completed")}
                >
                  Completed
                </li>
                <li
                  className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleFilterOptionClick("Cancelled")}
                >
                  Cancelled
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <ScrollToTop trigger={Bookings} />

      {/* Bookings Table */}
      <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-300">
            <th className="border text-left border-gray-300 p-2">Select</th>
            <th className="border border-gray-300 px-4 py-2">Booking ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Service Type</th>
            <th className="border border-gray-300 px-4 py-2">Booking Date</th>
            <th className="border border-gray-300 px-4 py-2">Scheduled Date</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {currentBookings.map((booking) => (
            <tr
              key={booking.bookingId}
              className="hover:bg-gray-100"
              onClick={() => handleRowClick(booking)}
            >
              <td onClick={(e) => e.stopPropagation()} className="border border-gray-300 px-4 py-2">
                <input
                 onClick={(e) => e.stopPropagation()}
                  type="checkbox"
                  checked={selectedBookings.includes(booking.bookingId)}
                  onChange={() => handleCheckboxChange(booking.bookingId)}
                />
              </td>
              <td className="border cursor-pointer hover:underline border-gray-300 px-4 py-2">
                {booking.bookingId}
              </td>
              <td className="border cursor-pointer hover:underline border-gray-300 px-4 py-2">
                {booking.name}
              </td>
              <td className="border cursor-pointer hover:underline border-gray-300 px-4 py-2">
                {booking.services.length > 15
                  ? `${booking.services.slice(0, 15)}...`
                  : booking.services}
              </td>
              <td
                onClick={(e) => e.stopPropagation()}
                className="border border-gray-300 px-4 py-2"
              >
                {booking.bookingDate}
              </td>
              <td
                onClick={(e) => e.stopPropagation()}
                className="border border-gray-300 px-4 py-2"
              >
                {booking.date}
              </td>
              {/* <td className="border border-gray-300 px-4 py-2">{booking.status}</td> */}
              <td onClick={(e) => e.stopPropagation()} className="border border-gray-300 p-2">
                <select
                  value={bookingStatuses[booking.bookingId] || booking.status} // Use fallback in case bookingStatuses isn't populated yet
                  onChange={(e) =>
                    handleStatusChange(booking.bookingId, e.target.value)
                  }
                  onClick={(e) => e.stopPropagation()}
                  className="border cursor-pointer p-1 rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 items-center">
        <button
          // className="px-4 py-2 mx-1 border rounded"
          onClick={paginatePrev}
          disabled={currentPage === 1}
          className={`${
            currentPage === 1 ? "bg-gray-0" : "bg-gray-50 hover:bg-gray-100"
          } text-gray-700 py-2 px-2 rounded-full mr-2 flex items-center`}
        >
          <FaChevronLeft />
        </button>

        <span>
          Page {currentPage} of{" "}
          {Math.ceil(filteredBookings.length / bookingsPerPage)}
        </span>

        <button
          // className="px-4 py-2 mx-1 border rounded"
          onClick={paginateNext}
          disabled={
            currentPage === Math.ceil(filteredBookings.length / bookingsPerPage)
          }
          className={`${
            currentPage === Math.ceil(filteredBookings.length / bookingsPerPage)
              ? "bg-gray-0"
              : "bg-gray-50 hover:bg-gray-100"
          } text-gray-700 py-2 px-2 rounded-full ml-2 flex items-center`}
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Booking Details Modal */}
      {selectedBookingDetails && (
        <BookingDetailsModal
          booking={selectedBookingDetails}
          onClose={() => setSelectedBookingDetails(null)}
        />
      )}
    </div>
  );
};

export default Bookings;
