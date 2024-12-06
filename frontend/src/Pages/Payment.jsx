import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { useFlutterwave } from "flutterwave-react-v3";
import Footer from "../Components/Footer";
import { useStoreContext } from "../context/StoreContext";
import { toast } from "react-hot-toast";

const Payment = () => {
  const location = useLocation();
  const bookingDetails = location.state?.bookingDetails || {};
  const { sendBookingDetails } = useStoreContext();

  // SERVICE CHARGE CALCULATION BASED ON SELECTED SERVICES
  const serviceCharges = {
    "Brand Video Shoot": 180,
    "Lifestyle Video Shoot": 170,
    "Pre-wedding Video Shoot": 160,
  };

  const calculateServiceCharge = () => {
    if (Array.isArray(bookingDetails.services)) {
      return bookingDetails.services.reduce((total, service) => {
        return total + (serviceCharges[service] || 0);
      }, 0);
    }
    return 0;
  };

  // APPLY EXTRA SERVICE CHARGE IF ONLY AN EXTRASERVICE IS SELECTED
  const extraServiceCharge = bookingDetails.extraServices ? 50 : 0;

  // LOGISTICS CHARGE BASED ON LOCATION
  const logistics = bookingDetails.location ? 20 : 0;

  // TOTAL
  const total = calculateServiceCharge() + extraServiceCharge + logistics;

  const config = {
    public_key: "FLWPUBK_TEST-5776875783cdbb9d979a78781d2c5163-X",
    tx_ref: Date.now(),
    amount: total,
    currency: "NGN",
    payment_options: "card, banktransfer",
    customer: {
      email: bookingDetails.email,
      phonenumber: bookingDetails.phone,
      name: bookingDetails.name,
    },
    customizations: {
      title: "BOOKING PAYMENT",
      description: "Payment for booking services",
      logo: "/AvidLogo.png", // Replace  logo
    },
  };

  const handleFlutterPayment = useFlutterwave(config);


//💙
//   // Handle payment with validation
  
// const handlePayment = () => {
//   handleFlutterPayment({
//     callback: (response) => {
//       console.log(response);
//       if (response.status === "completed" || response.status === "successful") {
//         console.log("Payment completed, sending booking details...");

//         // Create a new data object including booking details, transaction ID, and amount
//         const dataToSend = {
//           ...bookingDetails,
//           transactionId: response.transaction_id || "", // Include the transaction ID here
//           amount: total || 0, // Include the amount here
//         };

//         // Send the booking details with transaction ID and amount
//         sendBookingDetails(dataToSend);
//         toast.success("Booking created successfully!");
//         console.log("Booking time:", bookingDetails.time);
//       } else {
//         console.log("Payment not completed");
//         toast.error("Payment not completed. Please try again.");
//       }
//     },
//     onClose: () => {
//       console.log("Payment closed");
//     },
//   });
// };


const handlePayment = () => {
  handleFlutterPayment({
      callback: (response) => {
          console.log("Payment Response:", response); // Log the entire response
          
          if (response.status === "completed" || response.status === "successful") {
              console.log("Payment completed, sending booking details...");

              // Extracting the flw_ref from the response
              const flwRef = response.flw_ref; // Accessing flw_ref directly
              const transactionId = response.transaction_id || ""; // Include the transaction ID

              // Create a new data object including booking details, transaction ID, flw_ref, and currency
              const dataToSend = {
                  ...bookingDetails,
                  transactionId: transactionId,
                  flw_ref: flwRef, // Include flw_ref here
                  amount: total || 0, // Include the amount here
                  currency: "NGN", // Include the currency here
              };

              console.log("Data to send:", dataToSend); // Log the data to be sent

              // Send the booking details with transaction ID, flw_ref, amount, and currency
              sendBookingDetails(dataToSend);
              toast.success("Booking created successfully!");
          } else {
              console.log("Payment not completed");
              toast.error("Payment not completed. Please try again.");
          }
      },
      onClose: () => {
          console.log("Payment closed");
      },
  });
};



  // IF BOOKING DETAILS ARE MISSING, SHOW AN ERROR
  if (!bookingDetails.name) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">
          No booking details found. Please complete your booking first.
        </p>
        <Link to="/Booking">
          <button className="border border-avidBrown text-avidBrown hover:bg-avidBrown hover:text-white rounded-full p-2 mt-4">
            Go Back to Booking
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-hidden">
      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start mt-12 w-full lg:w-[1200px] h-auto lg:h-[668px] mx-auto p-4 lg:p-8 bg-gray-50">
        {/* PAYMENT METHODS */}
        <div className="flex flex-col w-full lg:w-[792px] lg:h-[584px] bg-white p-6 shadow-md rounded-md mb-6 lg:mb-0 lg:mr-6 border border-[#B0B0B0]">
          <h2 className="text-center text-xl font-bold mb-4">PAYMENT METHOD</h2>
          <p className="text-center text-sm mb-3">Select a payment method</p>

          <p className="text-lg mb-4 mx-20">SELECT PAYMENT METHOD</p>

          <ul className="space-y-4 lg:space-y-0 lg:flex lg:flex-col lg:items-center">
            <li className="w-full lg:w-[75%]">
              <button
                onClick={handlePayment}
                className="flex w-full text-left p-4 border rounded-md hover:bg-gray-100"
              >
                Flutterwave
                <ChevronRight className="ml-auto" />
              </button>
            </li>
            {/* Other payment methods can be added here */}
          </ul>
        </div>

        {/* BOOKING SUMMARY AND QUOTATION */}
        <div className="w-full lg:w-1/2 bg-white p-6 shadow-md rounded-md border border-[#B0B0B0]">
          <h2 className="bg-[#333333] text-white p-3 text-xl font-bold mb-4">
            Booking Summary
          </h2>

          {/* BOOKING SUMMARY DETAILS */}
          <div className="space-y-2 mb-6">
            <p>
              <strong>Name:</strong> {bookingDetails.name || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {bookingDetails.email || "N/A"}
            </p>
            <p>
              <strong>Phone:</strong> {bookingDetails.phone || "N/A"}
            </p>
            <p>
              <strong>Services:</strong>{" "}
              {Array.isArray(bookingDetails.services)
                ? bookingDetails.services.join(", ")
                : "N/A"}
            </p>
            <p>
              <strong>Extra Service:</strong>{" "}
              {bookingDetails.extraServices ? "Extra Service" : "N/A"}
            </p>
            <p>
              <strong>Location:</strong>{" "}
              {bookingDetails.location
                ? `Lat: ${bookingDetails.location.lat}, Lng: ${bookingDetails.location.lng}`
                : "N/A"}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {bookingDetails.date
                ? new Date(bookingDetails.date).toLocaleDateString()
                : "N/A"}
            </p>
            <p>
              <strong>Time:</strong> {bookingDetails.time || "pm"}
            </p>
          </div>

          {/* QUOTATION */}
          <h2 className="bg-[#333333] text-white p-3 text-xl font-bold mb-4">
            Quotation
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <p className="font-semibold text-sm">Service charge</p>
              <p className="font-semibold text-sm">Extra Service Charge</p>
              <p className="font-semibold text-sm">Logistics</p>
              <p className="font-semibold text-sm">Total</p>
            </div>
            <div className="space-y-2 text-sm">
              <p>₦ {calculateServiceCharge()}</p>
              <p>₦ {extraServiceCharge}</p>
              <p>₦ {logistics}</p>
              <p>₦ {total}</p>
            </div>
          </div>

          <Link to="/BookingSummary">
            <button className="flex w-[157px] h-[44px] items-center justify-center bg-white text-avidBrown border border-avidBrown rounded-lg hover:bg-amber-950 mb-4">
              <ChevronLeft className="text-avidBrown" />
              Go Back
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Payment;
