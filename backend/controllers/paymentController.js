import axios from 'axios';
import { flutterwaveSecretKey } from '../config/env.js'; 
import Booking from '../models/Booking.js';

// Verify Payment
export const verifyPayment = async (req, res) => {
  const { transactionId, bookingData } = req.body; // Ensure bookingData includes transactionId

  // Check if amount is present in bookingData
  if (!bookingData.amount) {
    return res.status(400).json({ success: false, message: 'Amount is required in booking data' });
  }

  try {
    // Verify the payment with Flutterwave
    const response = await axios.get(
      `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
      {
        headers: {
          Authorization: `Bearer ${flutterwaveSecretKey}`,
        },
      }
    );
    console.log("Verification response:", response.data);

    // Check if the payment was successful
    if (response.data.status === 'successful') {
      // Create the booking with the transaction ID and amount
      const booking = new Booking({
        ...bookingData,
        transactionId: transactionId, // Store the transaction ID
      });

      await booking.save(); // Save the booking with the transaction ID
      console.log("Booking saved:", booking); // Log the booking details

      // Send success response
      return res.status(200).json({ success: true, data: booking });
    } else {
      console.error("Payment verification failed:", response.data);
      return res.status(400).json({ success: false, message: 'Payment not successful', data: response.data });
    }
  } catch (error) {
    console.error('Error during payment verification:', error.message);
    return res.status(500).json({ success: false, message: 'Verification failed', error: error.message });
  }
};

// Check Transaction Status (used before processing refunds)
export const checkTransactionStatus = async (transactionId) => {
  try {
    // Call Flutterwave API to get transaction details
    const response = await axios.get(
      `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
      {
        headers: {
          Authorization: `Bearer ${flutterwaveSecretKey}`,
        },
      }
    );

    // Log the full response for debugging
    console.log("Transaction status response:", response.data); 

    const transactionStatus = response.data.data.status;
    console.log(`Transaction status for ${transactionId}:`, transactionStatus);

    // Check if the transaction is successful (settled)
    return transactionStatus === 'successful';
  } catch (error) {
    console.error('Error checking transaction status:', error.message);
    throw new Error('Failed to verify transaction status');
  }
};


export const refundPayment = async (transactionId, amount) => {
    try {
        const flutterwaveUrl = `${process.env.FLUTTERWAVE_API_URL}/transactions/${transactionId}/refund`;
        const secretKey = process.env.FLW_SECRET_KEY;

        console.log(`Initiating refund for Transaction ID: ${transactionId}, Amount: ${amount}`);
        console.log(`Refund API URL: ${flutterwaveUrl}`);

        const response = await axios.post(flutterwaveUrl, {
            amount: amount,
        }, {
            headers: {
                Authorization: `Bearer ${secretKey}`,
            },
        });

        if (response.data.status === 'success') {
            console.log('Refund successful:', response.data);
            return {
                success: true,
                transactionId: response.data.data.transaction_id,
                refundedAmount: response.data.data.amount_refunded,
            };
        } else {
            throw new Error(response.data.message || 'Refund failed');
        }
    } catch (error) {
        console.error('Error during refund:', error.response?.data || error.message);
        throw new Error('Refund processing error');
    }
};




// import axios from 'axios';
// import { flutterwaveSecretKey } from '../config/env.js'; // Adjust the import path as necessary
// import Booking from '../models/Booking.js';

// // Function to fetch transaction status
// export const fetchTransactionStatus = async (transactionId) => {
//   try {
//       const response = await axios.get(
//           `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
//           {
//               headers: {
//                   Authorization: `Bearer ${flutterwaveSecretKey}`,
//               },
//           }
//       );
//       console.log('Fetched transaction status:', response.data); // Log the response data
//       return response.data; // Return the entire response object
//   } catch (error) {
//       console.error('Error fetching transaction status:', error.response ? error.response.data : error.message);
//       throw new Error('Could not retrieve transaction status.');
//   }
// };



