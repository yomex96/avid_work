
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../Components/Footer";
import { useState } from "react";

const BookingSummary = () => {
  const location = useLocation();
  const bookingDetails = location.state || {};
  const [formattedTime, setFormattedTime] = useState(bookingDetails.time || "N/A");

  // SERVICE CHARGE
  const serviceCharges = {
    "Brand Video Shoot": 180,
    "Lifestyle Video Shoot": 170,
    "Pre-wedding Video Shoot": 160,
  };

  // SERVICE CHARGE CALCULATION BASED ON SELECTED SERVICES
  const calculateServiceCharge = () => {
    if (Array.isArray(bookingDetails.services)) {
      return bookingDetails.services.reduce((total, service) => {
        return total + (serviceCharges[service] || 0);
      }, 0);
    }
    return 0;
  };

  // APPLY EXTRA SERVICE CHARGE IF ONLY AN EXTRA SERVICE IS SELECTED
  const extraServiceCharge = bookingDetails.extraServices ? 50 : 0;

  // LOGISTICS CHARGE BASED ON LOCATION
  const logistics = bookingDetails.location ? 20 : 0; 

  // TOTAL
  const total = calculateServiceCharge() + extraServiceCharge + logistics;

  // Time formatting function
  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 0 to 12
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  // Mock function to simulate time selection 
  const handleTimeChange = (time) => {
    const date = new Date();
    date.setHours(time.hours);
    date.setMinutes(time.minutes);
    const newFormattedTime = formatTime(date);
    setFormattedTime(newFormattedTime);
  };

  return (
    <div className="w-full overflow-hidden sm:mt-12 lg:mt-[10px]">
      <div className="bg-white text-black min-h-screen flex flex-col justify-center items-center flex-wrap mt-12 px-4">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center items-start mb-8 w-full md:max-w-[1200px]">
          {/* BOOKING SUMMARY */}
          <div className="w-full md:w-[800px] bg-[#FBF8F4] p-4 md:p-8 rounded-sm shadow-lg border border-black">
            <h1 className="bg-[#333333] text-xl py-3 px-2 font-bold text-white mb-4 md:mb-8">
              BOOKING SUMMARY
            </h1>

            <table className="w-full">
              <tbody>
                <tr>
                  <td className="font-semibold">NAME</td>
                  <td className="break-words overflow-hidden">{bookingDetails.name || "N/A"}</td>
                </tr>
                <tr>
                  <td className="font-semibold">EMAIL</td>
                  <td className="break-words overflow-hidden">{bookingDetails.email || "N/A"}</td>
                </tr>
                <tr>
                  <td className="font-semibold">PHONE</td>
                  <td className="break-words overflow-hidden">{bookingDetails.phone || "N/A"}</td>
                </tr>
                <tr>
                  <td className="font-semibold">SERVICES(S)</td>
                  <td className="break-words overflow-hidden">
                    {Array.isArray(bookingDetails.services)
                      ? bookingDetails.services.join(", ")
                      : "N/A"}
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold">EXTRA SERVICE(S)</td>
                  {/* <td className="break-words overflow-hidden">{bookingDetails.extraServices ? "Extra Service" : "N/A"}</td> */}
                  <td className="break-words overflow-hidden">{bookingDetails.extraServices ? bookingDetails.extraServices : "N/A"}</td>
                </tr>

                <tr>
                  <td className="font-semibold">LOCATION</td>
                  <td className="break-words overflow-hidden">
                    {bookingDetails.location
                      ? `Lat: ${bookingDetails.location.lat}, Lng: ${bookingDetails.location.lng}`
                      : "N/A"}
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold">DATE</td>
                  <td className="break-words overflow-hidden">{bookingDetails.date ? bookingDetails.date.toLocaleDateString() : "N/A"}</td>
                </tr>
                <tr>
                  <td className="font-semibold">TIME</td>
                  <td className="break-words overflow-hidden">{formattedTime}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* QUOTATION */}
          <div className="w-full md:w-[400px] h-auto bg-[#FBF8F4] p-4 rounded-sm border border-black shadow-lg">
            <h1 className="bg-[#333333] mt-4 text-xl py-3 px-1 font-bold text-white mb-4 md:mb-4">
              QUOTATION
            </h1>

            <table className="w-full">
              <tbody>
                <tr>
                  <td className="font-semibold text-sm">Service charge</td>
                  <td className="text-sm">₦ {calculateServiceCharge()}</td>
                </tr>
                <tr>
                  <td className="font-semibold text-sm">Extra Service Charge</td>
                  <td className="text-sm">₦ {extraServiceCharge}</td>
                </tr>
                <tr>
                  <td className="font-semibold text-sm">Logistics</td>
                  <td className="text-sm">₦ {logistics}</td>
                </tr>
                <tr>
                  <td className="font-semibold text-sm">Total</td>
                  <td className="text-sm">₦ {total}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full gap-4 md:max-w-[1200px] h-auto flex justify-center md:justify-between items-center text-center mt-8 px-4">
          <Link to="/Booking">
            <button className="flex w-[100px] md:w-[157px] h-[44px] md:h-[56px] items-center justify-center bg-white text-avidBrown border border-avidBrown rounded-lg hover:bg-amber-950">
              <ChevronLeft className="text-avidBrown" />
              Back
            </button>
          </Link>

          <Link 
            to='/Payment' 
            state={{ bookingDetails }}
          >
            <button className="flex w-[200px] md:w-[1019px] h-[44px] md:h-[56px] justify-center items-center bg-avidBrown rounded-lg md:rounded-3xl hover:bg-amber-950 text-white font-semibold py-2 px-4">
              Proceed To Payment
              <ChevronRight />
            </button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingSummary;
