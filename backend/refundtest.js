import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Sample booking data (as provided)
const bookingData = {
  _id: "67455c7c1800f0893162f22f",
  name: "kim rogers kim",
  email: "kimrogers1004@gmail.com",
  phone: "09032633554",
  services: ["Lifestyle Video Shoot"],
  extraServices: "",
  date: "2025-02-22",
  bookingDate: "2024-11-26",
  status: "Confirmed",
  transactionId: "8218953",
  bookingId: "AVID141",
  amount: 190,
  settledAmount: 187.34,
  paymentType: "ussd",
  flw_ref: "flwm3s4m0c1732598898418",
  currency: "NGN",
  createdAt: "2024-11-26T05:28:28.747Z",
  updatedAt: "2024-11-29T11:58:30.795Z",
  __v: 0
};

// Refund function using Flutterwave API
const processRefund = async (transactionId, amount) => {
  try {
    const flutterwaveSecretKey = process.env.FLW_SECRET_KEY;

    if (!flutterwaveSecretKey) {
      throw new Error('Flutterwave secret key is not defined. Check your .env file.');
    }

    // Construct the refund request payload without 'comments'
    const refundPayload = {
      amount: amount, // Amount to refund
    };

    console.log("Sending refund request:", { transactionId, refundPayload });

    // Send a POST request to the Flutterwave refund endpoint
    const response = await axios.post(
      `https://api.flutterwave.com/v3/transactions/${transactionId}/refund`,
      refundPayload,
      {
        headers: {
          Authorization: `Bearer ${flutterwaveSecretKey}`,
        },
      }
    );

    if (response.data.status === 'success') {
      console.log('Refund successful:', response.data);
      return response.data;
    } else {
      console.error('Refund failed:', response.data);
      throw new Error(response.data.message || 'Refund processing failed');
    }
  } catch (error) {
    console.error('Error processing refund:', error.message);
    // Log full response data from error for better troubleshooting
    if (error.response) {
      console.error('Error response data:', error.response.data);
    }
    throw new Error('Refund processing failed');
  }
};

// Test the refund process
(async () => {
  try {
    const transactionId = bookingData.transactionId;  // Use transaction ID from booking data
    const refundAmount = bookingData.amount;  // Refund the full amount from booking data

    // Process the refund and log the response
    const refundResponse = await processRefund(transactionId, refundAmount);
    console.log("Refund Response:", refundResponse);
  } catch (error) {
    console.error("Error:", error.message);
  }
})();