// // Function to verify Payment
// export const verifyPayment = async (req, res) => {
//   const { transactionId, bookingData } = req.body; // Ensure bookingData includes transactionId

//   // Check if amount is present in bookingData
//   if (!bookingData.amount) {
//     return res.status(400).json({ success: false, message: 'Amount is required in booking data' });
//   }

//   try {
//     // Verify the payment with Flutterwave
//     const verificationResponse = await verifyTransaction(transactionId);
    
//     // Log verification response
//     console.log("Verification response:", verificationResponse);

//     // Check if the payment was successful
//     if (verificationResponse.status === 'successful') {
//       // Create the booking with the transaction ID and amount
//       const booking = new Booking({
//         ...bookingData,
//         transactionId: transactionId, // Store the transaction ID
//       });

//       await booking.save(); // Save the booking with the transaction ID
//       console.log("Booking saved:", booking); // Log the booking details

//       // Send success response
//       return res.status(200).json({ success: true, data: booking });
//     } else {
//       console.error("Payment verification failed:", verificationResponse);
//       return res.status(400).json({ success: false, message: 'Payment not successful', data: verificationResponse });
//     }
//   } catch (error) {
//     console.error('Error during payment verification:', error.message);
//     return res.status(500).json({ success: false, message: 'Verification failed', error: error.message });
//   }
// };

// // Function to verify transaction status
// const verifyTransaction = async (transactionId) => {
//   try {
//     // Call Flutterwave API to verify the transaction
//     const response = await axios.get(
//       `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
//       {
//         headers: {
//           Authorization: `Bearer ${flutterwaveSecretKey}`,
//         },
//       }
//     );

//     // Log the full response for debugging
//     console.log("Transaction verification response:", response.data);

//     return response.data; // Return the response data for further checks
//   } catch (error) {
//     console.error('Error during transaction verification:', error.message);
//     throw new Error('Verification of transaction failed');
//   }
// };

// // // Refund Payment
// // export const refundPayment = async (booking) => {
// //   try {
// //     console.log(`Processing refund for booking ID: ${booking.bookingId}`);

// //     // Ensure amount is defined before proceeding
// //     if (!booking.amount) {
// //       throw new Error('Amount is required for refund.');
// //     }

// //     // Fetch transaction details first
// //     const transactionStatus = await fetchTransactionStatus(booking.transactionId);
// //     if (transactionStatus.status === 'successful') {
// //       const tx_ref = transactionStatus.data.tx_ref; // Use the tx_ref here

// //       // Prepare refund request
// //       const refundData = {
// //         amount: booking.amount, // Use the booking amount
// //         reference: tx_ref, // Use the transaction reference
// //       };
// //       console.log('Refund request data:', refundData); // Log refund data

// //       // Now send the refund request
// //       const refundResponse = await axios.post(
// //         `https://api.flutterwave.com/v3/transactions/${booking.transactionId}/refund`,
// //         refundData,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${flutterwaveSecretKey}`,
// //           },
// //         }
// //       );

// //       console.log('Refund successful:', refundResponse.data);
// //       return refundResponse.data;
// //     } else {
// //       console.error('Transaction not successful:', transactionStatus);
// //       throw new Error('Cannot process refund, transaction was not successful.');
// //     }
// //   } catch (error) {
// //     // Enhanced logging
// //     console.error('Error processing refund:', error);
// //     if (error.response) {
// //       console.error('Error response data:', error.response.data);
// //       throw new Error(`Refund failed: ${error.response.data.message || error.message}`);
// //     } else {
// //       console.error('Unexpected error:', error.message);
// //       throw new Error('Refund failed');
// //     }
// //   }
// // };


// // Refund Payment


// export const refundPayment = async (booking) => {
//   try {
//     console.log(`Processing refund for booking ID: ${booking.bookingId}`);

//     // Ensure amount is defined before proceeding
//     if (!booking.amount) {
//       throw new Error('Amount is required for refund.');
//     }

