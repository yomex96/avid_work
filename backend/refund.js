import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();


// Function to process a refund using the direct endpoint
const processRefund = async (transactionId, refundAmount) => {
    try {
        const flutterwaveSecretKey = process.env.FLW_SECRET_KEY;

        if (!flutterwaveSecretKey) {
            throw new Error('Flutterwave secret key is not defined. Check your .env file.');
        }

        // Construct the payload for the refund request
        const payload = {
            amount: refundAmount.toString(), // Amount to refund as a string
        };

        console.log("Sending refund request:", { transactionId, payload }); // Log the request payload

        // Send a POST request to the refund endpoint
        const response = await axios.post(`https://api.flutterwave.com/v3/transactions/${transactionId}/refund`, payload, {
            headers: {
                Authorization: `Bearer ${flutterwaveSecretKey}`, // Set the authorization header
            },
        });

        // Check if the response indicates success
        if (response.data.status === 'success') {
            console.log("Refund successful:", response.data);
            return response.data;
        } else {
            console.error("Refund failed:", response.data);
            throw new Error(response.data.message || 'Refund processing failed');
        }
    } catch (error) {
        // Log errors and throw them to be handled later
        if (error.response) {
            console.error('Error processing refund:', error.response.data);
            throw new Error(`Refund processing failed: ${error.response.data.message || error.message}`);
        } else {
            console.error('Error processing refund:', error.message);
            throw new Error('Refund processing failed');
        }
    }
};

// Example of calling the refund function
(async () => {
    const transactionId = '7857693'; // Replace with your actual transaction ID
    const refundAmount = 364.82; // Amount to refund

    try {
        // Call the processRefund function and log the response
        const refundResponse = await processRefund(transactionId, refundAmount);
        console.log("Refund Response:", refundResponse);
    } catch (error) {
        // Log any error that occurs during the refund process
        console.error("Error:", error.message);
    }
})();