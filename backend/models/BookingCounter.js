import mongoose from 'mongoose';



const bookingCounterSchema = new mongoose.Schema({
    count: {
        type: Number,
        required: true,
        default: 0
    },
    lastReset: {
        type: Date, // To track when it was last reset
        default: Date.now
    }
});


const BookingCounter = mongoose.model('BookingCounter', bookingCounterSchema);

export default BookingCounter;