//     // Fetch transaction details first
//     const transactionStatus = await fetchTransactionStatus(booking.transactionId);
//     if (transactionStatus.status === 'successful') {
//       const tx_ref = transactionStatus.data.tx_ref; // Use the tx_ref here

//       // Prepare refund request using the settled amount
//       const refundData = {
//         amount: transactionStatus.data.amount_settled, // Use the settled amount
//         reference: tx_ref, // Use the transaction reference
//       };
//       console.log('Refund request data:', refundData); // Log refund data

//       // Now send the refund request
//       const refundResponse = await axios.post(
//         `https://api.flutterwave.com/v3/transactions/${booking.transactionId}/refund`,
//         refundData,
//         {
//           headers: {
//             Authorization: `Bearer ${flutterwaveSecretKey}`,
//           },
//         }
//       );

//       console.log('Refund successful:', refundResponse.data);
//       return refundResponse.data;
//     } else {
//       console.error('Transaction not successful:', transactionStatus);
//       throw new Error('Cannot process refund, transaction was not successful.');
//     }
//   } catch (error) {
//     // Enhanced logging
//     console.error('Error processing refund:', error);
//     if (error.response) {
//       console.error('Error response data:', error.response.data);
//       throw new Error(`Refund failed: ${error.response.data.message || error.message}`);
//     } else {
//       console.error('Unexpected error:', error.message);
//       throw new Error('Refund failed');
//     }
//   }
// };


//trial before github push

// import axios from 'axios';
// import { flutterwaveSecretKey } from '../config/env.js';
// import Booking from '../models/Booking.js';

// // Function to fetch transaction status
// export const fetchTransactionStatus = async (transactionId) => {
//   try {
//     const response = await axios.get(
//       `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
//       {
//         headers: {
//           Authorization: `Bearer ${flutterwaveSecretKey}`,
//         },
//       }
//     );

//     console.log('Fetched transaction status:', response.data);
//     return response.data; // Return the entire response object
//   } catch (error) {
//     console.error('Error fetching transaction status:', error.response ? error.response.data : error.message);
//     throw new Error('Could not retrieve transaction status.');
//   }
// };

// // Function to verify Payment
// export const verifyPayment = async (req, res) => {
//   const { transactionId, bookingData } = req.body;

//   // Check if amount is present in bookingData
//   if (!bookingData.amount) {
//     return res.status(400).json({ success: false, message: 'Amount is required in booking data' });
//   }

//   try {
//     // Verify the payment with Flutterwave
//     const verificationResponse = await verifyTransaction(transactionId);
    
//     // Log verification response
//     console.log("Verification response:", verificationResponse);

//     // Ensure response data exists and contains expected properties
//     if (verificationResponse && verificationResponse.data) {
//       const paymentStatus = verificationResponse.data.status;

//       // Check if the payment was successful
//       if (paymentStatus === 'successful') {
//         // Create the booking with the transaction ID and amount
//         const booking = new Booking({
//           ...bookingData,
//           transactionId: transactionId, // Store the transaction ID
//         });

//         await booking.save(); // Save the booking with the transaction ID
//         console.log("Booking saved:", booking);

//         return res.status(200).json({ success: true, data: booking });
//       } else {
//         console.error("Payment verification failed:", verificationResponse);
//         return res.status(400).json({ success: false, message: 'Payment not successful', data: verificationResponse });
//       }
//     } else {
//       return res.status(400).json({ success: false, message: 'Invalid verification response', data: verificationResponse });
//     }
//   } catch (error) {
//     console.error('Error during payment verification:', error.message);
//     return res.status(500).json({ success: false, message: 'Verification failed', error: error.message });
//   }
// };

// // Function to verify transaction status
// const verifyTransaction = async (transactionId) => {
//   try {
//     const response = await axios.get(
//       `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
//       {
//         headers: {
//           Authorization: `Bearer ${flutterwaveSecretKey}`,
//         },
//       }
//     );

