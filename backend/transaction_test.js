
// Helper function to verify the transaction with Flutterwave
const verifyTransaction = async (transactionId) => {
    try {
        // Access Flutterwave secret key from environment variables
        const flutterwaveSecretKey = process.env.FLW_SECRET_KEY;

        // Ensure the secret key is defined
        if (!flutterwaveSecretKey) {
            throw new Error('Flutterwave secret key is not defined. Check your .env file.');
        }

        // Make the API call to Flutterwave to verify the transaction
        const response = await axios.get(`https://api.flutterwave.com/v3/transactions/${transactionId}/verify`, {
            headers: {
                Authorization: `Bearer ${flutterwaveSecretKey}`,
            },
        });

        // Return transaction data, including the settled amount
        return response.data.data;
    } catch (error) {
        console.error('Error verifying transaction:', error.message);
        throw new Error('Transaction verification failed');
    }
};




const processRefund = async (transactionId, refundAmount, flwRef, currency) => {
    try {
        const flutterwaveSecretKey = process.env.FLW_SECRET_KEY;

        if (!flutterwaveSecretKey) {
            throw new Error('Flutterwave secret key is not defined. Check your .env file.');
        }

        const response = await axios.post(`https://api.flutterwave.com/v3/refunds`, {
            transaction_id: transactionId,
            amount: refundAmount,
            flw_ref: flwRef, // Use the provided flw_ref
            currency: currency // Include currency in the payload
        }, {
            headers: {
                Authorization: `Bearer ${flutterwaveSecretKey}`,
            },
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error processing refund:', error.response.data);
            throw new Error(`Refund processing failed: ${error.response.data.message || error.message}`);
        } else {
            console.error('Error processing refund:', error.message);
            throw new Error('Refund processing failed');
        }
    }
};





// Function to update booking status and process refund if canceled
export const updateBookingStatus = async (req, res) => {
    const { bookingId } = req.params; // Assuming bookingId is passed as a URL parameter
    const { status } = req.body; // Status can be 'Pending', 'Confirmed', 'Completed', or 'Cancelled'

    try {
        // Step 1: Find the booking by bookingId
        const booking = await Booking.findOne({ bookingId });

        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }


 
        //Adjustment point 

        // Step 2: Handle status updates
        if (status === 'Cancelled') {
            // Step 3: Verify the transaction with Flutterwave
            const transactionData = await verifyTransaction(booking.transactionId);

            // Step 4: Check if the transaction is successful and settled
            if (transactionData.status !== 'successful') {
                return res.status(400).json({ error: 'Transaction is not settled. Refund cannot be processed.' });
            }

            // Step 5: Process the refund using the flw_ref and currency from the booking
            const settledAmount = booking.settledAmount;
            const flwRef = booking.flw_ref; // Get the flw_ref from the booking
            const currency = booking.currency; // Get the currency from the booking

            const refundResponse = await processRefund(booking.transactionId, settledAmount, flwRef, currency);

            // Update booking status to 'Cancelled'
            booking.status = 'Cancelled';
            await booking.save();




            //Area not needed for change

            // Step 6: Send email notification about cancellation
            await sendBookingStatusEmail(booking.email, bookingId, 'Cancelled'); // Adjust parameters as necessary




            // Step 7: Return the updated booking and refund response
            return res.status(200).json({
                message: 'Booking canceled and refund processed successfully',
                booking,
                refund: refundResponse,
            });




        } else if (status === 'Confirmed') {
            // Step 8: Update booking status to 'Confirmed'
            booking.status = 'Confirmed'; // Update status to Confirmed
            await booking.save();

            // Step 9: Send email notification about confirmation
            await sendBookingStatusEmail(booking.email, bookingId, 'Confirmed'); // Adjust parameters as necessary

            // Step 10: Return the updated booking
            return res.status(200).json({
                message: 'Booking confirmed successfully',
                booking,
            });
        } else if (['Pending', 'Completed'].includes(status)) {
            // Step 11: Update booking status for other states without sending email
            booking.status = status; // Update status to the provided status
            await booking.save();

            // Step 12: Return the updated booking
            return res.status(200).json({
                message: 'Booking status updated successfully',
                booking,
            });
        } else {
            return res.status(400).json({ error: 'Invalid status provided. Allowed statuses are: Pending, Confirmed, Completed, Cancelled.' });
        }
    } catch (error) {
        console.error('Error updating booking status or processing refund:', error.message);
        return res.status(500).json({ error: error.message || 'An unexpected error occurred while updating booking status or processing the refund.' });
    }
};







