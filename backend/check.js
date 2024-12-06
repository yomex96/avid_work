import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Function to check the transaction status
const checkTransactionStatus = async (transactionId) => {
    const flutterwaveUrl = `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`;

    try {
        // Make a GET request to the Flutterwave API
        const response = await axios.get(flutterwaveUrl, {
            headers: {
                Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`, // Your Flutterwave Secret Key
            },
        });

        // Log the entire response to the console for review
        console.log('Transaction Status Response:', response.data);

        // You can also log specific parts of the response like status and amount
        console.log('Transaction Status:', response.data.data.status);
        console.log('Transaction Amount:', response.data.data.amount);

        return response.data;
    } catch (error) {
        // Log the error response if any issues arise
        console.error('Error fetching transaction status:', error.response?.data || error.message);
        throw new Error('Error fetching transaction status');
    }
};

// Example usage with a transaction ID
const transactionId = 7853159; // Replace this with your actual transaction ID

// Call the function and log the status to the console
checkTransactionStatus(transactionId)
    .then((data) => {
        console.log('Transaction Status Details:', data);
    })
    .catch((error) => {
        console.error('Error:', error.message);
    });
