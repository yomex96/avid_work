import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import nodemailer from 'nodemailer';
import path from 'path';

// import { fileURLToPath } from 'url';



dotenv.config();

// Get the current directory
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const __dirname = path.resolve();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the static files from the frontend's dist folder
app.use(express.static(path.join(__dirname, '../frontend/dist')));





// // Middleware for session management

// app.use(session({
//   secret: 'your-secret-key', // replace with a secure key
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false } // set to `true` in production with HTTPS 🧡
// }));





// Connect to MongoDB using the URI from the environment variables
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Define a root route for testing
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});


// Use your routers for respective API routes
import contactRouter from './routes/contact.js';
import paymentRoutes from './routes/paymentRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import adminRoutes from './routes/adminRoutes.js'; 
import companyInfoRoutes from './routes/companyInfo.js';
import bankRoutes from './routes/bankRoutes.js';
import mediaRoutes from './routes/mediaRoutes.js';

import videoRoutes from './routes/videoRoutes.js';


import featuresRoutes from "./routes/featuresRoute.js";



// import session from 'express-session'; //🧡




app.use('/api/contact', contactRouter); 
app.use('/api/admin', adminRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/company-info', companyInfoRoutes);
app.use('/api/bank', bankRoutes);
app.use('/api/media', mediaRoutes);

app.use('/api/services', videoRoutes);


// API Routes
app.use("/api", featuresRoutes); // Mount the features routes

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

    // Catch-all route for SPA
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'));
  });
  // app.get("*", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  // })
}






// Nodemailer Setup using email credentials from .env
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Handle routing for SPA (Single Page Application)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});