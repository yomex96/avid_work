
import Booking from '../models/Booking.js';
import axios from 'axios';
import { sendBookingEmail, sendBookingStatusEmail } from '../config/nodemailer.js';
import BookingCounter from '../models/BookingCounter.js';

import dotenv from 'dotenv';


// import { refundPayment } from './paymentController.js';
// import { refundPayment, checkTransactionStatus } from './paymentController.js';

// import { refundPayment, fetchTransactionStatus} from './paymentController.js';

// import { refundPayment } from './paymentController.js';





// Function to convert 12-hour time to 24-hour format
const convertTo24Hour = (hour, period) => {
    hour = parseInt(hour, 10);
    if (period === 'PM' && hour < 12) {
      return hour + 12; // Convert PM to 24-hour
    }
    if (period === 'AM' && hour === 12) {
      return 0; // Convert 12 AM to 0 hours
    }
    return hour; // Return hour as is for AM or non-12 PM
  };


export const checkAvailability = async (req, res) => {
    const { date, timeRange } = req.body;

    // Validate timeRange
    if (!timeRange || !timeRange.from || !timeRange.to) {
        return res.status(400).json({ error: 'Time range is required' });
    }

    // Convert input time to 24-hour format
    const fromHour = convertTo24Hour(timeRange.from.hour, timeRange.from.period);
    const fromMinute = parseInt(timeRange.from.minute, 10);
    const toHour = convertTo24Hour(timeRange.to.hour, timeRange.to.period);
    const toMinute = parseInt(timeRange.to.minute, 10);

    try {
        
    
        const existingBookings = await Booking.find({
            date: date,
            $or: [
                {
                    // Condition 1: New booking starts before an existing booking ends
                    $and: [
                        { 'timeRange.from.hour': { $lt: toHour } }, 
                        { 'timeRange.to.hour': { $gt: fromHour } }, 
                        {
                            // Minute check for overlapping condition
                            $or: [
                                { 'timeRange.to.hour': { $ne: fromHour } }, 
                                {
                                    $and: [
                                        { 'timeRange.to.hour': { $eq: fromHour } },
                                        { 'timeRange.to.minute': { $gt: fromMinute } } 
                                    ]
                                }
                            ]
                        },
                        {
                            // Minute check for overlapping condition
                            $or: [
                                { 'timeRange.from.hour': { $ne: toHour } }, 
                                {
                                    $and: [
                                        { 'timeRange.from.hour': { $eq: toHour } },
                                        { 'timeRange.from.minute': { $lt: toMinute } } 
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    // Condition 2: New booking completely overlaps an existing booking
                    $and: [
                        { 'timeRange.from.hour': { $lte: fromHour } }, // Existing starts before or at new start
                        { 'timeRange.to.hour': { $gte: toHour } }, // Existing ends after or at new end
                        // Ensure minute conditions are satisfied
                        {
                            $or: [
                                { 'timeRange.from.hour': { $lt: fromHour } }, // Existing starts before new starts
                                { 'timeRange.from.minute': { $lte: fromMinute } } // Existing starts at or before new start minute
                            ]
                        },
                        {
                            $or: [
                                { 'timeRange.to.hour': { $gt: toHour } }, // Existing ends after new ends
                                { 'timeRange.to.minute': { $gte: toMinute } } // Existing ends at or after new end minute
                            ]
                        }
                    ]
                }
            ]
        });
    
        // If there are any overlapping bookings, return not available
        if (existingBookings.length > 0) {
            return res.status(200).json({ available: false });
        }
    
        // Otherwise, the time slot is available
        return res.status(200).json({ available: true });
    } catch (error) {
        console.error('Error checking availability:', error);
        return res.status(500).json({ error: 'Error checking availability' });
    }
    
};





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
//         paymentType,
//         flw_ref, // Add flw_ref to destructuring
//         currency // Add currency to destructuring
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

//     // Validate currency
//     if (!currency || typeof currency !== 'string') {
//         return res.status(400).json({ error: 'Currency is required and must be a string' });
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
//         console.log(`Payment Type: ${paymentType}, Settled Amount: ${settledAmount} ${currency}`);

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
//             paymentType,
//             flw_ref, // Add flw_ref here
//             currency // Add currency here
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

export const createBooking = async (req, res) => {
    const {
        date,
        timeRange,
        name,
        email,
        phone,
        services,
        extraServices,
        location,
        transactionId,
        amount,
        settledAmount,
        paymentType,
        flw_ref,
        currency
    } = req.body;

    // Validate timeRange
    if (!timeRange || !timeRange.from || !timeRange.to) {
        return res.status(400).json({ error: 'Time range is required' });
    }

    // Validate location coordinates
    if (!location || location.type !== 'Point' ||
        !Array.isArray(location.coordinates) ||
        location.coordinates.length !== 2 ||
        typeof location.coordinates[0] !== 'number' ||
        typeof location.coordinates[1] !== 'number') {
        console.error('Invalid location received:', location);
        return res.status(400).json({ error: 'Invalid location coordinates' });
    }

    // Validate amount
    if (amount == null || typeof amount !== 'number') {
        return res.status(400).json({ error: 'Amount is required and must be a number' });
    }

    // Validate currency
    if (!currency || typeof currency !== 'string') {
        return res.status(400).json({ error: 'Currency is required and must be a string' });
    }

    try {
        // Step 1: Verify the transaction with Flutterwave
        const transactionData = await verifyTransaction(transactionId);
        console.log("Transaction Data:", transactionData);

        // Step 2: Check if the transaction was successful
        if (transactionData.status !== 'successful') {
            return res.status(400).json({ error: 'Payment verification failed' });
        }

        // Step 3: Extract payment type and settled amount from transaction
        const paymentType = transactionData.payment_type || 'unknown';
        const settledAmount = transactionData.amount_settled || 0;
        console.log(`Payment Type: ${paymentType}, Settled Amount: ${settledAmount} ${currency}`);

        // Step 4: Format the service date and booking date
        const formattedServiceDate = validateAndFormatDate(date);
        const bookingDate = new Date().toISOString().split('T')[0];

        // Step 5: Retrieve and increment the booking counter
        let bookingCounter = await BookingCounter.findOne();
        if (!bookingCounter) {
            // If no counter exists, create one
            bookingCounter = new BookingCounter({ count: 0 });
        }
        bookingCounter.count += 1;
        await bookingCounter.save();

        // Generate bookingId
        const bookingId = `AVID${String(bookingCounter.count).padStart(3, '0')}`;

        // Step 6: Create the booking object
        const newBooking = new Booking({
            name,
            email,
            phone,
            services,
            extraServices: extraServices || "",
            location: {
                type: location.type,
                coordinates: location.coordinates
            },
            date: formattedServiceDate,
            bookingDate,
            timeRange: {
                from: { ...timeRange.from },
                to: { ...timeRange.to }
            },
            status: 'Pending',
            bookingId,  
            transactionId,
            amount,
            settledAmount,
            paymentType,
            flw_ref,
            currency
        });

        console.log("New Booking Object:", newBooking);

        // Step 7: Save the booking to the database
        await newBooking.save();

        // Step 8: Send a confirmation email to the user
        await sendBookingEmail(newBooking);

        // Return a success response
        return res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (error) {
        console.error('Error creating booking:', error);
        return res.status(500).json({ error: error.message || 'Error creating booking' });
    }
};




// Helper function to validate and format date
function validateAndFormatDate(dateString) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) throw new Error('Invalid date format');
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}


// ❤️ main one  very detailed to get all info

export const allgetBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
};

// export const getBookings = async (req, res) => {
//     try {
//         // Fetch all bookings
//         const bookings = await Booking.find();

//         // Map to extract only necessary fields for admin
//         const bookingsForAdmin = bookings.map(booking => ({
//             bookingId: booking.bookingId,
//             name: booking.name,
//             // services: booking.services.join(", "),  
//             // services: `${booking.services.join(", ")}${booking.extraServices ? `, ${booking.extraServices}` : ''}`,



//             // services: `${booking.services.join(", ")}${booking.extraServices !== false && booking.extraServices ? `, ${booking.extraServices}` : ''}`,

//             services: `${booking.services.join(", ")}`,
//             extraServices: `${booking.extraServices && booking.extraServices !== false ? booking.extraServices : "None"}`,
//             bookingDate: booking.bookingDate,
//             email: booking.email,
//             phone: booking.phone,
//             date: booking.date,
//             // location: booking.location,
//             amount: booking.amount,           
//             status: booking.status                  
//         }));

//         // Send the filtered bookings to the frontend
//         res.status(200).json(bookingsForAdmin);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching bookings', error });
//     }
// };



// Helper function to get an address from coordinates
const getAddressFromCoordinates = async (lat, lng) => {
    const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const results = response.data.results;

        if (results.length > 0) {
            return results[0].formatted_address; // Most relevant address
        } else {
            return "Address not found";
        }
    } catch (error) {
        console.error("Error fetching address:", error);
        return "Error fetching address";
    }
};

// Get bookings with resolved location
export const getBookings = async (req, res) => {
    try {
        // Fetch all bookings
        const bookings = await Booking.find();

        // Map to extract only necessary fields for admin
        const bookingsForAdmin = await Promise.all(
            bookings.map(async (booking) => {
                // Resolve the location to a user-friendly address
                const location =
                    booking.location &&
                    booking.location.type === "Point" &&
                    booking.location.coordinates.length === 2
                        ? await getAddressFromCoordinates(
                              booking.location.coordinates[1], // Latitude
                              booking.location.coordinates[0]  // Longitude
                          )
                        : "Location not available";

                return {
                    bookingId: booking.bookingId,
                    name: booking.name,
                    services: `${booking.services.join(", ")}`,
                    extraServices: `${
                        booking.extraServices && booking.extraServices !== false
                            ? booking.extraServices
                            : "None"
                    }`,
                    bookingDate: booking.bookingDate,
                    email: booking.email,
                    phone: booking.phone,
                    date: booking.date,
                    location, // Resolved location
                    amount: booking.amount,
                    status: booking.status,
                };
            })
        );

        // Send the filtered bookings to the frontend
        res.status(200).json(bookingsForAdmin);
    } catch (error) {
        res.status(500).json({ message: "Error fetching bookings", error });
    }
};


// Delete booking by custom booking ID
export const deleteBookingById = async (req, res) => {
    const { id } = req.params; // Assuming 'id' is the custom booking ID
    try {
        // Find and delete the booking using the custom booking ID
        const deletedBooking = await Booking.findOneAndDelete({ bookingId: id });

        if (!deletedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json({ message: 'Booking successfully deleted' });
    } catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).json({ message: 'Error deleting booking', error });
    }
};



// Delete all bookings
export const deleteAllBookings = async (req, res) => {
    try {
        await Booking.deleteMany();
        res.status(200).json({ message: 'All bookings successfully deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting bookings', error });
    }
};


// Controller to reset the booking counter
export const resetBookingCounter = async (req, res) => {
    try {
        // Find the booking counter, or create one if it doesn't exist
        let bookingCounter = await BookingCounter.findOne();
        if (!bookingCounter) {
            // If no counter exists, create one
            bookingCounter = new BookingCounter({ count: 0 });
        }

        // Reset the counter
        bookingCounter.count = 0;
        bookingCounter.lastReset = Date.now(); 
        await bookingCounter.save();

        return res.status(200).json({ message: 'Booking ID counter has been reset', bookingCounter });
    } catch (error) {
        console.error('Error resetting booking counter:', error);
        return res.status(500).json({ error: 'Error resetting booking counter' });
    }
};








const processRefund = async (transactionId, refundAmount, flwRef, currency) => {
    try {
        const flutterwaveSecretKey = process.env.FLW_SECRET_KEY;

        if (!flutterwaveSecretKey) {
            throw new Error('Flutterwave secret key is not defined. Check your .env file.');
        }

        const response = await axios.post(`https://api.flutterwave.com/v3/transactions/${transactionId}/refund`, {
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











// 2 be used for live deployment 💙 dont delete 

// const processRefund = async (transactionId, refundAmount, flwRef, currency) => {
//     try {
//         const flutterwaveSecretKey = process.env.FLW_SECRET_KEY;

//         if (!flutterwaveSecretKey) {
//             throw new Error('Flutterwave secret key is not defined. Check your .env file.');
//         }

//          // Log the refund amount and transaction details
//          console.log(`Initiating refund for transaction ID: ${transactionId}`);
//          console.log(`Refund amount: ${refundAmount}`);
//          console.log(`Flutterwave reference: ${flwRef}`);
//          console.log(`Currency: ${currency}`);

//         const response = await axios.post(`https://api.flutterwave.com/v3/transactions/${transactionId}/refund`, {
//             transaction_id: transactionId,
//             amount: refundAmount,
//             flw_ref: flwRef, // Use the provided flw_ref
//             currency: currency // Include currency in the payload
//         }, {
//             headers: {
//                 Authorization: `Bearer ${flutterwaveSecretKey}`,
//             },
//         });

//         return response.data;
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

//             // Step 5: Process the refund using the flw_ref and currency from the booking
//             const settledAmount = booking.amount
//             const flwRef = booking.flw_ref; // Get the flw_ref from the booking
//             const currency = booking.currency; // Get the currency from the booking

//             const refundResponse = await processRefund(booking.transactionId, settledAmount, flwRef, currency);

//             // Update booking status to 'Cancelled'
//             booking.status = 'Cancelled';
//             await booking.save();

//             // Step 6: Send email notification about cancellation
//             await sendBookingStatusEmail(booking.email, bookingId, 'Cancelled'); // Adjust parameters as necessary

//             // Step 7: Return the updated booking and refund response
//             return res.status(200).json({
//                 message: 'Booking canceled and refund processed successfully',
//                 booking,
//                 refund: refundResponse,
//             });
//         } else if (status === 'Confirmed') {
//             // Step 8: Update booking status to 'Confirmed'
//             booking.status = 'Confirmed'; // Update status to Confirmed
//             await booking.save();

//             // Step 9: Send email notification about confirmation
//             await sendBookingStatusEmail(booking.email, bookingId, 'Confirmed'); // Adjust parameters as necessary

//             // Step 10: Return the updated booking
//             return res.status(200).json({
//                 message: 'Booking confirmed successfully',
//                 booking,
//             });
//         } else if (['Pending', 'Completed'].includes(status)) {
//             // Step 11: Update booking status for other states without sending email
//             booking.status = status; // Update status to the provided status
//             await booking.save();

//             // Step 12: Return the updated booking
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