//     console.log("Transaction verification response:", response.data);
//     return response.data; // Return the response data for further checks
//   } catch (error) {
//     console.error('Error during transaction verification:', error.message);
//     throw new Error('Verification of transaction failed');
//   }
// };

// // Function to refund payment
// export const refundPayment = async (booking) => {
//   try {
//     console.log(`Processing refund for booking ID: ${booking.bookingId}`);

//     // Ensure amount is defined before proceeding
//     if (!booking.amount) {
//       throw new Error('Amount is required for refund.');
//     }

//     // Fetch transaction details first
//     const transactionStatus = await fetchTransactionStatus(booking.transactionId);
    
//     if (transactionStatus && transactionStatus.data) {
//       const tx_ref = transactionStatus.data.tx_ref; // Use the tx_ref here

//       // Prepare refund request using the settled amount
//       const refundData = {
//         amount: transactionStatus.data.amount_settled, // Use the settled amount
//         reference: tx_ref, // Use the transaction reference
//       };
//       console.log('Refund request data:', refundData);

//       // Now send the refund request
//       const refundResponse = await axios.post(
//         `https://api.flutterwave.com/v3/transactions/${booking.transactionId}/refund`,
//         refundData,
//         {
//           headers: {
//             Authorization: `Bearer ${flutterwaveSecretKey}`,
//           },
//         }
//       );

//       console.log('Refund successful:', refundResponse.data);
//       return refundResponse.data;
//     } else {
//       console.error('Transaction not successful:', transactionStatus);
//       throw new Error('Cannot process refund, transaction was not successful.');
//     }
//   } catch (error) {
//     console.error('Error processing refund:', error);
//     if (error.response) {
//       console.error('Error response data:', error.response.data);
//       throw new Error(`Refund failed: ${error.response.data.message || error.message}`);
//     } else {
//       console.error('Unexpected error:', error.message);
//       throw new Error('Refund failed');
//     }
//   }
// };




// // 💚
// import axios from 'axios';
// import { flutterwaveSecretKey } from '../config/env.js'; 
// import Booking from '../models/Booking.js';

// // Verify Payment
// export const verifyPayment = async (req, res) => {
//   const { transactionId, bookingData } = req.body; // Ensure bookingData includes transactionId

//   // Check if amount is present in bookingData
//   if (!bookingData.amount) {
//     return res.status(400).json({ success: false, message: 'Amount is required in booking data' });
//   }

//   try {
//     // Verify the payment with Flutterwave
//     const response = await axios.get(
//       `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
//       {
//         headers: {
//           Authorization: `Bearer ${flutterwaveSecretKey}`,
//         },
//       }
//     );
//     console.log("Verification response:", response.data);

//     // Check if the payment was successful
//     if (response.data.status === 'successful') {
//       // Create the booking with the transaction ID and amount
//       const booking = new Booking({
//         ...bookingData,
//         transactionId: transactionId, // Store the transaction ID
//       });

//       await booking.save(); // Save the booking with the transaction ID
//       console.log("Booking saved:", booking); // Log the booking details

//       // Send success response
//       return res.status(200).json({ success: true, data: booking });
//     } else {
//       console.error("Payment verification failed:", response.data);
//       return res.status(400).json({ success: false, message: 'Payment not successful', data: response.data });
//     }
//   } catch (error) {
//     console.error('Error during payment verification:', error.message);
//     return res.status(500).json({ success: false, message: 'Verification failed', error: error.message });
//   }
// };

// // Check Transaction Status (used before processing refunds)
// export const checkTransactionStatus = async (transactionId) => {
//   try {
//     // Call Flutterwave API to get transaction details
//     const response = await axios.get(
//       `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
//       {
//         headers: {
//           Authorization: `Bearer ${flutterwaveSecretKey}`,
//         },
//       }
//     );