// create booking samoles

// export const createBooking = async (req, res) => {
//     const {
//         date,
//         timeRange,
//         name,
//         email,
//         phone,
//         services,
//         extraServices,
//         location // Ensure this is structured correctly
//     } = req.body;

//     // Validate timeRange
//     if (!timeRange || !timeRange.from || !timeRange.to) {
//         return res.status(400).json({ error: 'Time range is required' });
//     }

//     // Validate location coordinates
//     if (!location || location.type !== 'Point' || 
//         !Array.isArray(location.coordinates) || 
//         location.coordinates.length !== 2 || 
//         typeof location.coordinates[0] !== 'number' || 
//         typeof location.coordinates[1] !== 'number') {
        
//         // Log the incorrect location to the console for debugging
//         console.error('Invalid location received:', location);
        
//         return res.status(400).json({ error: 'Invalid location coordinates' });
//     }

//     try {
//         const formattedServiceDate = validateAndFormatDate(date); // Date of the service
//         const bookingDate = new Date().toISOString().split('T')[0]; // Booking received date

//         // Generate a customized booking ID (e.g., "AVID001")
//         const bookingCount = await Booking.countDocuments(); // Get total number of bookings
//         const bookingId = `AVID${String(bookingCount + 1).padStart(3, '0')}`;

//         // Create a new booking with the status "Pending"
//         const newBooking = new Booking({
//             name,
//             email,
//             phone,
//             services,
//             extraServices: extraServices || false,
//             location: {
//                 type: location.type, // 'Point'
//                 coordinates: location.coordinates // [lng, lat]
//             },
//             date: formattedServiceDate, // "YYYY-MM-DD" (service date)
//             bookingDate: bookingDate, // "YYYY-MM-DD" (date booking was received)
//             timeRange: {
//                 from: { ...timeRange.from },
//                 to: { ...timeRange.to }
//             },
//             status: 'Pending', // Default status
//             bookingId, // Customized Booking ID
//         });

//         // Save the booking to the database
//         await newBooking.save();

//         // Send confirmation email
//         await sendBookingEmail(newBooking);

//         return res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
//     } catch (error) {
//         console.error('Error creating booking:', error);
//         return res.status(500).json({ error: error.message || 'Error creating booking' });
//     }
// };

// // Helper function to validate and format date
// function validateAndFormatDate(dateString) {
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) throw new Error('Invalid date format');
//     return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
// }





//💙

// export const createBooking = async (req, res) => {
//     const {
//         date,
//         timeRange,
//         name,
//         email,
//         phone,
//         services,
//         extraServices,
//         location, 
//         transactionId, 
//         amount
//     } = req.body;

//     // Validate timeRange
//     if (!timeRange || !timeRange.from || !timeRange.to) {
//         return res.status(400).json({ error: 'Time range is required' });
//     }

//     // Validate location coordinates
//     if (!location || location.type !== 'Point' || 
//         !Array.isArray(location.coordinates) || 
//         location.coordinates.length !== 2 || 
//         typeof location.coordinates[0] !== 'number' || 
//         typeof location.coordinates[1] !== 'number') {
        
//         // Log the incorrect location to the console for debugging
//         console.error('Invalid location received:', location);
        
//         return res.status(400).json({ error: 'Invalid location coordinates' });
//     }

//     // Validate amount
//     if (amount == null || typeof amount !== 'number') {
//         return res.status(400).json({ error: 'Amount is required and must be a number' });
//     }

//     try {
//         const formattedServiceDate = validateAndFormatDate(date); // Date of the service
//         const bookingDate = new Date().toISOString().split('T')[0]; // Booking received date

//         // Generate a customized booking ID (e.g., "AVID001")
//         const bookingCount = await Booking.countDocuments(); // Get total number of bookings
//         const bookingId = `AVID${String(bookingCount + 1).padStart(3, '0')}`;

