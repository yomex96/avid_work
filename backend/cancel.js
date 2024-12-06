// Mock database for demonstration purposes
const bookingsDatabase = [
    {
        _id: "67108c2781d4103e67aaaf78",
        name: "ayomide",
        email: "kimrogers1004@gmail.com",
        phone: "09032633554",
        services: ["Lifestyle Video Shoot"],
        extraServices: false,
        date: "2024-07-08",
        bookingDate: "2024-10-20",
        status: "Completed",
        transactionId: "7815493",
        bookingId: "AVID030",
        amount: 190,
        createdAt: "2024-10-17T04:01:43.941Z",
        updatedAt: "2024-10-17T07:56:28.413Z",
        __v: 0
    }
];

// Function to get a booking by ID
const getBookingById = async (bookingId) => {
    return bookingsDatabase.find(booking => booking._id === bookingId) || null;
};

// Mock payment processor
const paymentProcessor = {
    refund: async ({ transactionId, amount }) => {
        // Simulate refund processing
        console.log(`Processing refund for transaction ID: ${transactionId}, amount: ${amount}`);
        return { success: true, transactionId, refundedAmount: amount };
    }
};

// Function for processing refunds
const processRefund = async (transactionId, amount) => {
    try {
        const response = await paymentProcessor.refund({ transactionId, amount });
        return response; // Return response for further processing if needed
    } catch (error) {
        console.error('Refund processing error:', error);
        throw new Error('Refund failed');
    }
};

// Function to update booking status
const updateBookingStatus = async (bookingId, newStatus) => {
    const booking = await getBookingById(bookingId);

    if (!booking) {
        throw new Error('Booking not found');
    }

    // Update the booking status
    booking.status = newStatus;

    // If the status is updated to "Cancelled", process the refund
    if (newStatus === 'Cancelled') {
        try {
            const refundResponse = await processRefund(booking.transactionId, booking.amount);
            console.log('Refund successful:', refundResponse);
        } catch (error) {
            console.error('Error processing refund:', error.message);
        }
    }

    return {
        message: "Booking status updated",
        booking: booking,
    };
};

// Example usage
const bookingId = "67108c2781d4103e67aaaf78"; // replace with actual booking ID
const newStatus = "Cancelled"; // new status to set

updateBookingStatus(bookingId, newStatus)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.message);
    });