//     // Log the full response for debugging
//     console.log("Transaction status response:", response.data); 

//     const transactionStatus = response.data.data.status;
//     console.log(`Transaction status for ${transactionId}:`, transactionStatus);

//     // Check if the transaction is successful (settled)
//     return transactionStatus === 'successful';
//   } catch (error) {
//     console.error('Error checking transaction status:', error.message);
//     throw new Error('Failed to verify transaction status');
//   }
// };




// import axios from 'axios';
// import { flutterwaveSecretKey } from '../config/env.js'; 
// import Booking from '../models/Booking.js';

// // Verify Payment
// export const verifyPayment = async (req, res) => {
//   const { transactionId, bookingData } = req.body; // Ensure bookingData includes transactionId
//   try {
//     // Verify the payment with Flutterwave
//     const response = await axios.get(
//       `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
//       {
//         headers: {
//           Authorization: `Bearer ${flutterwaveSecretKey}`,
//         },
//       }
//     );
//     console.log("Verification response:", response.data);

//     // Check if the payment was successful
//     if (response.data.status === 'successful') {
//       // Create the booking with the transaction ID
//       const booking = new Booking({
//         ...bookingData,
//         transactionId: transactionId, // Store the transaction ID
//       });

//       await booking.save(); // Save the booking with the transaction ID

//       // Send success response
//       return res.status(200).json({ success: true, data: booking });
//     } else {
//       console.error("Payment verification failed:", response.data);
//       return res.status(400).json({ success: false, message: 'Payment not successful', data: response.data });
//     }
//   } catch (error) {
//     return res.status(500).json({ success: false, message: 'Verification failed', error });
//   }
// };

// // Check Transaction Status (used before processing refunds)
// export const checkTransactionStatus = async (transactionId) => {
//   try {
//     // Call Flutterwave API to get transaction details
//     const response = await axios.get(
//       `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
//       {
//         headers: {
//           Authorization: `Bearer ${flutterwaveSecretKey}`,
//         },
//       }
//     );

//     // Log the full response for debugging
//     console.log("Transaction status response:", response.data); 

//     const transactionStatus = response.data.data.status;
//     console.log(`Transaction status for ${transactionId}:`, transactionStatus);

//     // Check if the transaction is successful (settled)
//     return transactionStatus === 'successful';
//   } catch (error) {
//     console.error('Error checking transaction status:', error.message);
//     throw new Error('Failed to verify transaction status');
//   }
// };
// // Refund Payment (with transaction status check)
// export const refundPayment = async (booking) => {
//   try {
//     console.log(`Processing refund for booking ID: ${booking.bookingId}`);

//     // Check if the transaction is settled before refunding
//     const isTransactionSettled = await checkTransactionStatus(booking.transactionId);
//     if (!isTransactionSettled) {
//       throw new Error('Transaction is not settled, cannot process refund.');
//     }

//     // Prepare refund request
//     const refundData = {
//       amount: booking.amount, // Amount to refund
//       reference: booking.bookingId, // Use the booking ID as reference
//     };
//     console.log('Refund request data:', refundData); // Log refund data

//     // Proceed with the refund if settled
//     const refundResponse = await axios.post(
//       `https://api.flutterwave.com/v3/transactions/${booking.transactionId}/refund`,
//       refundData,
//       {
//         headers: {
//           Authorization: `Bearer ${flutterwaveSecretKey}`,
//         },
//       }
//     );

//     console.log('Refund successful:', refundResponse.data);
//     return refundResponse.data;
//   } catch (error) {
//     // Enhanced logging
//     console.error('Error processing refund:', error);
//     if (error.response) {
//       console.error('Error response data:', error.response.data);
//       throw new Error(`Refund failed: ${error.response.data.message || error.message}`);
//     } else {
//       console.error('Unexpected error:', error.message);
//       throw new Error('Refund failed');
//     }
//   }
// };



//💚
// import axios from 'axios';
// import { flutterwaveSecretKey } from '../config/env.js'; 
// import Booking from '../models/Booking.js';