//         // Create a new booking with the status "Pending"
//         const newBooking = new Booking({
//             name,
//             email,
//             phone,
//             services,
//             extraServices: extraServices || false,
//             location: {
//                 type: location.type, // 'Point'
//                 coordinates: location.coordinates // [lng, lat]
//             },
//             date: formattedServiceDate, // "YYYY-MM-DD" (service date)
//             bookingDate: bookingDate, // "YYYY-MM-DD" (date booking was received)
//             timeRange: {
//                 from: { ...timeRange.from },
//                 to: { ...timeRange.to }
//             },
//             status: 'Pending', // Default status
//             bookingId, // Customized Booking ID
//             transactionId: transactionId, // Save the transaction ID here
//             amount // Save the amount here
//         });

//         // Save the booking to the database
//         await newBooking.save();

//         // Send confirmation email
//         await sendBookingEmail(newBooking);

//         return res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
//     } catch (error) {
//         console.error('Error creating booking:', error);
//         return res.status(500).json({ error: error.message || 'Error creating booking' });
//     }
// };



//1 


//🧡
// // Helper function to verify the transaction with Flutterwave
// const verifyTransaction = async (transactionId) => {
//     try {
//         // Access Flutterwave secret key from environment variables
//         const flutterwaveSecretKey = process.env.FLW_SECRET_KEY;

//         // Ensure the secret key is defined
//         if (!flutterwaveSecretKey) {
//             throw new Error('Flutterwave secret key is not defined. Check your .env file.');
//         }

//         // Make the API call to Flutterwave to verify the transaction
//         const response = await axios.get(`https://api.flutterwave.com/v3/transactions/${transactionId}/verify`, {
//             headers: {
//                 Authorization: `Bearer ${flutterwaveSecretKey}`,
//             },
//         });

//         // Return transaction data, including the settled amount
//         return response.data.data;
//     } catch (error) {
//         console.error('Error verifying transaction:', error.message);
//         throw new Error('Transaction verification failed');
//     }
// };


// export const createBooking = async (req, res) => {
//     const {
//         date,
//         timeRange,
//         name,
//         email,
//         phone,
//         services,
//         extraServices,
//         location,
//         transactionId,
//         amount,
//         settledAmount,
//         paymentType
//     } = req.body;

//     // Validate timeRange
//     if (!timeRange || !timeRange.from || !timeRange.to) {
//         return res.status(400).json({ error: 'Time range is required' });
//     }

//     // Validate location coordinates
//     if (!location || location.type !== 'Point' || 
//         !Array.isArray(location.coordinates) || 
//         location.coordinates.length !== 2 || 
//         typeof location.coordinates[0] !== 'number' || 
//         typeof location.coordinates[1] !== 'number') {
//         console.error('Invalid location received:', location);
//         return res.status(400).json({ error: 'Invalid location coordinates' });
//     }

//     // Validate amount
//     if (amount == null || typeof amount !== 'number') {
//         return res.status(400).json({ error: 'Amount is required and must be a number' });
//     }

//     try {
//         // Step 1: Verify the transaction with Flutterwave
//         const transactionData = await verifyTransaction(transactionId);
//         console.log("Transaction Data:", transactionData);

//         // Step 2: Check if the transaction was successful
//         if (transactionData.status !== 'successful') {
//             return res.status(400).json({ error: 'Payment verification failed' });
//         }

//         // Step 3: Extract payment type and settled amount from transaction
//         const paymentType = transactionData.payment_type || 'unknown';
//         const settledAmount = transactionData.amount_settled || 0;
//         console.log(`Payment Type: ${paymentType}, Settled Amount: ${settledAmount} NGN`);

//         // Step 4: Create a formatted service date and booking ID
//         const formattedServiceDate = validateAndFormatDate(date);
//         const bookingDate = new Date().toISOString().split('T')[0];
//         const bookingCount = await Booking.countDocuments();
//         const bookingId = `AVID${String(bookingCount + 1).padStart(3, '0')}`;

