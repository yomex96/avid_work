
import express from 'express';
import { checkAvailability, createBooking,  getBookings, deleteAllBookings, deleteBookingById, updateBookingStatus, allgetBookings, resetBookingCounter} from '../controllers/bookingController.js'; // Ensure to include .js extension if using ES6 modules


const router = express.Router();

// Route to check booking availability
router.post('/check', checkAvailability);

// Route to create a booking
router.post('/create', createBooking);

// Route to get all bookings
router.get('/', getBookings); // 

// Route to get all bookings
router.get('/all', allgetBookings); // 

router.post('/reset-booking', resetBookingCounter);


router.patch('/:bookingId/status', updateBookingStatus);


// Route to delete all booking
router.delete('/delete', deleteAllBookings);


router.delete('/delete/:id', deleteBookingById);




export default router;