// // Verify Payment
// export const verifyPayment = async (req, res) => {
//   const { transactionId, bookingData } = req.body; // Ensure bookingData includes transactionId
//   try {
//     // Verify the payment with Flutterwave
//     const response = await axios.get(
//       `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
//       {
//         headers: {
//           Authorization: `Bearer ${flutterwaveSecretKey}`,
//         },
//       }
//     );
//     console.log("Verification response:", response.data);

//     // Check if the payment was successful
//     if (response.data.status === 'successful') {
//       // Create the booking with the transaction ID
//       const booking = new Booking({
//         ...bookingData,
//         transactionId: transactionId, // Store the transaction ID
//       });

//       await booking.save(); // Save the booking with the transaction ID

//       // Send success response
//       return res.status(200).json({ success: true, data: booking });
//     } else {
//       console.error("Payment verification failed:", response.data);
//       return res.status(400).json({ success: false, message: 'Payment not successful', data: response.data });
//     }
//   } catch (error) {
//     return res.status(500).json({ success: false, message: 'Verification failed', error });
//   }
// };



// // Check Transaction Status (used before processing refunds)
// export const checkTransactionStatus = async (transactionId) => {
//   try {
//     // Call Flutterwave API to get transaction details
//     const response = await axios.get(
//       `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
//       {
//         headers: {
//           Authorization: `Bearer ${flutterwaveSecretKey}`,
//         },
//       }
//     );

//     // Log the full response for debugging
//     console.log("Transaction status response:", response.data); 

//     const transactionStatus = response.data.data.status;
//     console.log(`Transaction status for ${transactionId}:`, transactionStatus);

//     // Check if the transaction is settled
//     return transactionStatus === 'settled';
//   } catch (error) {
//     console.error('Error checking transaction status:', error.message);
//     throw new Error('Failed to verify transaction status');
//   }
// };


// // Refund Payment (with transaction status check)
// export const refundPayment = async (booking) => {
//   try {
//     console.log(`Processing refund for booking ID: ${booking.bookingId}`);

//     // Check if the transaction is settled before refunding
//     const isTransactionSettled = await checkTransactionStatus(booking.transactionId);
//     if (!isTransactionSettled) {
//       throw new Error('Transaction is not settled, cannot process refund.');
//     }

//     // Proceed with the refund if settled
//     const refundResponse = await axios.post(
//       `https://api.flutterwave.com/v3/transactions/${booking.transactionId}/refund`,
//       {
//         amount: booking.amount, // Amount to refund
//         reference: booking.bookingId, // Use the booking ID as reference
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${flutterwaveSecretKey}`,
//         },
//       }
//     );

//     console.log('Refund successful:', refundResponse.data);
//     return refundResponse.data;
//   } catch (error) {
//     console.error('Error processing refund:', error.response ? error.response.data : error);
//     throw new Error('Refund failed');
//   }
// };









// main files working below 

// // controllers/paymentController.js
// import axios from 'axios';
// import { flutterwaveSecretKey } from '../config/env.js'; 
// import Booking from '../models/Booking.js';


// export const verifyPayment = async (req, res) => {
//   const { transactionId, bookingData } = req.body; // Ensure bookingData includes transactionId
//   try {
//     // Verify the payment with Flutterwave
//     const response = await axios.get(
//       `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
//       {
//         headers: {
//           Authorization: `Bearer ${flutterwaveSecretKey}`,
//         },
//       }
//     );
//     console.log("Verification response:", response.data);

//     // Check if the payment was successful
//     if (response.data.status === 'successful') {
//       // Add transactionId to bookingData before creating the booking
//       const booking = new Booking({
//         ...bookingData,
//         transactionId: transactionId, // Store the transaction ID
//         // You can add other relevant data as needed
//       });

//       await booking.save(); // Save the booking with the transaction ID