//         // Step 5: Create a new booking object
//         const newBooking = new Booking({
//             name,
//             email,
//             phone,
//             services,
//             extraServices: extraServices || false,
//             location: {
//                 type: location.type,
//                 coordinates: location.coordinates
//             },
//             date: formattedServiceDate,
//             bookingDate,
//             timeRange: {
//                 from: { ...timeRange.from },
//                 to: { ...timeRange.to }
//             },
//             status: 'Pending',
//             bookingId,
//             transactionId,
//             amount,
//             settledAmount,
//             paymentType
//         });

//         console.log("New Booking Object:", newBooking);

//         // Step 6: Save the booking to the database
//         await newBooking.save();

//         // Step 7: Send a confirmation email to the user
//         await sendBookingEmail(newBooking);

//         // Return a success response
//         return res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
//     } catch (error) {
//         console.error('Error creating booking:', error);
//         return res.status(500).json({ error: error.message || 'Error creating booking' });
//     }
// };



//working above








// export const updateBookingStatus = async (req, res) => {
//     const { bookingId } = req.params; // Extract bookingId from URL parameters
//     const { status } = req.body; // Extract status from the request body
  
//     try {
//       // Find the booking by bookingId
//       const booking = await Booking.findOne({ bookingId });
//       if (!booking) return res.status(404).json({ error: 'Booking not found' });
  
//       booking.status = status; // Update the status of the booking
  
//       // If booking is cancelled, check transaction status and process the refund
//       if (status === 'Cancelled') {
//         if (!booking.transactionId) {
//           return res.status(400).json({ error: 'No transaction ID available for refund' });
//         }
  
//         try {
//           console.log('Checking transaction status before refund...');
//           const isSettled = await checkTransactionStatus(booking.transactionId); // Check if the transaction is settled
//           if (!isSettled) {
//             return res.status(400).json({ error: 'Transaction not settled, refund cannot be processed' });
//           }
  
//           console.log('Processing refund for booking...');
//           const refundResult = await refundPayment(booking); // Make sure refundPayment is implemented correctly
//           console.log('Refund processed:', refundResult);
//         } catch (error) {
//           console.error('Error processing refund:', error);
//           return res.status(500).json({ error: 'Error processing refund' });
//         }
//       }
  
//       // Save the updated booking
//       await booking.save();
//       res.status(200).json({ message: 'Booking status updated', booking });
//     } catch (error) {
//       console.error('Error updating booking status:', error);
//       res.status(500).json({ error: 'Error updating booking status' });
//     }
//   };






// // //❤️2

// export const updateBookingStatus = async (req, res) => {
//     const { bookingId } = req.params;
//     const { status, amount } = req.body;

//     try {
//         // Fetch the booking using the provided bookingId
//         const booking = await Booking.findOne({ bookingId });
//         if (!booking) {
//             return res.status(404).json({ error: 'Booking not found' });
//         }

//         console.log('Original booking details:', booking);

//         // Ensure the booking has an associated email before proceeding
//         if (!booking.email) {
//             return res.status(400).json({ error: 'No email associated with this booking' });
//         }

//         // Ensure the status provided is valid before updating
//         const validStatuses = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];
//         if (!status || !validStatuses.includes(status)) {
//             return res.status(400).json({ error: 'Invalid or missing status value' });
//         }

//         // Update the booking status and amount if provided
//         booking.status = status; // Set the status from req.body
//         if (amount !== undefined) {
//             booking.amount = amount; // Set the amount if provided
//         }

//         console.log('Updated booking status before save:', booking.status);

//         // If the status is 'Cancelled', attempt to process a refund
//         if (status === 'Cancelled') {
//             if (!booking.transactionId) {
//                 return res.status(400).json({ error: 'No transaction ID available for refund' });
//             }
//             try {
//                 // Check if the transaction has been settled before processing the refund
//                 const isSettled = await checkTransactionStatus(booking.transactionId);
//                 if (!isSettled) {
//                     return res.status(400).json({ error: 'Transaction not settled, refund cannot be processed' });
//                 }

//                 // Process the refund
//                 const refundResult = await refundPayment(booking);
//                 console.log('Refund processed successfully:', refundResult);
//             } catch (error) {
//                 console.error('Error processing refund:', error);
//                 return res.status(500).json({ error: 'Error processing refund' });
//             }
//         }

