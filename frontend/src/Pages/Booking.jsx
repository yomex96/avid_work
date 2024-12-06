import { useState } from "react";
import { CalendarDays, Mail, MapPinIcon, Timer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Footer from "../Components/Footer";
import { toast } from "react-hot-toast";
import { useStoreContext } from "../context/StoreContext";

const BookingPage = () => {
  const navigate = useNavigate();

  const [selectedServices, setSelectedServices] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [location, setLocation] = useState({ lat: 6.5244, lng: 3.3792 });
  const [extraServices, setExtraServices] = useState("");
  const [showMap, setShowMap] = useState(false);
  const {
    checkAvailability,
    isTimeAvailable,
    errorMessage,
    resetAvailability,
  } = useStoreContext(); // Access the context correctly

    const { setBookingDetails } = useStoreContext(); 
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  // const [date, setDate] = useState(null);
  const [date, setDate] = useState(tomorrow);
  const [timeRange, setTimeRange] = useState({
    from: { hour: "", minute: "", period: "AM" },
    to: { hour: "", minute: "", period: "AM" },
  });
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleTimeSelect = (
    fromHour,
    fromMinute,
    fromPeriod,
    toHour,
    toMinute,
    toPeriod
  ) => {
    const selectedTimeRange = {
      from: { hour: fromHour, minute: fromMinute, period: fromPeriod },
      to: { hour: toHour, minute: toMinute, period: toPeriod },
    };
    setTimeRange(selectedTimeRange);
    console.log("Time Range Set:", selectedTimeRange);

    // Safely format the date or set it to null if not selected
    const formattedDate = date ? date.toISOString().split("T")[0] : null;

    // Check availability based on the selected date and time
    checkAvailability(
      formattedDate, // Pass the date in YYYY-MM-DD format or null
      `${fromHour}:${fromMinute} ${fromPeriod}`, // Time from
      `${toHour}:${toMinute} ${toPeriod}` // Time to
    );

     // Close the time picker
  setShowTimePicker(false);
  };

  const services = [
    "Lifestyle Video Shoot",
    "Brand Video Shoot",
    "Pre-wedding Video Shoot",
  ];

  const handleCheckboxChange = (service) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(service)
        ? prevSelected.filter((item) => item !== service)
        : [...prevSelected, service]
    );
  };

  const handleMapClick = (event) => {
    setLocation({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    setShowMap(false);
  };

  // const handleProceed = () => {
  //   // Check if required fields are filled
  //   if (
  //     !name ||
  //     !email ||
  //     !phone ||
  //     !location ||
  //     !date ||
  //     !timeRange.from.hour ||
  //     !timeRange.from.minute ||
  //     !timeRange.to.hour ||
  //     !timeRange.to.minute
  //   ) {
  //     toast.error("All fields are required.");
  //     return;
  //   }

  const handleProceed = () => {
    // Check if required fields are filled
    if (
      !name ||
      !email ||
      !phone ||
      !location ||
      !date ||
      !timeRange.from.hour ||
      !timeRange.from.minute ||
      !timeRange.to.hour ||
      !timeRange.to.minute ||
      !timeRange.to.period || // Check if the 'to' period is provided
      (timeRange.to.period !== "AM" && timeRange.to.period !== "PM") // Validate that it is either 'AM' or 'PM'
    ) {
      toast.error(
        "All fields are required and the 'To' period must be either 'AM' or 'PM'."
      );
      return;
    }

    // Convert time to 24-hour format for comparison
    const convertTo24Hour = (hour, minute, period) => {
      let hour24 = parseInt(hour, 10);
      if (period === "PM" && hour24 !== 12) {
        hour24 += 12; // Convert PM hour to 24-hour format
      }
      if (period === "AM" && hour24 === 12) {
        hour24 = 0; // Convert midnight to 0
      }
      return hour24 * 60 + parseInt(minute, 10); // Return total minutes for easier comparison
    };

    const from24Hour = convertTo24Hour(
      timeRange.from.hour,
      timeRange.from.minute,
      timeRange.from.period
    );
    const to24Hour = convertTo24Hour(
      timeRange.to.hour,
      timeRange.to.minute,
      timeRange.to.period
    );

    // Check if end time is later than start time
    if (to24Hour <= from24Hour) {
      toast.error("End time must be later than the start time.");
      return;
    }

    // Check if at least one service is selected
    if (selectedServices.length === 0) {
      toast.error("Please select at least one service.");
      return;
    }

    navigate("/BookingSummary", {
      state: {
        name,
        email,
        phone,
        services: selectedServices,
        location,
        date,
        time: `${timeRange.from.hour}:${timeRange.from.minute} ${timeRange.from.period} - ${timeRange.to.hour}:${timeRange.to.minute} ${timeRange.to.period}`,
        extraServices,
      },
    });
  };

  return (
    <div className="flex flex-col items-center w-full overflow-hidden">
      <div className="flex flex-col mt-24 mb-12 gap-2.5 px-6 sm:px-12 lg:px-[400px] text-center">
        <h2 className="font-bold text-2xl sm:text-3xl">
          Choose Your Ideal Service And Secure Your Booking
        </h2>
        <p>Select a service or more and book now</p>
      </div>

      <div className="flex flex-col w-full max-w-[1200px] font-normal text-white bg-black p-6 sm:p-10 rounded-md">
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex justify-center mb-6">
            <p>You can select more than one</p>
          </div>
          {services.map((service) => (
            <div key={service} className="flex items-center p-4">
              <input
                type="checkbox"
                checked={selectedServices.includes(service)}
                onChange={() => handleCheckboxChange(service)}
                className="mr-2"
              />
              <p>{service}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-center py-4 sm:py-16 items-center">
          <p>Let's get your details</p>
        </div>

        <div className="flex flex-wrap justify-between w-full gap-4">
          {/* Form Fields */}
          <div className="w-full sm:w-[48%]">
            <label className="text-sm pl-2 font-medium block">Full Name</label>
            <input
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full pl-2 h-[48px] sm:h-[56px] rounded-2xl bg-transparent border-b border-white mb-4"
            />
          </div>

          <div className="relative w-full sm:w-[48%]">
            <label className="text-sm pl-10 font-medium block">Email</label>
            <Mail className="absolute top-9 left-3" />
            <input
              type="email"
              placeholder="youremail@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 h-[48px] sm:h-[56px] rounded-2xl bg-transparent border-b border-white mb-4"
            />
          </div>

          <div className="w-full sm:w-[48%]">
            <label className="text-sm pl-2 font-medium block">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full pl-2 h-[48px] sm:h-[56px] rounded-2xl bg-transparent border-b border-white mb-4"
            />
          </div>

          <div className="relative w-full sm:w-[48%]">
            <label className="text-sm pl-10 font-medium block">Location</label>
            <MapPinIcon
              className="absolute top-9 left-3 cursor-pointer"
              onClick={() => setShowMap(!showMap)}
            />
            <input
              type="text"
              placeholder="Click to select location"
              value={`Lat: ${location.lat}, Lng: ${location.lng}`}
              readOnly
              className="w-full pl-10 h-[48px] sm:h-[56px] rounded-2xl bg-transparent border-b border-white mb-4 cursor-pointer"
              onClick={() => setShowMap(!showMap)}
              required
            />
            {showMap && (
              <LoadScript googleMapsApiKey="GOOGLE_MAPS_API_KEY">
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "400px" }}
                  center={location}
                  zoom={12}
                  onClick={handleMapClick}
                >
                  <Marker position={location} />
                </GoogleMap>
              </LoadScript>
            )}
          </div>

          <div className="relative w-full sm:w-[48%]">
            <label className="text-sm pl-10 font-medium block">Date</label>
            <CalendarDays className="absolute top-9 left-3" />
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              className="w-full pl-10 h-[48px] sm:h-[56px] rounded-2xl bg-transparent border-b border-white mb-4"
              placeholderText="Select a date"
              required
            />
          </div>

          <div className="relative w-full sm:w-[48%]">
            <label className="text-sm pl-10 font-medium block">Time</label>

            <Timer className="absolute top-9 left-3" />

            <input
              type="text"
              placeholder={`From ${timeRange.from.hour}:${timeRange.from.minute} ${timeRange.from.period} To ${timeRange.to.hour}:${timeRange.to.minute} ${timeRange.to.period}`}
              readOnly
              onClick={() => setShowTimePicker(true)}
              required
              className="w-full pl-10 h-[48px] sm:h-[56px] rounded-2xl bg-transparent border-b border-white mb-4 cursor-pointer"
            />
            {showTimePicker && (
              <div className="absolute top-[56px] left-0 w-full bg-black border border-white rounded-md p-4 z-10">
                {/* FROM SECTION */}
                <div className="flex justify-between mb-4">
                  <div>
                    <p className="font-semibold">From</p>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      placeholder="Hour"
                      value={timeRange.from.hour}
                      onChange={(e) =>
                        setTimeRange({
                          ...timeRange,
                          from: { ...timeRange.from, hour: e.target.value },
                        })
                      }
                      className="w-16 h-8 rounded-md bg-transparent border-b border-white mb-1"
                    />
                    <input
                      type="number"
                      min="0"
                      max="59"
                      placeholder="Min"
                      value={timeRange.from.minute}
                      onChange={(e) =>
                        setTimeRange({
                          ...timeRange,
                          from: { ...timeRange.from, minute: e.target.value },
                        })
                      }
                      className="w-16 h-8 rounded-md bg-transparent border-b border-white mb-1"
                    />
                    <select
                      value={timeRange.from.period}
                      onChange={(e) =>
                        setTimeRange({
                          ...timeRange,
                          from: { ...timeRange.from, period: e.target.value },
                        })
                      }
                      className="w-16 h-8 rounded-md bg-transparent border-b border-white mb-1"
                    >
                      <option value="AM" className="bg-gray-500">
                        AM
                      </option>
                      <option value="PM" className="bg-gray-500">
                        PM
                      </option>
                    </select>
                  </div>

                  {/* TO SECTION */}
                  <div>
                    <p className="font-semibold">To</p>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      placeholder="Hour"
                      value={timeRange.to.hour}
                      onChange={(e) =>
                        setTimeRange({
                          ...timeRange,
                          to: { ...timeRange.to, hour: e.target.value },
                        })
                      }
                      className="w-16 h-8 rounded-md bg-transparent border-b border-white mb-1"
                    />
                    <input
                      type="number"
                      min="0"
                      max="59"
                      placeholder="Min"
                      value={timeRange.to.minute}
                      onChange={(e) =>
                        setTimeRange({
                          ...timeRange,
                          to: { ...timeRange.to, minute: e.target.value },
                        })
                      }
                      className="w-16 h-8 rounded-md bg-transparent border-b border-white mb-1"
                    />
                    <select
                      value={timeRange.to.period}
                      onChange={(e) =>
                        setTimeRange({
                          ...timeRange,
                          to: { ...timeRange.to, period: e.target.value },
                        })
                      }
                      className="w-16 h-8 rounded-md bg-transparent border-b border-white mb-1"
                    >
                      <option value="AM" className="bg-gray-500">
                        AM
                      </option>
                      <option value="PM" className="bg-gray-500">
                        PM
                      </option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => {
                      setShowTimePicker(false);
                      resetAvailability();
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      handleTimeSelect(
                        timeRange.from.hour,
                        timeRange.from.minute,
                        timeRange.from.period,
                        timeRange.to.hour,
                        timeRange.to.minute,
                        timeRange.to.period
                      );
                    }}
                    className="bg-avidBrown hover:bg-green-600 text-white rounded px-4 py-2"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="w-full sm:w-[100%]">
            <label className="text-sm pl-2 font-medium block">
              Extra Services
            </label>
            <input
              type="text"
              placeholder="Any additional services?"
              value={extraServices}
              onChange={(e) => setExtraServices(e.target.value)}
              className="w-full h-[80px] sm:h-[102px] rounded-lg bg-transparent border border-white px-2 mb-4"
            />
          </div>
          {/* Display availability error if exists */}
          {errorMessage && (
            <div className="relative w-full sm:w-[48%]">
              <p className="text-red-500 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl mt-2 sm:mt-3">
                {errorMessage}
              </p>
            </div>
          )}

          {/* Show availability confirmation */}
          {isTimeAvailable && (
            <div className="relative w-full sm:w-[48%]">
              <p className="text-green-500 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl mt-2 sm:mt-3">
                Your selected time slot is available!
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleProceed}
            className="w-full sm:w-[1120px] bg-white hover:bg-avidBrown text-black hover:text-white font-bold py-2 px-4 rounded-3xl border border-1 border-white"
          >
            Proceed to Booking Summary
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingPage;
