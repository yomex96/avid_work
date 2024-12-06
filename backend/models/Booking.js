import mongoose from 'mongoose';

// Time Schema for handling time details
const timeSchema = new mongoose.Schema(
  {
    hour: { type: String, required: true },
    minute: { type: String, required: true },
    period: { type: String, enum: ['AM', 'PM'], required: true }
  },
  { _id: false }
);

// Booking Schema
const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    services: { type: [String], required: true },
    extraServices: { type: String, default: '' },
    location: {
      type: {
        type: String, // 'Point'
        enum: ['Point'], // 'Point' is the only option
        required: true
      },
      coordinates: { type: [Number], required: true } // [longitude, latitude]
    },
    date: { type: String, required: true }, // Service date stored in 'YYYY-MM-DD'
    bookingDate: { type: String, required: true }, // Date booking was received, stored in 'YYYY-MM-DD'
    timeRange: {
      from: { type: timeSchema, required: true }, // From time
      to: { type: timeSchema, required: true } // To time
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'], // Booking statuses
      default: 'Pending'
    },
    transactionId: { type: String, required: true },
    bookingId: { type: String, required: true, unique: true }, // Customized Booking ID

    amount: { type: Number, required: true }, // Amount charged from the customer
    settledAmount: { type: Number }, // Actual amount settled after fees
    paymentType: { type: String }, // Payment method used ('card', 'bank_transfer', etc.)
    
    flw_ref: { type: String }, // Flutterwave reference field
    
    currency: { type: String, required: true } // Currency for the transaction (e.g., 'NGN', 'USD')
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Add a 2dsphere index to the location field for geospatial queries
bookingSchema.index({ location: '2dsphere' });

// Export the Booking model
const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;



//🧡
// import mongoose from 'mongoose';

// // Time Schema for handling time details
// const timeSchema = new mongoose.Schema(
//   {
//     hour: { type: String, required: true },
//     minute: { type: String, required: true },
//     period: { type: String, enum: ['AM', 'PM'], required: true }
//   },
//   { _id: false }
// );

// // Booking Schema
// const bookingSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     phone: { type: String, required: true },
//     services: { type: [String], required: true },
//     extraServices: { type: Boolean, default: false },
//     location: {
//       type: {
//         type: String, // 'Point'
//         enum: ['Point'], // 'Point' is the only option
//         required: true
//       },
//       coordinates: { type: [Number], required: true } // [longitude, latitude]
//     },
//     date: { type: String, required: true }, // Service date stored in 'YYYY-MM-DD'
//     bookingDate: { type: String, required: true }, // Date booking was received, stored in 'YYYY-MM-DD'
//     timeRange: {
//       from: { type: timeSchema, required: true }, // From time
//       to: { type: timeSchema, required: true } // To time
//     },
//     status: {
//       type: String,
//       enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'], // Booking statuses
//       default: 'Pending'
//     },
//     transactionId: { type: String, required: true },
//     bookingId: { type: String, required: true, unique: true }, // Customized Booking ID

//     amount: { type: Number, required: true }, // Amount charged from the customer
//     settledAmount: { type: Number }, // Actual amount settled after fees
//     paymentType: { type: String }, // Payment method used ('card', 'bank_transfer', etc.)
//   },
//   { timestamps: true } // Automatically manage createdAt and updatedAt fields
// );

// // Add a 2dsphere index to the location field for geospatial queries
// bookingSchema.index({ location: '2dsphere' });

// // Export the Booking model
// const Booking = mongoose.model('Booking', bookingSchema);
// export default Booking;



//💙
// import mongoose from 'mongoose';

// // Time Schema for handling time details
// const timeSchema = new mongoose.Schema(
//   {
//     hour: { type: String, required: true },
//     minute: { type: String, required: true },
//     period: { type: String, enum: ['AM', 'PM'], required: true }
//   },
//   { _id: false }
// );

// // Booking Schema
// const bookingSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     phone: { type: String, required: true },
//     services: { type: [String], required: true },
//     extraServices: { type: Boolean, default: false },
//     location: {
//       type: {
//         type: String, // 'Point'
//         enum: ['Point'], // 'Point' is the only option
//         required: true
//       },
//       coordinates: { type: [Number], required: true } // [longitude, latitude]
//     },
//     date: { type: String, required: true }, // Service date stored in 'YYYY-MM-DD'
//     bookingDate: { type: String, required: true }, // Date booking was received, stored in 'YYYY-MM-DD'
//     timeRange: {
//       from: { type: timeSchema, required: true }, // From time
//       to: { type: timeSchema, required: true } // To time
//     },
//     status: {
//       type: String,
//       enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'], // Booking statuses
//       default: 'Pending'
//     },
//     transactionId: { type: String, required: true },
//     bookingId: { type: String, required: true, unique: true }, // Customized Booking ID

//     // Add the amount field here
//     amount: { type: Number },
//   },
//   { timestamps: true } // Automatically manage createdAt and updatedAt fields
// );

// // Add a 2dsphere index to the location field for geospatial queries
// bookingSchema.index({ location: '2dsphere' });

// // Export the Booking model
// const Booking = mongoose.model('Booking', bookingSchema);
// export default Booking;



//💚

// import mongoose from 'mongoose';

// // Time Schema for handling time details
// const timeSchema = new mongoose.Schema(
//   {
//     hour: { type: String, required: true },
//     minute: { type: String, required: true },
//     period: { type: String, enum: ['AM', 'PM'], required: true }
//   },
//   { _id: false } 
// );

// // Booking Schema
// const bookingSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     phone: { type: String, required: true },
//     services: { type: [String], required: true }, 
//     extraServices: { type: Boolean, default: false }, 
//     location: {
//       type: {
//         type: String, // 'Point'
//         enum: ['Point'], // 'Point' is the only option
//         required: true
//       },
//       coordinates: { type: [Number], required: true } // [longitude, latitude]
//     },
//     date: { type: String, required: true }, // Service date stored in 'YYYY-MM-DD'
//     bookingDate: { type: String, required: true }, // Date booking was received, stored in 'YYYY-MM-DD'
//     timeRange: {
//       from: { type: timeSchema, required: true }, // From time
//       to: { type: timeSchema, required: true } // To time
//     },
//     status: {
//       type: String,
//       enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'], // Booking statuses
//       default: 'Pending'
//     },

//     //oik
//     transactionId: { type: String, required: true },


//     bookingId: { type: String, required: true, unique: true } // Customized Booking ID
//   },
//   { timestamps: true } // Automatically manage createdAt and updatedAt fields
// );

// // Add a 2dsphere index to the location field for geospatial queries
// bookingSchema.index({ location: '2dsphere' });

// // Export the Booking model
// const Booking = mongoose.model('Booking', bookingSchema);
// export default Booking;