//         // Save the updated booking in the database
//         await booking.save();
//         console.log('Saved booking with updated status:', booking.status);

//         // Send an email to the customer only if the status is 'Confirmed' or 'Cancelled'
//         if (status === 'Confirmed' || status === 'Cancelled') {
//             await sendBookingStatusEmail(booking.email, booking.bookingId, status);
//             console.log(`Booking status email sent to ${booking.email}`);
//         }

//         // Respond with the updated booking details
//         res.status(200).json({ message: 'Booking status updated', booking });

//     } catch (error) {
//         console.error('Error updating booking status:', error);
//         res.status(500).json({ error: 'Error updating booking status' });
//     }
// };













// main one working below main work 

// export const updateBookingStatus = async (req, res) => {
//   const { bookingId } = req.params; // Extract bookingId from URL parameters
//   const { status } = req.body; // Extract status from the request body

//   try {
//     // Find the booking by bookingId
//     const booking = await Booking.findOne({ bookingId });
//     if (!booking) return res.status(404).json({ error: 'Booking not found' });

//     booking.status = status; // Update the status of the booking

//     // If booking is cancelled, process the refund
//     if (status === 'Cancelled') {
//       if (!booking.transactionId) {
//         return res.status(400).json({ error: 'No transaction ID available for refund' });
//       }

//       try {
//         console.log('Processing refund for booking...');
//         const refundResult = await refundPayment(booking); // Make sure refundPayment is implemented correctly
//         console.log('Refund processed:', refundResult);
//       } catch (error) {
//         console.error('Error processing refund:', error);
//         return res.status(500).json({ error: 'Error processing refund' });
//       }
//     }

//     // Save the updated booking
//     await booking.save();
//     res.status(200).json({ message: 'Booking status updated', booking });
//   } catch (error) {
//     console.error('Error updating booking status:', error);
//     res.status(500).json({ error: 'Error updating booking status' });
//   }
// };

















// // Define the function to check transaction status
// const checkTransactionStatus = async (transactionId) => {
//     const transactionStatus = await fetchTransactionStatus(transactionId);
//     if (transactionStatus && transactionStatus.data) {
//         return transactionStatus.data; // Return the data object directly
//     } else {
//         throw new Error('Transaction status not found'); // Handle error
//     }
// };


// export const updateBookingStatus = async (req, res) => {
//     const { bookingId } = req.params;
//     const { status, amount } = req.body;

//     try {
//         // Fetch the booking using the provided bookingId
//         const booking = await Booking.findOne({ bookingId });
//         if (!booking) {
//             return res.status(404).json({ error: 'Booking not found' });
//         }

//         console.log('Original booking details:', booking);

//         // Ensure the booking has an associated email
//         if (!booking.email) {
//             return res.status(400).json({ error: 'No email associated with this booking' });
//         }

//         // Validate the provided status
//         const validStatuses = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];
//         if (!status || !validStatuses.includes(status)) {
//             return res.status(400).json({ error: 'Invalid or missing status value' });
//         }

//         // Update the booking status and amount if provided
//         booking.status = status;
//         if (amount !== undefined) {
//             booking.amount = amount;
//         }

//         console.log('Updated booking status before save:', booking.status);

//         // Handle cancellation and potential refunds
//         if (status === 'Cancelled') {
//             if (!booking.transactionId) {
//                 return res.status(400).json({ error: 'No transaction ID available for refund' });
//             }

//             try {
//                 // Fetch the transaction status
//                 const transactionStatus = await checkTransactionStatus(booking.transactionId);
//                 console.log("Fetched transaction status data:", transactionStatus);

//                 // Debug full response to ensure data is structured as expected
//         console.log("Full transaction status response:", JSON.stringify(transactionStatus, null, 2));

//         // Log to see if 'data' exists
//         console.log("Transaction status data:", JSON.stringify(transactionStatus?.data, null, 2));
                
//                 // Check if the transaction is settled before processing the refund
//                 if (!transactionStatus) {
//                     return res.status(400).json({ error: 'Transaction not settled, refund cannot be processed' });
//                 }