//       // Send success response
//       return res.status(200).json({ success: true, data: booking });
//     } else {
//       console.error("Payment verification failed:", response.data);
//       return res.status(400).json({ success: false, message: 'Payment not successful', data: response.data });
//     }
//   } catch (error) {
//     return res.status(500).json({ success: false, message: 'Verification failed', error });
//   }
// };



// export const refundPayment = async (booking) => {
//   try {
//     console.log(`Refunding payment for booking ID: ${booking.bookingId}`);

//     const refundResponse = await axios.post(
//       `https://api.flutterwave.com/v3/transactions/${booking.transactionId}/refund`,
//       {
//         amount: booking.amount, // Amount to refund
//         reference: booking.bookingId // Use the booking ID or a custom reference
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${flutterwaveSecretKey}`,
//         },
//       }
//     );

//     console.log('Refund successful:', refundResponse.data);
//     return refundResponse.data; // Return the response to the calling function
//   } catch (error) {
//     console.error('Error processing refund:', error.response ? error.response.data : error);
//     throw new Error('Refund failed'); // Throwing an error will be caught in the calling function
//   }
// };





//not good


// // Verify the payment and create a booking

// export const verifyPayment = async (req, res) => {
//   const { transactionId, bookingData } = req.body; // Ensure bookingData is passed in the request
//   try {
//     // Verify the payment
//     const response = await axios.get(
//       `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
//       {
//         headers: {
//           Authorization: `Bearer ${flutterwaveSecretKey}`,
//         },
//       }
//     );
//     console.log("Verification response:", response.data);

//     // Check if the payment was successful
//     if (response.data.status === 'successful') {
//       // Create the booking
//       const booking = new Booking(bookingData); 
//       await booking.save();

//       // Send success response
//       return res.status(200).json({ success: true, data: booking });
//     } else {
//       console.error("Payment verification failed:", response.data);
//       return res.status(400).json({ success: false, message: 'Payment not successful', data: response.data });
//     }
//   } catch (error) {
//     console.error("Verification error:", error);
//     return res.status(500).json({ success: false, message: 'Verification failed', error: error.message });
//   }
// };









// working 


// import axios from 'axios';
// import { flutterwaveSecretKey } from '../config/env.js'; 
// import Booking from '../models/Booking.js';

// // Verify the payment and create a booking
// export const verifyPayment = async (req, res) => {
//   const { transactionId, bookingData } = req.body; // Ensure bookingData is passed in the request
//   try {
//     // Verify the payment
//     const response = await axios.get(
//       `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
//       {
//         headers: {
//           Authorization: `Bearer ${flutterwaveSecretKey}`,
//         },
//       }
//     );
//     console.log("Verification response:", response.data);

//     // Check if the payment was successful
//     if (response.data.status === 'successful') {
//       //  Create the booking
//       const booking = new Booking(bookingData); 
//       await booking.save();

//       // Send success response
//       return res.status(200).json({ success: true, data: booking });
//     } else {
//       console.error("Payment verification failed:", response.data);
//       return res.status(400).json({ success: false, message: 'Payment not successful', data: response.data });
//     }
//   } catch (error) {
//     return res.status(500).json({ success: false, message: 'Verification failed', error });
//   }
// };



// // Refund the payment
// export const refundPayment = async (booking) => {
//   try {
//     console.log(`Refunding payment for booking ID: ${booking.bookingId}`);

//     const refundResponse = await axios.post(
//       `https://api.flutterwave.com/v3/transactions/${booking.transactionId}/refund`,
//       {
//         amount: booking.amount, // Amount to refund
//         reference: booking.bookingId // You can add a reference or use a custom one
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${flutterwaveSecretKey}`,
//         },
//       }
//     );

//     console.log('Refund successful:', refundResponse.data);
//     return refundResponse.data;
//   } catch (error) {
//     console.error('Error processing refund:', error.response ? error.response.data : error);
//     throw new Error('Refund failed');
//   }
// };