//                 const amountSettled = transactionStatus?.data?.amount_settled;
//                 if (typeof amountSettled === 'undefined') {
//                     return res.status(400).json({ error: 'Transaction data or amount settled not found' });
//                 }

//                 // Prepare refund data
//                 const refundData = {
//                     amount: transactionStatus.data.amount_settled, // Use settled amount
//                     reference: transactionStatus.data.tx_ref, // Use the transaction reference
//                 };

//                 // Process the refund
//                 const refundResult = await refundPayment(refundData);
//                 console.log('Refund processed successfully:', refundResult);
                
//             } catch (error) {
//                 console.error('Error processing refund:', error);
//                 return res.status(500).json({ error: 'Error processing refund' });
//             }
//         }

//         // Save the updated booking in the database
//         await booking.save();
//         console.log('Saved booking with updated status:', booking.status);

//         // Send an email to the customer for 'Confirmed' or 'Cancelled' statuses
//         if (status === 'Confirmed' || status === 'Cancelled') {
//             await sendBookingStatusEmail(booking.email, booking.bookingId, status);
//             console.log(`Booking status email sent to ${booking.email}`);
//         }

//         // Respond with the updated booking details
//         return res.status(200).json({ message: 'Booking status updated', booking });
        
//     } catch (error) {
//         console.error('Error updating booking status:', error);
//         return res.status(500).json({ error: 'Error updating booking status' });
//     }
// };

//💚 4 above



// // Define the function to check transaction status
// const checkTransactionStatus = async (transactionId) => {
//     const transactionStatus = await fetchTransactionStatus(transactionId);
//     return transactionStatus.status === 'successful'; // Adjust based on actual API response
// };


// export const updateBookingStatus = async (req, res) => {
//     const { bookingId } = req.params;
//     const { status, amount } = req.body;

//     try {
//         // Fetch the booking using the provided bookingId
//         const booking = await Booking.findOne({ bookingId });
//         if (!booking) {
//             return res.status(404).json({ error: 'Booking not found' });
//         }

//         console.log('Original booking details:', booking);

//         // Ensure the booking has an associated email
//         if (!booking.email) {
//             return res.status(400).json({ error: 'No email associated with this booking' });
//         }

//         // Validate the provided status
//         const validStatuses = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];
//         if (!status || !validStatuses.includes(status)) {
//             return res.status(400).json({ error: 'Invalid or missing status value' });
//         }

//         // Update the booking status and amount if provided
//         booking.status = status;
//         if (amount !== undefined) {
//             booking.amount = amount;
//         }

//         console.log('Updated booking status before save:', booking.status);

//         // Handle cancellation and potential refunds
//         if (status === 'Cancelled') {
//             if (!booking.transactionId) {
//                 return res.status(400).json({ error: 'No transaction ID available for refund' });
//             }
//             try {
//                 // Check if the transaction is settled before processing the refund
//                 const isSettled = await checkTransactionStatus(booking.transactionId);
//                 if (!isSettled) {
//                     return res.status(400).json({ error: 'Transaction not settled, refund cannot be processed' });
//                 }

//                 // Process the refund
//                 const refundResult = await refundPayment(booking);
//                 console.log('Refund processed successfully:', refundResult);
//             } catch (error) {
//                 console.error('Error processing refund:', error);
//                 return res.status(500).json({ error: 'Error processing refund' });
//             }
//         }

//         // Save the updated booking in the database
//         await booking.save();
//         console.log('Saved booking with updated status:', booking.status);

//         // Send an email to the customer for 'Confirmed' or 'Cancelled' statuses
//         if (status === 'Confirmed' || status === 'Cancelled') {
//             await sendBookingStatusEmail(booking.email, booking.bookingId, status);
//             console.log(`Booking status email sent to ${booking.email}`);
//         }

//         // Respond with the updated booking details
//         return res.status(200).json({ message: 'Booking status updated', booking });
        
//     } catch (error) {
//         console.error('Error updating booking status:', error);
//         return res.status(500).json({ error: 'Error updating booking status' });
//     }
// };





// // Helper function to process a refund with Flutterwave
// const processRefund = async (transactionId, refundAmount) => {
//     try {
//         const flutterwaveSecretKey = process.env.FLW_SECRET_KEY;

//         if (!flutterwaveSecretKey) {
//             throw new Error('Flutterwave secret key is not defined. Check your .env file.');
//         }

//         const response = await axios.post(`https://api.flutterwave.com/v3/refunds`, {
//             transaction_id: transactionId,
//             amount: refundAmount,
//         }, {
//             headers: {
//                 Authorization: `Bearer ${flutterwaveSecretKey}`,
//             },
//         });

//         return response.data;
//     } catch (error) {
//         if (error.response) {
//             console.error('Error processing refund:', error.response.data); // More detailed error logging
//             throw new Error(`Refund processing failed: ${error.response.data.message || error.message}`);
//         } else {
//             console.error('Error processing refund:', error.message);
//             throw new Error('Refund processing failed');
//         }
//     }
// };



//ogo

// const processRefund = async (transactionId, refundAmount, flwRef, currency) => {
//     try {
//         const flutterwaveSecretKey = process.env.FLW_SECRET_KEY;

//         if (!flutterwaveSecretKey) {
//             throw new Error('Flutterwave secret key is not defined. Check your .env file.');
//         }

//         const payload = {
//             transaction_id: transactionId,
//             amount: refundAmount,
//             flw_ref: flwRef, // Use the flw_ref passed to the function
//             currency: currency // Include currency in the payload
//         };

//         console.log("Sending refund request:", payload); // Log the request payload

//         const response = await axios.post(`https://api.flutterwave.com/v3/refunds`, payload, {
//             headers: {
//                 Authorization: `Bearer ${flutterwaveSecretKey}`,
//             },
//         });

//         return response.data; // This should include a success status
//     } catch (error) {
//         if (error.response) {
//             console.error('Error processing refund:', error.response.data);
//             throw new Error(`Refund processing failed: ${error.response.data.message || error.message}`);
//         } else {
//             console.error('Error processing refund:', error.message);
//             throw new Error('Refund processing failed');
//         }
//     }
// };



//might come back soon


// // Function to update booking status and process refund if canceled
// export const updateBookingStatus = async (req, res) => {
//     const { bookingId } = req.params; // Assuming bookingId is passed as a URL parameter
//     const { status } = req.body; // Status can be 'Pending', 'Confirmed', 'Completed', or 'Cancelled'

//     try {
//         // Step 1: Find the booking by bookingId
//         const booking = await Booking.findOne({ bookingId });

//         if (!booking) {
//             return res.status(404).json({ error: 'Booking not found' });
//         }

//         // Step 2: Handle status updates
//         if (status === 'Cancelled') {
//             // Step 3: Verify the transaction with Flutterwave
//             const transactionData = await verifyTransaction(booking.transactionId);

//             // Step 4: Check if the transaction is successful and settled
//             if (transactionData.status !== 'successful') {
//                 return res.status(400).json({ error: 'Transaction is not settled. Refund cannot be processed.' });
//             }

//             // Step 5: Process the refund
//             const settledAmount = booking.settledAmount;
//             const refundResponse = await processRefund(booking.transactionId, settledAmount);

//             // Update booking status to 'Cancelled'
//             booking.status = 'Cancelled';
//             await booking.save();

//             // Step 6: Return the updated booking and refund response
//             return res.status(200).json({
//                 message: 'Booking canceled and refund processed successfully',
//                 booking,
//                 refund: refundResponse,
//             });
//         } else if (['Pending', 'Confirmed', 'Completed'].includes(status)) {
//             // Step 7: Update booking status for other states
//             booking.status = status; // Update status to the provided status
//             await booking.save();

//             // Step 8: Return the updated booking
//             return res.status(200).json({
//                 message: 'Booking status updated successfully',
//                 booking,
//             });
//         } else {
//             return res.status(400).json({ error: 'Invalid status provided. Allowed statuses are: Pending, Confirmed, Completed, Cancelled.' });
//         }
//     } catch (error) {
//         console.error('Error updating booking status or processing refund:', error.message);
//         return res.status(500).json({ error: error.message || 'An unexpected error occurred while updating booking status or processing the refund.' });
//     }
// };